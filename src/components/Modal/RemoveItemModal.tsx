import { CiWarning } from "react-icons/ci";
import { BaseModal } from "./BaseModal";
import { useCallback } from "react";
interface IModalPropsType {
  id: number;
  isOpen: boolean;
  message: string;
  closeModal: () => void;
  onConfirm: () => void;
}

export const RemoveItemModal = ({
  message,
  isOpen,
  closeModal,
  onConfirm,
}: IModalPropsType) => {
  // Close modal
  const handleclose = useCallback(() => {
    closeModal();
  }, []);

  return (
    <BaseModal isOpen={isOpen} closeModal={closeModal}>
      <div className="flex w-full lg:w-[394px] h-auto flex-col items-center justify-center">
        <div className="flex bg-[#ddd] p-2 justify-between mb-4 items-center w-full">
          <p className="font-DMSans text-center w-full font-normal text-[20px] text-[#FF3B30]">
            Reject Application
          </p>
        </div>
        <div className="px-6 flex justify-center flex-col items-center pb-4">
          <CiWarning className="text-[80px] text-[#FF3B30] pb-4" />
          <p className="font-DMSans text-center w-full font-normal text-[14px] text-[#FF3B30]">
            Action can't be undone
          </p>
          <div className="flex mb-4 justify-between items-center w-full">
            <h2 className="font-DMSans font-semibold text-center text-[17px]">
              {message}
            </h2>
          </div>
          <div className="w-full flex justify-center items-center gap-4">
            <button
              onClick={handleclose}
              className="bg-[#ddd] px-4 py-2 mt-4 rounded-md"
            >
              <p className="font-DMSans font-semibold text-[17px]">Cancel</p>
            </button>
            <button
              onClick={onConfirm}
              className="bg-[#F01E00] flex justify-center items-center gap-2 px-4 py-2 mt-4 rounded-md"
            >
              <p className="font-DMSans font-semibold text-[17px] text-[#fff]">
                Yes Proceed
              </p>
            </button>
          </div>
        </div>
      </div>
    </BaseModal>
  );
};
