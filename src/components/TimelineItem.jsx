import React, { useRef, useEffect, useState } from 'react';

const TimelineItem = ({ id, year, title, description, imageUrl, isLeftAligned }) => {
  const itemRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isImageExpanded, setIsImageExpanded] = useState(false); // Nuevo estado para la expansión de la imagen

  const loadingStrategy = id === 1 ? 'eager' : 'lazy';

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


  const animationClass = isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10';

  const toggleImageExpand = () => setIsImageExpanded(!isImageExpanded);

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
        <div className="flex justify-center relative"> {/* Relative para posicionar la imagen expandida */}
          <img
            src={imageUrl}
            alt={title}
            className="rounded-lg shadow-md max-w-full h-auto object-cover border-2 border-sepia-light cursor-zoom-in hover:scale-105 transition-transform duration-200"
            onClick={toggleImageExpand} // Usa el nuevo manejador
            loading={loadingStrategy}
          />

          {/* Imagen Ampliada */}
          {isImageExpanded && (
            <div
              className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50 cursor-zoom-out" // Fondo semitransparente más ligero
              onClick={toggleImageExpand} // Cierra al hacer clic en el fondo
            >
              <img
                src={imageUrl}
                alt={title}
                className="max-w-[100vw] max-h-[100vh] rounded-lg shadow-2xl border-4 border-sepia-light transform scale-95 animate-zoom-in-image transition-transform duration-300 ease-out"
                onClick={(e) => e.stopPropagation()} // Evita que el clic en la imagen cierre el lightbox
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