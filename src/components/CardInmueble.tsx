"use client";

import IconTipoOferta from "@/assets/img/icon-oferta.svg";
import IconTipoInmueble from "@/assets/img/icon-inmueble.svg";
import IconUsoInmueble from "@/assets/img/icon-uso.svg";
import IconArea from "@/assets/img/icon-area.svg";
import IconEstado from "@/assets/img/icon-nuevo-usado.svg";
import PhotoExample from "@/assets/img/foto-ejemplo.jpg";
import Button from "@/utils/Button";
import IconStar from "@/assets/img/star.svg"

interface CardInmuebleProps {
  id: string;
  title: string;
  image?: string;
  tipoOferta?: string;
  tipoInmueble?: string;
  usoInmueble?: string;
  ciudad?: string;
  pais?: string;
  estado?: string;
  area?: string;
  platinum?: boolean;
}

export default function CardInmueble({
  id,
  title,
  image,
  tipoOferta,
  tipoInmueble,
  usoInmueble,
  ciudad,
  pais,
  estado,
  area,
  platinum,
}: CardInmuebleProps) {
  return (
    <div className="bg-white shadow-lg rounded-tr-2xl rounded-bl-2xl rounded-br-2xl overflow-hidden hover:shadow-2xl transition-all duration-300">
      <div className="relative">
        <img
          src={image || PhotoExample.src}
          alt="Inmueble"
          className="w-full h-60 object-cover"
        />
        {platinum && (
          <div className="absolute shadow-lg top-3 left-0 bg-details text-background-1 text-button pl-2 pr-4 py-1 rounded-tr-2xl rounded-br-2xl flex items-center gap-1">
            <img className="w-4 h-4" src={IconStar.src} alt="Icono" />
            <span>Inmueble Platino</span>
          </div>
        )}
      </div>
      <div className="p-8 pb-2 text-text-primary">
        <h3 className="text-h5">{title}</h3>
        <p className="text-caption">
          {ciudad}/{pais}
        </p>
        <hr className="my-4 border-slate-300" />
        {/* Features */}
        <ul className="flex flex-col gap-2">
          {tipoOferta && (
            <li className="flex items-center gap-1 text-body2">
              <img src={IconTipoOferta.src} alt="Icono" />
              <p>{tipoOferta}</p>
            </li>
          )}
          {tipoInmueble && (
            <li className="flex items-center gap-1 text-body2">
              <img src={IconTipoInmueble.src} alt="Icono" />
              <p>{tipoInmueble}</p>
            </li>
          )}
          {usoInmueble && (
            <li className="flex items-center gap-1 text-body2">
              <img src={IconUsoInmueble.src} alt="Icono" />
              <p>{usoInmueble}</p>
            </li>
          )}
          {area && (
            <li className="flex items-center gap-1 text-body2">
              <img src={IconArea.src} alt="Icono" />
              <p>{area}</p>
            </li>
          )}
          {estado && (
            <li className="flex items-center gap-1 text-body2">
              <img src={IconEstado.src} alt="Icono" />
              <p>{estado}</p>
            </li>
          )}
        </ul>
        <hr className="my-4 border-slate-300" />
        <Button
          onClick={() => console.log(id)}
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
