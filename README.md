# Portafolio personal — Práctica 3.2

Portafolio personal de Adolfo Javier Vera Matijasevic integrado con backend, PostgreSQL y una cadena CI/CD para demostrar la Práctica 3.2.

El frontend original está basado en el repositorio público [Fitooohhh/Portafolio](https://github.com/Fitooohhh/Portafolio). Se conserva su diseño, animaciones, proyectos, habilidades, educación y contacto; esta carpeta añade la API, base de datos, pruebas, Docker, Terraform, Ansible y GitHub Actions.

## Arquitectura

- **Frontend:** React + Vite, diseño responsive.
- **Backend:** Node.js + Express, API REST.
- **Base de datos:** PostgreSQL 16.
- **Pruebas:** Vitest (unitarias), Supertest (integración) y Playwright (E2E).
- **Entrega:** GitHub Actions, Docker Hub, Terraform y Ansible.

## Ejecutar localmente

Requisitos: Node.js 20+, Docker Desktop y Git.

```bash
npm install
npm run test:unit
npm run test:integration
npx playwright install chromium
npm run test:e2e
npm run dev
```

Para levantar la aplicación con PostgreSQL:

```bash
docker compose up --build
# abrir http://localhost
```

## Flujo solicitado

1. Crea una rama `dev` y haz push: el job `tests` ejecuta unitarias, integración, E2E y build.
2. Haz merge a `main`: además de las pruebas, se construye y publica `DOCKERHUB_USERNAME/portfolio-personal:latest`.
3. El mismo job ejecuta `terraform apply` para crear la VM Ubuntu 24.04, VCN, subred e IP pública en OCI.
4. Después de obtener la IP, configura la VM desde tu equipo:

```bash
./scripts/provision.sh IP_PUBLICA ~/.ssh/mi_clave_oci
```

El playbook instala Docker, Git, UFW e iptables y permite los puertos 22, 80 y 443. Para descargar la imagen publicada, define `DOCKER_IMAGE=usuario/portfolio-personal:latest` al ejecutar Ansible.

## Terraform en Oracle Cloud

1. En OCI crea un usuario, una API key y un compartimento. Guarda el OCID del tenancy, usuario y compartimento.
2. Copia `infra/terraform.tfvars.example` como `infra/terraform.tfvars` y completa sus valores. No subas ese archivo a Git.
3. Desde `infra/`, ejecuta:

```bash
terraform init
terraform fmt -recursive
terraform validate
terraform plan
terraform apply
```

El diseño usa `VM.Standard.E2.1.Micro`, Ubuntu 24.04, una VCN `10.0.0.0/16`, una subred pública `10.0.1.0/24`, Internet Gateway, IP pública y reglas de seguridad para SSH/HTTP/HTTPS.

## Secretos de GitHub

Configura estos secrets en `Settings > Secrets and variables > Actions`:

`DOCKERHUB_USERNAME`, `DOCKERHUB_TOKEN`, `OCI_TENANCY_OCID`, `OCI_USER_OCID`, `OCI_FINGERPRINT`, `OCI_PRIVATE_KEY`, `OCI_COMPARTMENT_OCID`, `OCI_REGION`, `VM_SSH_PUBLIC_KEY` y `VM_SSH_PRIVATE_KEY`.

Para los puntos extra de Cloudflare añade también `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ZONE_ID` y `PORTFOLIO_DOMAIN`. El recurso opcional crea un registro A proxied apuntando a la IP pública de la VM.

> Revisa tus enlaces, correo, teléfono y datos personales en `frontend/src/App.tsx` antes de entregar.
