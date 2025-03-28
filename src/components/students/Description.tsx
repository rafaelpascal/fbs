import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DescriptionProps {
  description: string;
}

const Description = ({ description }: DescriptionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const MAX_LENGTH = 400;

  const handleToggle = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div>
      <h2 className="font-DMSans font-semibold mb-4">Description</h2>
      <AnimatePresence mode="wait">
        <motion.p
          key={isExpanded ? "expanded" : "collapsed"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
          className="text-left font-DMSans font-normal text-[19px] leading-[26px]"
        >
          {isExpanded || description.length <= MAX_LENGTH
            ? description
            : `${description.slice(0, MAX_LENGTH)}...`}
        </motion.p>
      </AnimatePresence>
      {description.length > MAX_LENGTH && (
        <button
          onClick={handleToggle}
          className="hover:px-2 font-DMSans font-semibold text-[16px] mt-2 hover:border-[1px] hover:border-[#FF3B30] text-[#FF3B30] rounded"
        >
          {isExpanded ? "Show Less" : "Show More"}
        </button>
      )}
    </div>
  );
};

export default Description;
