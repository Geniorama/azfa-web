"use client";

import HeadingPage from "@/components/HeadingPage";
import IntroPage from "@/components/IntroPage";
import Button from "@/utils/Button";
import ReactMarkdown from "react-markdown";
import type { ServicesPageType } from "@/types/componentsType";
import rehypeRaw from "rehype-raw";

interface ServiciosViewProps {
  serviciosData: ServicesPageType | null;
}


const SecondarySection = "bg-secondary lg:bg-linear-to-r from-secondary to-white from-70% to-20% py-10 text-white"
const SecondarySectionReverse = "bg-secondary lg:bg-linear-to-r from-secondary to-white from-70% to-20% py-10"

export default function ServiciosView({ serviciosData }: ServiciosViewProps) {

  console.log("serviciosData", serviciosData);


  const transformedIntro = {
    ...serviciosData?.intro[0],
    icon: {
      url: serviciosData?.intro[0]?.icon.url || "",
      alternativeText: serviciosData?.intro[0]?.icon.alternativeText || "",
    },
  }

  return (
    <div>
      <HeadingPage
        title={serviciosData?.headingSection.title}
        image={serviciosData?.headingSection.backgroundImg.url}
        textAlign="left"
        className="min-h-[500px] bg-top-right [&>div>h1]:text-center [&>div>p]:text-center [&>div>p]:lg:text-left [&>div>h1]:lg:text-left"
      />

      <section className="bg-white py-10 lg:pt-16">
        <div className="container mx-auto px-4">
          <IntroPage introData={transformedIntro} />
        </div>
      </section>

      {serviciosData?.contentSection.map((section, index) => (
        <section key={index} className={`${section.style === "style-2" ? (section.orderReverse ? SecondarySectionReverse : SecondarySection) : "bg-white py-10 lg:pt-16"}`}>
          <div className="container mx-auto px-4">
            <div className= {`flex flex-col lg:${!section.orderReverse ? "flex-row" : "flex-row-reverse"} gap-4 text-text-primary items-center py-10 px-4 lg:px-0`}>
              <div className={`w-full lg:w-1/2 ${!section.orderReverse ? "lg:pr-24" : "lg:pl-24"}`}>
                <h2 className={`text-h2 mb-10 ${section.style === "style-2" ? "text-white" : "text-text-primary"}`}>{section.title}</h2>
                <div className={`text-body2 leading-8 ${section.style === "style-2" ? "text-white" : "text-text-primary"}`}>
                  <ReactMarkdown rehypePlugins={[rehypeRaw]}>{section.description}</ReactMarkdown>
                </div>
                <Button
                  icon={true}
                  onClick={() => {
                    window.open(section.button.link, section.button.target);
                  }}
                  className="mt-5 justify-between text-left"
                >
                  {section.button.text}
                </Button>
              </div>
              <div className="w-full lg:w-1/2">
                <img
                  className="w-full"
                  src={section.coverImage.url}
                  alt="Servicios"
                />
              </div>
            </div>
          </div>
        </section>
      ))}

    </div>
  );
}
