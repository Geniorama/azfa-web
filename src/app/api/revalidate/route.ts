import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Verificar token de seguridad
    const authHeader = request.headers.get('authorization');
    const secret = process.env.REVALIDATION_SECRET;

    if (!secret || authHeader !== `Bearer ${secret}`) {
      return NextResponse.json(
        { message: 'Token de autorización inválido' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { model, event, entry } = body;

    console.log('🔄 Webhook recibido:', { model, event, entry: entry?.id });

    // Revalidar según el modelo que cambió
    switch (model) {
      case 'real-state-offer':
        // Revalidar página de oferta inmobiliaria
        revalidatePath('/invierta-en-zonas-francas/oferta-inmobiliaria');
        
        // Si tiene slug, revalidar página específica
        if (entry?.slug) {
          revalidatePath(`/invierta-en-zonas-francas/oferta-inmobiliaria/${entry.slug}`);
        }
        
        console.log('✅ Cache revalidado: Oferta Inmobiliaria');
        break;

      case 'affiliate':
        // Revalidar página de afiliados
        revalidatePath('/nuestros-afiliados');
        console.log('✅ Cache revalidado: Afiliados');
        break;

      case 'content':
      case 'publication':
      case 'study':
        // Revalidar sala de prensa
        revalidatePath('/sala-de-prensa');
        revalidatePath('/sala-de-prensa/blog');
        revalidatePath('/sala-de-prensa/noticias');
        revalidatePath('/sala-de-prensa/publicaciones');
        revalidatePath('/sala-de-prensa/podcast');
        console.log('✅ Cache revalidado: Sala de Prensa');
        break;

      case 'event':
        // Revalidar eventos
        revalidatePath('/eventos');
        console.log('✅ Cache revalidado: Eventos');
        break;

      case 'global-setting':
        // Revalidar todo el sitio (header, footer, etc.)
        revalidatePath('/', 'layout');
        console.log('✅ Cache revalidado: Configuración Global');
        break;

      case 'incentive':
        // Revalidar página de incentivos
        revalidatePath('/invierta-en-zonas-francas/incentivos');
        console.log('✅ Cache revalidado: Incentivos');
        break;

      case 'services-page':
        // Revalidar página de servicios
        revalidatePath('/servicios');
        console.log('✅ Cache revalidado: Servicios');
        break;

      case 'trade-zones-page':
        // Revalidar página de Invierta en Zonas Francas
        revalidatePath('/invierta-en-zonas-francas');
        console.log('✅ Cache revalidado: Invierta en Zonas Francas');
        break;

      default:
        console.log(`⚠️ Modelo no configurado para revalidación: ${model}`);
    }

    // Opción nuclear: revalidar todo si es necesario
    if (body.revalidateAll) {
      revalidatePath('/', 'layout');
      console.log('🔥 Cache completo revalidado');
    }

    return NextResponse.json({
      revalidated: true,
      message: `Cache revalidado para ${model}`,
      now: Date.now()
    });
  } catch (error) {
    console.error('❌ Error en revalidación:', error);
    return NextResponse.json(
      { 
        message: 'Error al revalidar cache',
        error: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    );
  }
}

