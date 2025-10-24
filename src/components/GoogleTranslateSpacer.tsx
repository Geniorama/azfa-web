'use client'

interface GoogleTranslateSpacerProps {
  children: React.ReactNode;
}

export default function GoogleTranslateSpacer({ children }: GoogleTranslateSpacerProps) {
  // Ya no necesitamos detectar la barra de Google Translate porque está oculta
  return (
    <div>
      {children}
    </div>
  );
}
