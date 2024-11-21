import { ReactNode, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

type CollapseProps = {
  title: string;
  children: ReactNode;
  initialState: boolean;
};

const Collapsible = ({
  title,
  children,
  initialState = false,
}: CollapseProps) => {
  const [isOpen, setIsOpen] = useState(initialState);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-[#fff] shadow-sm rounded-[8px] collapse">
      <input
        type="checkbox"
        className="peer"
        onChange={handleToggle}
        checked={isOpen}
      />
      <div className="collapse-title flex justify-between items-center bg-[#fff] text-primary-content peer-checked:bg-[#fff] peer-checked:text-secondary-content py-8">
        <p className="text-[#140342] font-DMSans text-[24px] font-semibold">
          {title}
        </p>
        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </div>
      <div className="collapse-content bg-[#fff] text-primary-content peer-checked:bg-[#fff] peer-checked:text-secondary-content">
        {children}
      </div>
    </div>
  );
};

export default Collapsible;
