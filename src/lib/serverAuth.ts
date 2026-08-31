import { cookies } from "next/headers";
import { AUTH_COOKIE } from "./authCookie";

/**
 * Sesión del lado del servidor.
 *
 * `ProtectedRoute` comprueba la sesión en el navegador, es decir DESPUÉS de que
 * el servidor ya haya enviado la página. Eso basta para la experiencia de uso
 * —redirige al login— pero no protege nada: el HTML, con sus datos dentro, ya
 * viajó. Estas funciones mueven la comprobación al servidor, que es donde tiene
 * efecto.
 *
 * El JWT vive en la cookie httpOnly `strapi_jwt` (ver authCookie.ts), así que
 * aquí se lee con `cookies()` y se valida contra Strapi.
 */

export interface SessionUser {
  id: number;
  username: string;
  email: string;
  blocked: boolean;
  isEditor: boolean;
  isPropertiesEditor: boolean;
}

/** Base del CMS sin `/api` ni barra final, venga como venga de la variable. */
function strapiBase(): string {
  const raw = process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL || "";
  return raw.replace(/\/+$/, "").replace(/\/api$/, "");
}

/**
 * Devuelve el usuario de la cookie, o `null` si no hay sesión válida.
 * Un usuario bloqueado cuenta como sin sesión.
 */
export async function getServerSession(): Promise<SessionUser | null> {
  const token = (await cookies()).get(AUTH_COOKIE)?.value;
  if (!token) return null;

  const base = strapiBase();
  if (!base) {
    console.error("serverAuth: STRAPI_URL sin configurar");
    return null;
  }

  try {
    const res = await fetch(`${base}/api/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
      // La sesión no se cachea nunca: es por usuario y por petición.
      cache: "no-store",
    });

    if (!res.ok) return null;

    const u = await res.json();
    if (u.blocked) return null;

    return {
      id: u.id,
      username: u.username,
      email: u.email,
      blocked: false,
      isEditor: u.isEditor === true,
      isPropertiesEditor: u.isPropertiesEditor === true,
    };
  } catch (error) {
    console.error("serverAuth: no se pudo validar la sesión:", error);
    return null;
  }
}

/**
 * Hace una petición al CMS **con el JWT del usuario**, no de forma anónima.
 *
 * Así la autorización la resuelve Strapi con el rol del usuario: los content
 * types del portal solo necesitan permiso `find` en el rol *Authenticated*, y
 * pueden quedar cerrados para *Public*. Devuelve `null` si no hay sesión o si
 * el CMS rechaza la petición.
 *
 * @param path Ruta bajo `/api`, empezando por barra. P. ej. `/studies?sort=…`
 */
export async function fetchAsUser<T>(path: string): Promise<T | null> {
  const token = (await cookies()).get(AUTH_COOKIE)?.value;
  if (!token) return null;

  const base = strapiBase();
  if (!base) return null;

  try {
    const res = await fetch(`${base}/api${path}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    if (!res.ok) {
      console.error(`fetchAsUser: ${path} respondió ${res.status}`);
      return null;
    }

    return (await res.json()) as T;
  } catch (error) {
    console.error(`fetchAsUser: fallo al pedir ${path}:`, error);
    return null;
  }
}
