'use client'

import CiudadOfertaImg from "@/assets/img/ciudad-oferta-inmobiliaria.svg";
import AdvancedSearchBar from "@/components/AdvancedSearchBar";
import CardInmueble from "@/components/CardInmueble";
import Pagination from "@/components/Pagination";

export default function OfertaInmobiliaria() {
  return (
    <div>
      <section className="py-16">
        <div className="container mx-auto px-4 text-center flex flex-col gap-6">
          <div>
            <h5 className="text-h4 text-text-secondary">
              Invierta en Zonas Francas
            </h5>
            <h1 className="text-h1 text-primary">Oferta Inmobiliaria</h1>
          </div>
          <p className="text-h6 text-text-primary">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum,
            asperiores sit nam facere consequuntur dolore quo repellendus enim
            eligendi dolor.
          </p>

          <div className="flex justify-center bg-white mt-16 pb-16 pt-8 px-5">
            <img
              className="w-full"
              src={CiudadOfertaImg.src}
              alt="Ciudad Oferta"
            />
          </div>
        </div>
      </section>

      <section>
        <div className="container mx-auto px-16 -mt-24 z-10 mb-6 relative">
          <AdvancedSearchBar />
        </div>
      </section>

      <section>
        <div className="container mx-auto pb-16 px-16">
          <p className="text-5 text-text-primary text-center my-10">
            Se encontraron <span className="font-bold">27</span> inmuebles que
            coinciden con su búsqueda
          </p>

          {/* Gird Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <CardInmueble
              id="1"
              title="Casa en venta"
              tipoOferta="Venta"
              tipoInmueble="Casa"
              usoInmueble="Terreno"
              ciudad="San José"
              pais="Costa Rica"
              estado="Nuevo"
              area="3.000m2"
              platinum={true}
            />
            <CardInmueble
              id="2"
              title="Casa en venta"
              tipoOferta="Venta"
              tipoInmueble="Casa"
              usoInmueble="Terreno"
              ciudad="San José"
              pais="Costa Rica"
              estado="Nuevo"
              area="3.000m2"
            />
            <CardInmueble
              id="3"
              title="Casa en venta"
              tipoOferta="Venta"
              tipoInmueble="Casa"
              usoInmueble="Terreno"
              ciudad="San José"
              pais="Costa Rica"
              estado="Nuevo"
              area="3.000m2"
              platinum={true}
            />
            <CardInmueble
              id="4"
              title="Casa en venta"
              tipoOferta="Venta"
              pais="Costa Rica"
              estado="Nuevo"
              area="3.000m2"
            />
            <CardInmueble
              id="5"
              title="Casa en venta"
              tipoOferta="Venta"
              tipoInmueble="Casa"
              usoInmueble="Terreno"
              ciudad="San José"
              pais="Costa Rica"
              estado="Nuevo"
              area="3.000m2"
            />
            <CardInmueble
              id="6"
              title="Casa en venta"
              tipoOferta="Venta"
              tipoInmueble="Casa"
              usoInmueble="Terreno"
              ciudad="San José"
              pais="Costa Rica"
              estado="Nuevo"
              area="3.000m2"
            />
          </div>
          
        </div>
      </section>

      <section>
        <div className="container mx-auto pb-16 px-16 flex justify-center">
          <Pagination currentPage={1} totalPages={6} onPageChange={() => console.log('clicked')} />
        </div>
      </section>
    </div>
  );
}
