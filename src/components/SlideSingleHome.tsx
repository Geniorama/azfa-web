"use client";

import Button from "@/utils/Button";

interface SlideSingleHomeProps {
  caption: string;
  title: string;
  description: string;
  button: {
    label: string;
    onClick?: () => void;
  };
}

export default function SlideSingleHome({ caption, title, description, button }: SlideSingleHomeProps) {

  return (
    <div className="container mx-auto px-4 relative z-20">
      {/* overlay */}
      <div className="space-y-4 w-full lg:w-1/2 text-center lg:text-left">
        <h5 className="text-caption text-details">{caption}</h5>
        <h1 className="text-h2 md:text-h1 font-medium">{title}</h1>
        <p className="text-h5">{description}</p>
        <Button className="mx-auto lg:mx-0 mt-4 lg:mt-0" icon onClick={button.onClick || (() => {})}>
          {button.label || "Ver más"}
        </Button>
      </div>
    </div>
  );
}
