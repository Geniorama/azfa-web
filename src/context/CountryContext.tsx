"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Pais {
  id: string;
  label: string;
  value: string;
}

interface CountryContextType {
  selectedCountry: Pais | null;
  setSelectedCountry: (country: Pais | null) => void;
}

const CountryContext = createContext<CountryContextType | undefined>(undefined);

export function CountryProvider({ children }: { children: ReactNode }) {
  const [selectedCountry, setSelectedCountry] = useState<Pais | null>(null);

  return (
    <CountryContext.Provider value={{ selectedCountry, setSelectedCountry }}>
      {children}
    </CountryContext.Provider>
  );
}

export function useCountry() {
  const context = useContext(CountryContext);
  if (context === undefined) {
    throw new Error('useCountry must be used within a CountryProvider');
  }
  return context;
} 