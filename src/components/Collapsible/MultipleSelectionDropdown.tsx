import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useTheme } from "~/context/theme-provider";
import { cn } from "~/utils/helpers";

// Define the type for a single option
interface Option {
  label: string;
  value: string | number;
}

// Define the props for the SelectionDropdown component
interface SelectionDropdownProps {
  label?: string;
  options: Option[] | undefined;
  labelClassName?: string;
  placeholder?: string;
  onSelect: (selectedOptions: Option[]) => void; // Now expects an array of selected options
}

const MultipleSelectionDropdown: React.FC<SelectionDropdownProps> = ({
  options,
  label,
  labelClassName,
  placeholder = "Select an option",
  onSelect,
}) => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]); // Changed to array

  // Function to toggle dropdown visibility
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  // Function to handle selection of an option
  const handleSelect = (option: Option) => {
    const isSelected = selectedOptions.some(
      (selected) => selected.value === option.value
    );

    let updatedOptions;
    if (isSelected) {
      // Remove the option if it is already selected
      updatedOptions = selectedOptions.filter(
        (selected) => selected.value !== option.value
      );
    } else {
      // Add the option to the selection
      updatedOptions = [...selectedOptions, option];
    }

    setSelectedOptions(updatedOptions);
    onSelect(updatedOptions); // Pass the updated selection to the parent
  };

  return (
    <div className="relative w-full rounded-[8px]">
      {label && <label className={labelClassName}>{label}</label>}
      <div
        className={`flex justify-between border-[0.5px] border-[#ddd] mt-2 items-center  rounded-md p-3 cursor-pointer shadow-sm bg-transparent`}
        onClick={handleToggle}
      >
        <span className="font-DMSans font-semibold text-[16px]">
          {selectedOptions.length > 0
            ? selectedOptions.map((option) => option.label).join(", ")
            : placeholder}
        </span>
        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </div>

      {/* Dropdown Options */}
      {isOpen && (
        <ul
          className={cn(
            "absolute left-0 right-0 mt-2 bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto",
            theme === "dark" ? "bg-[#333]" : "bg-[#fff]"
          )}
        >
          {options?.map((option) => (
            <li
              key={option.value}
              className={cn(
                "px-4 py-2 font-DMSans text-[16px] font-normal hover:bg-slate-400 cursor-pointer",
                selectedOptions.some(
                  (selected) => selected.value === option.value
                ) && "bg-slate-200"
              )}
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

export default MultipleSelectionDropdown;
