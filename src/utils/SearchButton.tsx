import SearchIcon from "@/assets/img/search-icon.svg";

interface SearchButtonProps {
  onClick?: () => void;
  className?: string;
}

export default function SearchButton({
  onClick,
  className,
}: SearchButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full md:w-auto md:aspect-square flex-row md:flex-col items-center cursor-pointer bg-text-primary rounded-tr-full rounded-br-full md:rounded-full p-6 transition relative hover:bg-text-secondary justify-between md:justify-center ${className}`}
    >
      <span className="text-body md:hidden md:text-md text-white">
        Buscar ahora
      </span>
      <div className="flex flex-row items-center gap-2">
        <img src={SearchIcon.src} alt="Search Icon" className="w-7 h-7" />
        <span className="h-[1px] w-7 bg-details block mt-2 absolute bottom-5"></span>
      </div>
    </button>
  );
}
