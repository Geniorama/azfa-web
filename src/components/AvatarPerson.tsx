export interface AvatarPersonProps {
  image: string;
  alternativeText?: string;
  name?: string;
}

export default function AvatarPerson({ image, alternativeText, name }: AvatarPersonProps) {
  return (
    <div className="relative inline-block hover:cursor-pointer hover:[&_div]:opacity-100">
        {/* Tooltip */}
        <div className="absolute opacity-0 -top-5 left-1/2 transform -translate-x-1/2 whitespace-nowrap w-auto h-5 bg-black flex items-center justify-center text-xs px-2 rounded-sm z-10 text-white transition-all duration-300">
            <span className="w-2 h-2 bg-black rotate-45 absolute -bottom-1 left-1/2 transform -translate-x-1/2"></span>
            <p>{name}</p>
        </div>
        <img className="w-10 h-10 rounded-full overflow-hidden object-cover mt-1" src={image} alt={alternativeText} />
    </div>
  )
}
