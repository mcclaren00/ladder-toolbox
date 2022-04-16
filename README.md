# Ansible Branch 

Credits to: Jeff Geerling

<br>

## Branch usage 
This branch is mainly used for system configurations across the cluster. Any changes with system configurations should happen within this branch to be used as a single source of truth for system configuration. 

<br>

## Requirements 

- Python3 
- Ansible 
- Updated inventory of IP addresses
- SSH keys shared to cluster 

<br>

## Usage 
To provision or nuke cluster run: 

    ansible-playbook site.yml -i inventory/hosts.ini 

This provisions and installs k3s on all nodes based off of the `inventory/hosts.ini` file 


<br>

## Accessing the cluster 
 To access the provisioned cluster run:

    scp USER@master_ip:~/.kube/config ~/.kube/config

<br>

## Quick References 

- [Ansible Docs](https://docs.ansible.com/)
- [K3s](https://rancher.com/docs/k3s/latest/en/)
- [Kubernetes](https://kubernetes.io/docs/home/)