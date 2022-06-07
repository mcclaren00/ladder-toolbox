# Ansible  

Credits to: Jeff Geerling

<br>

## Usage
This is mainly used for system configurations across the cluster. Any changes with system configurations across the cluster should happen through playbooks and uploaded into this directory.

<br>

## Requirements

- Python3
- Ansible
- Updated inventory of IP addresses
- SSH keys shared to cluster

<br>

## Usage
To run playbooks first make sure that the inventory is updated with the correct information.

```
ansible-playbook site.yml -i inventory/inventory.yml
```

<br>

## Quick References

- [Ansible Docs](https://docs.ansible.com/)
- [K3s](https://rancher.com/docs/k3s/latest/en/)
- [Kubernetes](https://kubernetes.io/docs/home/)
