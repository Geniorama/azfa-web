import HeadingPage from "@/components/HeadingPage";
import Cover from "@/assets/img/cover-normativa-legal.webp";

export default function NormativaLegal() {
  return (
    <div>
      <HeadingPage title="Normativa Legal" description="Consulte la normativa legal de cada país" image={Cover.src} />
    </div>
  )
}
