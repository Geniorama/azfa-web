"use client";

import IconTipoOferta from "@/assets/img/icon-oferta.svg";
import IconTipoInmueble from "@/assets/img/icon-inmueble.svg";
import IconUsoInmueble from "@/assets/img/icon-uso.svg";
import IconArea from "@/assets/img/icon-area.svg";
import IconEstado from "@/assets/img/icon-nuevo-usado.svg";
import PhotoExample from "@/assets/img/foto-ejemplo.jpg";
import Button from "@/utils/Button";
import { useRouter } from "next/navigation";
import { InmuebleType } from "@/types/inmuebleType";
import PlatinumBadge from "@/utils/PlatinumBadge";


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
  slug,
}: InmuebleType) {
  const router = useRouter();
  return (
    <div className={`card-inmueble-${id} bg-white shadow-lg rounded-tr-2xl rounded-bl-2xl rounded-br-2xl overflow-hidden hover:shadow-2xl transition-all duration-300}`}>
      <div className="relative">
        <img
          src={image || PhotoExample.src}
          alt="Inmueble"
          className="w-full h-60 object-cover"
        />
        {platinum && (
          <div className="absolute top-5 left-0">
            <PlatinumBadge />
          </div>
        )}
      </div>
      <div className="p-8 pb-2 text-text-primary">
        <h3 className="text-h5">{title}</h3>
        <p className="text-caption">
            {city} / {country}
        </p>
        <hr className="my-4 border-slate-300" />
        {/* Features */}
        <ul className="flex flex-col gap-2">
          {offerType && (
            <li className="flex items-center gap-1 text-body2">
              <img src={IconTipoOferta.src} alt="Icono" />
              <p>{offerType}</p>
            </li>
          )}
          {propertyType && (
            <li className="flex items-center gap-1 text-body2">
              <img src={IconTipoInmueble.src} alt="Icono" />
              <p>{propertyType}</p>
            </li>
          )}
          {propertyUse && (
            <li className="flex items-center gap-1 text-body2">
              <img src={IconUsoInmueble.src} alt="Icono" />
              <p>{propertyUse}</p>
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
          onClick={() => router.push(`/oferta-inmobiliaria/${slug}`)}
          icon={true}
          fullWidth={true}
          className="mt-4 bg-white text-text-primary hover:bg-text-secondary hover:text-white"
        >
          Ver más
        </Button>
      </div>
    </div>
  );
}
