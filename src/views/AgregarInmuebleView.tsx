"use client"

import HeadingPage from "@/components/HeadingPage"
import { TfiPlus } from "react-icons/tfi";
import MultipleSelector from "@/utils/MultipleSelector";
import Button from "@/utils/Button";
import { useForm, Controller } from "react-hook-form";
import { useRef, useState, useEffect } from "react";
import { TfiClose } from "react-icons/tfi";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useAffiliateRealStateOffers } from "@/hooks/useAffiliateRealStateOffers";

// Tipo para el formulario
interface FormData {
  title: string;
  description: string;
  country: string;
  city: string;
  region: string;
  area: string;
  propertyStatus: string;
  ctaButton: string;
  platinum: boolean;
  offerType: string[];
  propertyUse: string[];
  propertyType: string[];
  certifications: string;
  imgGallery: File[];
}

export default function AgregarInmuebleView() {
  // Hooks para autenticación y navegación
  const { token, isAuthenticated } = useAuth();
  const router = useRouter();
  const { offers, propertiesLimit } = useAffiliateRealStateOffers();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Función para generar slug a partir del título
  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '') // Remover caracteres especiales excepto espacios y guiones
      .replace(/\s+/g, '-') // Reemplazar espacios con guiones
      .replace(/-+/g, '-') // Reemplazar múltiples guiones con uno solo
      .replace(/^-|-$/g, ''); // Remover guiones al inicio y final
  };

  // Función para verificar si un slug existe en Strapi
  const checkSlugExists = async (slug: string): Promise<boolean> => {
    try {
      const response = await fetch(`/api/checkSlug?slug=${encodeURIComponent(slug)}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const result = await response.json();
        return result.exists;
      }
      return false;
    } catch (error) {
      console.error('Error verificando slug:', error);
      return false;
    }
  };

  // Función para generar un slug único
  const generateUniqueSlug = async (title: string): Promise<string> => {
    const baseSlug = generateSlug(title);
    let slug = baseSlug;
    let counter = 1;

    // Verificar si el slug base existe
    let exists = await checkSlugExists(slug);
    
    // Si existe, agregar sufijos hasta encontrar uno único
    while (exists) {
      slug = `${baseSlug}-${counter}`;
      exists = await checkSlugExists(slug);
      counter++;
    }

    return slug;
  };

  // Estado para mostrar el slug generado
  const [generatedSlug, setGeneratedSlug] = useState<string>('');

  // Configuración del formulario con react-hook-form
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch
  } = useForm<FormData>({
    defaultValues: {
      title: "",
      description: "",
      country: "",
      city: "",
      region: "",
      area: "",
      propertyStatus: "",
      ctaButton: "",
      platinum: false,
      offerType: [],
      propertyUse: [],
      propertyType: [],
      certifications: "",
      imgGallery: []
    }
  })

  // Observar cambios en el título para generar slug automáticamente
  const watchedTitle = watch('title');

  // Generar slug automáticamente cuando cambie el título
  useEffect(() => {
    if (watchedTitle && watchedTitle.trim() !== '') {
      const slug = generateSlug(watchedTitle);
      setGeneratedSlug(slug);
    } else {
      setGeneratedSlug('');
    }
  }, [watchedTitle]);

  // Referencia para el input de archivos
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Estados para drag & drop
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Opciones para el tipo de oferta
  const offerTypeOptions = [
    { value: "arriendo", label: "Arriendo" },
    { value: "venta", label: "Venta" },
  ]

  const propertyTypeOptions = [
    { value: "bodega", label: "Bodega" },
    { value: "lote", label: "Lote" },
    { value: "oficina", label: "Oficina" },
  ]

  // Opciones para el uso del inmueble
  const propertyUseOptions = [
    { value: "logistica", label: "Logística" },
    { value: "manufactura", label: "Manufactura" },
    { value: "servicio", label: "Servicio" },
    { value: "data-center", label: "Data Center" },
  ]


  // Verificar autenticación al cargar el componente
  useEffect(() => {
    if (!isAuthenticated || !token) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, token, router]);

  // Función para manejar el envío del formulario
  const onSubmit = async (data: FormData) => {
    if (!token) {
      alert('No tienes permisos para crear inmuebles. Inicia sesión.');
      router.push('/auth/login');
      return;
    }

    try {
      // Crear FormData para enviar archivos
      const formData = new FormData();
      
      // Agregar las imágenes al FormData
      data.imgGallery.forEach((file) => {
        formData.append(`imgGallery`, file);
      });

      // Generar slug único basado en el título
      const uniqueSlug = await generateUniqueSlug(data.title);

      // Agregar el resto de los datos como JSON
      const jsonData = {
        title: data.title,
        slug: uniqueSlug, // Usar slug único
        description: data.description,
        country: data.country,
        city: data.city,
        region: data.region,
        area: data.area,
        propertyStatus: data.propertyStatus,
        offerType: JSON.stringify(data.offerType),
        propertyUse: JSON.stringify(data.propertyUse),
        propertyType: JSON.stringify(data.propertyType),
        platinum: data.platinum,
        certifications: data.certifications,
        ctaButton: data.ctaButton || ""
      };

      // Agregar los datos JSON
      formData.append('data', JSON.stringify(jsonData));

      // Llamada a la API para crear el inmueble
      const response = await fetch('/api/createRealStateOffer', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData // No incluir Content-Type header, el navegador lo establecerá automáticamente
      });
      
      let result;
      try {
        result = await response.json();
      } catch (jsonError) {
        console.error('Error parseando respuesta JSON:', jsonError);
        alert('Error: Respuesta inválida del servidor');
        return;
      }
      
      if (response.ok && result.success) {
        alert('Inmueble creado exitosamente');
        reset(); // Resetear formulario
        setUploadError(null); // Limpiar errores
        // Redirigir a la lista de inmuebles
        setSuccessMessage('El inmueble ha sido guardado correctamente.');
        
        setTimeout(() => {
          router.push('/portal-afiliados/mis-inmuebles');
        }, 5000);
      } else {
        console.error('Error del servidor:', result);
        
        // Si es error de límite alcanzado, mostrar mensaje específico
        if (response.status === 403 && result.currentCount !== undefined) {
          alert(`⚠️ Límite alcanzado\n\nSu empresa ha alcanzado el límite de ${result.limit} propiedades (${result.currentCount} actualmente publicadas).\n\nPara agregar más propiedades, contacte al equipo AZFA para solicitar una ampliación de su límite.`);
          setSuccessMessage('Límite alcanzado');
          router.push('/portal-afiliados/mis-inmuebles');
        } else {
          const errorMessage = result?.error || result?.details || `Error ${response.status}: ${response.statusText}`;
          alert(`Error al crear el inmueble: ${errorMessage}`);
        }
      }

    } catch (error) {
      console.error('Error al guardar inmueble:', error)
      alert('Error de conexión al guardar el inmueble')
    }
  }
  // Validación de archivos
  const validateFiles = (files: File[]): { valid: boolean; error?: string } => {
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    
    for (const file of files) {
      // Validar tipo de archivo
      if (!allowedTypes.includes(file.type)) {
        return { valid: false, error: `Tipo de archivo no permitido: ${file.name}. Solo se permiten JPG, PNG y WebP.` };
      }
      
      // Validar tamaño
      if (file.size > maxSize) {
        return { valid: false, error: `Archivo muy grande: ${file.name}. Máximo 5MB por imagen.` };
      }
    }
    
    return { valid: true };
  };

  // Función para manejar la selección de imágenes
  const handleImageUpload = (files: FileList | null, onChange: (files: File[]) => void, currentFiles: File[] = []) => {
    if (files) {
      const fileArray = Array.from(files);
      const newFiles = [...currentFiles, ...fileArray];
      
      // Validar que no exceda el límite de 5 imágenes
      if (newFiles.length > 5) {
        setUploadError('Máximo 5 imágenes permitidas');
        return;
      }
      
      // Validar archivos
      const validation = validateFiles(fileArray);
      if (!validation.valid) {
        setUploadError(validation.error || 'Error de validación');
        return;
      }
      
      setUploadError(null);
      onChange(newFiles);
    }
  }

  // Función para remover una imagen
  const removeImage = (index: number, onChange: (files: File[]) => void, currentFiles: File[]) => {
    const newFiles = currentFiles.filter((_, i) => i !== index);
    onChange(newFiles);
    setUploadError(null); // Limpiar errores al remover
  }

  // Funciones para drag & drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent, onChange: (files: File[]) => void, currentFiles: File[]) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    handleImageUpload(files, onChange, currentFiles);
  };

  // Componente para mostrar las imágenes
  const ImagePreview = ({ files, onChange }: { files: File[], onChange: (files: File[]) => void }) => {
    return (
      <div className="space-y-4">
        <div className="flex gap-4 w-full flex-wrap">
          {files.map((file, index) => (
            <div key={index} className="relative w-24 h-24">
              <Image
                src={URL.createObjectURL(file)}
                alt={`Preview ${index + 1}`}
                width={96}
                height={96}
                className="w-full h-full object-cover rounded-md border border-background-2"
              />
              <button
                type="button"
                onClick={() => removeImage(index, onChange, files)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
              >
                <TfiClose className="w-3 h-3" />
              </button>
            </div>
          ))}
          
          {files.length < 5 && (
            <div 
              className={`w-24 h-24 bg-white flex items-center justify-center rounded-md border-2 border-dashed cursor-pointer transition-colors ${
                isDragOver ? 'border-blue-500 bg-blue-50' : 'border-background-2 hover:border-background-3'
              }`}
              onClick={() => fileInputRef.current?.click()}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, onChange, files)}
            >
        <TfiPlus className="text-2xl text-background-3" />
            </div>
          )}
        </div>
        
        {uploadError && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3">
            <p className="text-red-600 text-sm">{uploadError}</p>
          </div>
        )}
      </div>
    );
  }


  // Mostrar loading mientras se verifica la autenticación
  if (!isAuthenticated || !token) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-text-primary">Verificando permisos...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
        <HeadingPage
          title="Agregar inmueble"
          smallTitle="Agrega un nuevo inmueble a tu lista de inmuebles"
        />

        <section className="bg-white py-12 lg:py-16">
            <div className="container mx-auto px-4">
                <div className="w-full max-w-screen-md mx-auto text-text-primary">
                    <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
                        <div className="w-full md:w-1/2">
                            <h5 className="text-h5 font-medium">Formulario de inmueble</h5>
                        </div>
                        <div className="w-full md:w-1/2 text-right">
                            <p className="text-body1">{offers.length}/{propertiesLimit} inmuebles usados</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="text-text-primary mt-5 space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="title" className="text-body1 font-medium block">Nombre del inmueble *</label>
                            <input 
                                type="text" 
                                id="title" 
                                {...register("title", { required: "El nombre del inmueble es requerido" })}
                                placeholder="Escriba el nombre del inmueble" 
                                className={`w-full p-2 rounded-md border focus:outline-details ${
                                    errors.title ? 'border-red-500' : 'border-background-2'
                                }`}
                            />
                            {errors.title && (
                                <p className="text-red-500 text-sm">{errors.title.message}</p>
                            )}
                            
                            {/* Mostrar slug generado */}
                            {generatedSlug && (
                                <div className="mt-2 p-2 bg-background-2 rounded-md">
                                    <p className="text-sm text-text-secondary">
                                        <span className="font-medium">Slug generado:</span> 
                                        <span className="ml-2 font-mono text-details">{generatedSlug}</span>
                                    </p>
                                    <small className="text-xs text-text-secondary">
                                        Este será el identificador único de tu inmueble en la URL
                                    </small>
                                </div>
                            )}
                        </div>

                        {/* Two columns */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label htmlFor="country" className="text-body1 font-medium block">País</label>
                                <select 
                                    id="country" 
                                    {...register("country")}
                                    className="w-full p-2 rounded-md border border-background-2 focus:outline-details"
                                >
                                    <option value="">Selecciona un país</option>
                                    
                                    {/* América Latina */}
                                    <optgroup label="América Latina">
                                        <option value="AR">Argentina</option>
                                        <option value="BO">Bolivia</option>
                                        <option value="BR">Brasil</option>
                                        <option value="CL">Chile</option>
                                        <option value="CO">Colombia</option>
                                        <option value="CR">Costa Rica</option>
                                        <option value="CU">Cuba</option>
                                        <option value="DO">República Dominicana</option>
                                        <option value="EC">Ecuador</option>
                                        <option value="SV">El Salvador</option>
                                        <option value="GT">Guatemala</option>
                                        <option value="HN">Honduras</option>
                                        <option value="JM">Jamaica</option>
                                        <option value="MX">México</option>
                                        <option value="NI">Nicaragua</option>
                                        <option value="PA">Panamá</option>
                                        <option value="PY">Paraguay</option>
                                        <option value="PE">Perú</option>
                                        <option value="PR">Puerto Rico</option>
                                        <option value="UY">Uruguay</option>
                                        <option value="VE">Venezuela</option>
                                    </optgroup>
                                    
                                    {/* América del Norte */}
                                    <optgroup label="América del Norte">
                                        <option value="CA">Canadá</option>
                                        <option value="US">Estados Unidos</option>
                                    </optgroup>
                                    
                                    {/* Europa */}
                                    <optgroup label="Europa">
                                        <option value="ES">España</option>
                                        <option value="FR">Francia</option>
                                        <option value="DE">Alemania</option>
                                        <option value="IT">Italia</option>
                                        <option value="PT">Portugal</option>
                                        <option value="UK">Reino Unido</option>
                                        <option value="NL">Países Bajos</option>
                                        <option value="CH">Suiza</option>
                                    </optgroup>
                                    
                                    {/* Asia */}
                                    <optgroup label="Asia">
                                        <option value="CN">China</option>
                                        <option value="JP">Japón</option>
                                        <option value="KR">Corea del Sur</option>
                                        <option value="IN">India</option>
                                        <option value="SG">Singapur</option>
                                    </optgroup>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="city" className="text-body1 font-medium block">Ciudad</label>
                                <input 
                                    type="text" 
                                    id="city" 
                                    {...register("city")}
                                    placeholder="Ingrese el nombre de la ciudad" 
                                    className="w-full p-2 rounded-md border border-background-2 focus:outline-details" 
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="imgGallery" className="text-body1 font-medium block">Imágenes del inmueble</label>
                            <p className="text-body2 font-light">Máximo 5 imágenes. Formatos permitidos: JPG, PNG, WebP. Máximo 5MB por imagen.</p>
                            
                            <Controller
                                name="imgGallery"
                                control={control}
                                render={({ field }) => (
                                    <div>
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            multiple
                                            accept="image/jpeg,image/png,image/webp"
                                            onChange={(e) => handleImageUpload(e.target.files, field.onChange, field.value)}
                                            className="hidden"
                                        />
                                        
                                        {field.value.length === 0 ? (
                                            <div 
                                                className={`flex gap-4 w-full p-4 rounded-lg border-2 border-dashed transition-colors ${
                                                    isDragOver 
                                                        ? 'border-blue-500 bg-blue-50' 
                                                        : 'border-background-2 hover:border-background-3'
                                                }`}
                                                onClick={() => fileInputRef.current?.click()}
                                                onDragOver={handleDragOver}
                                                onDragLeave={handleDragLeave}
                                                onDrop={(e) => handleDrop(e, field.onChange, field.value)}
                                            >
                                                <div className="flex items-center justify-center w-full">
                                                    <div className="text-center">
                                                        <TfiPlus className="text-4xl text-background-3 mx-auto mb-2" />
                                                        <p className="text-background-3 text-sm">
                                                            Arrastra imágenes aquí o haz clic para seleccionar
                                                        </p>
                                                        <p className="text-background-3 text-xs mt-1">
                                                            Máximo 5 imágenes, 5MB cada una
                                                        </p>
                                                    </div>
                                                </div>
                                </div>
                                        ) : (
                                            <ImagePreview files={field.value} onChange={field.onChange} />
                                        )}
                                        
                                        {field.value.length > 0 && (
                                            <p className="text-sm text-background-3 mt-2">
                                                {field.value.length}/5 imágenes seleccionadas
                                            </p>
                                        )}
                                    </div>
                                )}
                            />
                        </div>

                        <div className="space-y-2">
                            <p className="text-body1 font-medium block">Características generales</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Offer type 
                                Multiple select
                                */}
                                <div>
                                    <label htmlFor="offerType" className="text-body1 font-medium block">Tipo de oferta</label>
                                    <Controller
                                        name="offerType"
                                        control={control}
                                        render={({ field }) => (
                                    <MultipleSelector
                                        options={offerTypeOptions}
                                                selectedValues={field.value}
                                                onChange={field.onChange}
                                        placeholder="Selecciona tipos de oferta..."
                                        searchable={true}
                                            />
                                        )}
                                    />  
                                </div>

                                {/* Property use */}
                                <div>
                                    <label htmlFor="propertyUse" className="text-body1 font-medium block">Uso del inmueble</label>
                                    <Controller
                                        name="propertyUse"
                                        control={control}
                                        render={({ field }) => (
                                    <MultipleSelector
                                        options={propertyUseOptions}
                                                selectedValues={field.value}
                                                onChange={field.onChange}
                                        placeholder="Selecciona usos del inmueble..."
                                        searchable={true}
                                            />
                                        )}
                                    />
                                </div>

                                {/* Property type */}
                                <div>
                                    <label htmlFor="propertyType" className="text-body1 font-medium block">Tipo de inmueble</label>
                                    <Controller
                                        name="propertyType"
                                        control={control}
                                        render={({ field }) => (
                                    <MultipleSelector
                                        options={propertyTypeOptions}
                                                selectedValues={field.value}
                                                onChange={field.onChange}
                                        placeholder="Selecciona tipos de inmueble..."
                                        searchable={true}
                                            />
                                        )}
                                    />
                                </div>

                                {/* Property condition */}
                                <div>
                                    <label htmlFor="propertyStatus" className="text-body1 font-medium block">Nuevo o usado</label>
                                    <select 
                                        id="propertyStatus" 
                                        {...register("propertyStatus")}
                                        className="w-full p-2 rounded-md border border-background-2 focus:outline-details"
                                    >
                                        <option value="">Selecciona una opción</option>
                                        <option value="Nuevo">Nuevo</option>
                                        <option value="Usado">Usado</option>
                                    </select>
                                </div>

                                {/* Property area */}
                                <div>
                                    <label htmlFor="area" className="text-body1 font-medium block">Área</label>
                                    <input 
                                        type="text" 
                                        id="area" 
                                        {...register("area")}
                                        placeholder="Ingrese el área del inmueble" 
                                        className="w-full p-2 rounded-md border border-background-2 focus:outline-details" 
                                    />
                                    <small className="text-body2 font-light">Ej: Área 1000 m²</small>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            {/* Property description */}
                            <label htmlFor="description" className="text-body1 font-medium block">Descripción *</label>
                                <p className="text-body2 font-light">Ingrese la descripción teniendo en cuenta que un rango efectivo es entre 400 y 600 caracteres máximo.</p>
                            <textarea 
                                id="description" 
                                {...register("description", { 
                                    required: "La descripción es requerida",
                                    minLength: {
                                        value: 50,
                                        message: "La descripción debe tener al menos 50 caracteres"
                                    }
                                })}
                                placeholder="Ingrese la descripción del inmueble" 
                                rows={6} 
                                className={`w-full p-2 rounded-md border focus:outline-details ${
                                    errors.description ? 'border-red-500' : 'border-background-2'
                                }`}
                            />
                            {errors.description && (
                                <p className="text-red-500 text-sm">{errors.description.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            {/* Property certifications */}
                            <label htmlFor="certifications" className="text-body1 font-medium block">Certificaciones</label>
                            <p className="text-body2 font-light">Tenga en cuenta que las certificaciones se muestran en forma de lista, por lo que se requiere que sean muy puntuales.</p>
                            <textarea 
                                id="certifications" 
                                {...register("certifications")}
                                placeholder="Ingrese las certificaciones del inmueble, separadas por comas. Ej: Certificado de energía, Certificado de agua, Certificado de gas, etc." 
                                rows={6} 
                                className="w-full p-2 rounded-md border border-background-2 focus:outline-details" 
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="ctaButton" className="text-body1 font-medium block">URL del botón &quot;Solicitar información&quot;</label>
                            <p className="text-body2 font-light">
                                Agregue una URL donde los usuarios pueden solicitar información sobre este inmueble. 
                                Puede ser un enlace a WhatsApp, un formulario de contacto, o cualquier otra página.
                            </p>
                            <input 
                                type="text" 
                                id="ctaButton" 
                                {...register("ctaButton", {
                                    pattern: {
                                        value: /^(https?:\/\/.+|mailto:.+)/,
                                        message: "Por favor ingrese una URL válida que comience con http://, https:// o mailto:"
                                    }
                                })}
                                placeholder="Ej: https://wa.me/573001234567?text=Me interesa este inmueble" 
                                className={`w-full p-2 rounded-md border focus:outline-details ${
                                    errors.ctaButton ? 'border-red-500' : 'border-background-2'
                                }`}
                            />
                            {errors.ctaButton && (
                                <p className="text-red-500 text-sm">{errors.ctaButton.message}</p>
                            )}
                            <div className="text-sm text-text-secondary">
                                <p className="font-medium mb-1">Ejemplos de URLs válidas:</p>
                                <ul className="list-disc list-inside space-y-1 text-xs">
                                    <li>WhatsApp: <code className="bg-background-2 px-1 rounded">https://wa.me/573001234567</code></li>
                                    <li>Formulario: <code className="bg-background-2 px-1 rounded">https://empresa.com/contacto</code></li>
                                    <li>Email: <code className="bg-background-2 px-1 rounded">mailto:contacto@empresa.com</code></li>
                                </ul>
                            </div>
                            
                        </div>


                        <div className="space-y-2 text-center mt-10">
                            <Button 
                                type="submit"
                                variant="primary" 
                                className="justify-between mx-auto w-full lg:w-auto" 
                                icon 
                                disabled={isSubmitting}
                                onClick={() => {}}
                            >
                                {isSubmitting ? 'Guardando...' : 'Guardar'}
                            </Button>
                        </div>
                    </form>

                    {/* Succes message */}
                    {successMessage && (
                        <div className="bg-[#94D133] bg-opacity-30 p-3 mt-5 text-center">
                            <p className="text-text-primary text-body1 font-light">{successMessage}</p>
                        </div>
                    )}
                </div>

                
            </div>
        </section>
    </div>
  )
}
