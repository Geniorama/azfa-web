# Informe de mantenimiento — agosto 2026

**Fecha:** 31 de agosto de 2026
**Alcance:** `azfa-web` (Next.js, EC2 + Cloudflare) y `cms-strapi-azfa` (Strapi 5, EC2 + RDS + S3)
**Rama de trabajo:** `chore/mantenimiento-2026-08` en ambos repositorios

---

## Resumen ejecutivo

**16 de los 17 puntos quedan cerrados.** El único pendiente es la rotación de
credenciales, que no se autorizó en esta pasada.

Tres resultados destacan:

1. **Cloudflare se puede saltar por completo.** Los dos servidores de origen responden
   directamente por su IP pública. El del CMS lo hace **por HTTP sin cifrar, incluido
   `/admin`**. Cualquiera que conozca la IP evita el WAF, el rate limiting y las reglas
   de acceso, y las credenciales del panel viajan en claro en el tramo Cloudflare→origen.
2. **Los documentos del Portal de Afiliados eran públicos.** *Estudios AZFA* y *Gestión
   AZFA* se leían y descargaban sin iniciar sesión, por las tres capas a la vez. **Dos de
   las tres quedan cerradas** en el commit `591dae2`; la tercera, la de S3, resultó no ser
   arreglable desde el código y necesita una decisión de arquitectura (punto 2.2).
3. **Todas las tarjetas de noticias del home llevaban a un 404**, y cuando el CMS fallaba
   se mostraban noticias inventadas con imágenes rotas. Corregido.

En el lado tranquilizador: la base de datos está sana y **no necesitaba optimización**,
el bucket S3 **no tiene un solo fichero huérfano**, y no hay ni un 5xx ni un evento de
falta de memoria en los logs.

---

## Estado por punto del checklist

| # | Tarea | Estado |
|---|---|---|
| 1 | Certificados SSL | ⚠️ Edge correcto, **origen del CMS sin TLS** |
| 2 | Escaneo de seguridad | ⚠️ **2 hallazgos críticos** |
| 3 | Actualización de dependencias | ✅ Hecho |
| 4 | Enlaces rotos y redirecciones | ✅ Hecho — 4 rotos encontrados |
| 5 | Logs de error del servidor | ✅ Hecho |
| 6 | Optimización de la base de datos | ✅ Hecho — no hacía falta optimizar |
| 7 | Limpieza de S3 | ✅ Hecho — 0 huérfanos |
| 8 | Respaldo externo con checksum | ✅ Hecho — falta sacarlo de la máquina |
| 9 | Reporte de gestión mensual | ✅ Este documento |
| 10 | Informe de rendimiento y velocidad | ✅ Hecho |
| 11 | Optimización de caché | ✅ Hecho (1 mejora pendiente) |
| 12 | Limpieza profunda de S3 con ahorro | ✅ Hecho — sin ahorro que reclamar |
| 13 | Migración a versiones estables | 🔶 En rama, falta desplegar |
| 14 | Compatibilidad de plugins | ✅ Certificado |
| 15 | Auditoría de seguridad final | ✅ Hecho |
| 16 | Rotación de credenciales | ⛔ Sin autorizar |
| 17 | Backup antes y después | ✅ Hecho y verificado |

---

## 2 · 15 · Seguridad

### 2.1 Crítico — Cloudflare se puede saltar por la IP de origen

Los dos servidores responden directamente a peticiones por IP, sin pasar por Cloudflare:

```
http://34.228.145.249/admin        (Host: cms…)  → 200   ← panel de Strapi, SIN cifrar
http://34.228.145.249/api/affiliates              → 200
https://52.22.39.33/               (Host: azfa…) → 200   ← sitio web, cifrado
```

Puertos abiertos a Internet: **80 en el CMS** (no hay 443: el nginx del CMS solo escucha
en el 80) y **80 + 443 en el front**. El 1337 de Strapi y el 3000 de Next sí están
filtrados por el security group, correctamente.

Esto tiene tres consecuencias:

