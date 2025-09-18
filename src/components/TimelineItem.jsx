import React, { useRef, useEffect, useState } from 'react';
import Modal from './Modal.jsx'; // Importa el nuevo componente Modal

const TimelineItem = ({ year, title, description, imageUrl, isLeftAligned }) => {
  const itemRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Nuevo estado para el modal

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.3,
      }
    );

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => {
      if (itemRef.current) {
        observer.unobserve(itemRef.current);
      }
    };
  }, []);

  const animationClass = isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10';

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div
      ref={itemRef}
      className={`relative w-full flex flex-col items-center my-12 transition-all duration-1000 ease-out ${animationClass}
                  md:flex-row md:justify-center`}
    >
      {/* Línea divisoria central */}
      <div className="absolute left-1/2 -translate-x-1/2 h-full w-0.5 bg-sepia-dark hidden md:block z-0"></div>

      {/* Círculo central en la línea de tiempo */}
      <div className="hidden md:block absolute left-1/2 -translate-x-1/2 p-2 bg-sepia-dark rounded-full z-10"></div>

      {/* Contenedor de la CARD */}
      <div className={`
        relative flex-1 p-6 border-2 border-sepia-dark bg-parchment shadow-lg rounded-lg max-w-sm sm:max-w-md md:max-w-[45%] mx-auto z-10
        ${isLeftAligned ? 'md:mr-[calc(5%+1rem)] md:text-right md:order-1' : 'md:ml-[calc(5%+1rem)] md:text-left md:order-2'}
        md:w-full
      `}>
        {/* Triángulo/flecha */}
        <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-0 h-0 border-t-[10px] border-b-[10px] border-solid z-20
          ${isLeftAligned
            ? 'border-l-[15px] border-l-sepia-dark -right-[15px] border-b-transparent border-t-transparent'
            : 'border-r-[15px] border-r-sepia-dark -left-[15px] border-b-transparent border-t-transparent'
          }
        `}></div>

        <h3 className="text-5xl md:text-6xl font-cinzel-decorative text-sepia-dark mb-4 text-center">
          {year}
        </h3>
        <h4 className="text-3xl md:text-4xl font-cinzel-decorative text-sepia-dark mb-4 text-center">
          {title}
        </h4>
        <p className="text-lg text-ink leading-relaxed mb-6 text-center md:text-left">
          {description}
        </p>
        <div className="flex justify-center">
          <img
            src={imageUrl}
            alt={title}
            className="rounded-lg shadow-md max-w-full h-auto object-cover border-2 border-sepia-light cursor-pointer hover:scale-105 transition-transform duration-200"
            onClick={openModal} // Añade el manejador de clic aquí
          />
        </div>
      </div>

      {/* Renderiza el Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        imageUrl={imageUrl}
        title={title}
      />
    </div>
  );
};

export default TimelineItem;