import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useTheme } from "~/context/theme-provider";

// Define the type for a single option
interface Option {
  label: string;
  value: string | number;
}

// Define the props for the SelectionDropdown component
interface SelectionDropdownProps {
  options: Option[];
  placeholder?: string;
  onSelect: (option: Option) => void;
}

const SelectionDropdown: React.FC<SelectionDropdownProps> = ({
  options,
  placeholder = "Select an option",
  onSelect,
}) => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  // Function to toggle dropdown visibility
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  // Function to handle selection of an option
  const handleSelect = (option: Option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option);
  };

  return (
    <div className="relative w-full rounded-[8px]">
      {/* Dropdown Button */}
      <div
        className={`flex justify-between items-center  rounded-md p-3 cursor-pointer shadow-sm ${
          theme === "light"
            ? "bg-white border border-gray-300"
            : "bg-[#424141] border-gray-300"
        }`}
        onClick={handleToggle}
      >
        <span>{selectedOption ? selectedOption.label : placeholder}</span>
        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </div>

      {/* Dropdown Options */}
      {isOpen && (
        <ul className="absolute left-0 right-0 mt-2 bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
          {options.map((option) => (
            <li
              key={option.value}
              className="px-4 py-2 text-[#000] font-DMSans text-[16px] font-normal hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectionDropdown;