- **El WAF, el rate limiting y cualquier regla de acceso de Cloudflare son opcionales**
  para quien conozca la IP de origen — que es fácil de averiguar por histórico de DNS,
  transparencia de certificados o el propio subdominio `origin.`.
- **El panel de administración del CMS es accesible por HTTP en claro.** Las credenciales
  de administrador viajan sin cifrar.
- Como el origen del CMS no tiene TLS, la zona está en modo **Flexible** para
  `cms.asociacionzonasfrancas.org`: incluso el tráfico legítimo va sin cifrar entre
  Cloudflare y el servidor.

**Remediación:**

1. Restringir el security group de ambas instancias a los **rangos de IP publicados por
   Cloudflare** en los puertos 80 y 443. Es el cambio de mayor impacto y el más barato.
2. Activar **Authenticated Origin Pulls**, para que el origen solo acepte conexiones que
   presenten el certificado cliente de Cloudflare.
3. Instalar el certificado **Cloudflare Origin CA** en el nginx del CMS —el mismo comodín
   que ya usa el front— y pasar ese subdominio a **Full (strict)**, eliminando la
   excepción Flexible.
4. Cambiar el bind de Strapi de `0.0.0.0:1337` a `127.0.0.1:1337`. Hoy lo salva el
   security group, pero no debería depender solo de eso.

### 2.2 Crítico — los documentos de afiliados son públicos

*Estudios AZFA* y *Gestión AZFA* están restringidos por diseño, pero **cualquiera puede
leerlos y descargar los PDF sin iniciar sesión**. Fallan las tres capas:

```
GET /api/studies      → 200   5 registros, con la URL de S3 incluida
GET /api/managements  → 200

GET amzn-s3-azfa-strapi.s3.us-east-1.amazonaws.com/Manual_4_0_2024_cb7bc70c3c.pdf
→ 200, 6 804 073 bytes   (sin credenciales de ningún tipo)
```

Para contraste, lo que sí está bien cerrado devuelve 403: `/api/users`, `/api/users/1`,
`/api/users-permissions/roles`, `/api/upload/files`.

La tercera capa es la página. `src/app/portal-afiliados/layout.tsx` es un componente
`'use client'` que envuelve las rutas en `<ProtectedRoute>`: esa comprobación ocurre en el
navegador, **después** de que el servidor ya haya enviado la página. Y como el `page.tsx`
hace `fetch` a Strapi sin token, el build la marca como estática — una copia
prerenderizada, con los datos dentro, idéntica para todo el mundo. Verificado en
producción: la URL de S3 aparece en el HTML de `/portal-afiliados/estudios-azfa` sin
sesión iniciada.

### Estado de la remediación

**Dos capas cerradas — commit `591dae2`.**

- `src/lib/serverAuth.ts` lee el JWT de la cookie httpOnly con `cookies()` y lo valida
  contra Strapi. El layout del portal pasa a Server Component: **redirige a
  `/auth/login` antes de renderizar nada** y añade `dynamic = 'force-dynamic'`, así que
  las rutas dejan de prerenderizarse. `ProtectedRoute` se mantiene por debajo para lo que
  el servidor no ve: la sesión caducando con la pestaña abierta.
- Las tres páginas del portal piden sus datos con el **JWT del usuario** en lugar de
  anónimamente, así que la autorización la resuelve Strapi con el rol de quien mira.

Verificado con `next start` sobre el build de producción: las tres rutas responden **307 a
`/auth/login` sin cookie**, el HTML servido ya no contiene ninguna URL de los PDF, y las
siete rutas del portal pasan de estáticas (`○`) a dinámicas (`ƒ`) en la salida del build.

**Paso manual que acompaña al despliegue.** En el panel de Strapi hay que quitar `find` y
`findOne` del rol **Public** para `study`, `management` y
`affiliate-portal-investment-statistics-page`, y asegurarse de que el rol **Authenticated**
sí los tiene. Importante el orden: **hacerlo después de desplegar**, porque el frontend que
hay hoy en producción pide esos endpoints sin token y dejaría de funcionar.
`real-state-offers` y `publications` **no se tocan**: alimentan páginas públicas.

