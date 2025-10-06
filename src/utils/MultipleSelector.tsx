"use client"

import { useState, useRef, useEffect } from "react"
import { MdKeyboardArrowDown, MdClose, MdCheck } from "react-icons/md"

interface Option {
  value: string
  label: string
  disabled?: boolean
}

interface MultipleSelectorProps {
  options: Option[]
  selectedValues: string[]
  onChange: (selectedValues: string[]) => void
  placeholder?: string
  className?: string
  disabled?: boolean
  maxSelections?: number
  searchable?: boolean
}

export default function MultipleSelector({
  options,
  selectedValues,
  onChange,
  placeholder = "Selecciona opciones...",
  className = "",
  disabled = false,
  maxSelections,
  searchable = false
}: MultipleSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const dropdownRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Filtrar opciones basado en el término de búsqueda
  const filteredOptions = searchable 
    ? options.filter(option => 
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options

  // Manejar clic fuera del dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setSearchTerm("")
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleToggleOption = (value: string) => {
    if (disabled) return

    const isSelected = selectedValues.includes(value)
    let newSelectedValues: string[]

    if (isSelected) {
      // Remover de la selección
      newSelectedValues = selectedValues.filter(v => v !== value)
    } else {
      // Verificar límite máximo
      if (maxSelections && selectedValues.length >= maxSelections) {
        return
      }
      // Agregar a la selección
      newSelectedValues = [...selectedValues, value]
    }

    onChange(newSelectedValues)
  }

  const handleRemoveOption = (value: string, event: React.MouseEvent) => {
    event.stopPropagation()
    if (disabled) return
    
    const newSelectedValues = selectedValues.filter(v => v !== value)
    onChange(newSelectedValues)
  }

  const getSelectedLabels = () => {
    return selectedValues
      .map(value => options.find(option => option.value === value)?.label)
      .filter(Boolean)
  }

  const selectedLabels = getSelectedLabels()

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Input/Trigger */}
      <div
        className={`
          relative w-full min-h-[42px] px-3 py-2 border border-gray-300 rounded-lg
          bg-white cursor-pointer transition-all duration-200
          ${disabled ? 'bg-gray-50 cursor-not-allowed opacity-60' : 'hover:border-gray-400'}
          ${isOpen ? 'border-blue-500 ring-2 ring-blue-200' : ''}
          ${selectedValues.length > 0 ? 'py-1' : ''}
        `}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        {/* Valores seleccionados */}
        {selectedValues.length > 0 ? (
          <div className="flex flex-wrap gap-1">
            {selectedLabels.map((label, index) => (
              <span
                key={selectedValues[index]}
                className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 
                         text-sm rounded-md border border-blue-200"
              >
                {label}
                {!disabled && (
                  <button
                    type="button"
                    onClick={(e) => handleRemoveOption(selectedValues[index], e)}
                    className="ml-1 hover:bg-blue-200 rounded-full p-0.5 transition-colors"
                  >
                    <MdClose className="w-3 h-3" />
                  </button>
                )}
              </span>
            ))}
          </div>
        ) : (
          <span className="text-gray-500">{placeholder}</span>
        )}

        {/* Icono de flecha */}
        <MdKeyboardArrowDown 
          className={`
            absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400
            transition-transform duration-200
            ${isOpen ? 'rotate-180' : ''}
          `} 
        />
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-hidden">
          {/* Campo de búsqueda */}
          {searchable && (
            <div className="p-2 border-b border-gray-200">
              <input
                ref={inputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}

          {/* Lista de opciones */}
          <div className="max-h-48 overflow-y-auto">
            {filteredOptions.length === 0 ? (
              <div className="px-3 py-2 text-gray-500 text-sm">
                {searchable && searchTerm ? 'No se encontraron opciones' : 'No hay opciones disponibles'}
              </div>
            ) : (
              filteredOptions.map((option) => {
                const isSelected = selectedValues.includes(option.value)
                const isDisabled = option.disabled || disabled
                const isMaxReached = maxSelections && selectedValues.length >= maxSelections && !isSelected

                return (
                  <div
                    key={option.value}
                    className={`
                      px-3 py-2 cursor-pointer transition-colors duration-150 flex items-center justify-between
                      ${isSelected ? 'bg-blue-50 text-blue-900' : 'hover:bg-gray-50'}
                      ${isDisabled || isMaxReached ? 'opacity-50 cursor-not-allowed' : ''}
                    `}
                    onClick={() => !isDisabled && !isMaxReached && handleToggleOption(option.value)}
                  >
                    <span className="flex-1">{option.label}</span>
                    {isSelected && (
                      <MdCheck className="w-4 h-4 text-blue-600" />
                    )}
                  </div>
                )
              })
            )}
          </div>

          {/* Información de límite */}
          {maxSelections && (
            <div className="px-3 py-2 text-xs text-gray-500 border-t border-gray-200 bg-gray-50">
              {selectedValues.length} de {maxSelections} seleccionados
            </div>
          )}
        </div>
      )}
    </div>
  )
}
