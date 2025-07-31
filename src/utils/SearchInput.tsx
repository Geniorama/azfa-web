"use client";

import { useState, useEffect, useRef } from "react";
import { FaChevronDown, FaTimes } from "react-icons/fa";
import IconSearch from "@/assets/icons/search-icon.svg";

interface SearchOption {
  id: string;
  label: string;
  value: string;
}

interface SearchInputProps {
  placeholder?: string;
  options: SearchOption[];
  onSelect?: (option: SearchOption | null) => void;
  className?: string;
  label?: string;
  selected?: SearchOption | null;
}

export default function SearchInput({
  placeholder = "Escriba para buscar...",
  options,
  onSelect,
  className = "",
  label = "Buscar",
  selected = null
}: SearchInputProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState<SearchOption[]>([]);
  const [selectedOption, setSelectedOption] = useState<SearchOption | null>(null);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filtrar opciones basado en el término de búsqueda
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredOptions([]);
      setIsOpen(false);
      setSelectedOption(null);
      return;
    }

    // Si hay una opción seleccionada y el término coincide exactamente, no mostrar dropdown
    if (selectedOption && searchTerm === selectedOption.label) {
      setFilteredOptions([]);
      setIsOpen(false);
      return;
    }

    const filtered = options.filter(option =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      option.value.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setFilteredOptions(filtered);
    setIsOpen(filtered.length > 0);
    setHighlightedIndex(-1);
  }, [searchTerm, options, selectedOption]);

  // Sincronizar selección externa
  useEffect(() => {
    if (selected) {
      setSelectedOption(selected);
      setSearchTerm(selected.label);
    } else {
      setSelectedOption(null);
      setSearchTerm("");
    }
  }, [selected]);

  // Manejar selección con teclado
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev < filteredOptions.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case "Enter":
        e.preventDefault();
        if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
          handleSelect(filteredOptions[highlightedIndex]);
        }
        break;
      case "Escape":
        if (searchTerm) {
          handleClear();
        } else {
          setIsOpen(false);
          setHighlightedIndex(-1);
        }
        break;
    }
  };

  // Manejar selección de opción
  const handleSelect = (option: SearchOption) => {
    setSelectedOption(option);
    setSearchTerm(option.label);
    setIsOpen(false);
    setHighlightedIndex(-1);
    setFilteredOptions([]); // Limpiar opciones filtradas
    onSelect?.(option);
  };

  // Función para limpiar la búsqueda
  const handleClear = () => {
    setSearchTerm("");
    setSelectedOption(null);
    setIsOpen(false);
    setHighlightedIndex(-1);
    setFilteredOptions([]);
    onSelect?.(null);
  };



  // Manejar click fuera del componente
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Manejar cambio en el input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchTerm(newValue);
    
    // Si el usuario está modificando el texto después de seleccionar, limpiar la selección
    if (selectedOption && newValue !== selectedOption.label) {
      setSelectedOption(null);
    }
  };

  // Manejar keydown en el input para funcionalidades adicionales
  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    // Si presiona Backspace en un campo vacío y hay una selección, limpiar
    if (e.key === "Backspace" && searchTerm === "" && selectedOption) {
      handleClear();
      e.preventDefault();
      return;
    }
    
    // Llamar a la función original de keydown
    handleKeyDown(e);
  };

  // Manejar click en el input
  const handleInputClick = () => {
    // Si hay texto y opciones filtradas, mostrar dropdown
    if (searchTerm.trim() !== "" && filteredOptions.length > 0) {
      setIsOpen(true);
    }
    // Si no hay texto, mostrar todas las opciones
    else if (searchTerm.trim() === "") {
      setFilteredOptions(options);
      setIsOpen(true);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div className="flex gap-2 items-center text-text-primary bg-white px-6 py-4 shadow-lg flex-wrap">
        <label className="block md:inline-block w-full md:w-auto" htmlFor="search-input">
          {label}
        </label>
        <div className="relative flex-grow">
          <img src={IconSearch.src} alt="search" className="w-4 h-4 absolute left-2 top-1/2 transform -translate-y-1/2" />
          <input
            ref={inputRef}
            id="search-input"
            type="text"
            placeholder={placeholder}
            value={searchTerm}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            onClick={handleInputClick}
            className="border border-background-3 p-2 rounded-md w-full focus:outline-details focus:border-details transition-colors pr-16 pl-8"
            autoComplete="off"
          />
          
          {/* Botón de limpiar */}
          {searchTerm && (
            <button 
              className="absolute right-8 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              onClick={handleClear}
              type="button"
            >
              <FaTimes className="text-sm" />
            </button>
          )}
          
          {/* Botón de dropdown */}
          <button 
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-details hover:text-details-hover transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            type="button"
          >
            <FaChevronDown className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      {/* Dropdown de resultados */}
      {isOpen && filteredOptions.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 z-50 text-text-primary bg-white border border-background-3 shadow-lg max-h-60 overflow-y-auto"
        >
          {filteredOptions.map((option, index) => (
            <div
              key={option.id}
              className={`px-4 py-3 cursor-pointer transition-colors ${
                index === highlightedIndex
                  ? "bg-details text-white"
                  : "hover:bg-background-2"
              } ${selectedOption?.id === option.id ? "bg-background-2" : ""}`}
              onClick={() => handleSelect(option)}
              onMouseEnter={() => setHighlightedIndex(index)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}

      {/* Mensaje cuando no hay resultados */}
      {isOpen && searchTerm.trim() !== "" && filteredOptions.length === 0 && (
        <div className="absolute top-full left-0 right-0 z-50 bg-white border border-background-3 rounded-md shadow-lg">
          <div className="px-4 py-3 text-gray-500">
            No se encontraron resultados para {`"${searchTerm}"`}
          </div>
        </div>
      )}
    </div>
  );
} 