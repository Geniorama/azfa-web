"use client";

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  variant?: "primary" | "secondary" | "tertiary" | "quaternary" | "quinary";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  icon?: boolean;
}

export default function Button({
  children,
  onClick,
  className,
  variant = "primary",
  size = "medium",
  disabled,
}: ButtonProps) {
 
  

  return (
    <button
      className={`${className} ${variant} ${size} cursor-pointer p-3 px-5 rounded-tr-full rounded-br-full ${
        variant === "primary" ? "bg-text-primary text-background-1" :
        variant === "secondary" ? "bg-text-secondary text-background-1" :
        ""
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
