# Infrastructure  

This branch makes use of many different Infrastructure as code frameworks, in order to bootstrap and create a single source of truth to the Kuberenetes and IPFS clusters.

 <br>

 ## Tools used in this branch:

 <ul>
 <li>Ansible - Playbooks for bootstrapping and manage nodes </li>
 <li>Terraform - Help bootstrapping DNS with Cloudflare </li>
 <li>Mozilla SOPs - Secret handling</li>
 <li>Precommits with GitLeaks and more </li>
 </ul>
 <br>

 ## Default Kubernetes cluster state:

 <ul>
 <li>Apps</li>
 <ul>
 <li>k8s-gateway</li>
 <li> error-pages</li>
 <li>system-upgrade</li>
 <li>external-dns</li>
 <li>echo-server</li>
 <li>Traefik</li>
 <li>Reflector</li>
 <li>Reloader</li>
 <li>Flux</li>
 </ul>
 <li>System</li>
 <ul>
 <li>cert-manager</li>
 <li>matllb</li>
 </ul>
 </ul>

 Various workflows with `Renovatebot` and `dependabot`.
 <br>

 ## Cluster folder structure:

```
├── apps
│   ├── default
│   │  
│   ├── kube-system
│   │  
│   ├── networking
│   │  
├── base
│  
├── core
│  
├── crds
```
<br>

## Usage

Most of the interaction with kubernetes cluster nodes is done with Taskfiles and task commands (see task help for task commands options).

Once cluster is installed majority of interation to the cluster is through `kubectl` although there are some `task` commands that interact with the cluster.

However with fluxcd installed an looking at the cluster file, changing kubernetes manifest files will be through Git. This replaces the `kubectl apply -f <file>` command to apply manifest files to the Kubernetes cluster.

<br>

### Task command examples:

```
task ansible:ping
task ansible:reboot
task ansible:install
```
