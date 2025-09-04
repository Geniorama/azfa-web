import { RiArrowLeftSLine } from "react-icons/ri";
import { RiArrowRightSLine } from "react-icons/ri";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const renderPageNumbers = () => {
    const pages = [];
    
    if (totalPages <= 5) {
      // Si hay 5 páginas o menos, mostrar todas
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <button
            key={i}
            className={`cursor-pointer rounded-full w-10 h-10 text-[18px] border border-transparent hover:border-text-primary transition ${
              currentPage === i ? "text-white bg-text-primary" : ""
            }`}
            onClick={() => onPageChange(i)}
          >
            {i}
          </button>
        );
      }
    } else {
      // Si hay más de 5 páginas, usar puntos suspensivos
      
      // Siempre mostrar la primera página
      pages.push(
        <button
          key={1}
          className={`cursor-pointer rounded-full w-10 h-10 text-[18px] border border-transparent hover:border-text-primary transition ${
            currentPage === 1 ? "text-white bg-text-primary" : ""
          }`}
          onClick={() => onPageChange(1)}
        >
          1
        </button>
      );
      
      // Si la página actual está lejos del inicio, mostrar puntos suspensivos
      if (currentPage > 3) {
        pages.push(
          <span key="dots1" className="text-text-primary text-[18px] px-2">
            ...
          </span>
        );
      }
      
      // Mostrar páginas alrededor de la página actual
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) {
        if (i !== 1 && i !== totalPages) {
          pages.push(
            <button
              key={i}
              className={`cursor-pointer rounded-full w-10 h-10 text-[18px] border border-transparent hover:border-text-primary transition ${
                currentPage === i ? "text-white bg-text-primary" : ""
              }`}
              onClick={() => onPageChange(i)}
            >
              {i}
            </button>
          );
        }
      }
      
      // Si la página actual está lejos del final, mostrar puntos suspensivos
      if (currentPage < totalPages - 2) {
        pages.push(
          <span key="dots2" className="text-text-primary text-[18px] px-2">
            ...
          </span>
        );
      }
      
      // Siempre mostrar la última página
      if (totalPages > 1) {
        pages.push(
          <button
            key={totalPages}
            className={`cursor-pointer rounded-full w-10 h-10 text-[18px] border border-transparent hover:border-text-primary transition ${
              currentPage === totalPages ? "text-white bg-text-primary" : ""
            }`}
            onClick={() => onPageChange(totalPages)}
          >
            {totalPages}
          </button>
        );
      }
    }
    
    return pages;
  };

  const renderDesktopPageNumbers = () => {
    const pages = [];
    
    if (totalPages <= 9) {
      // Si hay 9 páginas o menos, mostrar todas
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <button
            key={i}
            className={`cursor-pointer rounded-full w-10 h-10 text-[18px] border border-transparent hover:border-text-primary transition ${
              currentPage === i ? "text-white bg-text-primary" : ""
            }`}
            onClick={() => onPageChange(i)}
          >
            {i}
          </button>
        );
      }
    } else {
      // Si hay más de 9 páginas, usar puntos suspensivos
      
      // Siempre mostrar la primera página
      pages.push(
        <button
          key={1}
          className={`cursor-pointer rounded-full w-10 h-10 text-[18px] border border-transparent hover:border-text-primary transition ${
            currentPage === 1 ? "text-white bg-text-primary" : ""
          }`}
          onClick={() => onPageChange(1)}
        >
          1
        </button>
      );
      
      // Calcular el rango de páginas a mostrar
      const halfVisible = 4; // Mostrar 4 páginas a cada lado de la actual
      let start = Math.max(2, currentPage - halfVisible);
      let end = Math.min(totalPages - 1, currentPage + halfVisible);
      
      // Ajustar el rango si estamos cerca de los extremos
      if (currentPage <= 5) {
        end = Math.min(totalPages - 1, 8);
      } else if (currentPage >= totalPages - 4) {
        start = Math.max(2, totalPages - 7);
      }
      
      // Si hay gap entre la primera página y el rango, mostrar puntos suspensivos
      if (start > 2) {
        pages.push(
          <span key="dots1" className="text-text-primary text-[18px] px-2">
            ...
          </span>
        );
      }
      
      // Mostrar páginas en el rango calculado
      for (let i = start; i <= end; i++) {
        pages.push(
          <button
            key={i}
            className={`cursor-pointer rounded-full w-10 h-10 text-[18px] border border-transparent hover:border-text-primary transition ${
              currentPage === i ? "text-white bg-text-primary" : ""
            }`}
            onClick={() => onPageChange(i)}
          >
            {i}
          </button>
        );
      }
      
      // Si hay gap entre el rango y la última página, mostrar puntos suspensivos
      if (end < totalPages - 1) {
        pages.push(
          <span key="dots2" className="text-text-primary text-[18px] px-2">
            ...
          </span>
        );
      }
      
      // Siempre mostrar la última página
      if (totalPages > 1) {
        pages.push(
          <button
            key={totalPages}
            className={`cursor-pointer rounded-full w-10 h-10 text-[18px] border border-transparent hover:border-text-primary transition ${
              currentPage === totalPages ? "text-white bg-text-primary" : ""
            }`}
            onClick={() => onPageChange(totalPages)}
          >
            {totalPages}
          </button>
        );
      }
    }
    
    return pages;
  };

  return (
    <div className="flex items-center gap-8 text-text-primary">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        className="text-details text-2xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:text-background-3"
        disabled={currentPage === 1}
      >
        <RiArrowLeftSLine />
      </button>
      
      {/* Versión móvil (hasta md) */}
      <div className="flex items-center gap-2 md:hidden">
        {renderPageNumbers()}
      </div>
      
      {/* Versión desktop (md y superior) */}
      <div className="hidden md:flex items-center gap-2">
        {renderDesktopPageNumbers()}
      </div>
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        className="text-details text-2xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:text-background-3"
        disabled={currentPage === totalPages}
      >
        <RiArrowRightSLine />
      </button>
    </div>
  );
}
