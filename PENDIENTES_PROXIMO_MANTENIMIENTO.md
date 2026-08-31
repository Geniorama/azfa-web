# Pendientes para el próximo mantenimiento

**Origen:** mantenimiento de julio/agosto 2026. Ver `INFORME_MANTENIMIENTO_2026-08.md`.

---

## 1. Cerrar la tercera capa del Portal de Afiliados (S3)

De las tres capas que dejaban los documentos del portal al descubierto, **dos quedaron
cerradas** en agosto: la página valida la sesión en el servidor y la API rechaza al rol
Public. Falta la tercera.

### Qué pasa

Los PDF del portal siguen siendo **descargables por quien tenga la URL**. Ya no son
descubribles —la API no las entrega y el HTML no las filtra— pero quien las copió antes
las conserva.

### El alcance real, medido

```
34 ficheros · 149 MB · todos .pdf
0 de ellos referenciados por contenido público
```

De los 70 ficheros asociados a *studies* y *managements*, 36 son imágenes de portada de las
tarjetas —no sensibles, pueden quedarse públicas—. Lo privado son 34 PDF, y **ninguno lo
comparte nada público**, así que moverlos no tiene efectos colaterales.

### Por qué no vale el arreglo obvio

Poner `ACL: 'private'` en el provider de Strapi hace dos cosas malas a la vez:

- **No los protege.** Comprobado subiendo objetos de prueba al bucket: un objeto marcado
  privado **sigue descargándose anónimamente**, porque el acceso público viene de una
  **política del bucket**, no de las ACL de los objetos.
- **Rompe el sitio.** La configuración del provider es del bucket entero, y ese bucket
  sirve los 2 363 objetos públicos. Todas las imágenes pasarían a URLs firmadas que
  caducan, la clave de caché cambiaría en cada render y se perdería el trabajo de
  rendimiento de julio.

### El plan

No hace falta un segundo bucket. Este camino **no toca ni un solo objeto público**:

1. **Aislar los 34 PDF bajo un prefijo** en el mismo bucket, p. ej. `privado/`, renombrando
   los ficheros (ver el aviso de abajo).
2. **Añadir un `Deny`** a la política del bucket para `s3:GetObject` público sobre
   `privado/*`. Los 2 363 objetos públicos siguen igual; solo esos 34 dejan de ser
   descargables.
3. **Ruta en Next que los sirva con sesión**, `/api/portal/documento/[id]`: valida con
   `getServerSession()` —ya construido en `src/lib/serverAuth.ts`—, genera una URL firmada
   de 60 s y redirige.
4. **Actualizar las 34 URLs** en la tabla `files` y en las vistas del portal, que pasan a
   enlazar a la ruta en vez de a S3.

### Lo que hace falta antes de empezar

- **Credenciales de S3 para el frontend.** Hoy solo el CMS tiene claves; el servidor de
  Next necesita `s3:GetObject` sobre el prefijo privado para poder firmar.
- **Ver la política actual del bucket.** No es consultable con el usuario `strapi-uploads`,
  que está correctamente limitado y no tiene `s3:GetBucketPolicy`. Hace falta conocerla para
  redactar el `Deny` correcto.

### Dos avisos

**Renombrar los ficheros al moverlos.** Las URL actuales llevan tiempo siendo públicas y
pueden estar en cachés e índices de terceros. Si conservan el nombre, quien ya las tenga
seguirá teniéndolas —contra un 403, si el `Deny` está bien puesto—, pero regenerar el hash
cierra también esa puerta.

**Un cabo suelto por diseño.** Strapi sube al raíz del bucket, así que un PDF **nuevo**
aterrizaría público hasta que alguien lo mueva. Se resuelve con un *lifecycle hook* de
Strapi que lo mueva al prefijo tras subirlo, o aceptando un paso manual. Conviene decidirlo
antes de empezar, porque cambia el trabajo.

---

## 2. Rotación de credenciales (punto 16 del checklist)

Analizado en agosto y **aplazado deliberadamente**, no olvidado. La razón: solo se puede
rotar dos tercios con los accesos disponibles, y las claves que faltan son precisamente las
de más valor si se filtraran. Hacerlo a medias dejaría el punto abierto igualmente y
costaría dos ventanas de mantenimiento en vez de una.

### Lo que se puede rotar con acceso al servidor

