import HeadingPageSalaPrensa from "@/components/HeadingPageSalaPrensa";
import ImageIntro from "@/assets/img/PHOTO-2025-07-21-17-38-57 3.jpg";
import TitleDecorative from "@/utils/TitleDecorative";
import { PodcastSectionType, PodcastType } from "@/types/componentsType";
import AdSection from "@/components/AdSection";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

interface PodcastViewProps {
  podcastSectionData: PodcastSectionType | null;
  podcastData: PodcastType[] | null;
}

export default function PodcastView({
  podcastSectionData,
  podcastData,
}: PodcastViewProps) {
  return (
    <div>
      <HeadingPageSalaPrensa
        title={podcastSectionData?.title}
        description={podcastSectionData?.description}
        image={podcastSectionData?.backgroundImg?.url}
        slug="podcast"
        textAlign={podcastSectionData?.alignment || "center"}
      />

      <section className="bg-white lg:py-16 py-10">
        <div className="container mx-auto px-4">
          <img
            src={ImageIntro.src}
            alt="Podcast"
            className="w-full h-full object-cover max-w-screen-lg mx-auto"
          />

          <div className="mt-10">
            <TitleDecorative className="text-center">
              Todos los episodios
            </TitleDecorative>

            {/* Embed podcast*/}
            <div className="flex flex-wrap mt-10">
              {podcastData?.map((podcast) => (
                <div key={podcast.id} className="lg:mb-2 w-full lg:w-1/2 p-2 [&>iframe]:w-full [&>iframe]:lg:h-[250px]">
                  <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                    {podcast.extract}
                  </ReactMarkdown>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="container mx-auto px-4">
          <AdSection position="bottom-podcast-archive" />
        </div>
      </section>
    </div>
  );
}
