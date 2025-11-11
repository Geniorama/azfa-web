# AZFA Web

Portal público y portal de afiliados para la Asociación de Zonas Francas de Iberoamérica.  
Integra contenido gestionado desde Strapi, tableros de Power BI embebidos y autenticación de usuarios afiliados.

---

## 🧱 Stack Tecnológico

- **Framework:** Next.js 15 (App Router) con React 19 y TypeScript.
- **Estilos:** Tailwind CSS v4 (`@tailwindcss/postcss`).
- **Headless CMS:** Strapi (REST API).
- **Infraestructura:** Netlify (SSR/ISR) + Strapi auto‑hosteado.
- **Integraciones destacadas:** Power BI (iframes), Google Maps JS API, Google reCAPTCHA.

---

## 📁 Estructura de Proyecto

```
src/
 ├─ app/                 # Rutas App Router (páginas públicas y privadas)
 │   ├─ api/             # API routes (auth, webhooks, helpers)
 │   ├─ portal-afiliados/
 │   └─ ...
 ├─ components/          # Componentes UI reutilizables
 ├─ views/               # Vistas de alto nivel por sección
 ├─ context/             # Contextos globales (AuthContext)
 ├─ hooks/               # Hooks personalizados
 ├─ utils/               # Utilidades compartidas
 └─ types/               # Tipados de contenido Strapi
docs/
 └─ env.example          # Ejemplo de variables de entorno
```

---

## 🚀 Puesta en Marcha

1. Clonar repositorio y entrar en el directorio.
2. Instalar dependencias: `npm install`
3. Copiar `docs/env.example` a `.env.local` y completar valores.
4. Levantar entorno local: `npm run dev`
5. Abrir `http://localhost:3000`

> **Requisito:** tener una instancia de Strapi accesible desde el entorno local.

---

## 🔑 Variables de Entorno

Archivo de referencia: `docs/env.example`

| Variable | Descripción |
|----------|-------------|
| `STRAPI_URL` | URL base del backend Strapi (sin `/api` ni slash final) |
| `NEXT_PUBLIC_STRAPI_URL` | Mismo valor para llamadas client-side |
| `STRAPI_WEBHOOK_SECRET` | Token usado por Strapi para webhooks |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | Clave pública restringida por dominio/API |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` / `RECAPTCHA_SECRET` | reCAPTCHA (si se usa) |

Configura las mismas variables en Netlify (Site settings → Environment variables).

---

## 📜 Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Dev server (http://localhost:3000) |
| `npm run dev:prod` | Dev con `.env.prod` usando `dotenv-cli` |
| `npm run build` | Compilación de producción |
| `npm run start` | Ejecutar build generado |
| `npm run lint` | Ejecutar ESLint |

---

## 🔐 Autenticación y Portal Afiliados

- `AuthContext` administra sesión y tokens JWT desde Strapi.
- `POST /api/auth/login` autentica contra Strapi (`/api/auth/local`).
- Tokens y datos de usuario se guardan en `localStorage`.
- Webhook `/api/auth/webhook-user-blocked` invalida sesiones de usuarios bloqueados.
- Verificación periódica (cada 30 s) cierra sesión si el usuario fue bloqueado en Strapi.

---

## 🌐 Secciones Principales

- **`src/app/page.tsx`** — Home: héroe, servicios, eventos, testimonios.
- **`src/app/invierta-en-zonas-francas/*`** — Landing comercial + estadísticas públicas.
- **`src/app/portal-afiliados/*`** — Estadísticas privadas, gestión y estudios.
- **`src/app/sala-de-prensa/*`** — Sala de prensa (noticias, blog, podcast, newsletter).
- **`src/views/InvestmentStatisticsView.tsx`** — Render de tableros Power BI públicos.
- **`src/views/AffiliateStatisticsView.tsx`** — Tableros privados con control de acceso.

---

## 🚀 Deploy en Netlify

1. Configurar variables de entorno (`STRAPI_URL`, `NEXT_PUBLIC_STRAPI_URL`, etc.).
2. Build command: `npm run build`
3. Publish directory: `.next`
4. Si Netlify alerta sobre “likely secret” con la key de Maps, asegúrate de tener la API key restringida por dominio. Opcionalmente define `NETLIFY_SKIP_SECRET_SCANNING=true`.

> Recuerda limpiar cache (`Clear cache and deploy site`) después de cambiar variables.

---

## 🛠 Troubleshooting

| Problema | Posible causa | Solución |
|----------|---------------|----------|
| `pageContent: null` en estadísticas | `STRAPI_URL` no configurada o respuesta 4xx/5xx | Revisar logs de build, verificar endpoint y credenciales |
| Usuarios bloqueados siguen loggeados | Webhook no configurado | Configurar webhook `User Blocked Notification` en Strapi con `STRAPI_WEBHOOK_SECRET` |
| Netlify detecta “likely secret” | Google Maps key pública | Restringir la key en Google Cloud (dominios/APIs permitidos) |
| Warnings por `<img>` | Uso de `img` nativo | Migrar a `next/image` cuando sea viable |

---

## 📚 Documentación Relacionada

- `docs/env.example` — Variables de entorno.
- Código comentado en `src/context/AuthContext.tsx`, `src/app/api/auth/*`.
- Archivos `README`/`CONFIG` adicionales en Strapi (fuera de este repo).

---

## 🤝 Contribuciones

1. Crea una rama con nombre descriptivo.
2. Realiza tus cambios y ejecuta `npm run lint`.
3. Envía Pull Request describiendo el impacto.

---

## 📬 Contacto

- **Contacto institucional:** equipocreativo@ekon7.com  
- **Equipo técnico:** Equipo Web AZFA / Strapi CMS  
- **Soporte producción:** revisar panel de Netlify y logs de Strapi
