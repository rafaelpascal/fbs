import React, { useState } from "react";
import { useTheme } from "~/context/theme-provider";

interface OTPInputProps {
  length: number;
  onComplete: (otp: string) => void;
}

const ReferalCode: React.FC<OTPInputProps> = ({ length, onComplete }) => {
  const { theme } = useTheme();
  // State to store the OTP digits
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));

  // Handle input change
  const handleChange = (value: string, index: number) => {
    // Only accept numeric input
    if (!/^\d*$/.test(value)) return;

    // Update OTP digit
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Automatically move to the next input
    if (value !== "" && index < length - 1) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }

    // Call the onComplete function when OTP is filled
    if (newOtp.every((digit) => digit !== "")) {
      onComplete(newOtp.join(""));
    }
  };

  // Handle key press for backspace navigation
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      prevInput?.focus();
    }
  };

  return (
    <div className="flex space-x-2">
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
          className={`w-16 lg:w-[136px] h-16 lg:h-[67px] border-2 border-gray-300 rounded text-center text-lg focus:outline-none focus:border-blue-500 ${
            theme === "dark" ? "bg-[#333] text-[#fff]" : "bg-[#fff] text-[#000]"
          }`}
        />
      ))}
    </div>
  );
};

export default ReferalCode;
