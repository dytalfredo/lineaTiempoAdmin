import React, { useEffect, useRef } from 'react';

const Modal = ({ isOpen, onClose, imageUrl, title }) => {
  const modalRef = useRef();

  // Cerrar el modal al hacer clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Deshabilitar scroll del body cuando el modal está abierto
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset'; // Asegurar que el scroll se reestablezca al desmontar
    };
  }, [isOpen, onClose]);

  // Cerrar el modal al presionar la tecla ESC
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
    }
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose]);


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center p-4 z-50 animate-fade-in-modal">
      <div
        ref={modalRef}
        className="relative bg-parchment rounded-lg shadow-xl p-4 max-w-4xl max-h-[90vh] overflow-hidden transform scale-95 transition-transform duration-300 ease-out"
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-sepia-dark text-3xl font-bold p-2 leading-none hover:text-sepia-light transition-colors"
          aria-label="Cerrar modal"
        >
          &times;
        </button>
        <div className="overflow-y-auto max-h-[calc(90vh-3rem)]"> {/* Ajusta el alto máximo para que quepa el botón de cerrar */}
          <img src={imageUrl} alt={title} className="max-w-full h-auto rounded-lg mx-auto border-2 border-sepia-dark" />
          {title && (
            <p className="text-center text-ink mt-4 text-xl font-bold font-cinzel-decorative">{title}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;