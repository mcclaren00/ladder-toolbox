#!/usr/bin/env bash 

# This script is meant to uninstall or nuke K3s on all nodes 

USER="sa"
REPO_ROOT=$(git rev-parse --show-toplevel)
ANSIBLE_INVENTORY="${REPO_ROOT}"/ansible/inventory/inventory.yml

K3S_MASTERS=$(ansible-inventory -i ${ANSIBLE_INVENTORY} --list | jq -r '.k3s_master[] | @tsv')
K3S_WORKERS=$(ansible-inventory -i ${ANSIBLE_INVENTORY} --list | jq -r '.k3s_worker[] | @tsv')

MASTER_UNINSTALL_SCRIPT= "/usr/local/bin/k3s-uninstall.sh"

message() {
    echo -e "\n######################################################################"
    echo "# ${1}"
    echo "######################################################################"
}


uninstall_masters(){
    for master in ${K3S_MASTERS}; do
        message "Removing K3s from ${master}"
        ssh ${USER}@${master} "sudo systemctl stop k3s.service ; sudo /usr/local/bin/k3s-uninstall.sh"
    done        
}

uninstall_workers(){
    for worker in ${K3S_WORKERS}; do
        message "Removing from ${worker}"
        ssh ${USER}@${worker} "sudo systemctl stop k3s-agent.service ; sudo /usr/local/bin/k3s-agent-uninstall.sh"
    done 
}

uninstall_masters
uninstall_workers

rm -rf ~/.kube/* 

message "Finished uninstalling"