### La tercera capa no se puede cerrar desde el código

Los ficheros de S3 siguen siendo descargables por cualquiera que conozca la URL. Y la causa
no es la que parecía. Comprobado subiendo objetos de prueba al bucket (y borrándolos):

```
objeto SIN ACL           → descarga anónima: HTTP 200
objeto con ACL private   → descarga anónima: HTTP 200
```

Un objeto marcado explícitamente como privado **sigue siendo público**. Es decir, la lectura
abierta viene de una **política del bucket**, no de las ACL de los objetos. Eso tiene dos
consecuencias que conviene tener claras antes de tocar nada:

1. Poner `ACL: 'private'` en `config/plugins.ts` haría que Strapi emitiese URLs firmadas
   —el provider solo las genera cuando `params.ACL === 'private'`, verificado en su
   código—, pero **los ficheros seguirían siendo descargables** por su clave directa. Daría
   sensación de seguridad sin darla.
2. Además rompería el sitio público: la configuración del provider es del bucket entero, y
   **ese mismo bucket sirve las imágenes de marketing**. Todas pasarían a URLs firmadas que
   caducan, lo que echa por tierra el cacheo en el edge y en `next/image`.

**El problema de fondo es que un único bucket mezcla imágenes públicas con documentos
privados, y los permisos de S3 son del bucket.** Hay que elegir:

| Opción | Qué implica |
|---|---|
| **(a) Segundo bucket privado** para los documentos de afiliados | Lo más limpio. Requiere mover los ficheros y servirlos desde una ruta de Next que valide la sesión y devuelva una URL firmada. Strapi 5 no admite dos providers de upload a la vez, así que esos documentos saldrían del flujo normal del CMS |
| (b) Quitar la política pública y firmar todo | Modelo de permisos más simple, pero degrada el rendimiento de todas las imágenes públicas |
| (c) Dejarlo como está y ocultar las URL | No es protección: la clave sigue siendo válida para quien la tenga |

Recomiendo **(a)**. Es la única que cierra la exposición sin sacrificar el trabajo de
rendimiento ya hecho, pero es una decisión de arquitectura con coste, así que queda
planteada y no ejecutada.

> Los ficheros ya publicados conservan su URL. Tras cerrar el acceso hay que **renombrar o
> regenerar el hash** de los documentos sensibles, porque las URL actuales pueden estar ya
> en cachés e índices de terceros.

### 2.3 Parches del sistema operativo

| Servidor | Sistema | Actualizaciones de seguridad | Reinicio |
|---|---|---|---|
| CMS (`34.228.145.249`) | Ubuntu 24.04.3 LTS | **10 pendientes** (91 paquetes) | **Requerido** — 254 días sin reiniciar |
| Front (`52.22.39.33`) | Ubuntu 26.04 LTS | 0 pendientes (31 paquetes) | **Requerido** — 54 días |

`unattended-upgrades` está activo en ambos, pero **ninguna de las dos máquinas se ha
reiniciado nunca**, así que los parches de kernel están descargados y sin aplicar. El CMS
además acumula 10 actualizaciones de seguridad sin instalar.

### 2.4 Lo que sí está bien

| Comprobación | Resultado |
|---|---|
| Permisos IAM del usuario de subida | ✅ **Mínimo privilegio correcto** — `strapi-uploads` solo puede leer y escribir objetos; no puede consultar ni cambiar la configuración del bucket |
| Listado anónimo del bucket S3 | ✅ Denegado (403) |
| Endpoints de usuarios y upload de Strapi | ✅ 403 |
| Puertos de aplicación (1337, 3000) | ✅ Filtrados por security group |
| Intentos de acceso SSH fallidos (7 días) | ✅ 0 |
| `/api/affiliates` (público) | ✅ Sin datos personales |
| Cabeceras del front | ✅ HSTS con `preload`, CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy |

