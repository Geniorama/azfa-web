"use client";

import IconTipoOferta from "@/assets/img/icon-oferta.svg";
import IconTipoInmueble from "@/assets/img/icon-inmueble.svg";
import IconUsoInmueble from "@/assets/img/icon-uso.svg";
import IconArea from "@/assets/img/icon-area.svg";
import IconEstado from "@/assets/img/icon-nuevo-usado.svg";
import Button from "@/utils/Button";
import { InmuebleType } from "@/types/inmuebleType";
import PlatinumBadge from "@/utils/PlatinumBadge";
import { getCountryName } from "@/utils/countryMapping";
import { TfiPlus } from "react-icons/tfi";

interface CardInmuebleProps extends InmuebleType {
  button: {
    label: string;
    onClick?: () => void;
  };
  showPlusIcon?: boolean; // Controla si mostrar el ícono plus cuando no hay imagen
}

export default function CardInmueble({
  id,
  title,
  image,
  offerType,
  propertyType,
  propertyUse,
  city,
  country,
  propertyStatus,
  area,
  platinum,
  button,
  showPlusIcon = false,
}: CardInmuebleProps) {
  // Función para formatear offerType array
  const formatOfferType = (offerTypes?: string[]) => {
    if (!offerTypes || offerTypes.length === 0) return "";
    // Capitalizar la primera letra de cada tipo
    return offerTypes
      .map((type) => type.charAt(0).toUpperCase() + type.slice(1))
      .join(", ");
    // return offerTypes.join(', ');
  };

  // Función para formatear propertyType array
  const formatPropertyType = (propertyTypes?: string[]) => {
    if (!propertyTypes || propertyTypes.length === 0) return "";
    return propertyTypes
      .map((type) => type.charAt(0).toUpperCase() + type.slice(1))
      .join(", ");
  };

  // Función para formatear propertyUse array
  const formatPropertyUse = (propertyUses?: string[]) => {
    if (!propertyUses || propertyUses.length === 0) return "";
    return propertyUses
      .map((use) => use.charAt(0).toUpperCase() + use.slice(1))
      .join(", ");
  };

  return (
    <div
      className={`card-inmueble-${id} bg-white rounded-tr-2xl shadow-none rounded-bl-2xl rounded-br-2xl overflow-hidden hover:shadow-lg transition-all duration-300}`}
    >
      <div className="relative">
        {image ? (
          <>
            <img
              src={image}
              alt="Inmueble"
              className="w-full h-full object-cover aspect-video"
            />
            {platinum && (
              <div className="absolute top-5 left-0">
                <PlatinumBadge />
              </div>
            )}
          </>
        ) : (
          <div onClick={button.onClick || (() => {})} className={`${showPlusIcon ? 'cursor-pointer' : ''} w-full h-full object-cover aspect-video bg-background-2 flex items-center justify-center`}>
            {showPlusIcon && <TfiPlus className="text-5xl text-white" />}
          </div>
        )}
      </div>
      <div className="p-8 pb-2 text-text-primary">
        <h3 className="text-h5">{title}</h3>
        {country && (
          <>
            <p className="text-caption">
              {city} / {getCountryName(country || "")}
            </p>
            <hr className="my-4 border-slate-300" />
          </>
        )}

        {/* Features */}
        <ul className="flex flex-col gap-2">
          {offerType && offerType.length > 0 && (
            <li className="flex items-center gap-1 text-body2">
              <img src={IconTipoOferta.src} alt="Icono" />
              <p>{formatOfferType(offerType)}</p>
            </li>
          )}
          {propertyType && propertyType.length > 0 && (
            <li className="flex items-center gap-1 text-body2">
              <img src={IconTipoInmueble.src} alt="Icono" />
              <p>{formatPropertyType(propertyType)}</p>
            </li>
          )}
          {propertyUse && propertyUse.length > 0 && (
            <li className="flex items-center gap-1 text-body2">
              <img src={IconUsoInmueble.src} alt="Icono" />
              <p>{formatPropertyUse(propertyUse)}</p>
            </li>
          )}
          {area && (
            <li className="flex items-center gap-1 text-body2">
              <img src={IconArea.src} alt="Icono" />
              <p>{area}</p>
            </li>
          )}
          {propertyStatus && (
            <li className="flex items-center gap-1 text-body2">
              <img src={IconEstado.src} alt="Icono" />
              <p>{propertyStatus}</p>
            </li>
          )}
        </ul>
        <hr className="my-4 border-slate-300" />
        <Button
          onClick={button.onClick || (() => {})}
          icon={true}
          fullWidth={true}
          className="mt-4 bg-white text-text-primary hover:bg-white hover:text-text-primary underline decoration-transparent decoration-2 underline-offset-6 hover:decoration-details !px-0"
        >
          <span className="text-text-primary">{button.label}</span>
        </Button>
      </div>
    </div>
  );
}
