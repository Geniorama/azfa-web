import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    
    try {
        const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL?.replace('/api', '') || '';
        
        // Construir los parámetros de populate
        const populateParams: string[] = [];
        
        // Buscar parámetros populate[0], populate[1], etc.
        for (const [key, value] of searchParams.entries()) {
            if (key.startsWith('populate[')) {
                populateParams.push(value);
            }
        }
        
        // Si no hay parámetros populate específicos, usar populate general o valores por defecto
        const populate = searchParams.get("populate");
        
        let populateQuery = '';
        if (populateParams.length > 0) {
            // Construir query string con populate anidado
            populateParams.forEach((param, index) => {
                populateQuery += `&populate[${index}]=${param}`;
            });
        } else if (populate) {
            populateQuery = `&populate=${populate}`;
        } else {
            // Por defecto, incluir todos los componentes con sus relaciones
            populateQuery = '&populate[0]=headingSection&populate[1]=headingSection.backgroundImg&populate[2]=SEO&populate[3]=downloadDocument&populate[4]=downloadDocument.document&populate[5]=downloadDocument.cover';
        }

        // Consultar el singleType legal-regulations
        const url = `${strapiUrl}/api/legal-regulations?${populateQuery.replace('&', '')}`;
        console.log('URL de consulta:', url);
        
        const response = await fetch(url, {
            cache: 'no-store'
        });

        if (!response.ok) {
            console.error('Error de Strapi:', response.status);
            return NextResponse.json(
                { error: 'Error al obtener las regulaciones legales' },
                { status: response.status }
            );
        }

        const data = await response.json();
        return NextResponse.json({ data: data.data || data });
    } catch (error) {
        console.error('Error fetching legal regulations:', error);
        return NextResponse.json({ error: "Failed to fetch legal regulations" }, { status: 500 });
    }
}

