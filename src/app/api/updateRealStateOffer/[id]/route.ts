import { NextRequest, NextResponse } from "next/server";

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    console.log('=== UPDATE REAL STATE OFFER API ===');
    
    try {
        const { id } = await params;

        if (!id) {
            return NextResponse.json({ 
                error: 'ID del inmueble requerido',
                success: false 
            }, { status: 400 });
        }

        // Obtener el token de autenticación del header
        const authHeader = request.headers.get('authorization');
        const token = authHeader?.replace('Bearer ', '');
        
        console.log('Token recibido:', token ? 'Sí' : 'No');
        console.log('ID del inmueble a actualizar:', id);
        
        if (!token) {
            console.log('Error: Token no proporcionado');
            return NextResponse.json({ 
                error: 'Token de autenticación requerido',
                success: false 
            }, { status: 401 });
        }

        // Corregir la URL de Strapi
        const strapiBaseUrl = process.env.NEXT_PUBLIC_STRAPI_URL?.replace('/api', '') || process.env.NEXT_PUBLIC_STRAPI_URL;

        // Crear FormData para manejar archivos
        const formData = await request.formData();
        
        // Extraer los datos JSON del FormData
        const jsonDataStr = formData.get('data') as string;
        
        if (!jsonDataStr) {
            return NextResponse.json({ 
                error: 'Datos del formulario requeridos',
                success: false 
            }, { status: 400 });
        }

        const jsonData = JSON.parse(jsonDataStr);
        
        // Preparar los datos para Strapi
        const strapiData: Record<string, unknown> = {
            title: jsonData.title,
            slug: jsonData.slug,
            description: jsonData.description,
            country: jsonData.country,
            city: jsonData.city,
            region: jsonData.region,
            area: jsonData.area,
            propertyStatus: jsonData.propertyStatus,
            offerType: jsonData.offerType,
            propertyUse: jsonData.propertyUse,
            propertyType: jsonData.propertyType,
            platinum: jsonData.platinum || false
        };

        // Manejar certificaciones
        if (jsonData.certifications && jsonData.certifications.trim() !== '') {
            const certificationsList = jsonData.certifications.split(',').map((cert: string) => cert.trim()).filter((cert: string) => cert !== '');
            if (certificationsList.length > 0) {
                strapiData.certifications = certificationsList.map((cert: string) => ({
                    type: 'paragraph',
                    children: [{ type: 'text', text: cert }]
                }));
            }
        }

        // Manejar ctaButton
        if (jsonData.ctaButton && jsonData.ctaButton.trim() !== '') {
            strapiData.ctaButton = {
                text: "Solicitar información",
                link: jsonData.ctaButton
            };
        }

        // Subir nuevas imágenes si existen
        const uploadedImageIds: number[] = [];
        
        if (formData.has('imgGallery')) {
            const images = formData.getAll('imgGallery') as File[];
            console.log(`Subiendo ${images.length} imágenes nuevas...`);
            
            for (const image of images) {
                try {
                    const imageFormData = new FormData();
                    imageFormData.append('files', image);
                    
                    const uploadResponse = await fetch(`${strapiBaseUrl}/api/upload`, {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${token}`
                        },
                        body: imageFormData
                    });

                    if (uploadResponse.ok) {
                        const uploadData = await uploadResponse.json();
                        console.log('Imagen subida exitosamente:', uploadData[0].id);
                        uploadedImageIds.push(uploadData[0].id);
                    }
                } catch (imageError) {
                    console.error('Error subiendo imagen:', imageError);
                }
            }
        }

        // Si hay nuevas imágenes, agregar a los datos
        // Mantener las existentes si se especifican
        if (jsonData.existingImages && Array.isArray(jsonData.existingImages)) {
            strapiData.imgGallery = [...jsonData.existingImages, ...uploadedImageIds];
        } else if (uploadedImageIds.length > 0) {
            strapiData.imgGallery = uploadedImageIds;
        }
        
        console.log('Datos finales para actualizar:', JSON.stringify(strapiData, null, 2));

        // Actualizar el registro en Strapi
        const strapiUrl = `${strapiBaseUrl}/api/real-state-offers/${id}`;
        
        const strapiResponse = await fetch(strapiUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ data: strapiData })
        });
        
        if (!strapiResponse.ok) {
            const errorText = await strapiResponse.text();
            console.error('Error de Strapi:', strapiResponse.status, errorText);
            
            if (strapiResponse.status === 403) {
                throw new Error('No tienes permisos para editar este inmueble.');
            }
            
            throw new Error(`Strapi error: ${strapiResponse.status} - ${errorText}`);
        }
        
        const response = await strapiResponse.json();
        console.log('Inmueble actualizado exitosamente:', response.data.id);

        return NextResponse.json({
            success: true,
            data: response,
            message: 'Inmueble actualizado exitosamente'
        });

    } catch (error) {
        console.error('=== ERROR UPDATING REAL STATE OFFER ===');
        console.error('Error:', error);
        
        return NextResponse.json({ 
            error: 'Error al actualizar el inmueble',
            success: false,
            details: error instanceof Error ? error.message : 'Error desconocido'
        }, { status: 500 });
    }
}

