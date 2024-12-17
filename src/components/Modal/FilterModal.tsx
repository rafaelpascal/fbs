import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface IBaseModal {
  isOpen: boolean;
  closeModal: () => void;
  className?: string;
  doNotCloseOutside?: boolean;
  children?: React.ReactNode;
}

export const FilterModal = (props: IBaseModal) => {
  const { children, isOpen, closeModal, doNotCloseOutside } = props;
  const tooltipRef = useRef<HTMLElement>(null);

  const func = closeModal;

  useEffect(() => {
    // Close filter on click
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tooltipRef?.current &&
        event.target instanceof Node &&
        !tooltipRef.current?.contains(event.target)
      ) {
        if (!doNotCloseOutside) {
          func();
          document.body.style.overflow = "auto";
        }
      }
    };

    // close modal on pressing escape key
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        if (doNotCloseOutside) {
          func();
        }
      }
    };

    document.addEventListener("keydown", handleEscKey);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isOpen, doNotCloseOutside]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -20 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="hide-scrollbar border-[0.4px] absolute rounded-[8px] right-0 top-14 z-[9] flex max-h-[540px] w-full justify-center overflow-y-auto md:w-[438px] bg-[#fff] shadow-lg"
        >
          <div
            ref={tooltipRef as React.RefObject<HTMLDivElement>}
            className="w-full overflow-y-auto p-3 shadow-lg"
          >
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
