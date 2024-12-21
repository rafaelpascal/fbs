import React from "react";

interface DropdownProps {
  label?: string;
  optionHeader?: string;
  options: string[];
  containerClassName?: string;
  selectClassName?: string;
  labelClassName?: string;
  onChange?: (value: string) => void;
}

const SelectDropdown: React.FC<DropdownProps> = ({
  label,
  optionHeader,
  options,
  containerClassName = "w-full",
  selectClassName = "select select-bordered w-full",
  labelClassName = "text-sm font-medium mb-2 block",
  onChange,
}) => {
  return (
    <div className={`flex flex-col ${containerClassName}`}>
      {label && <label className={labelClassName}>{label}</label>}
      <select
        className={selectClassName}
        onChange={(e) => onChange && onChange(e.target.value)}
        defaultValue=""
      >
        <option disabled value="" className={labelClassName}>
          {optionHeader}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option} className={labelClassName}>
            {option}
          </option>
        ))}
        <button className="text-[#fff]">Add New</button>
      </select>
    </div>
  );
};

export default SelectDropdown;
