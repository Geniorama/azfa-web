import HeadingPageSalaPrensa from "@/components/HeadingPageSalaPrensa";
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
  // Separar el podcast más reciente del resto
  const featuredPodcast = podcastData?.[0];
  const remainingPodcasts = podcastData?.slice(1) || [];

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
          {/* Podcast destacado (más reciente) */}
          {featuredPodcast && (
            <div className="max-w-screen-lg mx-auto mb-16">
              <div className="[&>iframe]:w-full [&>iframe]:h-[200px] [&>iframe]:lg:h-[400px]">
                <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                  {featuredPodcast.extract}
                </ReactMarkdown>
              </div>
            </div>
          )}

          {/* Resto de episodios */}
          {remainingPodcasts.length > 0 && (
            <div className="mt-10">
              <TitleDecorative className="text-center">
                Todos los episodios
              </TitleDecorative>

              {/* Embed podcast*/}
              <div className="flex flex-wrap mt-10">
                {remainingPodcasts.map((podcast) => (
                  <div key={podcast.id} className="lg:mb-2 w-full lg:w-1/2 p-2 [&>iframe]:w-full [&>iframe]:lg:h-[250px]">
                    <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                      {podcast.extract}
                    </ReactMarkdown>
                  </div>
                ))}
              </div>
            </div>
          )}
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
