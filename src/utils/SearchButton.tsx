import SearchIcon from "@/assets/img/search-icon.svg";

interface SearchButtonProps {
  onClick?: () => void;
  className?: string;
}

export default function SearchButton({ onClick, className }: SearchButtonProps) {
  return (
     <button onClick={onClick} className={`flex aspect-square flex-col items-center cursor-pointer bg-text-primary rounded-full p-6 transition relative hover:bg-text-secondary ${className}`}>
      <img src={SearchIcon.src} alt="Search Icon" className="w-7 h-7" />
      <span className="h-[1px] w-7 bg-details block mt-2 absolute bottom-5"></span>
    </button>
  )
}
