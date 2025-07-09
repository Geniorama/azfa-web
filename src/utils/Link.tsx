import NextLink from "next/link";
import ArrowRightBlue from "@/assets/img/btn-arrow-blue.svg";
import ArrowRightGreen from "@/assets/img/btn-arrow-green.svg";

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  href: string;
  className?: string;
  target?: string;
  rel?: string;
  prefetch?: boolean;
  passHref?: boolean;
  scroll?: boolean;
  shallow?: boolean;
  icon?: boolean;
  variant?: "primary" | "secondary";
}

export default function Link({
  children,
  href,
  className,
  target,
  rel,
  prefetch,
  passHref,
  scroll,
  shallow,
  variant = "primary",
  icon = false,
}: LinkProps) {
  const iconSrc =
    variant === "primary" ? ArrowRightBlue.src : ArrowRightGreen.src;

  return (
    <NextLink
      href={href}
      className={`${variant} flex items-center gap-4 hover:underline hover:underline-offset-4  text-text-primary font-medium transition ${className} ${
        variant === "primary"
          ? "decoration-details"
          : "decoration-details-hover"
      }`}
      target={target}
      rel={rel}
      prefetch={prefetch}
      passHref={passHref}
      scroll={scroll}
      shallow={shallow}
    >
      {children}
      {icon && <img src={iconSrc} alt="arrow-right" className="w-6 h-6" />}
    </NextLink>
  );
}
