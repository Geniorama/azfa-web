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
  return (
    <div className="flex items-center gap-8 text-text-primary">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        className="text-details text-2xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:text-background-3"
        disabled={currentPage === 1}
      >
        <RiArrowLeftSLine />
      </button>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          className={`cursor-pointer rounded-full w-10 h-10 text-[18px] border border-transparent hover:border-text-primary transition ${
            currentPage === index + 1
              ? "text-white bg-text-primary"
              : ""
          }`}
          onClick={() => onPageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}
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
