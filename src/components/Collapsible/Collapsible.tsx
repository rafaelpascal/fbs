import { ReactNode, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useTheme } from "~/context/theme-provider";
import { cn } from "~/utils/helpers";

type CollapseProps = {
  title: string;
  children: ReactNode;
  initialState: boolean;
  headerClassName?: string;
};

const Collapsible = ({
  title,
  children,
  initialState = false,
  headerClassName,
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
        <p
          className={cn(
            "font-DMSans text-[24px] font-semibold",
            headerClassName
          )}
        >
          {title}
        </p>
        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </div>
      <div className="collapse-content">{children}</div>
    </div>
  );
};

export default Collapsible;
