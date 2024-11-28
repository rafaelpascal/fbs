import { ReactNode, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useTheme } from "~/context/theme-provider";

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
  const { theme } = useTheme();
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`shadow-md mt-4 rounded-[8px] collapse ${
        theme === "dark" ? "bg-[#424141]" : ""
      }`}
    >
      <input
        type="checkbox"
        className="peer"
        onChange={handleToggle}
        checked={isOpen}
      />
      <div className="collapse-title flex justify-between items-center py-8">
        <p className="font-DMSans text-[24px] font-semibold">{title}</p>
        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </div>
      <div className="collapse-content">{children}</div>
    </div>
  );
};

export default Collapsible;
