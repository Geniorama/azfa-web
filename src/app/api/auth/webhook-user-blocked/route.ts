import { NextRequest, NextResponse } from 'next/server'

/**
 * Webhook que recibe notificaciones de Strapi cuando un usuario es bloqueado
 * Este endpoint debe ser configurado en Strapi Admin Panel -> Settings -> Webhooks
 */
export async function POST(request: NextRequest) {
  try {
    // Verificar que la petición viene de Strapi (opcional: agregar un secret)
    const webhookSecret = process.env.STRAPI_WEBHOOK_SECRET
    const authHeader = request.headers.get('authorization')
    
    if (webhookSecret && authHeader !== `Bearer ${webhookSecret}`) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      )
    }

    const payload = await request.json()
    
    // Strapi envía el evento con información del usuario
    const { event, model, entry } = payload
    
    console.log('📨 Webhook recibido:', { event, model })
    
    // Verificar que es una actualización de usuario
    if (model !== 'user' && model !== 'plugin::users-permissions.user') {
      return NextResponse.json({ 
        message: 'Evento ignorado - no es un usuario' 
      })
    }
    
    // Verificar que el usuario fue bloqueado
    if (entry?.blocked === true) {
      const userId = entry.id
      console.log(`🚫 Usuario bloqueado detectado: ${userId}`)
      
      // Aquí podrías:
      // 1. Registrar el evento en una base de datos
      // 2. Invalidar tokens en caché (si usas Redis)
      // 3. Enviar notificación al usuario por email
      // 4. Registrar en logs de auditoría
      
      // Por ahora, el frontend verificará periódicamente el estado
      return NextResponse.json({ 
        success: true,
        message: `Usuario ${userId} bloqueado exitosamente`,
        userId 
      })
    }
    
    return NextResponse.json({ 
      message: 'Evento procesado - usuario no bloqueado' 
    })
    
  } catch (error) {
    console.error('❌ Error procesando webhook:', error)
    return NextResponse.json(
      { error: 'Error procesando webhook' },
      { status: 500 }
    )
  }
}

