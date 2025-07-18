import { NextRequest, NextResponse } from "next/server";
import strapiClient from "@/lib/strapi";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);

    const populateParams: Record<string, string> = {};

    for (const [key, value] of searchParams.entries()) {
        if (key.startsWith('populate[')) {
            const match = key.match(/populate\[([^\]]+)\]/);
            if (match) {
                const populateKey = match[1];
                populateParams[populateKey] = value;
            }   
        }
    }
    
    const countries = await strapiClient.collection("map-countries").find({
        populate: populateParams || "*"
    })

    return NextResponse.json(countries)
}