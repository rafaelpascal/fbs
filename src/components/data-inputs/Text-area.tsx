import React, { useState } from "react";
import { useTheme } from "~/context/theme-provider";
import { cn } from "~/utils/helpers";

type TextAreaProps = {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
  rows?: number;
  className?: string;
  label?: string;
  showCharCount?: boolean;
};

const TextArea: React.FC<TextAreaProps> = ({
  value = "",
  onChange,
  placeholder = "Enter your text here...",
  maxLength = 500,
  rows = 5,
  className = "",
  showCharCount = false,
  label,
}) => {
  const { theme } = useTheme();
  const [currentValue, setCurrentValue] = useState<string>(value);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    if (text.length <= maxLength) {
      setCurrentValue(text);
      if (onChange) onChange(text);
    }
  };

  return (
    <div className={`flex flex-col ${className}`}>
      {label && (
        <div className="flex justify-start gap-2 items-center">
          <h1
            dangerouslySetInnerHTML={{ __html: label }}
            className={cn(
              "text-blackColor font-darkerGrotesque-bold mb-2 text-left text-[17px] font-medium leading-[25px]"
            )}
          />
        </div>
      )}
      <textarea
        value={currentValue}
        onChange={handleChange}
        placeholder={placeholder}
        rows={rows}
        className={cn(
          "p-4 border-[1px] border-[#fff] rounded-md focus:outline-none",
          theme === "dark" ? "bg-[#333]" : "bg-white"
        )}
      />
      {showCharCount && (
        <span className="mt-2 text-sm text-gray-500">
          {currentValue.length}/{maxLength} characters
        </span>
      )}
    </div>
  );
};

export default TextArea;
