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


# echo "Cluster IP" ${FIRST_MASTER} #works 
echo "Masters" ${K3S_MASTER}
echo "Workers" ${K3S_WORKERS} 

message() {
  echo -e "\n######################################################################"
  echo "# ${1}"
  echo "######################################################################"
} 

k3s_master_node() {
    # echo "" > ~/.secret/node-token # clear if not cleared
    touch ~/.secret/node-token
    message "Installing first master node"

    ssh ${USER}@${K3S_MASTER} "curl -sfL https://get.k3s.io | sh -"

    # Re-format for liking please
    mkdir -p ~/.kube
    #scp ${USER}@${K3S_MASTER}:sudo /etc/rancher/k3s/k3s.yaml ~/.kube/config

    # mv /etc/rancher/k3s/k3s.yaml ~/.kube/config
    sleep 10 
}

k3s_worker_node() {
    NODE_TOKEN=
    ssh ${USER}@${K3S_MASTER} "sudo cat /var/lib/rancher/k3s/server/node-token" > ~/.secret/node-token
    cat ~/.secret/node-token

    echo ${NODE_TOKEN}

    for worker in ${K3S_WORKERS}; do
        message "Adding ${worker} to ${K3S_MASTER}"

        ssh ${USER}@${worker} "sudo curl -sfL https://get.k3s.io | K3S_URL=https://${K3S_MASTER}:6443 K3S_TOKEN=${NODE_TOKEN} sh - "
        sleep 10

        echo ssh ${USER}@${worker} "sudo curl -sfL https://get.k3s.io | K3S_URL=https://${K3S_MASTER}:6443 K3S_TOKEN=${NODE_TOKEN} sh - "

        # kubectl label node ${hostname} node-role.kubernetes.io/worker=worker
    done
}

k3s_master_node
k3s_worker_node


sleep 5
message "Installed k3s" 
ssh ${USER}@${K3S_MASTER} "sudo kubectl get nodes -o=wide"




