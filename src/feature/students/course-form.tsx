import { useTheme } from "~/context/theme-provider";
import PersonalInfo from "./personal-data";
import Otherinfo from "./otherInfo";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Courseform = () => {
  const { theme } = useTheme();
  const [isEmailVerified, setEmail] = useState(false);
  const [submitting, isSubmitted] = useState(false);

  const handleOTPComplete = (otp: string) => {
    isSubmitted(true);
    setTimeout(() => {
      console.log(otp);
      setEmail(true);
      isSubmitted(false);
    }, 4000);
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
