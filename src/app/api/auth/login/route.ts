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
    let data: { 
      user: { 
        id: number; 
        username: string; 
        email: string; 
        confirmed: boolean; 
        blocked: boolean;
        affiliateCompany?: {
          id: number;
          documentId?: string;
          title: string;
          propertiesLimit: number;
        };
        role?: {
          id: number;
          name: string;
        };
      }; 
      jwt: string 
    }

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

    // Obtener información completa del usuario incluyendo affiliateCompany
    try {
      // Normalizar STRAPI_URL (remover /api si ya está incluido)
      const baseUrl = STRAPI_URL?.endsWith('/api') ? STRAPI_URL.slice(0, -4) : STRAPI_URL
      
      // Intentar con la API directa de users usando el ID del usuario
      // Especificar los campos de affiliateCompany incluyendo documentId
      const userDetailsUrl = `${baseUrl}/api/users/${user.id}?populate[affiliateCompany][fields][0]=id&populate[affiliateCompany][fields][1]=documentId&populate[affiliateCompany][fields][2]=title&populate[affiliateCompany][fields][3]=propertiesLimit&populate=role`
      
      const userDetailsResponse = await fetch(userDetailsUrl, {
        headers: {
          'Authorization': `Bearer ${jwt}`,
        },
      })

      if (userDetailsResponse.ok) {
        const userDetails = await userDetailsResponse.json()
        
        // Actualizar el objeto user con la información completa
        Object.assign(user, {
          affiliateCompany: userDetails.affiliateCompany,
          role: userDetails.role,
        })
      } else {
        console.error('Error al obtener detalles del usuario:', userDetailsResponse.status)
      }
    } catch (userDetailsError) {
      console.error('Error al obtener detalles del usuario:', userDetailsError instanceof Error ? userDetailsError.message : userDetailsError)
      // Continuar sin la información adicional
    }

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
        affiliateCompany: user.affiliateCompany,
        role: user.role,
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
