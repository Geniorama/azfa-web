"use client";

import ArrowRightBlue from "@/app/assets/img/btn-arrow-blue.svg";
import ArrowRightGreen from "@/app/assets/img/btn-arrow-green.svg";

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  variant?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "quaternary"
    | "quinary"
    | "primary-blue"
    | "secondary-blue"
    | "outline-primary";
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
  icon = false,
}: ButtonProps) {
  const iconSrc =
    variant === "primary"
      ? ArrowRightBlue.src
      : variant === "secondary"
      ? ArrowRightGreen.src
      : variant === "tertiary"
      ? ArrowRightBlue.src
      : variant === "quaternary"
      ? ArrowRightGreen.src
      : ArrowRightBlue.src;

  return (
    <button
      type="button"
      className={`${className} ${variant} ${size} font-medium text-body2 transition cursor-pointer p-3 px-5 rounded-tr-full rounded-br-full flex items-center gap-8 disabled:cursor-not-allowed disabled:pointer-events-none disabled:bg-background-2 disabled:text-text-secondary ${
        variant === "primary"
          ? "bg-text-primary text-background-1 hover:bg-text-secondary"
          : variant === "secondary"
          ? "bg-text-primary text-background-1 hover:bg-text-secondary"
          : variant === "primary-blue"
          ? "bg-secondary text-background-1 hover:bg-primary disabled:bg-secondary disabled:text-white"
          : variant === "secondary-blue"
          ? "bg-details text-background-1"
          : variant === "outline-primary"
          ? "bg-transparent border border-text-primary text-text-primary hover:bg-details hover:border-details"
          : "bg-white text-text-primary hover:bg-text-secondary hover:text-white"
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
      {icon && <img src={iconSrc} alt="arrow-right-blue" className="w-6 h-6" />}
    </button>
  );
}