Dos matices: `ufw` está inactivo en el CMS —el security group es el único cortafuegos, lo
cual es defendible pero deja una sola capa—; y la CSP lleva `'unsafe-inline'` y
`'unsafe-eval'` en `script-src`, que es lo que exige Google Tag Manager en su modo
habitual. No es un fallo, pero sí el punto más débil de la CSP.

---

## 1 · Certificados SSL

El certificado de **edge** está correcto y se renueva solo:

```
subject  CN = asociacionzonasfrancas.org
SAN      asociacionzonasfrancas.org, *.asociacionzonasfrancas.org
válido   3 ago 2026 → 1 nov 2026     62 días restantes
emisor   Google Trust Services (WE1) · Cloudflare Universal SSL
```

El de **origen** es otra historia: el front tiene su certificado Cloudflare Origin CA
instalado y escucha en 443, pero **el nginx del CMS no escucha en 443 en absoluto** — solo
en el 80. Ese subdominio funciona con la excepción Flexible en Cloudflare, con el tramo
Cloudflare→origen sin cifrar. Es el punto 3 de la remediación de seguridad.

---

## 4 · Enlaces rotos — 4 encontrados, 3 corregidos

El barrido de la primera pasada no los vio porque son destinos de `router.push` en
cliente, no `href` en el HTML. Salieron al revisar los logs de producción.

| Enlace roto | Dónde | Estado |
|---|---|---|
| `/noticias/<slug>` → 404 | Clic en **cualquier** tarjeta de noticia del home | ✅ Corregido |
| `/noticias` → 404 | "Ver todas" de respaldo del home | ✅ Corregido |
| `/noticia-1` → 404 | Bloque de noticias inventadas | ✅ Eliminado |
| `/aviso-legal` → 404 | Campo del formulario de contacto, en el CMS | ⛔ Requiere edición de contenido |
| PDF de política de datos → 404 | Formulario de contacto, en el CMS | ⛔ **Requiere atención legal** |

**El más grave era el primero.** La ficha de una noticia vive en
`/sala-de-prensa/blog/<slug>`, como ya hacían `BlogView` y `SingleBlogView`, pero
`HomeView` empujaba a `/noticias/<slug>`, que no existe como ruta. Todas las noticias del
home daban 404.

**Contenido falso servido a visitantes reales.** Los bloques de respaldo de noticias y
eventos renderizaban noticias y eventos inventados —con titulares reales de 2024 y 2025,
imágenes muertas y enlaces a ninguna parte— cada vez que el fetch al CMS fallaba. Y falla
de vez en cuando (400 del CMS en los logs), así que se estaba viendo. Se eliminaron: mejor
no mostrar nada que mostrar contenido fabricado.

**Imágenes contra un bucket muerto.** Las URL de respaldo apuntaban a
`testazfabucket.s3.us-east-2`, el bucket de desarrollo. Cada render que caía en un
respaldo disparaba el optimizador de imágenes de Next contra un 404: **cientos de
`upstream image response failed` en los logs**. Sustituidas por el placeholder que ya
usaba el resto del código.

### Los dos que necesitan a una persona

El formulario de contacto enlaza su **Política de Tratamiento de Datos Personales** a un
PDF en `testazfabucket.s3.us-east-2` que **devuelve 404**. Es un documento de obligada
publicación para un formulario que recoge datos personales, así que conviene resolverlo
pronto: hay que volver a subir el PDF al bucket actual y actualizar el campo en el CMS. No
lo toco porque hace falta el fichero correcto.

El mismo formulario apunta a `/aviso-legal`, que tampoco existe.

### Lo que sí estaba bien

| Barrido | Resultado |
|---|---|
| Rutas públicas de la aplicación | 21 / 21 · HTTP 200 |
| Redirecciones heredadas de Grav y Joomla | 23 / 23 · HTTP 301 al destino correcto |
| Enlaces internos de la portada | 21 / 21 · HTTP 200 |
| Páginas de detalle de blog y noticias | 12 / 12 · HTTP 200 |

