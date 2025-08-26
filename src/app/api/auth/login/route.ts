import { NextRequest, NextResponse } from 'next/server'

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email y contraseña son requeridos' },
        { status: 400 }
      )
    }

    if (!STRAPI_URL) {
      return NextResponse.json(
        { error: 'Configuración de servidor incorrecta' },
        { status: 500 }
      )
    }

    // Autenticar con Strapi usando fetch
    // Probar diferentes endpoints según la versión de Strapi
    let response: Response
    let data: { user: { id: number; username: string; email: string; confirmed: boolean; blocked: boolean }; jwt: string }

    try {
      // Intentar con Strapi v4 (endpoint estándar)
      response = await fetch(`${STRAPI_URL}/api/auth/local`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          identifier: email,
          password,
        }),
      })

      if (response.ok) {
        data = await response.json()
      } else {
        // Si falla, intentar con Strapi v3
        response = await fetch(`${STRAPI_URL}/auth/local`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            identifier: email,
            password,
          }),
        })

        if (response.ok) {
          data = await response.json()
        } else {
          const errorText = await response.text()
          console.error('Error de Strapi:', response.status, errorText)
          return NextResponse.json(
            { error: 'Error de conexión con el servidor de autenticación' },
            { status: 500 }
          )
        }
      }
    } catch (fetchError) {
      console.error('Error de conexión:', fetchError)
      return NextResponse.json(
        { error: 'Error de conexión con el servidor' },
        { status: 500 }
      )
    }

    const { user, jwt } = data

    // Verificar que el usuario no esté bloqueado
    if (user.blocked) {
      return NextResponse.json(
        { error: 'Su cuenta ha sido bloqueada. Contacte al administrador.' },
        { status: 403 }
      )
    }

    // Verificar que el usuario esté confirmado
    if (!user.confirmed) {
      return NextResponse.json(
        { error: 'Su cuenta no ha sido confirmada. Revise su correo electrónico.' },
        { status: 403 }
      )
    }

    return NextResponse.json({
      token: jwt,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        confirmed: user.confirmed,
        blocked: user.blocked,
      },
    })
  } catch (error) {
    console.error('Error en autenticación:', error)
    
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
