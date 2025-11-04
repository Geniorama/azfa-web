"use client";

interface WidgetLinkedInProps {
  className?: string;
}

export default function WidgetLinkedIn({ className }: WidgetLinkedInProps) {
  return (
        <div>
            <iframe src={'https://60a83efca0864b8a8b50e4c99a33e1f4.elf.site'} className={`w-full overflow-hidden ${className}`} style={{ border: 'none', overflow: 'hidden'}} allowFullScreen={true} allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" title="Widget LinkedIn"></iframe>
        </div>
  )
}
