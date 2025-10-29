"use client";

import HeadingPage from "@/components/HeadingPage";
import bgInmuebles from "@/assets/img/bg-inmuebles.png";
import CardInmueble from "@/components/CardInmueble";
import Button from "@/utils/Button";
import { useRouter } from "next/navigation";
import { useAffiliateRealStateOffers } from "@/hooks/useAffiliateRealStateOffers";
import { useAuth } from "@/hooks/useAuth";
import LoadingSpinner from "@/components/LoadingSpinner";
export default function MisInmueblesView() {
  const router = useRouter();
  const { user } = useAuth();
  const { offers, loading, error, availableSlots, propertiesLimit, hasAvailableSlots } = useAffiliateRealStateOffers();

  const handleEditInmueble = (documentId: string) => {
    router.push(`/portal-afiliados/mis-inmuebles/editar/${documentId}`);
  };

  const handleAddInmueble = () => {
    router.push(`/portal-afiliados/mis-inmuebles/agregar-inmueble`);
  };

  const handleContactWithAZFA = () => {
    window.open("mailto:info@asociacionzonasfrancas.org", "_blank");
  };

  // Mostrar spinner mientras carga
  if (loading) {
    return (
      <div className="bg-background-1">
        <HeadingPage
          title="Inmuebles disponibles"
          smallTitle="Bienvenidos al módulo de edición de inmuebles de la sección de oferta inmobiliaria, aquí usted podrá ver, agregar o editar sus inmuebles"
          image={bgInmuebles.src}
          description={user?.affiliateCompany?.title || ""}
        />
        <div className="flex justify-center items-center py-20">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  // Mostrar error si no hay affiliateCompany
  if (!user?.affiliateCompany) {
    return (
      <div className="bg-background-1">
        <HeadingPage
          title="Inmuebles disponibles"
          smallTitle="Bienvenidos al módulo de edición de inmuebles de la sección de oferta inmobiliaria, aquí usted podrá ver, agregar o editar sus inmuebles"
          image={bgInmuebles.src}
        />
        <div className="container mx-auto px-4 py-20">
          <div className="text-center text-text-primary">
            <p className="text-h5 mb-4">No se encontró información de la empresa afiliada</p>
            <p className="text-body">Por favor, contacte al administrador para asociar su cuenta a una empresa.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background-1">
      <HeadingPage
        title="Inmuebles disponibles"
        smallTitle={`Bienvenidos al módulo de edición de inmuebles. Aquí usted podrá ver, agregar o editar los inmuebles de su empresa.`}
        image={bgInmuebles.src}
        description={user?.affiliateCompany?.title || ""}
      />

      <section className="bg-background-1 py-12 lg:py-16">
        <div className="container mx-auto px-4">
          {error && (
            <div className="mb-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {/* Mostrar las propiedades existentes */}
            {offers.map((offer) => (
              <CardInmueble
                key={offer.id}
                id={offer.id}
                title={offer.title}
                image={offer.image}
                propertyType={offer.propertyType}
                offerType={offer.offerType}
                city={offer.city}
                country={offer.country}
                area={offer.area}
                platinum={offer.platinum}
                button={{
                  label: "Editar",
                  onClick: () => handleEditInmueble(offer.documentId || offer.id),
                }}
              />
            ))}

            {/* Mostrar espacios disponibles */}
            {hasAvailableSlots && Array.from({ length: availableSlots }).map((_, index) => (
              <CardInmueble
                key={`available-${index}`}
                id={`available-${index}`}
                title="Sin asignar"
                showPlusIcon={true}
                button={{
                  label: "Asignar inmueble",
                  onClick: () => {
                    if (hasAvailableSlots) {
                      handleAddInmueble();
                    }
                  },
                }}
              />
            ))}
          </div>

          {/* Mensaje si no hay espacios disponibles */}
          {!hasAvailableSlots && offers.length >= propertiesLimit && (
            <div className="mt-8 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-h6 text-yellow-800 mb-2">Límite de inmuebles alcanzado</p>
              <p className="text-body text-yellow-700">
                Ha utilizado todos los espacios disponibles ({propertiesLimit} inmuebles). 
                Si necesita agregar más propiedades, solicite espacios adicionales al equipo AZFA.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="bg-white pb-12 lg:pb-16">
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col md:flex-row gap-6 max-w-screen-lg mx-auto items-center border border-details-hover p-12">
            <div className="w-full md:w-3/5 text-text-primary space-y-2">
              <p className="text-h6">Usted puede asignar hasta {propertiesLimit} inmuebles</p>
              <div className="text-body font-light">
                <p>
                  Si requiere inmuebles adicionales puede contactarse con el equipo AZFA
                </p>
              </div>
            </div>
            <div className="w-full md:w-2/5 lg:text-right">
              <Button
                variant="secondary"
                className="inline-flex justify-between h-auto"
                icon
                onClick={handleContactWithAZFA}
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
