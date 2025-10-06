"use client";

import HeadingPage from "@/components/HeadingPage";
import bgInmuebles from "@/assets/img/bg-inmuebles.png";
import CardInmueble from "@/components/CardInmueble";
import { useState } from "react";
import Button from "@/utils/Button";
import { useRouter } from "next/navigation";

export default function MisInmueblesView() {
  const [availableProperties] = useState(5);
  const router = useRouter();

  // const handleEditInmueble = (id: string) => {
  //   router.push(`/portal-afiliados/mis-inmuebles/editar/${id}`);
  // };

  const handleAddInmueble = () => {
    router.push(`/portal-afiliados/mis-inmuebles/agregar-inmueble`);
  };

  return (
    <div className="bg-background-1">
      <HeadingPage
        title="Inmuebles disponibles"
        smallTitle="Bienvenidos al módulo de edición de inmuebles de la sección de oferta inmobiliaria, aquí usted podrá ver, agregar o editar sus inmuebles"
        image={bgInmuebles.src}
      />

      <section className="bg-background-1 py-12 lg:py-16">
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {Array.from({ length: availableProperties }).map((_, index) => (
                <CardInmueble
                key={index}
                id={index.toString()}
                title={`Sin asignar`}
                button={{
                    label: "Editar",
                    onClick: () => handleAddInmueble(),
                }}
                />
            ))}
            </div>
        </div>
      </section>

      <section className="bg-white pb-12 lg:pb-16">
        <div className="container mx-auto px-4 py-16">
            <div className="flex flex-col md:flex-row gap-6 max-w-screen-lg mx-auto items-center border border-details-hover p-12">
            <div className="w-full md:w-3/5 text-text-primary space-y-2">
                <p className="text-h6">Usted puede asignar hasta 5 inmuebles</p>
                <div className="text-body font-light">
                <p>
                    Si requiere inmuebles adicionales puede contactarse con el
                    equipo AZFA
                </p>
                </div>
            </div>
            <div className="w-full md:w-2/5 lg:text-right">
                <Button
                variant="secondary"
                className="inline-flex justify-between h-auto"
                icon
                onClick={() => console.log("Contactar con el equipo AZFA")}

                >
                Solicitar más inmuebles
                </Button>
            </div>
            </div>
        </div>
      </section>
    </div>
  );
}
