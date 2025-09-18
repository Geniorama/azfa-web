import { NextRequest, NextResponse } from "next/server";
import strapiClient from "@/lib/strapi";

interface QueryParams {
    populate: Record<string, unknown>;
    pagination?: Record<string, number>;
    filters?: Record<string, string | Record<string, string>>;
}

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const populateParams: Record<string, string> = {};
    const paginationParams: Record<string, number> = {};
    const filterParams: Record<string, string | Record<string, string>> = {};

    for (const [key, value] of searchParams.entries()) {
        if (key.startsWith('populate[')) {
            const match = key.match(/populate\[([^\]]+)\]/);
            if (match) {
                const populateKey = match[1];
                populateParams[populateKey] = value;
            }
        } else if (key.startsWith('pagination[')) {
            const match = key.match(/pagination\[([^\]]+)\]/);
            if (match) {
                const paginationKey = match[1];
                const numValue = parseInt(value, 10);
                if (!isNaN(numValue)) {
                    paginationParams[paginationKey] = numValue;
                }
            }
        } else if (key.startsWith('filters[')) {
            // Procesar filtros anidados como filters[offerType][$eq]
            const filterMatch = key.match(/filters\[([^\]]+)\]\[([^\]]+)\]/);
            if (filterMatch) {
                const [, field, operator] = filterMatch;
                if (!filterParams[field]) {
                    filterParams[field] = {};
                }
                // Type guard para asegurar que es un objeto
                if (typeof filterParams[field] === 'object' && filterParams[field] !== null) {
                    (filterParams[field] as Record<string, string>)[operator] = value;
                }
            } else {
                // Procesar filtros simples como filters[field]
                const simpleMatch = key.match(/filters\[([^\]]+)\]/);
                if (simpleMatch) {
                    const filterKey = simpleMatch[1];
                    filterParams[filterKey] = value;
                }
            }
        }
    }

    try {
        const queryParams: QueryParams = {
            populate: {
                imgGallery: true,
                ...populateParams
            }
        };

        // Agregar parámetros de paginación si existen
        if (Object.keys(paginationParams).length > 0) {
            queryParams.pagination = paginationParams;
        }

        // Agregar filtros si existen
        if (Object.keys(filterParams).length > 0) {
            queryParams.filters = filterParams;
            console.log('Filtros procesados en API:', filterParams);
        }

        console.log('Query params finales:', queryParams);
        
        try {
            const realStateOffers = await strapiClient.collection("real-state-offers").find(queryParams);
            console.log('Raw Strapi response:', realStateOffers);
            
            // Asegurar que la respuesta tenga la estructura correcta de Strapi
            if (realStateOffers && typeof realStateOffers === 'object') {
                // Si la respuesta ya tiene la estructura correcta, devolverla tal como está
                if (realStateOffers.data !== undefined) {
                    console.log('Response has data structure:', realStateOffers);
                    return NextResponse.json(realStateOffers);
                } else if (Array.isArray(realStateOffers)) {
                    // Si es un array, envolverlo en la estructura correcta
                    console.log('Response is array, wrapping:', realStateOffers);
                    return NextResponse.json({
                        data: realStateOffers,
                        meta: { pagination: { page: 1, pageSize: 25, pageCount: 1, total: realStateOffers.length } }
                    });
                } else {
                    // Si es un objeto pero no tiene data, envolverlo
                    console.log('Response is object, wrapping:', realStateOffers);
                    return NextResponse.json({
                        data: [realStateOffers],
                        meta: { pagination: { page: 1, pageSize: 25, pageCount: 1, total: 1 } }
                    });
                }
            } else {
                console.log('No valid response, returning empty data');
                return NextResponse.json({ 
                    data: [], 
                    meta: { pagination: { page: 1, pageSize: 25, pageCount: 0, total: 0 } } 
                });
            }
        } catch (strapiError) {
            console.error('Strapi error:', strapiError);
            
            // Si hay un error con filtros, intentar sin filtros
            if (Object.keys(filterParams).length > 0) {
                console.log('Retrying without filters due to error...');
                const fallbackParams: QueryParams = {
                    populate: {
                        imgGallery: true,
                        ...populateParams
                    }
                };
                
                if (Object.keys(paginationParams).length > 0) {
                    fallbackParams.pagination = paginationParams;
                }
                
                const fallbackResponse = await strapiClient.collection("real-state-offers").find(fallbackParams);
                console.log('Fallback response:', fallbackResponse);
                
                if (fallbackResponse && typeof fallbackResponse === 'object') {
                    if (fallbackResponse.data !== undefined) {
                        return NextResponse.json(fallbackResponse);
                    } else if (Array.isArray(fallbackResponse)) {
                        return NextResponse.json({
                            data: fallbackResponse,
                            meta: { pagination: { page: 1, pageSize: 25, pageCount: 1, total: fallbackResponse.length } }
                        });
                    }
                }
            }
            
            throw strapiError;
        }
    } catch (error) {
        console.error('Error fetching real state offers:', error);
        return NextResponse.json({ 
            error: 'Error fetching real state offers',
            data: [],
            meta: { pagination: { page: 1, pageSize: 25, pageCount: 0, total: 0 } }
        }, { status: 500 });
    }
}