"use client"

import { FaChevronDown } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";

interface CustomSelectProps {
    label: string;
    labelIcon?: string;
    options: { label: string; value: string }[];
    onChange: (value: string) => void;
    name: string;
    selected: string;
    placeholder?: string;
}

const defaultOption = {
  label: "Selecciona una opción",
  value: "",
}

export default function CustomSelect({ label, labelIcon, options, onChange, name, selected, placeholder }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [selectedOption, setSelectedOption] = useState({
    label: placeholder || defaultOption.label,
    value: defaultOption.value,
  });

  useEffect(() => {
    setSelectedOption({
      label: placeholder || defaultOption.label,
      value: defaultOption.value,
    });
  }, [placeholder]);

  useEffect(() => {
    setSelectedOption({
      label: options.find(option => option.value === selected)?.label || placeholder || defaultOption.label,
      value: selected,
    });
  }, [selected]);

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  }

  const handleSelect = (value: string) => {
    setSelectedOption({
      label: options.find(option => option.value === value)?.label || placeholder || defaultOption.label,
      value: value,
    });
    onChange(value);
    setIsOpen(false);
  }

  // Close dropdown when clicking outside, onEscape, onResize
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  useEffect(() => {
    const handleResize = () => {
      setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  return (
    <div className='flex flex-row gap-4 items-center'>
        <div className='flex items-center gap-1'>
            {labelIcon && <img src={labelIcon} alt={label} className='w-5 h-5' />}
            <label htmlFor="">{label}</label>
        </div>

        <div className='relative' ref={dropdownRef}>
            <div className={`flex items-center gap-2 border text-button ${selectedOption.value === defaultOption.value ? "border-background-3 text-background-3" : "border-[#94D133] text-text-primary"} rounded-md p-2 px-3 text-body1 cursor-pointer min-w-xs justify-between`} onClick={handleToggleDropdown}>
                <span className='inline-block'>{selectedOption.label}</span>
                <FaChevronDown className='w-4 h-4 text-background-3' />
            </div>
            {isOpen && (
                <div className='absolute rounded-md w-full overflow-hidden z-10 shadow-lg mt-2'>
                    <div onClick={() => handleSelect(defaultOption.value)} className='w-full cursor-pointer py-2 px-4 bg-background-1 hover:bg-background-2 transition'>
                      <span>{placeholder || defaultOption.label}</span>
                    </div>
                    {options.map((option) => (
                        <div key={option.value} className={`w-full cursor-pointer py-2 px-4 bg-background-1 hover:bg-background-2 transition ${selectedOption.value === option.value ? "bg-background-2" : ""}`} onClick={() => handleSelect(option.value)}>
                           <span>{option.label}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
        <input type="hidden" name={name} id={name} value={selected} />
    </div>
  )
}
