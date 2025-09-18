import React, { useRef, useEffect, useState } from 'react';

const TimelineItem = ({ year, title, description, imageUrl, isLeftAligned }) => {
  const itemRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target); // Dejar de observar una vez que es visible
          }
        });
      },
      {
        threshold: 0.3, // El elemento será visible cuando el 30% esté en pantalla
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

  const alignmentClass = isLeftAligned ? 'md:self-start md:text-left' : 'md:self-end md:text-right';
  const animationClass = isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10';

  return (
    <div
      ref={itemRef}
      className={`relative w-full flex flex-col md:flex-row md:items-center my-12 transition-all duration-1000 ease-out ${animationClass} ${alignmentClass}`}
    >
      {/* Línea divisoria central para el diseño de línea de tiempo */}
      <div className="absolute left-1/2 -translate-x-1/2 h-full w-0.5 bg-sepia-dark hidden md:block"></div>

      {/* Contenido */}
      <div className={`flex-1 p-6 border-2 border-sepia-dark bg-parchment shadow-lg rounded-lg md:max-w-[45%] mx-auto md:mx-0 ${isLeftAligned ? 'md:mr-[calc(5%+0.25rem)]' : 'md:ml-[calc(5%+0.25rem)]'}`}>
        <h3 className="text-6xl font-cinzel-decorative text-sepia-dark mb-4 text-center md:text-left">{year}</h3> {/* Año con jerarquía exagerada */}
        <h4 className="text-3xl font-cinzel-decorative text-sepia-dark mb-4 text-center md:text-left">{title}</h4>
        <p className="text-lg text-ink leading-relaxed mb-6">{description}</p>
        <div className="flex justify-center md:justify-start">
          <img
            src={imageUrl}
            alt={title}
            className="rounded-lg shadow-md max-w-full h-auto object-cover border-2 border-sepia-light"
          />
        </div>
      </div>
    </div>
  );
};

export default TimelineItem;