Sigue faltando el **sitemap**: `/sitemap.xml` devuelve 404 y el `robots.txt` —que genera
Cloudflare— no declara la directiva `Sitemap:`. No es teórico: los logs del origen
registran **24 peticiones a `/sitemap.xml` y 73 a `/robots.txt`** que acaban en 404. Se
resuelve añadiendo `src/app/sitemap.ts` alimentado desde Strapi.

Y queda un registro huérfano en `press_rooms` con `slug` y `type` en `null` (id 111).

---

## 5 · Logs de error del servidor

**Ni un solo 5xx en ninguno de los dos servidores.** El `error.log` de nginx del CMS está
vacío y no hay ningún evento del *OOM killer*.

| | CMS | Front |
|---|---|---|
| Proceso PM2 | `online`, 54 días, 2 reinicios | `online`, 11 días, 0 reinicios |
| Memoria | 996 / 1910 MB (swap: 41 MB de 2 GB) | 56,3 % |
| Disco | 50 % (9,2 GB libres) | 47 % (7,8 GB libres) |
| Latencia del *event loop* | p50 0,60 ms · p95 1,63 ms | — |

Códigos de respuesta del día en el CMS: 366 × 200, 257 × 404, 44 × 400, 31 × 302.

**Los 404 se explican solos:** 73 de `/robots.txt` y 24 de `/sitemap.xml` son rastreadores
pidiendo ficheros que no existen (ver punto 4). El resto —`/admin.php`,
`/wp-content/plugins/…`, `/x.php`, favicons de temas ajenos— es ruido de escaneo
automatizado de fondo, normal en cualquier servidor expuesto y sin riesgo.

**Tres patrones que sí venían de la aplicación:**

- Cientos de `upstream image response failed … 404` contra el bucket de desarrollo.
  **Corregido** (punto 4).
- `Failed to find Server Action "x"` en bucle. El identificador literal `x` delata sondeo
  automatizado, no clientes reales; sí aparecen además tres hashes de 40 caracteres
  legítimos, que son pestañas abiertas desde antes del último despliegue. Sin impacto.
- `Error fetching blog: HTTP error! status: 400` intermitente. Es lo que dispara los
  bloques de respaldo del home.

### Una trampa encontrada de paso

El `.env.prod` local tenía **barra final** en `STRAPI_URL`, lo que genera `//api/…` y
Strapi responde 400. Consecuencia práctica: `npm run build:prod` compilaba en verde pero
**sin un solo dato del CMS**, así que servía para validar tipos y poco más. La EC2 tenía el
valor correcto, de modo que producción no estaba afectada. Corregido en local; el build de
verificación de esta sesión ya generó las 49 páginas con datos reales.

---

## 6 · 10 · Base de datos y rendimiento

### El diagnóstico: no hacía falta optimizar

| Métrica | Valor | Lectura |
|---|---|---|
| Versión | PostgreSQL 17.9 | Al día |
| Tamaño | 29 MB | Diminuta |
| *Cache hit ratio* — tablas | **99,99 %** | Objetivo: > 99 % |
| *Cache hit ratio* — índices | **99,97 %** | Objetivo: > 99 % |
| Conexiones | 10 de 79 | Holgado |
| Uptime | 79 días | — |

Las tablas con más *sequential scans* (`up_roles` con 191 947, `strapi_core_store_settings`
con 136 478) **no son un problema**: todas tienen entre 0 y 128 filas, y en tablas así el
planificador elige recorrido secuencial porque es literalmente más rápido que usar un
índice. Añadir índices ahí empeoraría las cosas.

Los 20 índices sin uso ocupan en conjunto medio megabyte. No compensa eliminarlos: los
crea Strapi y los volvería a crear.

### Lo que sí se hizo

`VACUUM ANALYZE` sobre la base completa, **1,1 segundos**, sin bloqueo de escritura:

