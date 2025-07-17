interface HeadingPageProps {
  title?: string;
  smallTitle?: string;
  image?: string;
  textAlign?: "left" | "center" | "right";
  className?: string;
}

export default function HeadingPage({
  title,
  smallTitle,
  image,
  textAlign = "center",
  className,
}: HeadingPageProps) {
  return (
    <div
      style={{ backgroundImage: `url(${image || ""})` }}
      className={`bg-primary bg-cover bg-center bg-no-repeat py-16 px-12 relative ${
        textAlign === "left"
          ? "text-left"
          : textAlign === "center"
          ? "text-center"
          : "text-right"
      } ${className}`}
    >
      <h1 className="text-background-1 text-h3 lg:text-6xl font-normal">
        {title}
      </h1>
      <p className="text-details text-h6 lg:text-lg mt-4">{smallTitle}</p>
    </div>
  );
}
