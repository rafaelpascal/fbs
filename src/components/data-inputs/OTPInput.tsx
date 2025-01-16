import React, { useState } from "react";
import { useTheme } from "~/context/theme-provider";

interface OTPInputProps {
  length: number;
  onComplete: (otp: string) => void;
}

const OTPInput: React.FC<OTPInputProps> = ({ length, onComplete }) => {
  const { theme } = useTheme();
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));

  const handleChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== "" && index < length - 1) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }

    if (newOtp.every((digit) => digit !== "")) {
      onComplete(newOtp.join(""));
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      prevInput?.focus();
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
      {otp.map((digit, index) => (
        <input
          key={index}
          id={`otp-input-${index}`}
          type="text"
          inputMode="numeric"
          value={digit}
          maxLength={1}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className={`w-16 lg:w-[106px] h-16 lg:h-[67px] border-2 border-gray-300 rounded text-center text-lg focus:outline-none focus:border-blue-500 ${
            theme === "dark" ? "bg-[#333] text-[#fff]" : "bg-[#fff] text-[#000]"
          }`}
        />
      ))}
    </div>
  );
};

export default OTPInput;
