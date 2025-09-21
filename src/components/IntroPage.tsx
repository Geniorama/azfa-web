import rehypeRaw from "rehype-raw";
import type { IntroData } from "@/types/componentsType";
import ReactMarkdown from "react-markdown";

interface IntroPageProps {
  introData: IntroData;
}

export default function IntroPage({ introData }: IntroPageProps) {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center text-text-primary lg:gap-16 gap-6 w-full lg:w-2/3 mx-auto">
      <img
        className="w-[109px] lg:w-60"
        src={introData.icon?.url || ""}
        alt={
          introData.icon?.alternativeText || ""
        }
      />
      <div className="lg:text-h3 text-h4 font-light text-center lg:text-left">
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>
          {introData.content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
