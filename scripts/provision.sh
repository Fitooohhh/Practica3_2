#!/usr/bin/env bash
set -euo pipefail
if [[ $# -lt 2 ]]; then
  echo "Uso: ./scripts/provision.sh <IP_PUBLICA> <RUTA_CLAVE_SSH> [USUARIO]"
  exit 1
fi
PUBLIC_IP="$1"
SSH_KEY="$2"
SSH_USER="${3:-ubuntu}"
INVENTORY="$(mktemp)"
trap 'rm -f "$INVENTORY"' EXIT
cat > "$INVENTORY" <<EOF
[portfolio]
portfolio-vm ansible_host=${PUBLIC_IP} ansible_user=${SSH_USER} ansible_ssh_private_key_file=${SSH_KEY}
EOF
ansible-galaxy collection install community.general community.docker
ansible-playbook -i "$INVENTORY" infra/ansible/playbook.yml
echo "VM configurada. Abre http://${PUBLIC_IP} cuando la imagen esté ejecutándose."
