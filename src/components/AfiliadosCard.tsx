import LogoCodevi from "@/assets/img/CODEVI 2.png";
import IconEmail from "@/assets/icons/email.svg";
import { FiMapPin, FiGlobe } from "react-icons/fi";

interface AfiliadosCardProps {
  index: number;
  logo: string;
  title: string;
  name: string;
  position: string;
  city: string;
  country: string;
  email?: string;
  website?: string;
  onLogoClick?: (lat: number, lng: number, title: string) => void;
  coordinates?: { lat: number; lng: number };
}

export default function AfiliadosCard({ 
  index, 
  logo, 
  title, 
  name, 
  position, 
  city, 
  country, 
  email, 
  website, 
  onLogoClick, 
  coordinates 
}: AfiliadosCardProps) {
  return (
    <div className="border border-gray-600">
      <div className="flex flex-row gap-2 bg-[#F5F8FC]">
        <span className="flex items-center bg-details-hover text-white justify-center p-3">
          {index + 1 || "N/A"  }
        </span>
        <img
          src={logo || LogoCodevi.src}
          alt="company brand"
          className={`w-full max-w-fit max-h-[120px] mx-auto flex-grow p-4 ${
            coordinates && onLogoClick ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''
          }`}
          onClick={() => {
            if (coordinates && onLogoClick) {
              onLogoClick(coordinates.lat, coordinates.lng, title);
            }
          }}
        />
      </div>
      <div className="p-8 text-text-primary">
        <h3 className="text-body1 font-medium">{title}</h3>
        {city && country && (
          <div className="flex flex-row items-center gap-2">
            <FiMapPin />
            <p className="text-body font-light">{city}, {country}</p>
          </div>
        )}
        <hr className="w-full my-4 border-gray-200" />
        <div className="space-y-2">
          {name && position && (
            <p>
              {/* Name */}
              <span className="font-medium">{name}</span>,{" "}
              {/* Position */}
              <span className="italic">{position}</span>
            </p>
          )}

          {/* Email */}
          {email && (
            <div className="flex flex-row items-center gap-2">
              <img src={IconEmail.src} alt="email" className="w-4 h-4" />
              <a href={`mailto:${email}`} className="text-body font-light hover:underline">{email}</a>
            </div>
          )}

          {/* Website */}
          {website && (
            <div className="flex flex-row items-center gap-2">
              <FiGlobe />
              <a 
                href={website.startsWith('http') ? website : `https://${website}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-body font-light hover:underline"
              >
                {website}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
