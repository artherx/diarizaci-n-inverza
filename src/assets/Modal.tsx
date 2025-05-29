import { CgClose } from "react-icons/cg";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, children }: ModalProps) {
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Cierra solo si se hace clic directamente en el fondo (no dentro del modal)
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  if (!isOpen) return null;
  return (
    <div
      className="flex justify-center items-center fixed inset-0 z-50 bg-black/50"
      onClick={handleBackdropClick}
    >
      <button className="absolute right-10 top-10 " onClick={() => onClose()}>
        <CgClose/>
      </button>
      <div className="relative"></div>
      <div className="bg-gray-700 rounded-lg shadow-xl p-10 w-full max-w-md">
        {children}
      </div>
    </div>
  );
}
