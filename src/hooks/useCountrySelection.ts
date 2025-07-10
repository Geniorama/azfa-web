import { useState, useCallback } from 'react';

interface Pais {
  id: string;
  label: string;
  value: string;
}

export function useCountrySelection() {
  const [selectedCountry, setSelectedCountry] = useState<Pais | null>(null);
  const [expandedCountry, setExpandedCountry] = useState<string | null>(null);

  const selectCountry = useCallback((country: Pais) => {
    setSelectedCountry(country);
    setExpandedCountry(country.id);
  }, []);

  const expandCountry = useCallback((countryId: string) => {
    setExpandedCountry(expandedCountry === countryId ? null : countryId);
  }, [expandedCountry]);

  const clearSelection = useCallback(() => {
    setSelectedCountry(null);
    setExpandedCountry(null);
  }, []);

  return {
    selectedCountry,
    expandedCountry,
    selectCountry,
    expandCountry,
    clearSelection,
  };
} 