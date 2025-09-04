"use client";

import HeadingPagePortal from "@/components/HeadingPagePortal";
import CustomSelect from "@/utils/CustomSelect";
import IconStatistic from "@/assets/img/chart-bar-connected.svg";
import { useState } from "react";
import Button from "@/utils/Button";

export default function EstadisticasAfiliados() {
  const [filters, setFilters] = useState({
    tipoPublicacion: "",
    anioPublicacion: "",
  });

  return (
    <div>
      <HeadingPagePortal
        title="Portal afiliados"
        smallTitle="Explore visualizaciones interactivas con datos comparativos y tendencias clave de las zonas francas en Iberoamérica"
        image={"/images/estadisticas-afiliados.jpg"}
        slug="estadisticas-afiliados"
      />

      {/* Filters */}
      <section className="bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 py-6 text-text-primary justify-center">
            <CustomSelect
              options={[
                { label: "Actuales desde 2024", value: "desde-2024" },
                { label: "Actuales desde 2023", value: "desde-2023" },
                { label: "Actuales desde 2022", value: "desde-2022" },
              ]}
              onChange={(value) => setFilters({ ...filters, tipoPublicacion: value })}
              name="periodo"
              label="Período de estadísticas"
              selected={filters.tipoPublicacion}
              labelIcon={IconStatistic.src}
              placeholder="Seleccione un período"
            />
          </div>
        </div>
      </section>
      <div className="container mx-auto px-4">
        <hr className="border-background-2 w-full" />
      </div>
      <section className="py-4 bg-white">
        <div className="container mx-auto px-4">
          <span className="text-button text-text-primary"> Dashboard interactivo embebido (Power BI)</span>
          
          <div className="my-12">
            {/* Placeholder */}
            <img src="https://placehold.co/1920x1080" alt="Dashboard interactivo embebido (Power BI)" />
          </div>
          
          <div className="flex flex-col md:flex-row gap-6 max-w-screen-lg mx-auto items-center border border-[#94D133] p-12 mt-18">
            <div className="w-full md:w-3/5 text-text-primary space-y-2">
              <p className="text-h6">¿Necesita actualizar la información estadística de su país?</p>
              <p className="text-body font-light">Haga clic en el botón a continuación para acceder al formulario de edición. Recuerde ingresar con su usuario y contraseña asignados para continuar.</p>
            </div>
            <div className="w-full md:w-2/5">
              <Button className="inline-flex justify-between h-auto" icon onClick={() => {}}>
                Editar información de mi país
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
