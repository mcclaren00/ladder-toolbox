resource "proxmox_vm_qemu" "srv_ubnt_1" {
    name = "srv-ubnt-1"
    desc = "Ubuntu Server"
    vmid = "401"
    target_node = "proxmox"

    onboot = true
    agent = 1
    clone = "ubnt-svr-temp"

    cores = 1
    sockets = 1
    cpu = "host"
    memory = 1024

    os_type = "cloud-init"
    ciuser = "sa"
}