"use client"

import { useState, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";

interface SelectorFilterProps {
  options: { label: string; value: string }[];
  selected: string;
  onChange: (value: string) => void;
  label: string;
  icon?: React.ReactNode | string;
}

export default function SelectorFilter({ options, selected, onChange, label, icon }: SelectorFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(selected);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Sincronizar selectedOption con selected prop
  useEffect(() => {
    setSelectedOption(selected);
  }, [selected]);


  const handleToggleDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Toggle dropdown, isOpen:", isOpen);
    setIsOpen(!isOpen);
  };

  // First option is selected by default
  useEffect(() => {
    if (options.length > 0) {
      setSelectedOption(options[0].label);
    }
  }, [options]);


  return (
    <div>
        <div className='flex flex-col items-start gap-2 relative'>
            <div 
                className='flex items-center gap-2 cursor-pointer w-full justify-between md:justify-start' 
                ref={dropdownRef} 
                onClick={handleToggleDropdown}
            >
                <div className="flex items-center gap-2">
                    {icon && typeof icon === 'string' ? <img src={icon} alt={label} className='w-5 h-5 hidden md:block' /> : icon}
                    <p className='text-caption md:text-md text-text-primary'>{label}</p>
                </div>
                <FaChevronDown className='w-4 h-4 text-details' />
            </div>
            {isOpen && (
                <div className='flex flex-col items-center gap-2 absolute top-0 left-0 w-full min-w-fit z-10 bg-slate-100 rounded-lg shadow-lg shadow p-0 top-8'>
                {options.map((option) => (
                    <div 
                        key={option.value} 
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            console.log("CLICK EN OPCIÓN:", option);
                            setSelectedOption(option.label);
                            onChange(option.value);
                            setIsOpen(false);
                        }}
                        className='text-sm text-text-primary whitespace-nowrap py-2 px-4 hover:bg-slate-200 w-full cursor-pointer'
                    >
                        {option.label}
                    </div>
                ))}
                </div>
            )}
        </div>
        <p className=' text-text-primary md:pl-7.5 text-body md:text-lg mt-1 font-medium'>{selectedOption}</p>
    </div>
  )
}
