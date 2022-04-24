#!/usr/bin/env bash 
# This script is meant to be ran on master node
  
USER="sa" # change to fit your needs
K3S_VERSION="v1.23.4+k3s1"

REPO_ROOT=$(git rev-parse --show-toplevel)
ANSIBLE_INVENTORY="${REPO_ROOT}"/inventory/inventory.yml

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

K3S_MASTERS=$(ansible-inventory -i ${ANSIBLE_INVENTORY} --list | jq -r '.k3s_master[] | @tsv')
K3S_WORKERS=$(ansible-inventory -i ${ANSIBLE_INVENTORY} --list | jq -r '.k3s_worker[] | @tsv')


message() {
  echo -e "\n######################################################################"
  echo "# ${1}"
  echo "######################################################################"
}

k3s_master_node() {
    for master in ${K3S_MASTERS}; do 
        
        message "Installing k3s master to ${master}"
        k3sup install --ip "${master}" \
            --cluster \
            --ssh-key "~/.ssh/id_ed25519" \
            --k3s-version "${K3S_VERSION}" \
            --user "${USER}" \
            --k3s-extra-args "--no-deploy servicelb --no-deploy traefik --no-deploy metrics-server --default-local-storage-path /k3s-local-storage"
        sleep 10 

        # message "Labeling ${master} as node-role.kubernetes.io/master=master"
        # hostname=$(ansible-inventory -i ${ANSIBLE_INVENTORY} --list | jq -r --arg master "$master" '._meta[] | .[$k3s_master].hostname')
        
    done

    # mkdir -p ~/.kube
    # mv ./kubeconfig ~/.kube/config
    sleep 10
}

k3s_worker_node() {
    for worker in $K3S_WORKERS; do
        message "Joining ${worker} to ${K3S_MASTER}"
        k3sup join --ip "${worker}" \
            --ssh-key "~/.ssh/id_ed25519" \
            --server-ip "${K3S_MASTER}" \
            --server \
            --k3s-version "${K3S_VERSION}" \
            --user "${USER}" \

        sleep 10

        message "Labeling ${worker} as node-role.kubernetes.io/worker=worker"
        hostname=$(ansible-inventory -i ${ANSIBLE_INVENTORY} --list | jq -r --arg worker "$worker" '._meta[] | .[$k3s_worker].hostname')
        kubectl label node ${hostname} node-role.kubernetes.io/worker=worker
    done
}

install_flux() {
    ## installing flux through helm 
    message "Installing flux"

    kubectl apply -f "${REPO_ROOT}"/cluster/deployments/flux/namespace.yaml

    helm repo add fluxcd https://charts.fluxcd.io
    helm repo update
    helm upgrade --install flux --values "${REPO_ROOT}"/cluster/deployments/flux/flux/flux-values.yaml --namespace flux fluxcd/flux
    helm upgrade --install helm-operator --values "${REPO_ROOT}"/cluster/deployments/flux/helm-operator/helm-operator-values.yaml --namespace flux fluxcd/helm-operator

    FLUX_READY=1
    while [ ${FLUX_READY} != 0 ]; do
        echo "Waiting for flux pod to be fully ready..."
        kubectl -n flux wait --for condition=available deployment/flux
        FLUX_READY="$?"
        sleep 5
    done
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


## Write in ssh into master node and run commands either locally or on machine 
message "${K3S_MASTERS}" 

k3s_master_node
k3s_worker_node
install_flux
add_deploy_key

sleep 5
message "Installed K3s and flux"
kubectl get nodes -o=wide

sleep 5

install_monitoring
message "All done!"


