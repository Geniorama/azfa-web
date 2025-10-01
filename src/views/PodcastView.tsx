import HeadingPageSalaPrensa from "@/components/HeadingPageSalaPrensa";
import CoverImage from "@/assets/img/bg-sala-prensa.jpg";
import ImageIntro from "@/assets/img/PHOTO-2025-07-21-17-38-57 3.jpg";
import TitleDecorative from "@/utils/TitleDecorative";
import { PodcastSectionType } from "@/types/componentsType";
import AdSection from "@/components/AdSection";

interface PodcastViewProps {
  podcastSectionData: PodcastSectionType | null;
}

export default function PodcastView({ podcastSectionData }: PodcastViewProps) {
  return (
    <div>
        <HeadingPageSalaPrensa
            title={podcastSectionData?.title || "Podcast"}
            description={podcastSectionData?.description || "Escuche análisis, entrevistas y perspectivas clave en formato audio sobre temas estratégicos del sector"}
            image={podcastSectionData?.backgroundImg?.url || CoverImage.src}
            slug="podcast"
            textAlign={podcastSectionData?.alignment || "center"}
        />

        <section className="bg-white lg:py-16 py-10">
            <div className="container mx-auto px-4">
                <img src={ImageIntro.src} alt="Podcast" className="w-full h-full object-cover max-w-screen-lg mx-auto" />

                <div className="mt-10">
                    <TitleDecorative className="text-center">
                        Todos los episodios
                    </TitleDecorative>

                    {/* Embed podcast spotify */}
                    <div className="flex justify-center mt-10">
                        <iframe data-testid="embed-iframe" style={{borderRadius: "12px"}} src="https://open.spotify.com/embed/episode/7GUWEzjS504WOTNpI0YRoU/video?utm_source=generator" width="624" height="351"  allowFullScreen={true} allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
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
  )
}
