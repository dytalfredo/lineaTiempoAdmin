import React, { useRef, useEffect, useState } from 'react';

const TimelineItem = ({ id, year, title, description, imageUrl, isLeftAligned }) => {
  // Ya no necesitamos itemRef para IntersectionObserver, pero lo mantenemos si quieres un punto de anclaje
  // para otras cosas o si en el futuro queremos observar algo más específico.
  // Sin embargo, para la animación de scroll pura, se puede aplicar directamente a las clases.

  const [isImageExpanded, setIsImageExpanded] = useState(false);
  const loadingStrategy = id === 1 ? 'eager' : 'lazy'; // Mantenemos la carga diferida

  // Efecto para cerrar la imagen expandida al presionar ESC
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        setIsImageExpanded(false);
      }
    };
    if (isImageExpanded) {
      document.addEventListener('keydown', handleEscapeKey);
    }
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isImageExpanded]);

  const toggleImageExpand = () => setIsImageExpanded(!isImageExpanded);

  return (
    <div
      // Aplicaremos las clases de animación directamente aquí o en elementos hijos
      // La clase 'timeline-item-animated' se definirá en CSS para usar scroll-timeline
      className={`relative w-full flex flex-col items-center my-12 md:flex-row md:justify-center timeline-item-animated`}
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
        <div className="flex justify-center relative">
          <img
            src={imageUrl}
            alt={title}
            className="rounded-lg shadow-md max-w-full h-auto object-cover border-2 border-sepia-light cursor-zoom-in hover:scale-105 transition-transform duration-200"
            onClick={toggleImageExpand}
            loading={loadingStrategy}
          />

          {/* Imagen Ampliada */}
          {isImageExpanded && (
            <div
              className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50 cursor-zoom-out"
              onClick={toggleImageExpand}
            >
              <img
                src={imageUrl}
                alt={title}
                className="max-w-[90vw] max-h-[90vh] rounded-lg shadow-2xl border-4 border-sepia-light transform scale-95 animate-zoom-in-image transition-transform duration-300 ease-out"
                onClick={(e) => e.stopPropagation()}
              />
              <button
                onClick={toggleImageExpand}
                className="absolute top-4 right-4 text-white text-5xl leading-none font-bold p-2 transition-colors hover:text-sepia-light"
                aria-label="Cerrar imagen"
              >
                &times;
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimelineItem;