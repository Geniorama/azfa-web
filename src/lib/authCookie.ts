import { NextResponse, NextRequest } from "next/server";

/**
 * Cookie httpOnly que almacena el JWT de Strapi.
 *
 * El token vive solo en una cookie httpOnly + Secure + SameSite, inaccesible
 * para el JavaScript del cliente. Así un XSS no puede robar la sesión (antes
 * el JWT se guardaba en localStorage). Las rutas API leen el token desde la
 * cookie (server-side) y el navegador la envía automáticamente en peticiones
 * same-origin.
 */
export const AUTH_COOKIE = "strapi_jwt";

// 30 días, alineado con la expiración por defecto del JWT de Strapi
const MAX_AGE = 60 * 60 * 24 * 30;

function baseOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
  };
}

export function setAuthCookie(response: NextResponse, jwt: string) {
  response.cookies.set(AUTH_COOKIE, jwt, { ...baseOptions(), maxAge: MAX_AGE });
}

export function clearAuthCookie(response: NextResponse) {
  response.cookies.set(AUTH_COOKIE, "", { ...baseOptions(), maxAge: 0 });
}

export function getAuthToken(request: NextRequest): string | undefined {
  return request.cookies.get(AUTH_COOKIE)?.value;
}
