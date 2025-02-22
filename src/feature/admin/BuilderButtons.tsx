import React from "react";

interface ButtonGridProps {
  buttons: { label: string; onClick?: () => void }[];
}

const ButtonGrid: React.FC<ButtonGridProps> = ({ buttons }) => {
  return (
    <div className="flex mt-4 justify-center items-center w-full">
      <div className="w-full lg:w-[80%] grid lg:grid-cols-5 grid-cols-2 gap-4">
        {buttons.map((button, index) => (
          <button
            key={index}
            onClick={button.onClick}
            className="mb-2 px-4 py-4 rounded-[4px] bg-[#FF5050] text-white"
          >
            {button.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ButtonGrid;
