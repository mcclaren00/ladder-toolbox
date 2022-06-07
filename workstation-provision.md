# Workstation Provisioning

To install dev dependancies for interaction and developing Kebernetes manifest files you will first have to have `homebrew` installed as a package manager (Installation automation uses the homebrew package manager). 

<br>

## Usage
```
brew install go-task/tap/go-task
task workstation
```

The first command will install task so that the user can install all dependancies in one command.

<br>


## Generating an SSH key 

To connect to the cluster you must generate an `ed25519` SSH Key. This is important as typical `RSA` keys will end up slowing down deployments and recently because unsecure. Next share your key to the server you have access to. 

```
ssh-keygen -t ed25519
ssh-copy-id <USER>@<IP-ADDRESS>
```
<br>


## Create an SSH config file

Copy and Paste the following in your `~/.ssh/config` 
```
Host master01
    HostName <K3S-MASTER-01-IP>
      user <USER>
      port <SSH-PORT>
Host worker01
    HostName <K3S-WORKER-02-IP>
    user <USER>
    port <SSH-PORT>
Host worker02
    HostName <K3S-WORKER-02-IP>
    user <USER>
    port <SSH-PORT>
Host workstation
    Hostname <WORKSTATION-IP>
    user <USER>
    port <SSH-PORT>
Host worker03
    HostName <K3S-WORKER-03-IP>
    user <USER>
    port <SSH-PORT>
```
<br>

## Accessing K3s Cluster: 
Once user account is created add the `kubeconfig` file into your local workstation and/or `workstation` account. Place the `kubeconfig` in the `~/.kube/` folder and rename the file as config. 
