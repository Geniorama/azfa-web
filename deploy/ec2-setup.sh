#!/usr/bin/env bash
# =============================================================================
# Aprovisionamiento de la EC2 para azfa-web (Ubuntu 22.04/24.04).
# Instala Node 20 + PM2 + Nginx + Certbot, crea la estructura de directorios y
# deja la config de Nginx en sites-available (SIN habilitarla todavía: falta el
# certificado TLS, que se emite después).
#
# Uso (desde una copia del repo o del directorio deploy/ subido por scp):
#   sudo bash deploy/ec2-setup.sh [dominio-de-origen]
# Ej.:
#   sudo bash deploy/ec2-setup.sh origin.azfa.org
#
# Idempotente: se puede volver a ejecutar sin romper nada.
# =============================================================================
set -euo pipefail

APP_DIR=/var/www/azfa-web
DEPLOY_USER="${SUDO_USER:-ubuntu}"          # usuario que hará el deploy por SSH
ORIGIN_DOMAIN="${1:-}"                       # opcional, solo para el recordatorio
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

if [ "$(id -u)" -ne 0 ]; then
  echo "Ejecuta con sudo: sudo bash deploy/ec2-setup.sh" >&2
  exit 1
fi

echo "==> [1/7] Sistema al día"
apt-get update -y
DEBIAN_FRONTEND=noninteractive apt-get upgrade -y

echo "==> [2/7] Node 20 LTS, Nginx, Certbot, git"
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
DEBIAN_FRONTEND=noninteractive apt-get install -y \
  nodejs nginx git certbot python3-certbot-nginx

echo "==> [3/7] PM2 global"
npm install -g pm2

echo "==> [4/7] Estructura en $APP_DIR (owner: $DEPLOY_USER)"
mkdir -p "$APP_DIR/releases" "$APP_DIR/shared"
chown -R "$DEPLOY_USER":"$DEPLOY_USER" "$APP_DIR"

echo "==> [5/7] Swap 2G (colchón; el build NO corre aquí, es solo para picos)"
if ! swapon --show | grep -q '/swapfile'; then
  fallocate -l 2G /swapfile
  chmod 600 /swapfile
  mkswap /swapfile
  swapon /swapfile
  grep -q '/swapfile' /etc/fstab || echo '/swapfile none swap sw 0 0' >> /etc/fstab
fi

echo "==> [6/7] Nginx: copiar config a sites-available (aún NO habilitada)"
cp "$SCRIPT_DIR/nginx/azfa-security-headers.conf" /etc/nginx/snippets/
cp "$SCRIPT_DIR/nginx/azfa-web.conf" /etc/nginx/sites-available/azfa-web
# NO se hace el symlink a sites-enabled todavía: el bloque :443 referencia un
# certificado que aún no existe y `nginx -t` fallaría. Se habilita tras Certbot.

echo "==> [7/7] Plantilla de env de runtime + PM2 startup"
if [ ! -f "$APP_DIR/shared/.env.production" ]; then
  cat > "$APP_DIR/shared/.env.production" <<'EOF'
# Variables de SERVIDOR en runtime (NO públicas, NO viven en GitHub).
# Rellena con los valores reales antes del primer deploy.
RECAPTCHA_SECRET_KEY=
REVALIDATION_SECRET=
STRAPI_WEBHOOK_SECRET=
EOF
  chown "$DEPLOY_USER":"$DEPLOY_USER" "$APP_DIR/shared/.env.production"
  chmod 600 "$APP_DIR/shared/.env.production"
fi
# Registrar PM2 para que reviva tras reinicio (como el usuario de deploy).
env PATH="$PATH:/usr/bin" pm2 startup systemd -u "$DEPLOY_USER" --hp "/home/$DEPLOY_USER" >/dev/null || true

cat <<EOF

=============================================================================
Aprovisionamiento base COMPLETADO. Pasos manuales que faltan (en orden):

1) DNS: crear registro A  ${ORIGIN_DOMAIN:-<origin-domain>}  ->  Elastic IP
   (debe resolver ANTES de Certbot; el reto HTTP-01 usa el puerto 80.)

2) Editar los secretos de servidor:
     sudo nano $APP_DIR/shared/.env.production

3) Ajustar el dominio en la config si no es origin.azfa.org:
     sudo nano /etc/nginx/sites-available/azfa-web   (server_name + rutas cert)

4) Emitir el certificado TLS de origen:
     sudo certbot certonly --nginx -d ${ORIGIN_DOMAIN:-<origin-domain>}

5) Habilitar el sitio y recargar Nginx:
     sudo ln -sfn /etc/nginx/sites-available/azfa-web /etc/nginx/sites-enabled/azfa-web
     sudo rm -f /etc/nginx/sites-enabled/default
     sudo nginx -t && sudo systemctl reload nginx
   (Dará 502 hasta el primer deploy: aún no hay app en :3000.)

6) En GitHub -> Settings -> Secrets and variables -> Actions:
     Secrets:   EC2_HOST=<Elastic IP>  EC2_USER=$DEPLOY_USER  EC2_SSH_KEY=<clave privada>
     Variables: DEPLOY_ENABLED=true
   Luego re-lanza el workflow (Run workflow) -> el job deploy publicará la app.
=============================================================================
EOF
