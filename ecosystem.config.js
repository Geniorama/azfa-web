// Configuración de PM2 para el bundle standalone de Next.js en la EC2.
//
// Este archivo viaja dentro del bundle (se copia a cada release) y PM2 lo
// ejecuta desde `/var/www/azfa-web/current`. El runtime real es el
// `server.js` que genera `output: "standalone"` en next.config.ts.
//
// Las variables NEXT_PUBLIC_* ya quedan "horneadas" en el build (GitHub
// Actions), por lo que aquí solo hacen falta las de servidor en tiempo de
// ejecución (STRAPI_URL, RECAPTCHA_SECRET_KEY, REVALIDATION_SECRET,
// STRAPI_WEBHOOK_SECRET). Estas se inyectan al hacer `pm2 ... --update-env`
// tras cargar `/var/www/azfa-web/shared/.env.production` en el shell del
// deploy (ver el workflow de Actions).
const path = require("path");

module.exports = {
  apps: [
    {
      name: "azfa-web",
      script: "server.js",
      cwd: path.resolve(__dirname),
      instances: 1,
      exec_mode: "fork",
      max_memory_restart: "512M",
      env: {
        NODE_ENV: "production",
        // El server standalone escucha en estos valores; Nginx hace proxy aquí.
        PORT: "3000",
        HOSTNAME: "127.0.0.1",
      },
    },
  ],
};
