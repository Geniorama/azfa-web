"use client";

interface WidgetInstagramProps {
  className?: string;
}

export default function WidgetInstagram({ className }: WidgetInstagramProps) {
  return (
    <div className="w-full">
        <iframe src={'https://b80a5da9dc03409482ed473ddf14f9a9.elf.site'} className={`w-full overflow-hidden ${className}`} style={{ border: 'none', overflow: 'hidden'}} allowFullScreen={true} allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" title="Widget Instagram"></iframe>
    </div>
  )
}