| Secreto | Impacto medido |
|---|---|
| `APP_KEYS` | Invalida las cookies de sesión |
| `ADMIN_JWT_SECRET` | Cierra la sesión de los **7 administradores** |
| `JWT_SECRET` | Cierra la sesión de los **167 usuarios del portal** |
| `API_TOKEN_SALT` | Invalida 2 API tokens que **nunca se han usado** (`last_used_at` nulo) |
| `TRANSFER_TOKEN_SALT` | Cero impacto: no hay ninguno emitido |
| `DATABASE_PASSWORD` | El rol `azfadmin_strapi` tiene `CREATEROLE`, así que basta un `ALTER USER` |

### Lo que necesita accesos que no están en el servidor

- **`AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY`** — IAM en la cuenta `687980258625`. La
  única credencial disponible es el propio usuario `strapi-uploads`, correctamente limitado
  y sin permiso para crear claves.
- **`BREVO_SMTP_PASS`** — panel web de Brevo.
- **`RECAPTCHA_SECRET_KEY`** — consola de Google reCAPTCHA.

### Una que conviene dejar fuera

**`ENCRYPTION_KEY`.** Se buscaron valores cifrados en la base de datos y no apareció nada
evidente, pero **no se puede demostrar que no haya ninguno**: Strapi la usa para cifrar
credenciales guardadas. Si algo está cifrado con ella, rotarla lo vuelve irrecuperable y no
hay vuelta atrás. Dejarla fuera, o tratarla aparte con un paso de recifrado.

### El punto delicado

`REVALIDATION_SECRET` y `STRAPI_WEBHOOK_SECRET` viven en **tres sitios**: el `.env` del CMS,
el del front, y la configuración del webhook **dentro del panel de Strapi**. Si se cambian
en dos y no en el tercero, **la revalidación deja de funcionar en silencio**: el sitio sigue
sirviendo, pero el contenido nuevo no se propaga y nadie se entera en días.

### Cómo plantearlo

Ventana de baja actividad y aviso previo: la rotación **deja a 174 personas fuera de
sesión** —7 administradores y 167 afiliados—. Respaldo tomado antes, y verificación después
de: entrada al panel, entrada de un afiliado, envío de correo del formulario, subida de un
medio a S3 y propagación de un cambio de contenido.

Conviene hacerlo **en una sola pasada**, con alguien que tenga a mano IAM, Brevo y Google.

---

## 3. Otros pendientes que vienen de agosto

| | Qué | Dónde |
|---|---|---|
| **Authenticated Origin Pulls** | Los dos orígenes ya están en `ssl_verify_client optional` con instrumentación de logs. Falta activarlo en Cloudflare y pasar a `on` | `cms-strapi-azfa/deploy/CIERRE_ORIGEN.md`, paso 6 |
| **PDF de política de datos** | El formulario de contacto enlaza un PDF que devuelve 404, y `/aviso-legal` tampoco existe. Requisito legal | CMS, contenido |
| **Parches del sistema** | 10 actualizaciones de seguridad en el CMS y reinicio de ambos servidores, que nunca se han reiniciado | EC2 |
| **Bind de Strapi** | Poner `HOST=127.0.0.1` en el `.env` de la EC2; el defecto del código ya está cambiado | EC2 |
| **Respaldo externo** | Los respaldos verificados siguen en la máquina local; el punto 17 pide almacenamiento externo | — |
| **`pg_stat_statements`** | Activarla en el *parameter group* de RDS para poder señalar consultas concretas | RDS |
| **Cache Rule de HTML** | El HTML sale como `DYNAMIC`; una regla en Cloudflare descargaría la EC2 | Cloudflare |
| **Registros huérfanos** | Cuatro filas de `press_rooms` sin tipo, una de ellas duplicado de `boletin-501-1` | CMS |
| **`node_modules` huérfano** | Un directorio de julio en `/var/www/azfa-web/`, ajeno al esquema de releases | EC2 |
| **Sustitución de plugins** | `country-select` y `multi-select` sin mantenimiento. **No urgente** — ver la corrección del punto 14 | `cms-strapi-azfa/PLAN_SUSTITUCION_PLUGINS.md` |
| **Node 22** | El SDK de AWS exigirá Node ≥ 22 a partir de enero de 2027; las instancias corren 20.19.4 | EC2 |
