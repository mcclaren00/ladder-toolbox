# Bootstrapping Cluster Instructuions: 

Create private and public key using Age and SOPs to encrypt secrets. 

```
age-keygen -o age.agekey
mkdir -p ~/.config/sops/age
mv age.agekey ~/.config/sops/age/keys.txt
export SOPS_AGE_KEY_FILE=~/.config/sops/age/keys.txt
source ~/.bashrc
```

<br>


## Environment configurations
Fill out and verify that `config.env` file is in correct format

<br>

```
task verify
task configure #get files templated with init cluster manifests
```
<br>

## Ansible Playbooks and K3s Install
Configure Ansible to run via SSH key-based authentication then run the following to fully provision K3s based on the IP addresses, in the `config.env` file and the `inventory.yml` file. 

```
task ansible:init
task ansible:list
task ansbile:ping 
task ansible:prepare
task ansible:reboot
task ansilble:install 
```

<br>

## Cloudflare DNS with Terraform 

Run: 
```
task terraform:init
task terraform:plan
task teraform:apply
``` 

<br>

## Install Flux for CD

```
task cluster:flux:verify
task cluster:flux:namespace
task cluster:flux:secret
```
Then bootstrap flux to this Git repository: 

```
export GITHUB_USER=<USER>
export GITHUB_TOKEN=<TOKEN>

flux bootstrap github \
    --owner=<USER> \
    --repository=ladder-toolbox \
    --branch=infra \
    --path=cluster/ \
    --personal 
```

<br>

## Nuke 

This will nuke all configurations and uninstall Kubernetes 

```
task ansible:nuke
```

