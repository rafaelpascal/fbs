import { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "~/utils/helpers";
import { useTheme } from "~/context/theme-provider";

interface IBaseModal extends IChildren, IModalPropsType {
  isOpen: boolean;
  closeModal: () => void;
}

// Test
export const BaseModal = ({ children, isOpen }: IBaseModal) => {
  const { theme } = useTheme();
  const tooltipRef = useRef<HTMLElement>(null);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -20 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed shadow-lg bottom-0 left-0 right-0 top-0 z-[9999] bg-[#000] bg-opacity-60 flex h-full min-h-screen w-full items-center justify-center"
        >
          <div
            ref={tooltipRef as React.RefObject<HTMLDivElement>}
            className={cn(
              "h-auto max-h-[800px] pb-4 w-auto rounded-[8px] overflow-y-auto shadow-md [@media(max-width:1200px)]:w-[50%] [@media(max-width:700px)]:w-[90%] ",
              theme === "dark" ? "bg-[#333]" : "bg-[#fff]"
            )}
          >
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
