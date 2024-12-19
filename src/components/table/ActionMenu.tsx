import React, { useRef } from "react";
import { FaEllipsisH } from "react-icons/fa";
import { useModalPosition } from "~/hooks/use-modal-position";

// Define the type for your actions
type Action = {
  label: string;
  action: () => void;
};

interface ActionMenuProps {
  actions: Action[]; // List of actions to display
}

const ActionMenu: React.FC<ActionMenuProps> = ({ actions }) => {
  const targetRef = useRef(null);

  // Use the custom hook with a reference to the action button
  const { position, modalRef, openModal, isModalOpen } = useModalPosition({
    targetRef,
  });

  const styles: React.CSSProperties = {
    position: "fixed",
    top: `${position.top}px`,
    pointerEvents: "none",
  };

  return (
    <div>
      <div ref={targetRef} className="relative items-center">
        <button type="button" onClick={openModal}>
          <FaEllipsisH className="text-[16px]" />
        </button>
      </div>
      {isModalOpen && (
        <div
          style={styles}
          ref={modalRef}
          className="flex z-[100] shadow-md absolute top-4 right-[5%]"
        >
          <div className="flex pointer-events-auto max-w-[155px] flex-col gap-2 p-2 text-sm bg-white rounded shadow-sm text-start">
            {actions.map((btn) => (
              <button
                key={btn.label}
                onClick={btn.action}
                className={`text-[12px] py-2 px-4 text-left font-DMSans font-semibold rounded-[4px] hover:text-[#fff] w-full text-[#515F76] ${
                  btn.label === "Deactivate" || btn.label === "Remove"
                    ? "hover:bg-[#ED342B]"
                    : "hover:bg-[#03435F]"
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ActionMenu;
