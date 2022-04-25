#!/usr/bin/env bash 

# This script is meant to uninstall or nuke K3s on all nodes 

USER="sa"
REPO_ROOT=$(git rev-parse --show-toplevel)
ANSIBLE_INVENTORY="${REPO_ROOT}"/ansible/inventory/inventory.yml

K3S_MASTERS=$(ansible-inventory -i ${ANSIBLE_INVENTORY} --list | jq -r '.k3s_master[] | @tsv')
K3S_WORKERS=$(ansible-inventory -i ${ANSIBLE_INVENTORY} --list | jq -r '.k3s_worker[] | @tsv')
FIRST_MASTER=$(ansible-inventory -i ${ANSIBLE_INVENTORY} --list | jq -r '.k3s_first_master[] | @tsv')

MASTER_UNINSTALL_SCRIPT= "/usr/local/bin/k3s-uninstall.sh"

message() {
    echo -e "\n######################################################################"
    echo "# ${1}"
    echo "######################################################################"
}


uninstall_first_master(){
    message "Removing from ${FIRST_MASTER}"
    ssh ${USER}@${FIRST_MASTER} "sudo /usr/local/bin/k3s-uninstall.sh"
}

uninstall_masters(){
    for master in ${K3S_MASTERS}; do
        message "Removing K3s from ${master}"
        ssh ${USER}@${master} "sudo /usr/local/bin/k3s-uninstall.sh"
    done        
}

uninstall_workers(){
    for worker in ${K3S_WORKERS}; do
        message "Removing from ${worker}"
        ssh ${USER}@${worker} "sudo /usr/local/bin/k3s-agent-uninstall.sh"
    done 
}

uninstall_first_master
uninstall_masters
uninstall_workers

message "Finished uninstalling"