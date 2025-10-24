'use client'

import { useGoogleTranslateBar } from '@/hooks/useGoogleTranslateBar';

interface GoogleTranslateSpacerProps {
  children: React.ReactNode;
}

export default function GoogleTranslateSpacer({ children }: GoogleTranslateSpacerProps) {
  const isTranslateBarVisible = useGoogleTranslateBar();

  return (
    <div className={`transition-all duration-300 ${isTranslateBarVisible ? 'pt-16' : ''}`}>
      {children}
    </div>
  );
}
