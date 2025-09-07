import { IoMdClose } from "react-icons/io";
import { useEffect } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}


export default function Modal({ open, onClose, children }: ModalProps) {
  useEffect(() => {
    if (open) {
      // Prevenir scroll usando CSS más específico
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'relative';
    } else {
      // Restaurar scroll
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.style.position = '';
    }

    // Cleanup: restaurar scroll al desmontar el componente
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.style.position = '';
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="relative max-w-4xl max-h-[90vh] w-full mx-4">
        {children}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70 transition-all cursor-pointer"
        >
          <IoMdClose className="text-2xl text-white" />
        </button>
      </div>
    </div>
  )
}
