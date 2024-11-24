import React, { useState, ReactNode } from "react";

interface CarouselProps {
  children: ReactNode[];
}

const Carousel: React.FC<CarouselProps> = ({ children }) => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const totalSlides = children.length;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === totalSlides ? 1 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 1 ? totalSlides : prev - 1));
  };

  return (
    <div className="relative overflow-hidden">
      <div
        className="carousel-slide"
        style={{
          transform: `translateX(-${(currentSlide - 1) * 100}%)`,
          transition: "transform 0.3s ease-in-out", // Smooth slide transition
          display: "flex",
          width: "100%", // Ensure the carousel takes up only 100% of the container width
        }}
      >
        {children.map((child, index) => (
          <div key={index} className="w-full flex-shrink-0">
            {child}
          </div>
        ))}
      </div>

      <div className="flex justify-between lg:justify-center gap-10 items-center py-4">
        <button
          onClick={prevSlide}
          className="bg-[#FF3B30] text-[#fff] btn-circle"
        >
          ❮
        </button>
        <div className="flex gap-2">
          {children.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index + 1)}
              className={` font-DMSans font-semibold ${
                currentSlide === index + 1 ? "text-[#FF3B30] underline" : ""
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <button
          onClick={nextSlide}
          className="bg-[#E5F0FD] text-[#FF3B30] btn-circle"
        >
          ❯
        </button>
      </div>
    </div>
  );
};

export default Carousel;
