import IconHouse from "@/assets/img/house.svg";
import IconPin from "@/assets/img/pin.svg";
import IconEmail from "@/assets/icons/email.svg";

export interface CardTeamMemberProps {
  image: string;
  name: string;
  position: string;
  company: string;
  location: string;
  email?: string;
}

export default function CardTeamMember({
  image,
  name,
  position,
  company,
  location,
  email,
}: CardTeamMemberProps) {
  return (
    <div className="bg-white rounded-tr-2xl rounded-bl-2xl rounded-br-2xl overflow-hidden hover:shadow-xl hover:border-transparent transition-all duration-300 hover:[&_img]:grayscale-0">
      <div>
        <img
          src={image}
          alt="image"
          className="w-full 2xl:h-100 aspect-square 2xl:aspect-auto object-cover grayscale transition-all duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-8 text-text-primary">
        <h3 className="2xl:text-h5 text-[20px] leading-[28px] 2xl:leading-8 font-medium">{name}</h3>
        <p className="text-button font-medium mt-1">{position}</p>
        <hr className="my-2 border-slate-300" />
        <div className="flex flex-row items-center gap-2">
          <img src={IconHouse.src} alt="icon-house" className="w-5 h-5" />
          <p className="text-button">{company}</p>
        </div>
        {email && (
          <>
            <hr className="my-2 border-slate-300" />
            <div className="flex flex-row items-center gap-2">
                <img src={IconEmail.src} alt="icon-email" className="w-5 h-5" />
                <a href={`mailto:${email}`} target="_blank" rel="noopener noreferrer" className="text-button hover:underline">{email}</a>
            </div>
          </>
        )}
        <hr className="my-2 border-slate-300" />
        <div className="flex flex-row items-center gap-2">
          <img src={IconPin.src} alt="icon-pin" className="w-5 h-5" />
          <p className="text-button">{location}</p>
        </div>
      </div>
    </div>
  );
}
