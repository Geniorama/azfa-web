import { NextRequest, NextResponse } from 'next/server'

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL

/**
 * Endpoint para verificar el estado actual de un usuario en Strapi
 * Permite al frontend verificar si un usuario fue bloqueado o deshabilitado
 */
export async function POST(request: NextRequest) {
  try {
    const { userId, token } = await request.json()

    if (!userId || !token) {
      return NextResponse.json(
        { error: 'userId y token son requeridos' },
        { status: 400 }
      )
    }

    if (!STRAPI_URL) {
      return NextResponse.json(
        { error: 'Configuración de servidor incorrecta' },
        { status: 500 }
      )
    }

    // Normalizar URL de Strapi
    const baseUrl = STRAPI_URL.endsWith('/api') ? STRAPI_URL.slice(0, -4) : STRAPI_URL

    // Consultar el estado actual del usuario en Strapi
    const userResponse = await fetch(`${baseUrl}/api/users/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })

    // Si el token no es válido o expiró
    if (userResponse.status === 401) {
      return NextResponse.json(
        { 
          valid: false, 
          blocked: false,
          error: 'Token inválido o expirado' 
        },
        { status: 401 }
      )
    }

    if (!userResponse.ok) {
      return NextResponse.json(
        { error: 'Error al verificar usuario' },
        { status: 500 }
      )
    }

    const userData = await userResponse.json()

    // Retornar el estado del usuario
    return NextResponse.json({
      valid: true,
      blocked: userData.blocked || false,
      confirmed: userData.confirmed || false,
      user: {
        id: userData.id,
        username: userData.username,
        email: userData.email,
        blocked: userData.blocked,
        confirmed: userData.confirmed,
      }
    })

  } catch (error) {
    console.error('Error verificando usuario:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

