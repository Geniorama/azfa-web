"use client"

import { FaChevronDown } from "react-icons/fa";
import { useState } from "react";

interface CustomSelectProps {
    label: string;
    labelIcon?: string;
    options: { label: string; value: string }[];
    onChange: (value: string) => void;
    name: string;
    selected: string;
}

export default function CustomSelect({ label, labelIcon, options, onChange, name, selected }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState({
    label: "Selecciona una opción",
    value: "",
  });

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  }

  const handleSelect = (value: string) => {
    setSelectedOption({
      label: options.find(option => option.value === value)?.label || "Selecciona una opción",
      value: value,
    });
    onChange(value);
    setIsOpen(false);
  }

  return (
    <div className='flex flex-row gap-4 items-center'>
        <div className='flex items-center gap-2'>
            {labelIcon && <img src={labelIcon} alt={label} className='w-5 h-5' />}
            <label htmlFor="">{label}</label>
        </div>

        <div className='relative'>
            <div className='flex items-center gap-2 border border-background-3 rounded-md p-2 px-3 text-background-3 cursor-pointer min-w-xs justify-between' onClick={handleToggleDropdown}>
                <span className='inline-block'>{selectedOption.label}</span>
                <FaChevronDown className='w-4 h-4 text-background-3' />
            </div>
            {isOpen && (
                <div className='absolute rounded-md w-full overflow-hidden z-10 shadow-lg mt-2'>
                    {options.map((option) => (
                        <div key={option.value} className={`w-full cursor-pointer py-2 px-4 bg-background-1 hover:bg-background-2 transition ${selectedOption.value === option.value ? "bg-background-2" : ""}`} onClick={() => handleSelect(option.value)}>
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
        <input type="hidden" name={name} id={name} value={selected} />
    </div>
  )
}
