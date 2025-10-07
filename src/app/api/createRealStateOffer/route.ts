import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    console.log('=== CREATE REAL STATE OFFER API ===');
    
    try {
        // Obtener el token de autenticación del header
        const authHeader = request.headers.get('authorization');
        const token = authHeader?.replace('Bearer ', '');
        
        console.log('Token recibido:', token ? 'Sí' : 'No');
        
        if (!token) {
            console.log('Error: Token no proporcionado');
            return NextResponse.json({ 
                error: 'Token de autenticación requerido',
                success: false 
            }, { status: 401 });
        }

        // Corregir la URL de Strapi (remover /api duplicado) - definir antes de usarla
        const strapiBaseUrl = process.env.NEXT_PUBLIC_STRAPI_URL?.replace('/api', '') || process.env.NEXT_PUBLIC_STRAPI_URL;
        console.log('URL base de Strapi:', strapiBaseUrl);

        // Obtener información del usuario autenticado con su affiliateCompany
        let userId = null;
        let userAffiliateCompany = null;
        console.log('Intentando obtener información del usuario con affiliateCompany...');
        try {
            const userUrl = `${strapiBaseUrl}/api/users/me?populate[affiliateCompany][fields][0]=id&populate[affiliateCompany][fields][1]=documentId&populate[affiliateCompany][fields][2]=title&populate[affiliateCompany][fields][3]=propertiesLimit`;
            console.log('URL de usuario:', userUrl);
            
            const userResponse = await fetch(userUrl, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            console.log('Respuesta de usuario:', userResponse.status);
            
            if (userResponse.ok) {
                const userData = await userResponse.json();
                userId = userData.id;
                userAffiliateCompany = userData.affiliateCompany;
                console.log('Usuario autenticado:', userData.username, 'ID:', userId);
                console.log('Affiliate Company:', userAffiliateCompany);
                
                // Validar que el usuario tenga affiliateCompany asignado
                if (!userAffiliateCompany) {
                    console.log('Error: Usuario sin empresa afiliada');
                    return NextResponse.json({ 
                        error: 'Su cuenta no tiene una empresa afiliada asignada. Contacte al administrador.',
                        success: false 
                    }, { status: 403 });
                }
            } else {
                const errorText = await userResponse.text();
                console.error('Error obteniendo usuario:', userResponse.status, errorText);
                return NextResponse.json({ 
                    error: 'Error al validar usuario',
                    success: false 
                }, { status: 401 });
            }
        } catch (userError) {
            console.error('Error obteniendo usuario:', userError);
            return NextResponse.json({ 
                error: 'Error al validar usuario',
                success: false 
            }, { status: 500 });
        }
        
        // Validar el límite de propiedades del afiliado
        console.log('Validando límite de propiedades...');
        try {
            const countUrl = `${strapiBaseUrl}/api/real-state-offers?filters[affiliateCompany][documentId][$eq]=${userAffiliateCompany.documentId}&pagination[pageSize]=1`;
            console.log('URL de conteo:', countUrl);
            
            const countResponse = await fetch(countUrl, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (countResponse.ok) {
                const countData = await countResponse.json();
                const currentCount = countData.meta?.pagination?.total || 0;
                const limit = userAffiliateCompany.propertiesLimit || 0;
                
                console.log(`Propiedades actuales: ${currentCount}, Límite: ${limit}`);
                
                if (currentCount >= limit) {
                    console.log('Error: Límite de propiedades alcanzado');
                    return NextResponse.json({ 
                        error: `Ha alcanzado el límite de ${limit} propiedades para su empresa. Contacte al administrador para solicitar más espacios.`,
                        success: false,
                        currentCount,
                        limit
                    }, { status: 403 });
                }
            } else {
                console.error('Error verificando límite:', countResponse.status);
            }
        } catch (limitError) {
            console.error('Error validando límite:', limitError);
            // Continuar aunque falle la validación para no bloquear
        }

        // Crear FormData para manejar archivos
        const formData = await request.formData();
        
        // Extraer los datos JSON del FormData
        const jsonDataStr = formData.get('data') as string;
        console.log('Datos JSON recibidos:', jsonDataStr ? 'Sí' : 'No');
        
        if (!jsonDataStr) {
            console.log('Error: Datos del formulario no encontrados');
            return NextResponse.json({ 
                error: 'Datos del formulario requeridos',
                success: false 
            }, { status: 400 });
        }

        let jsonData;
        try {
            jsonData = JSON.parse(jsonDataStr);
            console.log('Datos parseados correctamente:', Object.keys(jsonData));
        } catch (parseError) {
            console.log('Error parseando JSON:', parseError);
            return NextResponse.json({ 
                error: 'Error en el formato de datos',
                success: false 
            }, { status: 400 });
        }
        
        // Preparar los datos para Strapi
        const strapiData: Record<string, unknown> = {
            title: jsonData.title,
            slug: jsonData.slug, // Agregar el slug generado
            description: jsonData.description,
            country: jsonData.country,
            city: jsonData.city,
            region: jsonData.region,
            area: jsonData.area,
            propertyStatus: jsonData.propertyStatus,
            offerType: jsonData.offerType,
            propertyUse: jsonData.propertyUse,
            propertyType: jsonData.propertyType,
            platinum: jsonData.platinum || false,
            // Asignar automáticamente al affiliateCompany y usuario
            affiliateCompany: userAffiliateCompany.id,
            users: userId
        };
        
        console.log('Propiedad será asignada a:', {
            affiliateCompany: userAffiliateCompany.title,
            userId: userId
        });

        // Created_by_api - omitir hasta resolver configuración definitiva en Strapi
        if (userId) {
            console.log('Usuario obtenido:', userId, '- created_by_api omitido temporalmente');
            console.log('NOTA: Para habilitar created_by_api, verificar configuración del campo en Strapi');
        } else {
            console.log('No se pudo obtener el ID del usuario');
        }
        
        // TODO: El campo created_by_api requiere configuración correcta en Strapi:
        // 1. Verificar que el campo existe en Content-Type Builder
        // 2. Confirmar que la relación es manyToOne -> admin::user
        // 3. Reiniciar Strapi después de cambios
        // 4. Verificar permisos del rol Authenticated
        // Una vez resuelto: strapiData.created_by_api = userId;

        // Manejar certificaciones solo si tiene valor
        console.log('Certificaciones recibidas:', jsonData.certifications);
        if (jsonData.certifications && jsonData.certifications.trim() !== '') {
            // Convertir certificaciones de string a array de objetos para Strapi blocks
            const certificationsList = jsonData.certifications.split(',').map((cert: string) => cert.trim()).filter((cert: string) => cert !== '');
            console.log('Lista de certificaciones procesada:', certificationsList);
            if (certificationsList.length > 0) {
                strapiData.certifications = certificationsList.map((cert: string) => ({
                    type: 'paragraph',
                    children: [{ type: 'text', text: cert }]
                }));
                console.log('Certificaciones estructuradas para Strapi:', strapiData.certifications);
            }
        } else {
            console.log('No hay certificaciones para procesar');
        }

        // Manejar ctaButton con la estructura correcta del componente Button de Strapi
        console.log('CTA Button recibido:', jsonData.ctaButton);
        if (jsonData.ctaButton && jsonData.ctaButton.trim() !== '') {
            strapiData.ctaButton = {
                text: "Solicitar información",
                link: jsonData.ctaButton
            };
            console.log('CTA Button agregado con estructura correcta:', strapiData.ctaButton);
        } else {
            console.log('No hay CTA Button para agregar - campo vacío o no proporcionado');
        }

        // Primero subir las imágenes si existen
        const uploadedImageIds: number[] = [];
        console.log('Verificando si hay imágenes en formData...');
        console.log('formData.has("imgGallery"):', formData.has('imgGallery'));
        
        if (formData.has('imgGallery')) {
            const images = formData.getAll('imgGallery') as File[];
            console.log('Imágenes encontradas en formData:', images.length);
            console.log('Detalles de las imágenes:', images.map(img => ({
                name: img.name,
                size: img.size,
                type: img.type
            })));
            
            console.log(`Subiendo ${images.length} imágenes primero...`);
            
            for (const image of images) {
                try {
                    // Crear FormData para la imagen
                    const imageFormData = new FormData();
                    imageFormData.append('files', image);
                    
                    // Subir imagen a Strapi
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
                    } else {
                        const errorText = await uploadResponse.text();
                        console.error('Error subiendo imagen:', uploadResponse.status, errorText);
                    }
                } catch (imageError) {
                    console.error('Error subiendo imagen:', imageError);
                }
            }
        }

        // Agregar las imágenes a los datos del inmueble si se subieron correctamente
        if (uploadedImageIds.length > 0) {
            strapiData.imgGallery = uploadedImageIds;
            console.log('Imágenes agregadas a los datos del inmueble:', uploadedImageIds);
        } else {
            console.log('No se agregaron imágenes al inmueble - uploadedImageIds está vacío');
        }
        
        console.log('Slug generado:', jsonData.slug);
        console.log('Token del usuario:', token ? 'Presente' : 'Ausente');
        console.log('Campo created_by_api en strapiData:', strapiData.created_by_api);
        console.log('Datos finales que se enviarán a Strapi:', JSON.stringify(strapiData, null, 2));

        // Crear el registro en Strapi con autenticación
        console.log('Creando inmueble en Strapi...');
        const strapiUrl = `${strapiBaseUrl}/api/real-state-offers`;
        
        
        // Usar fetch directo con el endpoint correcto de Strapi
        const strapiResponse = await fetch(strapiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ data: strapiData })
        });
        
        
        if (!strapiResponse.ok) {
            const errorText = await strapiResponse.text();
            console.error('Error de Strapi:', strapiResponse.status, errorText);
            
            // Si es 405, puede ser que el endpoint no esté habilitado
            if (strapiResponse.status === 405) {
                throw new Error('El endpoint de Strapi no está habilitado para crear inmuebles. Verifica los permisos en el panel de Strapi.');
            }
            
            // Si es 403, es un problema de permisos
            if (strapiResponse.status === 403) {
                throw new Error('No tienes permisos para crear inmuebles. Verifica que tu usuario tenga el rol correcto en Strapi.');
            }
            
            // Si es 400, es un problema de validación
            if (strapiResponse.status === 400) {
                console.error('Error de validación de Strapi:', errorText);
                throw new Error(`Error de validación: ${errorText}`);
            }
            
            throw new Error(`Strapi error: ${strapiResponse.status} - ${errorText}`);
        }
        
        const response = await strapiResponse.json();
        console.log('Inmueble creado exitosamente:', response.data.id);

        return NextResponse.json({
            success: true,
            data: response,
            message: 'Inmueble creado exitosamente'
        });

    } catch (error) {
        console.error('=== ERROR CREATING REAL STATE OFFER ===');
        console.error('Error completo:', error);
        console.error('Error message:', error instanceof Error ? error.message : 'Error desconocido');
        console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
        
        return NextResponse.json({ 
            error: 'Error al crear el inmueble',
            success: false,
            details: error instanceof Error ? error.message : 'Error desconocido',
            fullError: error
        }, { status: 500 });
    }
}
