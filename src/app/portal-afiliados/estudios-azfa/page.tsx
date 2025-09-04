"use client";

import HeadingPagePortal from "@/components/HeadingPagePortal";
import CustomSelect from "@/utils/CustomSelect";

export default function EstudiosAzfa() {
  return (
    <div>
      <HeadingPagePortal
        title="Estudios AZFA"
        smallTitle="Consulte y descargue informes, estudios técnicos y documentos exclusivos disponibles para los miembros de AZFA"
        image={"/images/estudios-azfa.jpg"}
      />

      {/* Filters */}
      <section className="bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-row gap-4 py-6 text-text-primary">
            <CustomSelect
              options={[
                { label: "Publicación", value: "publicacion" },
                { label: "Estudio", value: "estudio" },
                { label: "Documento", value: "documento" },
              ]}
              onChange={() => {}}
              name="tipo-publicacion"
              label="Tipo de publicación"
              selected="publicacion"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
