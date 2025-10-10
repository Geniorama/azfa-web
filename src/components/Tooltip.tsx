interface TooltipProps {
  children: React.ReactNode;
  text: string;
  className?: string;
}

export default function Tooltip({ children, text, className = "" }: TooltipProps) {
  return (
    <div className={`relative inline-block hover:cursor-pointer hover:[&_div]:opacity-100 ${className}`}>
      {/* Tooltip */}
      <div className="absolute opacity-0 -top-5 left-1/2 transform -translate-x-1/2 whitespace-nowrap w-auto h-5 bg-black flex items-center justify-center text-xs px-2 rounded-sm z-10 text-white transition-all duration-300">
        <span className="w-2 h-2 bg-black rotate-45 absolute -bottom-1 left-1/2 transform -translate-x-1/2"></span>
        <p>{text}</p>
      </div>
      {children}
    </div>
  );
}
