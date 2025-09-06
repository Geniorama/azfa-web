import React from 'react'

interface TitleDecorativeProps {
  children: React.ReactNode;
  dividerColor?: string;
  className?: string;
}

export default function TitleDecorative({ children, dividerColor = 'bg-details', className }: TitleDecorativeProps) {
  return (
    <h2 className={`text-h2 text-text-primary relative flex flex-col items-center gap-2 ${className}`}>
        <span className='block'>{children}</span>
        {/* Line */}
        <span className={`w-14 h-[2px] ${dividerColor || 'bg-details'} block mt-2`}></span>
    </h2>
  )
}
