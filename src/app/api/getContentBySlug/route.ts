// Get content by slug
import { NextRequest, NextResponse } from "next/server";
import strapiClient from "@/lib/strapi";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    if (!slug) {
        return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

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

     const queryParams: { populate?: string | Record<string, unknown> } = {};

     if (Object.keys(populateParams).length > 0) {
        queryParams.populate = populateParams;
     } else if (populate) {
        queryParams.populate = populate;
     } else {
        queryParams.populate = "*";
     }

    //  Get content by slug
    try {
        console.log('Query params for content:', queryParams);
        console.log('Populate being used:', queryParams.populate);
        
        const content = await strapiClient.collection('contents').find({
            filters: {
                slug: {
                    $eq: slug
                }
            },
            populate: queryParams.populate
        })
        return NextResponse.json({
            success: true,
            data: content,
            status: 200
        });
    } catch (error) {
        return NextResponse.json({ error: "Error al obtener el contenido: " + error }, { status: 500 });
    }
}