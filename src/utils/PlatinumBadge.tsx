import IconStar from "@/assets/img/star.svg";

export default function PlatinumBadge() {
  return (
    <div className="shadow-lg bg-details text-background-1 text-button pl-2 pr-4 py-1 rounded-tr-2xl rounded-br-2xl flex items-center gap-1">
      <img className="w-4 h-4" src={IconStar.src} alt="Icono" />
      <span>Inmueble Platino</span>
    </div>
  );
}