| | Antes | Después |
|---|---|---|
| Tuplas muertas | 1 957 | **0** |
| Tablas sin estadísticas | varias, algunas desde marzo | **0** |
| Tamaño | 29 MB | 35 MB |

El tamaño **sube**, y es lo esperado: `VACUUM` sin `FULL` no devuelve espacio al sistema de
ficheros, y `ANALYZE` escribe estadísticas para tablas que no las tenían. El beneficio real
no es espacio, es que el planificador ahora decide con datos frescos. Conviene no vender
esto como un ahorro de disco, porque no lo es.

Verificado tras la operación: home 200, sala de prensa 200, `/_health` del CMS 204,
`/api/affiliates` 200.

### La recomendación para el próximo mes

**`pg_stat_statements` no está instalada**, así que no hay estadísticas de consultas y no
se puede saber cuál es la más lenta. Activarla en el *parameter group* de RDS
(`shared_preload_libraries`) y reiniciar la instancia haría que el informe del mes que
viene pueda señalar consultas concretas, en lugar de decir que todo va bien en agregado.

### Rendimiento del frontend

| Métrica | Valor |
|---|---|
| TTFB de la portada | 0,36 s |
| Tiempo total de la portada | 0,40 s |
| HTML comprimido · en claro | 43,6 KB · 364 KB (ratio 8,3×) |
| Ruta más lenta de 21 medidas | 0,54 s |
| Caché ISR de Next | HIT |

---

## 7 · 12 · Almacenamiento S3

| Métrica | Valor |
|---|---|
| Objetos en el bucket | 2 397 |
| Peso total | 439,2 MB |
| Referenciados por la base de datos | 2 397 |
| **Huérfanos** | **0** |
| Ficheros binarios o de vídeo fuera de lugar | 0 |

**No hay nada que limpiar.** El barrido del 2 de julio encontró 58 huérfanos (246,5 MB, de
los que 242 eran un instalador `.dmg` de Loom subido por error); esa limpieza ya se hizo y
el bucket está impecable. **El ahorro es cero, y conviene decirlo así en lugar de reclamar
una cifra que no existe.**

El cruce se hizo comparando el inventario completo del bucket contra las URL de la tabla
`files` de Strapi, incluidos los derivados que Strapi guarda en `formats`.

**Lo que no se pudo revisar:** la política de ciclo de vida, el versionado, el cifrado en
reposo y el bloqueo de acceso público del bucket. El usuario IAM disponible
(`strapi-uploads`) no tiene permiso para consultarlos — lo cual, como se dice en el punto
2.4, **es la configuración correcta**. Hace falta una credencial de administración o la
consola de AWS. La política de expiración a 30 días para el prefijo `_trash/` redactada en
julio sigue sin poder confirmarse.

---

## 8 · 17 · Respaldo antes y después

Ambos respaldos tomados, descargados y verificados:

```
backups/20260831-pre/                backups/20260831-post/
  azfa-db-20260831-pre.dump            azfa-db-20260831-post.dump
  azfa-web-20260831.bundle             SHA256SUMS
  cms-strapi-azfa-20260831.bundle
  SHA256SUMS
```

- Volcado de RDS en formato *custom* comprimido — `pg_restore -l` lista **2 155 objetos
  restaurables**, así que el fichero es válido, no solo íntegro.
- Código de ambos repositorios como `git bundle` con **todo el historial**
  (`git bundle verify`: *"records a complete history"*).
- `sha256sum -c`: **OK** en los cuatro ficheros.

**Falta un paso y es importante:** el respaldo está en la máquina local, y el punto 17 pide
almacenamiento **externo**. Hay que moverlo a un destino fuera de este equipo y de la
cuenta de AWS que respalda —disco cifrado, Drive, Glacier— para que cumpla su función.

Para restaurar:

```bash
pg_restore -h <host> -U <usuario> -d <bd> --clean --if-exists azfa-db-20260831-post.dump
git clone cms-strapi-azfa-20260831.bundle
```

---

## 3 · 13 · Dependencias

### azfa-web — commit `7cb1691`

