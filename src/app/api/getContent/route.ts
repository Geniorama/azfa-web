import { NextRequest, NextResponse } from "next/server";
import strapiClient from "@/lib/strapi";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    
    // Procesar todos los parámetros populate
    const populateParams: Record<string, string> = {};
    
    // Buscar parámetros populate[0], populate[1], etc.
    for (const [key, value] of searchParams.entries()) {
        if (key.startsWith('populate[')) {
            // Extraer el índice o clave del populate
            const match = key.match(/populate\[([^\]]+)\]/);
            if (match) {
                const populateKey = match[1];
                populateParams[populateKey] = value;
            }
        }
    }
    
    // Si no hay parámetros populate específicos, usar el populate general
    const populate = searchParams.get("populate");
    
    if (!id) {
        return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    try {
        // Configurar parámetros de consulta para campos dinámicos
        const queryParams: { populate?: string | Record<string, unknown> } = {};
        
        if (Object.keys(populateParams).length > 0) {
            // Si hay parámetros populate anidados, usarlos
            queryParams.populate = populateParams;
        } else if (populate) {
            // Si se especifica populate general, usarlo
            queryParams.populate = populate;
        } else {
            // Por defecto, incluir todos los campos dinámicos + campos específicos anidados
            queryParams.populate = {
                // Incluir todos los campos
                '*': true,
                // Específicamente incluir campos anidados
                heading: {
                    populate: {
                        backgroundImg: true
                    }
                },
                sections: {
                    populate: '*'
                }
            };
        }

        // Usar collection() con parámetros de consulta para obtener contenido con campos dinámicos
        const content = await strapiClient.collection('contents').findOne(id, queryParams);
        return NextResponse.json(content);
    } catch (error) {
        console.error('Error fetching content:', error);
        return NextResponse.json({ error: "Failed to fetch content" }, { status: 500 });
    }
}