import { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp, FaTimes } from "react-icons/fa";
import { useTheme } from "~/context/theme-provider";
import { cn } from "~/utils/helpers";

// Define the type for a single option
interface Option {
  label: string;
  value: string | number;
}

// Define the props for the SelectionDropdown component
interface MultipleSelectionDropdownProps {
  label: string;
  options: Option[];
  onSelect: (selectedOptions: Option[]) => void;
  placeholder: string;
  labelClassName?: string;
  initialSelected?: Option[];
}

const MultipleSelectionDropdown = ({
  label,
  options,
  onSelect,
  placeholder,
  labelClassName,
  initialSelected = [],
}: MultipleSelectionDropdownProps) => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] =
    useState<Option[]>(initialSelected);

  // Function to toggle dropdown visibility
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (initialSelected) {
      setSelectedOptions(initialSelected);
    }
  }, [initialSelected]);

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

  // Function to remove a specific option
  const handleRemoveOption = (option: Option) => {
    const updatedOptions = selectedOptions.filter(
      (selected) => selected.value !== option.value
    );
    setSelectedOptions(updatedOptions);
    onSelect(updatedOptions);
  };

  return (
    <div className="relative w-full rounded-[8px]">
      {label && <label className={labelClassName}>{label}</label>}
      <div className="flex flex-col lg:flex-row flex-wrap justify-start items-start lg:items-center gap-4">
        <div
          className={`flex w-[40%] max-w-[40%] h-[50px] flex-row justify-between border-[0.5px] border-[#ddd] mt-2 items-center rounded-md p-3 cursor-pointer shadow-sm bg-transparent`}
          onClick={handleToggle}
        >
          <span className="font-DMSans font-semibold text-[16px]">
            {selectedOptions.length > 0
              ? selectedOptions[selectedOptions.length - 1].label
              : placeholder}
          </span>
          {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {/* Display Selected Options */}
        {selectedOptions.length > 0 && (
          <div className=" mt-4 border-[0.5px] border-[#ddd] p-2 rounded-md grid grid-cols-2 gap-2">
            {selectedOptions.map((option) => (
              <div
                key={option.value}
                className="flex items-center justify-between px-3 py-1 bg-gray-200 rounded-md text-sm font-medium"
              >
                <span className="font-DMSans font-semibold text-[14px]">
                  {option.label}
                </span>
                <button
                  onClick={() => handleRemoveOption(option)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  <FaTimes />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Dropdown Options */}
      {isOpen && (
        <ul
          className={cn(
            "absolute w-[50%] left-0 right-0 mt-2 bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto",
            theme === "dark" ? "bg-[#333]" : "bg-[#fff]"
          )}
        >
          {options.map((option) => (
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
