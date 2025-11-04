import { NextRequest, NextResponse } from 'next/server'

const STRAPI_URL = process.env.STRAPI_URL

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    console.log('🔍 Received email:', email)

    if (!email) {
      return NextResponse.json(
        { error: 'El correo electrónico es requerido' },
        { status: 400 }
      )
    }

    if (!STRAPI_URL) {
      console.error('❌ STRAPI_URL is not defined')
      return NextResponse.json(
        { error: 'Configuración de servidor incorrecta' },
        { status: 500 }
      )
    }

    // Solicitar recuperación de contraseña con Strapi
    try {
      console.log('🔍 Fetching URL:', `${STRAPI_URL}/api/auth/forgot-password`)
      
      // Primero intentar con el endpoint estándar de forgot-password
      const response = await fetch(`${STRAPI_URL}/api/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
        }),
      })

      console.log('🔍 Response status:', response.status)
      
      // Si falla con 500, intentar devolver un mensaje de error más amigable
      if (response.status === 500) {
        console.warn('⚠️ Strapi devolvió error 500, posiblemente no configurado')
        return NextResponse.json(
          {
            success: false,
            error: 'El servicio de recuperación de contraseña no está configurado en el servidor. Por favor, contacte al administrador.'
          },
          { status: 500 }
        )
      }

      const data = await response.json()
      console.log('🔍 Response data:', data)

      if (!response.ok) {
        // Si Strapi devuelve un error, intentar devolverlo
        return NextResponse.json(
          { success: false, error: data.error?.message || 'Error al solicitar recuperación de contraseña' },
          { status: response.status }
        )
      }

      // Strapi devuelve { ok: true } cuando el email se envió correctamente
      if (data.ok === true) {
        return NextResponse.json({
          success: true,
          message: 'Revisa tu correo electrónico. Si el correo existe en nuestro sistema, recibirás un enlace de recuperación.'
        })
      }

      // Si hay un mensaje en la respuesta
      if (data.message) {
        return NextResponse.json({
          success: true,
          message: data.message
        })
      }

      // Si no hay confirmación clara, aún así indicar éxito para no revelar si el email existe
      return NextResponse.json({
        success: true,
        message: 'Si el correo existe en nuestro sistema, recibirá un enlace de recuperación. Por favor, revise su correo.'
      })
    } catch (fetchError) {
      console.error('❌ Error de conexión:', fetchError)
      return NextResponse.json(
        { success: false, error: 'Error de conexión con el servidor' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('❌ Error en recuperación de contraseña:', error)
    
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}