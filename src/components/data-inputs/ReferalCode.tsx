import React, { useRef, useState } from "react";
import { useTheme } from "~/context/theme-provider";

interface OTPInputProps {
  length: number;
  onComplete: (otp: string) => void;
  onClear: () => void;
}

const ReferalCode: React.FC<OTPInputProps> = ({
  length,
  onComplete,
  onClear,
}) => {
  const { theme } = useTheme();
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);
    if (element.value !== "" && index < length - 1) {
      inputs.current[index + 1]?.focus();
    }
    if (newOtp.every((digit) => digit !== "")) {
      onComplete(newOtp.join(""));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace") {
      if (index > 0 && !otp[index]) {
        inputs.current[index - 1]?.focus();
      } else if (index === 0 && otp[index] === "") {
        onClear();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("Text").slice(0, length);
    if (!/^\d+$/.test(pasteData)) return;

    const newOtp = Array(length).fill("");
    pasteData.split("").forEach((char, i) => {
      newOtp[i] = char;
    });

    setOtp(newOtp);

    const nextEmptyIndex = newOtp.findIndex((digit) => digit === "");
    if (nextEmptyIndex === -1) {
      onComplete(newOtp.join(""));
    } else {
      const nextInput = document.getElementById(`otp-input-${nextEmptyIndex}`);
      nextInput?.focus();
    }
  };

  return (
    <div className="flex space-x-2" onPaste={handlePaste}>
      {otp.map((_, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          value={otp[index]}
          onChange={(e) => handleChange(e.target, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          // onBlur={() => handleBlur(index)}
          ref={(el) => (inputs.current[index] = el)}
          className={`w-16 h-16 border-2 border-gray-300 rounded text-center text-lg focus:outline-none focus:border-blue-500 ${
            theme === "dark" ? "bg-[#333] text-[#fff]" : "bg-[#fff] text-[#000]"
          }`}
        />
        // <input
        //   key={index}
        //   type="text"
        //   inputMode="numeric"
        //   value={digit}
        //   maxLength={1}
        //   onChange={(e) => handlevvChange(e.target.value, index)}
        //   onKeyDown={(e) => handleKeyDown(e, index)}
        //   className={`w-16 lg:w-[136px] h-16 lg:h-[67px] border-2 border-gray-300 rounded text-center text-lg focus:outline-none focus:border-blue-500 ${
        //     theme === "dark" ? "bg-[#333] text-[#fff]" : "bg-[#fff] text-[#000]"
        //   }`}
        // />
      ))}
    </div>
  );
};

export default ReferalCode;
