*** This branch is a production branch be careful of pushes!!!  *** 

# Infrastructure  



This branch makes use of many different Infrastructure as code frameworks, in order to bootstrap and create a single source of truth to the Kuberenetes and IPFS clusters.
<br>

This is important because it allows for all of our configs to be in one place. That way if the "data center" gets nuked we can get back up and running within a few short commands. 

 <br>

 ## Tools used in this branch:

 <ul>
    <li>Ansible - Playbooks for bootstrapping and manage nodes </li>
    <li>Terraform - Help bootstrapping DNS with Cloudflare, and provisioning VMs on proxmox </li>
    <li>Mozilla SOPs - Secret handling</li>
    <li>Precommits with GitLeaks, GitGuardian and more </li>
    <li>Bash scripts - automating even more! </li>
    <li>Docker automated deployments of custom applications</li>
 </ul>

 <br>

 ## Default Kubernetes cluster state:

 <ul>
    <li>Apps</li>
 <ul>
    <li>system-upgrade</li>
    <li>external-dns</li>
    <li>echo-server</li>
    <li>Reflector</li>
    <li>Reloader</li>
 </ul>
    <li>System</li>
 <ul>
    <li>cert-manager</li>
    <li>matllb</li>
    <li>Traefik</li>
    <li>Calico</li>
    <li>Cert-manager</li>
 </ul>
      <li>Monitoring</li>
   <ul>
      <li>Botkube</li>
      <li>Prometheus Monitoring Stack </li>
 </ul>

 Various workflows with `Renovatebot` and `dependabot`. 
 

 <br>

 ## Cluster folder structure:

```
cluster
├── apps
│   ├── default 
│   ├── kube-system  
│   ├── networking 
├── base
├── core  
├── crds
```
<br>

## Usage:

Most of the interaction with kubernetes cluster nodes is done with Taskfiles and task commands (see task help for task commands options).

Once cluster is installed majority of interation to the cluster is through `kubectl` although there are some `task` commands that interact with the cluster.


However with fluxcd installed an looking at the cluster file, changing kubernetes manifest files will be through Git by pushing to the `infra` branch. This replaces the `kubectl apply -f <file>` command to apply manifest files to the Kubernetes cluster. 

I'd reccomend using a tool called Lens to get a full picture of the cluster and easier navigation/tracking of different deployments, namespaces, pods, helm releases, etc. Then write different manifest files within the IDE of your choice (be careful to pay attention to different Kustomizations to deploy correctly). 

<br>

### Task command examples:

```
task ansible:ping 
task ansible:reboot 
task ansible:install 
task workstation
task cluster:reconcile
task precommit:run 
etc.  
```

<br>

## Bots: 

Were using Botkube to allow for eyes and ears as far as Pods, Deployments, Services, PVC, and more (only alerting on creations, errors, and deletions in specific namespaces). We are also alerting if any exposed secrets are pushed to Github through Gitguardian.   

<br>

## Production Deployment: 

Deployments of the Ladder web application and its microservices will be in the `production` Namespace and various ingresses, load balancers and scaling will be deployed to accomodate different needs of the application. 



