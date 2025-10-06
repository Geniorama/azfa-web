import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    console.log('=== CHECK SLUG API ===');
    
    try {
        // Obtener el token de autenticación del header
        const authHeader = request.headers.get('authorization');
        const token = authHeader?.replace('Bearer ', '');
        
        if (!token) {
            console.log('Error: Token no proporcionado');
            return NextResponse.json({ 
                error: 'Token de autenticación requerido',
                success: false 
            }, { status: 401 });
        }

        // Obtener el slug de los query parameters
        const { searchParams } = new URL(request.url);
        const slug = searchParams.get('slug');
        
        if (!slug) {
            return NextResponse.json({ 
                error: 'Slug requerido',
                success: false 
            }, { status: 400 });
        }

        console.log('Verificando slug:', slug);

        // Corregir la URL de Strapi (remover /api duplicado)
        const strapiBaseUrl = process.env.NEXT_PUBLIC_STRAPI_URL?.replace('/api', '') || process.env.NEXT_PUBLIC_STRAPI_URL;
        const strapiUrl = `${strapiBaseUrl}/api/real-state-offers?filters[slug][$eq]=${encodeURIComponent(slug)}`;

        // Consultar Strapi para verificar si el slug existe
        const strapiResponse = await fetch(strapiUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!strapiResponse.ok) {
            console.error('Error consultando Strapi:', strapiResponse.status);
            return NextResponse.json({ 
                error: 'Error consultando la base de datos',
                success: false 
            }, { status: 500 });
        }

        const response = await strapiResponse.json();
        const exists = response.data && response.data.length > 0;

        console.log('Slug existe:', exists);

        return NextResponse.json({
            exists: exists,
            slug: slug,
            success: true
        });

    } catch (error) {
        console.error('=== ERROR CHECKING SLUG ===');
        console.error('Error completo:', error);
        
        return NextResponse.json({ 
            error: 'Error verificando slug',
            success: false,
            details: error instanceof Error ? error.message : 'Error desconocido'
        }, { status: 500 });
    }
}
