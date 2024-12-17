// Hook to handle modal positions especially to ensure the modals dont get cut off from the screen
import { useEffect, useState } from "react";
import { useModal } from "./use-modal";

interface IUseModalPosition {
  targetRef?: React.RefObject<HTMLDivElement | HTMLButtonElement>;
  reversed?: boolean;
  initialPosition?: {
    top?: number;
    right?: number;
    left?: number;
  };
}

// use modal position
export const useModalPosition = ({
  targetRef,
  reversed,
  initialPosition = {
    top: 0,
    left: 0,
  },
}: IUseModalPosition) => {
  const { isModalOpen, openModal, modalRef } = useModal();
  const [position, setPosition] = useState(initialPosition);

  useEffect(() => {
    // update position hook for the modal
    const updatePosition = () => {
      if (targetRef?.current) {
        const targetRect = targetRef.current.getBoundingClientRect();
        const modal = modalRef.current;
        if (modal && isModalOpen) {
          const modalRect = modal.getBoundingClientRect();

          let top = targetRect.top + window.scrollY;
          let left = targetRect.left + window.scrollX;

          if (reversed) {
            top -= modalRect.height + 8; // Adjust for reversed positioning
          } else {
            top += targetRect.height + 8;
          }

          if (left + modalRect.width > window.innerWidth) {
            left = window.innerWidth - modalRect.width - 8;
          }

          if (left < 0) {
            left = 8;
          }

          if (top + modalRect.height > window.innerHeight) {
            top = window.innerHeight - modalRect.height - 32;
          }

          if (top < 0) {
            top = 8;
          }

          setPosition({ top, left });
        } else {
          const top = targetRect.top + window.scrollY;
          const left = targetRect.left + window.scrollX;
          setPosition({ top, left });
        }
      }
    };

    // Initial position update
    updatePosition();

    // Update position on window resize or scroll
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition);
    };
  }, [targetRef, reversed, modalRef, isModalOpen]);

  return {
    position,
    modalRef,
    openModal,
    // closeModal,
    isModalOpen,
  };
};
