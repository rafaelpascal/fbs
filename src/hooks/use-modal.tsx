import { useCallback, useEffect, useRef, useState } from "react";
// use modal hook
export const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);
  const toggleModal = useCallback(
    () => setIsModalOpen(!isModalOpen),
    [isModalOpen]
  );
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // close modal on clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef?.current &&
        event.target instanceof Node &&
        !modalRef.current?.contains(event.target)
      ) {
        closeModal();
        document.body.style.overflow = "auto";
      }
    };

    // close modal on pressing the escape key
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isModalOpen) {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleEscKey);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [closeModal, isModalOpen]);

  return {
    isModalOpen,
    openModal,
    toggleModal,
    closeModal,
    modalRef,
  };
};
