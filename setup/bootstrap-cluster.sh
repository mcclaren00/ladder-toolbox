#!/usr/bin/env bash
# This script provisions k3s and installs flux and k3s monitoring stack

USER="sa" # change to fit your needs
K3S_VERSION="v1.23.4+k3s1"

REPO_ROOT=$(git rev-parse --show-toplevel)
ANSIBLE_INVENTORY="${REPO_ROOT}"/provision/ansible/inventory/inventory.yml

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


# echo "Cluster IP" ${FIRST_MASTER} #works
echo "Masters" ${K3S_MASTERS}
echo "Workers" ${K3S_WORKERS}

message() {
  echo -e "\n######################################################################"
  echo "# ${1}"
  echo "######################################################################"
}

k3s_master_node() {
    message "Installing first master node"
    k3sup install --ip "${K3S_MASTER}" --user "${USER}" --k3s-version "${K3S_VERSION}" --ssh-key "~/.ssh/id_ed25519" --k3s-extra-args "--no-deploy servicelb --no-deploy metrics-server --no-deploy traefik --no-deploy flannel"

    # Move to correct folder
    mkdir -p ~/.kube
    mv ./kubeconfig ~/.kube/config

    sleep 10
}

k3s_worker_node() {
    for worker in ${K3S_WORKERS}; do

        message "Joining ${worker} to ${K3S_MASTER} cluster"
        k3sup join --ip "${worker}" --server-ip "${K3S_MASTER}" --ssh-key "~/.ssh/id_ed25519" --k3s-version "${K3S_VERSION}" --user "${USER}" --k3s-extra-args "--no-deploy servicelb --no-deploy metrics-server --no-deploy traefik --no-deploy flannel"

        sleep 10

        message "Labeling ${worker} as node-role.kubernetes.io/worker=worker"
        hostname=$(ansible-inventory -i ${ANSIBLE_INVENTORY} --list | jq -r --arg k3s_worker "${worker}" '._meta[] | .[$k3s_worker].hostname')
        echo ${hostname}

        kubectl label node ${hostname} node-role.kubernetes.io/worker=worker
    done
}

install_flux() {
    ## installing flux through helm
    message "Installing flux"

    # Bootstrap flux into cluster and repo
    flux bootstrap github --owner=mcclaren00 --repository=ladder-toolbox --branch=main --path=/cluster/ --personal

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
# install_flux
# add_deploy_key

message "Installed K3s and flux"
kubectl get nodes -o=wide

sleep 5

# install_monitoring
message "All done!"
kubectl get nodes
kubectl get pods -A
