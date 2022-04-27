#!/usr/bin/env bash 
# This script provisions k3s and installs flux and k3s monitoring stack 
  
USER="sa" # change to fit your needs
K3S_VERSION="v1.23.4+k3s1"

REPO_ROOT=$(git rev-parse --show-toplevel)
ANSIBLE_INVENTORY="${REPO_ROOT}"/ansible/inventory/inventory.yml

need() {
    which "$1" &>/dev/null || die "Binary '$1' is missing but required"
}

need "curl"
need "ssh"
need "kubectl"
need "helm"
need "k3sup"
need "ansible-inventory"
need "jq" 
need "flux"

K3S_MASTER=$(ansible-inventory -i ${ANSIBLE_INVENTORY} --list | jq -r '.k3s_master[] | @tsv')
K3S_WORKERS=$(ansible-inventory -i ${ANSIBLE_INVENTORY} --list | jq -r '.k3s_worker[] | @tsv')
# FIRST_MASTER=$(ansible-inventory -i ${ANSIBLE_INVENTORY} --list | jq -r '.k3s_first_master[] | @tsv')


# echo "Cluster IP" ${FIRST_MASTER} #works 
echo "Masters" ${K3S_MASTERS}
echo "Workers" ${K3S_WORKERS} 
message() {
  echo -e "\n######################################################################"
  echo "# ${1}"
  echo "######################################################################"
} 

first_master_node() {
    message "Installing first master node"
    k3sup install --ip "${K3S_MASTER}" --user "${USER}" --k3s-version "${K3S_VERSION}" --ssh-key "~/.ssh/id_ed25519" --k3s-extra-args "--no-deploy metrics-server"

    # Move to correct folder
    mkdir -p ~/.kube
    mv ./kubeconfig ~/.kube/config

    sleep 10 
}

k3s_master_node() {
   
        
    message "Installing master nodes ${K3S_MASTER}"
    k3sup install --ip "${K3S_MASTER}" --ssh-key "~/.ssh/id_ed25519" --k3s-version "${K3S_VERSION}" --user "${USER}" --k3s-extra-args "--no-deploy metrics-server"
    sleep 10 
    message "Labeling ${MASTER} as node-role.kubernetes.io/master=master"
    # hostname=$(ansible-inventory -i ${ANSIBLE_INVENTORY} --list | jq -r --arg master "$master" '._meta[] | .[$k3s_master].hostname')
    # kubectl label node ${hostname} node-role.kubernetes.io/worker=worker
    
    # Move to correct folder
    mkdir -p ~/.kube
    mv ./kubeconfig ~/.kube/config

}

k3s_worker_node() {
    for worker in ${K3S_WORKERS}; do

        message "Joining ${worker} to ${FIRST_MASTER} cluster"
        k3sup join --ip "${worker}" --ssh-key "~/.ssh/id_ed25519" --k3s-version "${K3S_VERSION}" --user "${USER}" --server-ip "${K3S_MASTER}" --k3s-extra-args "--no-deploy metrics-server"
        
        sleep 10

        message "Labeling ${worker} as node-role.kubernetes.io/worker=worker"
        hostname=$(ansible-inventory -i ${ANSIBLE_INVENTORY} --list | jq -r --arg k3s_worker "${worker}" '._meta[] | .[$k3s_worker].hostname')
        kubectl label node ${hostname} node-role.kubernetes.io/worker=worker
    done
}

install_flux() {
    ## installing flux through helm 
    message "Installing flux"

    # Bootstrap flux into cluster and repo 
    flux bootstrap github --owner=mcclaren00 --repository=ladder-toolbox --branch=main --path=/cluster/ --personal

    '''
    FLUX_READY=1
    while [ ${FLUX_READY} != 0 ]; do
        echo "Waiting for flux pod to be fully ready..."
        kubectl -n flux-system wait --for condition=available deployment/flux
        FLUX_READY="$?"
        sleep 5
    done
    '''
    sleep 5
}

add_deploy_key() {
    # grab output the key
    FLUX_KEY=$(kubectl -n flux logs deployment/flux | grep identity.pub | cut -d '"' -f2)
    print $FLUX_KEY
    message "Adding the key to github automatically"
    "${REPO_ROOT}"/setup/add-repo-key.sh "${FLUX_KEY}"
}

install_monitoring() {
    message "Installing Prometheus/Grafana monitoring stack"
    kubectl create namespace monitoring 
    helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
    helm repo add stable https://charts.helm.sh/stable
    helm repo update
    helm install promethus prometheus-community/kube-prometheus-stack

    # expose with kubectl port-forward deployment/prometheus-grafana 3000
}


k3s_master_node
k3s_worker_node
install_flux
# add_deploy_key

sleep 5
message "Installed K3s and flux"
kubectl get nodes -o=wide

sleep 5

# install_monitoring
message "All done!"
kubectl get nodes 
kubectl get pods -A


