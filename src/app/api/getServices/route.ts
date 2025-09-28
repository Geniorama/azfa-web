import { NextResponse } from "next/server";
import strapiClient from "@/lib/strapi";

export async function GET() {
    try {
        // Configurar parámetros de consulta para obtener servicios
        const queryParams = {
            populate: {
                coverImage: {
                    populate: '*'
                }
            },
            pagination: {
                pageSize: 100  // Obtener todos los servicios
            },
            sort: ['id:asc'] // Ordenar por ID ascendente
        };

        // Obtener todos los servicios
        const response = await strapiClient.collection('services').find(queryParams);
        
        // Verificar que la respuesta tenga la estructura correcta
        if (response && typeof response === 'object') {
            // Si la respuesta ya tiene la estructura correcta, devolverla tal como está
            if (response.data !== undefined) {
                return NextResponse.json({
                    ...response,
                    success: true
                });
            } else if (Array.isArray(response)) {
                // Si es un array, envolverlo en la estructura correcta
                return NextResponse.json({
                    data: response,
                    meta: { pagination: { page: 1, pageSize: response.length, pageCount: 1, total: response.length } },
                    success: true
                });
            } else {
                // Si es un objeto pero no tiene data, envolverlo
                return NextResponse.json({
                    data: [response],
                    meta: { pagination: { page: 1, pageSize: 1, pageCount: 1, total: 1 } },
                    success: true
                });
            }
        } else {
            return NextResponse.json({
                data: [],
                meta: { pagination: { page: 1, pageSize: 0, pageCount: 0, total: 0 } },
                success: true
            });
        }

    } catch (error) {
        console.error('Error fetching services:', error);
        return NextResponse.json({ 
            error: "Failed to fetch services",
            success: false 
        }, { status: 500 });
    }
}
