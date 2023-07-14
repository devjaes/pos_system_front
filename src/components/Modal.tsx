import React from "react";

export interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ isVisible, onClose, children }: ModalProps) => {

    if (!isVisible) return null;

  const handleClose = (e: any) => {
    if (e.target.id === "wrapper") onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none transition-all duration-300"
      id="wrapper"
      onClick={handleClose}
    >
      <div className="md:w-[600px] w-[90%] mx-auto flex flex-col">
        <button className="text-white text-xl place-self-end"
        onClick={onClose}>
            X
        </button>
        <div className="bg-jair p-2 rounded">
            {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
