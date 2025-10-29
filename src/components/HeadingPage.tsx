interface HeadingPageProps {
  title?: string;
  smallTitle?: string;
  image?: string;
  textAlign?: "left" | "center" | "right";
  className?: string;
  description?: string
}

export default function HeadingPage({
  title,
  smallTitle,
  image,
  textAlign = "center",
  className,
  description
}: HeadingPageProps) {
  return (
    <div
      style={{ backgroundImage: `url(${image || ""})` }}
      className={`bg-primary bg-cover bg-center bg-no-repeat py-16 relative flex flex-col justify-center ${
        textAlign === "left"
          ? "text-left items-start"
          : textAlign === "center"
          ? "text-center items-center"
          : "text-right items-end"
      } ${className}`}
    >
      <div className="container mx-auto px-4">
        <h1 className="text-background-1 text-h3 lg:text-6xl font-normal">
          {title}
        </h1>
        <p className="text-details text-h6 lg:text-lg mt-4">{smallTitle}</p>
        {description && (
          <p className="text-background-1 text-body lg:text-h6 mt-2 font-medium">{description}</p>
        )}
      </div>
    </div>
  );
}
