import React from "react";

interface FilterOption {
  value: string | number;
  label: string;
}

interface FilterDropdownProps {
  filter: string | number;
  setFilter: (value: string) => void;
  options: FilterOption[]; // Dynamic filter options
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  filter,
  setFilter,
  options,
}) => {
  return (
    <div className="mb-4 flex flex-col w-full justify-start items-start gap-4">
      <select
        id="statusFilter"
        className="border outline-none w-full font-DMSans text-[14px] font-semibold border-gray-300 rounded-md px-3 py-1"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterDropdown;
