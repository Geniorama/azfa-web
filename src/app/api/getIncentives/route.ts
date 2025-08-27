import { NextRequest, NextResponse } from "next/server";
import strapiClient from "@/lib/strapi";

export async function GET(request: NextRequest) {
    try {
        // Obtener parámetros de consulta
        const { searchParams } = new URL(request.url);
        const country = searchParams.get('country');
        const page = searchParams.get('page') || '1';
        const pageSize = searchParams.get('pageSize') || '100';

        // Configurar parámetros de consulta con sintaxis correcta de Strapi
        const queryParams: {
            populate: Record<string, unknown>;
            filters?: { country: { $eq: string } };
            pagination: { page: number; pageSize: number };
        } = {
            populate: {
                flag: true,
                googleMapsLocation: true,
                incentivesListItem: true
            },
            pagination: {
                page: parseInt(page),
                pageSize: parseInt(pageSize)
            }
        };

        // Agregar filtro por país si se especifica
        if (country) {
            queryParams.filters = {
                country: {
                    $eq: country
                }
            };
        }



        // Obtener todos los incentivos
        const response = await strapiClient.collection('incentives').find(queryParams);
        
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
                    meta: { pagination: { page: parseInt(page), pageSize: parseInt(pageSize), pageCount: 1, total: response.length } },
                    success: true
                });
            } else {
                // Si es un objeto pero no tiene data, envolverlo
                return NextResponse.json({
                    data: [response],
                    meta: { pagination: { page: parseInt(page), pageSize: parseInt(pageSize), pageCount: 1, total: 1 } },
                    success: true
                });
            }
        } else {
            return NextResponse.json({
                data: [],
                meta: { pagination: { page: parseInt(page), pageSize: parseInt(pageSize), pageCount: 0, total: 0 } },
                success: true
            });
        }

    } catch (error) {
        console.error('Error fetching incentives:', error);
        return NextResponse.json({ 
            error: "Failed to fetch incentives",
            success: false 
        }, { status: 500 });
    }
}