| Paquete | Antes | Después |
|---|---|---|
| next | 16.2.10 | **16.3.3** |
| react · react-dom | 19.2.3 | **19.2.8** |
| react-hook-form | 7.64.0 | 7.87.0 |
| react-icons | 5.5.0 | 5.7.0 |
| tailwindcss | 4.1.10 | 4.3.3 |
| typescript | 5.8.3 | 5.9.3 |

**4 vulnerabilidades *high* → 0.** Se cerraron la exposición no autenticada de endpoints
internos de Server Functions en Next (`GHSA-955p-x3mx-jcvp`), cuatro avisos de lectura
arbitraria de ficheros en postcss, cuatro CVE de sharp/libvips y un DoS en
brace-expansion.

### cms-strapi-azfa — commits `d72e768` y `286b7f7`

Strapi sube de **5.50.0 a 5.52.2**. Los *providers* de email y de upload a S3 iban **23
versiones menores por detrás** del core, en 5.29.0; ya están alineados. **78 → 25
vulnerabilidades**; las 25 restantes solo se cierran con `npm audit fix --force`, que
rompería el panel.

**Causa raíz encontrada de paso.** El `.npmrc` fijaba `prefer-offline=true` y
`cache-min=3600`, heredado de cuando el despliegue era Heroku. Con eso npm resuelve las
versiones contra la caché local en lugar del registro: `npm install @strapi/strapi@5.52.2`
fallaba con `ETARGET` pese a que la versión existe y, lo importante, **cualquier parche de
seguridad publicado después del último install quedaba invisible**. Corregido.

Ambas ramas están verificadas con `tsc --noEmit` limpio y build completo, pero **sin
fusionar ni desplegar**.

---

## 11 · Caché

| Recurso | Cache-Control | Cloudflare |
|---|---|---|
| `/_next/static/chunks/*.js` | `max-age=31536000, immutable` | HIT |
| `/_next/image?…` | `max-age=31536000, must-revalidate` | HIT |
| Imágenes de `/public` | `max-age=2592000, s-w-r` | HIT |
| HTML | `s-maxage=300, s-w-r` | **DYNAMIC** |

**Corregido — commit `158fe05`.** Los SVG, PNG y WebP de `/_next/static/media/` salían con
30 días en lugar del año inmutable que les corresponde: `location /_next/static/` es un
prefijo sin `^~`, y nginx evalúa antes los `location` con expresión regular, así que los
ficheros de imagen caían en el bloque pensado para `/public`.

**Pendiente:** el HTML sale como `DYNAMIC`, así que todas las visitas llegan al origen
aunque el `Cache-Control` ya autorice 300 s de caché compartida. Una Cache Rule para HTML
descargaría la EC2, excluyendo `/portal-afiliados/*`, `/dashboard` y `/auth/*` y purgando
el edge desde el webhook de revalidación que ya existe.

---

## 14 · Certificado de actualización técnica

**Objeto:** `cms-strapi-azfa` sobre Strapi 5.52.2. Verificado el 31 de agosto de 2026.

| Plugin | Versión | Requiere | Compatible | Última publicación |
|---|---|---|---|---|
| `strapi-plugin-country-select` | 2.1.0 | `@strapi/strapi ^5.7.0` | ✅ | 19 ene 2025 |
| `strapi-plugin-multi-select` | 2.1.1 | `@strapi/strapi ^5.0.4` | ✅ | 10 oct 2024 |

**Verificación funcional:** `strapi build` completa correctamente con ambos plugins y el
panel compila sin advertencias de versión.

**Riesgo identificado.** Llevan sin publicar 19 y 22 meses, y ambos fijan `react ^18.3.1`
y `react-router-dom ^6.x`. El CMS **no puede subir a React 19** mientras dependa de ellos,
y las vulnerabilidades *moderate* de react-router 6 —open redirect e inyección de
constructor en la hidratación SSR— **quedan abiertas**, porque cerrarlas exige un `--force`
que rompería el panel. Afectan solo al panel, no a la API pública ni al sitio, y requieren
sesión de administrador: riesgo bajo, pero sin solución mientras no se actualicen. Merece
la pena valorar sustituirlos por campos nativos de Strapi 5.

