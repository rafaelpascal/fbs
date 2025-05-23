import { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "~/utils/helpers";
import { useTheme } from "~/context/theme-provider";

interface IBaseModal extends IChildren, IModalPropsType {
  isOpen: boolean;
  closeModal: () => void;
  className?: string;
  parentClassName?: string;
  slideDirection?: "top" | "bottom" | "left" | "right";
}

export const BaseModal = ({
  children,
  className,
  parentClassName,
  isOpen,
  slideDirection = "top",
}: IBaseModal) => {
  const { theme } = useTheme();
  const tooltipRef = useRef<HTMLElement>(null);

  const getSlideAnimation = () => {
    switch (slideDirection) {
      case "bottom":
        return {
          initial: { y: 100, opacity: 0 },
          animate: { y: 0, opacity: 1 },
          exit: { y: 100, opacity: 0 },
        };
      case "left":
        return {
          initial: { x: -100, opacity: 0 },
          animate: { x: 0, opacity: 1 },
          exit: { x: -100, opacity: 0 },
        };
      case "right":
        return {
          initial: { x: 100, opacity: 0 },
          animate: { x: 0, opacity: 1 },
          exit: { x: 100, opacity: 0 },
        };
      case "top":
      default:
        return {
          initial: { y: -20, opacity: 0 },
          animate: { y: 0, opacity: 1 },
          exit: { y: -20, opacity: 0 },
        };
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          {...getSlideAnimation()}
          // initial={{ opacity: 0, y: -20 }}
          // animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -20 }}
          // exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className={cn(
            "fixed shadow-lg bottom-0 left-0 right-0 top-0 z-[9999] bg-[#000] bg-opacity-60 flex h-full min-h-screen w-full items-center justify-center",
            parentClassName
          )}
        >
          <div
            ref={tooltipRef as React.RefObject<HTMLDivElement>}
            className={cn(
              "h-auto max-h-[800px]  w-auto rounded-[8px] overflow-y-auto shadow-md [@media(max-width:1200px)]:w-[50%] [@media(max-width:700px)]:w-[90%] ",
              theme === "dark" ? "bg-[#333]" : "bg-[#fff]",
              className
            )}
          >
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
