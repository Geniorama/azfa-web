"use client"

import HeadingPage from "@/components/HeadingPage"
import { TfiPlus } from "react-icons/tfi";
import MultipleSelector from "@/utils/MultipleSelector";
import { useState } from "react";
import Button from "@/utils/Button";

export default function AgregarInmuebleView() {
  // Estado para manejar los valores seleccionados
  const [selectedValues, setSelectedValues] = useState({
    offerType: [] as string[],
    propertyUse: [] as string[]
  })

  // Estado para condición del inmueble (select simple)
  const [propertyCondition, setPropertyCondition] = useState("")

  // Opciones para el tipo de oferta
  const offerTypeOptions = [
    { value: "venta", label: "Venta" },
    { value: "arriendo", label: "Arriendo" },
    { value: "venta-arriendo", label: "Venta y Arriendo" },
    { value: "opcion-compra", label: "Opción de Compra" },
    { value: "leasing", label: "Leasing" }
  ]

  // Opciones para el uso del inmueble
  const propertyUseOptions = [
    { value: "residencial", label: "Residencial" },
    { value: "comercial", label: "Comercial" },
    { value: "industrial", label: "Industrial" },
    { value: "oficina", label: "Oficina" },
    { value: "hotelero", label: "Hotelero" },
    { value: "educativo", label: "Educativo" },
    { value: "salud", label: "Salud" },
    { value: "recreativo", label: "Recreativo" }
  ]


  // Función para manejar cambios en los valores
  const handleValueChange = (field: string, value: string[]) => {
    setSelectedValues(prev => ({
      ...prev,
      [field]: value
    }))
  }
  const BoxAddImage = () => {
    return (
      <div className="w-30 aspect-square bg-white flex items-center justify-center rounded-md border border-background-2">
        <TfiPlus className="text-2xl text-background-3" />
      </div>
    )
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
                            <p className="text-body1">3/5 inmuebles usados</p>
                        </div>
                    </div>

                    <form className="text-text-primary mt-5 space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="title" className="text-body1 font-medium block">Nombre del inmueble</label>
                            <input type="text" id="title" placeholder="Escriba el nombre del inmueble" className="w-full p-2 rounded-md border border-background-2 focus:outline-details" />
                        </div>

                        {/* Two columns */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label htmlFor="country" className="text-body1 font-medium block">País</label>
                                <select name="country" id="country" className="w-full p-2 rounded-md border border-background-2 focus:outline-details">
                                    <option value="AR">Argentina</option>
                                    <option value="BR">Brasil</option>
                                    <option value="CL">Chile</option>
                                    <option value="CO">Colombia</option>
                                    <option value="PE">Perú</option>
                                    <option value="UY">Uruguay</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="city" className="text-body1 font-medium block">Ciudad</label>
                                <input type="text" id="city" placeholder="Ingrese el nombre de la ciudad" className="w-full p-2 rounded-md border border-background-2 focus:outline-details" />
                            </div>
                        </div>

                        <div className="space-y-2">
                                <label htmlFor="images" className="text-body1 font-medium block">Imágenes del inmueble</label>
                                <div className="flex gap-4 w-full">
                                    {Array.from({ length: 5 }).map((_, index) => (
                                        <BoxAddImage key={index} />
                                    ))}
                                </div>
                                
                                {/* <input type="file" id="images" className="w-full p-2 rounded-md border border-background-2 focus:outline-details" /> */}
                        </div>

                        <div className="space-y-2">
                            <p className="text-body1 font-medium block">Características generales</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Offer type 
                                Multiple select
                                */}
                                <div>
                                    <label htmlFor="offerType" className="text-body1 font-medium block">Tipo de oferta</label>
                                    
                                    <MultipleSelector
                                        options={offerTypeOptions}
                                        selectedValues={selectedValues.offerType}
                                        onChange={(value) => handleValueChange('offerType', value)}
                                        placeholder="Selecciona tipos de oferta..."
                                        searchable={true}
                                    />  
                                </div>

                                {/* Property type */}
                                <div>
                                    <label htmlFor="propertyUse" className="text-body1 font-medium block">Uso del inmueble</label>
                                    <MultipleSelector
                                        options={propertyUseOptions}
                                        selectedValues={selectedValues.propertyUse}
                                        onChange={(value) => handleValueChange('propertyUse', value)}
                                        placeholder="Selecciona usos del inmueble..."
                                        searchable={true}
                                    />
                                </div>

                                {/* Property condition */}
                                <div>
                                    <label htmlFor="propertyCondition" className="text-body1 font-medium block">Nuevo o usado</label>
                                    <select 
                                        name="propertyCondition" 
                                        id="propertyCondition" 
                                        value={propertyCondition}
                                        onChange={(e) => setPropertyCondition(e.target.value)}
                                        className="w-full p-2 rounded-md border border-background-2 focus:outline-details"
                                    >
                                        <option value="">Selecciona una opción</option>
                                        <option value="nuevo">Nuevo</option>
                                        <option value="usado">Usado</option>
                                    </select>
                                </div>

                                {/* Property area */}
                                <div>
                                    <label htmlFor="propertyArea" className="text-body1 font-medium block">Área (m²)</label>
                                    <input type="number" id="propertyArea" placeholder="Ingrese el área del inmueble" className="w-full p-2 rounded-md border border-background-2 focus:outline-details" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            {/* Property description */}
                            <label htmlFor="propertyDescription" className="text-body1 font-medium block">Descripción</label>
                                <p className="text-body2 font-light">Ingrese la descripción teniendo en cuenta que un rango efectivo es entre 400 y 600 caracteres máximo.</p>
                                <textarea id="propertyDescription" placeholder="Ingrese la descripción del inmueble" rows={6} className="w-full p-2 rounded-md border border-background-2 focus:outline-details" />
                        </div>

                        <div className="space-y-2">
                            {/* Property certifications */}
                            <label htmlFor="propertyCertifications" className="text-body1 font-medium block">Certificaciones</label>
                            <p className="text-body2 font-light">Tenga en cuenta que las certificaciones se muestran en forma de lista, por lo que se requiere que sean muy puntuales.</p>
                            <textarea id="propertyCertifications" placeholder="Ingrese las certificaciones del inmueble, separadas por comas. Ej: Certificado de energía, Certificado de agua, Certificado de gas, etc." rows={6} className="w-full p-2 rounded-md border border-background-2 focus:outline-details" />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="propertyButton" className="text-body1 font-medium block">Botón "solicitar información"</label>
                            <p className="text-body2 font-light">Agregue un link a una url o chat donde los usuarios pueden solicitar información.</p>
                            <input type="text" id="propertyButton" placeholder="Ingrese el texto del botón. Ej: https://chat-empresa.org" className="w-full p-2 rounded-md border border-background-2 focus:outline-details" />
                        </div>

                        <div className="space-y-2 text-center mt-10">
                            <Button variant="primary" className="justify-between mx-auto w-full lg:w-auto" icon onClick={() => console.log("Guardar inmueble")}>Guardar</Button>
                        </div>
                    </form>
                </div>

                
            </div>
        </section>
    </div>
  )
}
