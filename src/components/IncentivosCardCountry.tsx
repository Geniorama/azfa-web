import colombia from "@/assets/img/flags/colombia.svg"

interface IncentivosCardCountryProps {
  index: number;
  country: string;
  numberZones: number;
  numberCompanies: number;
  directJobs: number;
  list: {
    name: string;
    value: string;
  }[];
  imgFlag?: string;
}

export default function IncentivosCardCountry({ index, country, numberZones, numberCompanies, directJobs, list, imgFlag }: IncentivosCardCountryProps) {
  return (
    <div className="pb-6">
       <div className='flex flex-row items-center bg-[#E3EAF4] h-12'>
          <span className='flex items-center bg-primary text-white justify-center p-3'>{index + 1}</span>
          <span className='flex items-center text-text-primary px-3 text-[24px] flex-grow'>{country}</span>
          {/* Country flag */}
          <span className='flex items-center text-white justify-center p-3'>
            <img src={imgFlag || colombia.src} alt="colombia" className='w-10 h-auto' />
          </span>
        </div>

        <div className="flex flex-row items-start justify-between bg-[#F5F8FC]">
            <div className="w-1/3 p-3 lg:p-7 flex flex-col items-center justify-center gap-2 text-text-primary">
                <span className="block w-5 h-5 rounded-full bg-details-hover">
                    {/* Circle */}
                </span> 
                <h5 className="text-text-primary text-[14px] text-center">
                    Número Zonas Francas
                </h5>
                <p className="text-h6 font-medium">{numberZones}</p>
            </div>

            <div className="w-1/3 p-3 lg:p-7 flex flex-col items-center justify-center gap-2 text-text-primary">
                <span className="block w-5 h-5 rounded-full bg-secondary">
                    {/* Circle */}
                </span> 
                <h5 className="text-text-primary text-[14px] text-center">
                    Empresas Instaladas
                </h5>
                <p className="text-h6 font-medium">{numberCompanies}</p>
            </div>

            <div className="w-1/3 p-3 lg:p-7 flex flex-col items-center justify-center gap-2 text-text-primary">
                <span className="block w-5 h-5 rounded-full bg-details">
                    {/* Circle */}
                </span> 
                <h5 className="text-text-primary text-[14px] text-center">
                    Empleos <br className="lg:hidden" /> directos
                </h5>
                <p className="text-h6 font-medium">{directJobs}</p>
            </div>
        </div> 

        {/* List */}
        <ul className="text-text-primary px-5 lg:px-10">
            {list && list.map((item, index) => (
                <li key={index} className={`flex flex-row items-start py-2 border-b border-gray-200 ${index === list.length - 1 ? "border-b-0" : ""}`}>
                    <span className="block w-1/2 font-medium">{item.name}</span>
                    <span className="block w-1/2 font-light">{item.value}</span>
                </li>
            ))}
        </ul>
    </div>
  )
}
