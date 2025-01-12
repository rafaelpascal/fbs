import React, { useState, useRef } from "react";

const options = ["Option 1", "Option 2", "Option 3", "Option 4", "Option 5"];

const EventMultiselect = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleCheckboxChange = (option: string) => {
    setSelectedItems((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  const handleRemoveItem = (item: string) => {
    setSelectedItems((prev) => prev.filter((selected) => selected !== item));
  };

  // Close dropdown on outside click
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full">
      <div className="flex justify-between items-center w-full">
        <div
          className="border border-gray-300 w-[20%] rounded p-2 cursor-pointer"
          onClick={toggleDropdown}
        >
          {selectedItems.length > 0
            ? selectedItems.join(", ")
            : "Select options..."}
        </div>
        <div className="selected-items flex flex-wrap gap-2 mt-4">
          {selectedItems.map((item) => (
            <div
              key={item}
              className="flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded shadow"
            >
              <span>{item}</span>
              <button
                onClick={() => handleRemoveItem(item)}
                className="text-red-500 font-bold"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      {isDropdownOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0  w-[20%] bg-white border border-gray-300 rounded shadow-lg z-10"
        >
          <ul className="max-h-40 scrollbar-style overflow-y-auto">
            {options.map((option) => (
              <li key={option} className="p-2 hover:bg-gray-100">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(option)}
                    onChange={() => handleCheckboxChange(option)}
                  />
                  {option}
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default EventMultiselect;
