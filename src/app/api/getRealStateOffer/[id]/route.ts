import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        if (!id) {
            return NextResponse.json(
                { error: 'ID del inmueble requerido' },
                { status: 400 }
            );
        }

        console.log('Obteniendo inmueble con documentId:', id);

        const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL?.replace('/api', '') || '';
        
        // En Strapi v5, buscar por documentId usando filtros
        const url = `${strapiUrl}/api/real-state-offers?filters[documentId][$eq]=${id}&populate=imgGallery&populate=affiliateCompany&populate=users&populate=ctaButton`;
        console.log('URL de consulta:', url);
        
        const response = await fetch(url);

        if (!response.ok) {
            console.error('Error de Strapi:', response.status);
            return NextResponse.json(
                { error: 'Inmueble no encontrado' },
                { status: response.status }
            );
        }

        const realStateOffer = await response.json();
        
        // Strapi devuelve un array cuando usas filtros
        if (!realStateOffer.data || !Array.isArray(realStateOffer.data) || realStateOffer.data.length === 0) {
            return NextResponse.json(
                { error: 'Inmueble no encontrado' },
                { status: 404 }
            );
        }

        console.log('Inmueble encontrado:', realStateOffer.data[0]?.id);

        // Devolver solo el primer resultado (debería ser único por documentId)
        return NextResponse.json({ data: realStateOffer.data[0] });
    } catch (error) {
        console.error('Error fetching real state offer:', error);
        return NextResponse.json(
            { error: 'Error al obtener el inmueble' },
            { status: 500 }
        );
    }
}

