import { NextRequest, NextResponse } from "next/server";
import { getAuthToken } from "@/lib/authCookie";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

/**
 * Devuelve el usuario autenticado a partir de la cookie httpOnly.
 * Es la fuente de verdad de la sesión en el cliente (reemplaza la lectura
 * del token desde localStorage).
 */
export async function GET(request: NextRequest) {
  try {
    const token = getAuthToken(request);

    if (!token) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    if (!STRAPI_URL) {
      return NextResponse.json(
        { error: "Configuración de servidor incorrecta" },
        { status: 500 }
      );
    }

    const baseUrl = STRAPI_URL.endsWith("/api")
      ? STRAPI_URL.slice(0, -4)
      : STRAPI_URL;

    const meUrl = `${baseUrl}/api/users/me?populate[affiliateCompany][fields][0]=id&populate[affiliateCompany][fields][1]=documentId&populate[affiliateCompany][fields][2]=title&populate[affiliateCompany][fields][3]=propertiesLimit&populate=role`;

    const meResponse = await fetch(meUrl, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (meResponse.status === 401) {
      return NextResponse.json(
        { error: "Token inválido o expirado" },
        { status: 401 }
      );
    }

    if (!meResponse.ok) {
      return NextResponse.json(
        { error: "Error al obtener el usuario" },
        { status: 500 }
      );
    }

    const u = await meResponse.json();

    if (u.blocked) {
      return NextResponse.json(
        { error: "Su cuenta ha sido bloqueada", blocked: true },
        { status: 403 }
      );
    }

    return NextResponse.json({
      user: {
        id: u.id,
        username: u.username,
        email: u.email,
        confirmed: u.confirmed,
        blocked: u.blocked,
        isEditor: u.isEditor === true,
        isPropertiesEditor: u.isPropertiesEditor === true,
        affiliateCompany: u.affiliateCompany,
        role: u.role,
      },
    });
  } catch (error) {
    console.error("Error en /api/auth/me:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