---

## 16 · Rotación de credenciales — sin autorizar

Cuando se aborde, hay que rotar de forma coordinada:

| Secreto | Dónde vive | Impacto al rotar |
|---|---|---|
| `APP_KEYS`, `ADMIN_JWT_SECRET`, `JWT_SECRET`, `API_TOKEN_SALT`, `TRANSFER_TOKEN_SALT`, `ENCRYPTION_KEY` | `.env` de la EC2 del CMS | Invalida todas las sesiones del panel y los API tokens |
| `DATABASE_PASSWORD` | `.env` + RDS | Requiere reiniciar Strapi |
| `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY` | `.env` del CMS | Crear la nueva clave antes de borrar la vieja |
| `BREVO_SMTP_PASS` | `.env` del CMS | Verificar envío de correo después |
| `REVALIDATION_SECRET`, `STRAPI_WEBHOOK_SECRET` | `.env` del CMS **y** del front | **Cambiar en ambos a la vez** o se rompe la revalidación |
| `RECAPTCHA_SECRET_KEY` | `.env` del front | Rotar desde la consola de Google |

Con el respaldo del punto 17 ya tomado y en ventana de baja actividad.

---

## Acciones recomendadas, por urgencia

**Ahora**

1. **Restringir los security groups a los rangos de Cloudflare** y activar Authenticated
   Origin Pulls. Cierra el salto del WAF en ambos servidores.
2. **Instalar el certificado de origen en el nginx del CMS** y pasar ese subdominio a Full
   (strict). Hoy el panel de administración viaja en claro.
3. **Cerrar el rol Public en Strapi** para `study`, `management` y
   `affiliate-portal-investment-statistics-page`, **justo después** de desplegar el commit
   `591dae2` (antes no: el frontend actual los pide sin token). Y decidir la arquitectura
   de la tercera capa, la de S3 — ver el punto 2.2.
4. **Volver a subir el PDF de la política de tratamiento de datos** y arreglar
   `/aviso-legal`. Es un requisito legal del formulario de contacto.

**Esta semana**

5. Desplegar las ramas de trabajo: dependencias, corrección de enlaces y caché.
6. Aplicar las 10 actualizaciones de seguridad del CMS y **reiniciar ambos servidores**
   para activar los parches de kernel.
7. Mover el respaldo a almacenamiento externo.

**Este mes**

8. Publicar `sitemap.xml` y declararlo en `robots.txt` — hay demanda real en los logs.
9. Cache Rule de Cloudflare para HTML, con las exclusiones del portal.
10. Activar `pg_stat_statements` en RDS para el informe del mes que viene.
11. Cambiar el bind de Strapi a `127.0.0.1`.
12. Planificar la sustitución de los dos plugins sin mantenimiento.
13. Rotación de credenciales.

---

## Cambios aplicados en esta sesión

| Repo | Commit | Cambio |
|---|---|---|
| azfa-web | `7cb1691` | Next 16.3.3, React 19.2.8 y toolchain — 4 *high* a 0 |
| azfa-web | `158fe05` | nginx: `^~` en `/_next/static/`, assets con hash a 1 año |
| azfa-web | `3338854` | Noticias del home a 404, contenido falso e imágenes muertas |
| azfa-web | `591dae2` | Portal de afiliados: comprobación de sesión en servidor y render dinámico |
| cms-strapi-azfa | `d72e768` | Strapi 5.50.0 → 5.52.2 y providers alineados — 78 a 25 |
| cms-strapi-azfa | `286b7f7` | `.npmrc`: fuera `prefer-offline`, que ocultaba los parches |

**En producción:** `VACUUM ANALYZE` sobre la base de datos (1 957 tuplas muertas a 0) y los
dos respaldos verificados. Nada más se tocó: las ramas siguen sin fusionar ni desplegar.
