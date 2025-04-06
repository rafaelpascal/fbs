// import React, { useState, ReactNode } from "react";

// interface CarouselProps {
//   children: ReactNode[];
//   activeIndex?: number; // Optional external index control
//   onChange?: (index: number) => void; // Optional callback to update the current slide
// }

// const Carousel: React.FC<CarouselProps> = ({
//   children,
//   activeIndex,
//   onChange,
// }) => {
//   const totalSlides = children.length;

//   // Internal state for activeIndex if not controlled externally
//   const [internalIndex, setInternalIndex] = useState(0);
//   const currentIndex = activeIndex !== undefined ? activeIndex : internalIndex;

//   const changeIndex = (newIndex: number) => {
//     if (onChange) {
//       onChange(newIndex); // Call external handler if provided
//     } else {
//       setInternalIndex(newIndex); // Update internal state
//     }
//   };

//   const nextSlide = () => {
//     const newIndex = currentIndex === totalSlides - 1 ? 0 : currentIndex + 1;
//     changeIndex(newIndex);
//   };

//   const prevSlide = () => {
//     const newIndex = currentIndex === 0 ? totalSlides - 1 : currentIndex - 1;
//     changeIndex(newIndex);
//   };

//   return (
//     <div className="relative overflow-hidden">
//       <div
//         className="carousel-slide"
//         style={{
//           transform: `translateX(-${currentIndex * 100}%)`,
//           transition: "transform 0.3s ease-in-out",
//           display: "flex",
//           width: "100%",
//         }}
//       >
//         {children.map((child, index) => (
//           <div key={index} className="w-full flex-shrink-0">
//             {child}
//           </div>
//         ))}
//       </div>

//       <div className="flex justify-between lg:justify-center gap-10 items-center py-4">
//         <button
//           onClick={prevSlide}
//           className="bg-[#FF3B30] text-[#fff] btn-circle"
//         >
//           ❮
//         </button>
//         <div className="flex gap-2">
//           {children.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => changeIndex(index)}
//               className={`font-DMSans font-semibold ${
//                 currentIndex === index ? "text-[#FF3B30] underline" : ""
//               }`}
//             >
//               {index + 1}
//             </button>
//           ))}
//         </div>
//         <button
//           onClick={nextSlide}
//           className="bg-[#E5F0FD] text-[#FF3B30] btn-circle"
//         >
//           ❯
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Carousel;

import React, { useState, ReactNode, Children, isValidElement } from "react";

interface CarouselProps {
  children: ReactNode;
  activeIndex?: number;
  onChange?: (index: number) => void;
  isNavigation?: boolean;
}

const Carousel: React.FC<CarouselProps> = ({
  children,
  activeIndex,
  onChange,
  isNavigation = true,
}) => {
  // Ensure children is always an array
  const childArray = Children.toArray(children).filter(isValidElement);
  const totalSlides = childArray.length;

  // Internal state for activeIndex if not controlled externally
  const [internalIndex, setInternalIndex] = useState(0);
  const currentIndex = activeIndex !== undefined ? activeIndex : internalIndex;

  const changeIndex = (newIndex: number) => {
    if (onChange) {
      onChange(newIndex); // Call external handler if provided
    } else {
      setInternalIndex(newIndex); // Update internal state
    }
  };

  const nextSlide = () => {
    const newIndex = currentIndex === totalSlides - 1 ? 0 : currentIndex + 1;
    changeIndex(newIndex);
  };

  const prevSlide = () => {
    const newIndex = currentIndex === 0 ? totalSlides - 1 : currentIndex - 1;
    changeIndex(newIndex);
  };

  return (
    <div className="relative overflow-hidden">
      <div
        className="carousel-slide"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: "transform 0.3s ease-in-out",
          display: "flex",
          width: "100%",
        }}
      >
        {childArray.map((child, index) => (
          <div key={index} className="w-full flex-shrink-0">
            {child}
          </div>
        ))}
      </div>

      <div className="flex justify-between lg:justify-center gap-10 items-center py-4">
        {isNavigation && (
          <button
            onClick={prevSlide}
            className="bg-[#FF3B30] text-[#fff] btn-circle"
          >
            ❮
          </button>
        )}
        <div className="flex gap-2">
          {childArray.map((_, index) => (
            <button
              key={index}
              onClick={() => changeIndex(index)}
              className={`font-DMSans font-semibold ${
                currentIndex === index
                  ? "text-[#FF3B30] w-[33px] shadow-md h-[33px] border border-[#FF3B30] rounded-full underline"
                  : ""
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
        {isNavigation && (
          <button
            onClick={nextSlide}
            className="bg-[#E5F0FD] text-[#FF3B30] btn-circle"
          >
            ❯
          </button>
        )}
      </div>
    </div>
  );
};

export default Carousel;
