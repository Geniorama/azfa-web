import { NextRequest, NextResponse } from 'next/server'

const STRAPI_URL = process.env.STRAPI_URL

export async function POST(request: NextRequest) {
  try {
    const { code, password, passwordConfirmation } = await request.json()

    if (!code || !password || !passwordConfirmation) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'La contraseña debe tener al menos 6 caracteres' },
        { status: 400 }
      )
    }

    if (password !== passwordConfirmation) {
      return NextResponse.json(
        { error: 'Las contraseñas no coinciden' },
        { status: 400 }
      )
    }

    if (!STRAPI_URL) {
      return NextResponse.json(
        { error: 'Configuración de servidor incorrecta' },
        { status: 500 }
      )
    }

    // Reseteo de contraseña con Strapi
    try {
      const response = await fetch(`${STRAPI_URL}/api/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          password,
          passwordConfirmation,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        return NextResponse.json(
          { error: data.error?.message || 'Error al restablecer contraseña. El código puede haber expirado.' },
          { status: response.status }
        )
      }

      // Éxito
      return NextResponse.json({
        success: true,
        message: 'Contraseña restablecida exitosamente'
      })
    } catch (fetchError) {
      console.error('Error de conexión:', fetchError)
      return NextResponse.json(
        { error: 'Error de conexión con el servidor' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Error en reseteo de contraseña:', error)
    
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

