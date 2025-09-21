import HomeView from "@/views/HomeView";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "AZFA - Asociación de Zonas Francas de Iberoamérica",
    description:
      "Descubre las oportunidades de inversión en zonas francas de Iberoamérica",
  };
}

export default function Home() {
  return <HomeView content={{}} />;
}
