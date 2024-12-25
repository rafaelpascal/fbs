import { useTheme } from "~/context/theme-provider";
import PersonalInfo from "./personal-data";
import Otherinfo from "./otherInfo";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AuthService } from "~/api/auth";

const Courseform = () => {
  const { theme } = useTheme();
  const [isEmailVerified, setEmail] = useState(false);
  const [submitting, isSubmitted] = useState(false);

  const handleOTPComplete = async (otp: string) => {
    isSubmitted(true);
    try {
      const payload = {
        otp: otp,
        email: "rafaelpascal234@gmail.com",
        userid: "23",
      };
      const res = await AuthService.validateOTP(payload);
      console.log(res);
      setEmail(true);
      isSubmitted(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`p-4 lg:p-10 ${theme === "dark" ? "bg-[#333]" : "bg-[#fff]"}`}
    >
      <PersonalInfo
        handleOTPComplete={handleOTPComplete}
        submitting={submitting}
      />

      {/* Animate the dropdown using Framer Motion */}
      <AnimatePresence>
        {isEmailVerified && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Otherinfo />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Courseform;
