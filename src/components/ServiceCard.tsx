import Button from '@/utils/Button'

interface ServiceCardProps {
  title: string;
  subtitle: string;
  image: string;
  button: {
    label: string;
    onClick: () => void;
  }
}

export default function ServiceCard({ title, subtitle, image, button }: ServiceCardProps) {
  return (
    <div className='relative bg-primary'>
        <img src={image} alt={title} className='w-full h-full object-cover' />
        <div className='absolute top-0 left-0 w-full h-full flex flex-col justify-end p-4'>
            <div className='mb-4 min-h-28'>
                <p className='text-white text-button'>{subtitle}</p>
                <h3 className='text-white text-h5'>{title}</h3>
            </div>
            <div>
                <Button icon onClick={button.onClick}>{button.label}</Button>
            </div>
        </div>
    </div>
  )
}
