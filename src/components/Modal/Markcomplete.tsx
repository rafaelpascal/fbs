import { CiWarning } from "react-icons/ci";
import { BaseModal } from "./BaseModal";

interface IModalPropsType {
  id: number | null;
  isOpen: boolean;
  message: string;
  closeModal: () => void;
  handleMarkComplete: () => void;
}

export const Markcomplete = ({
  //   id,
  message,
  isOpen,
  closeModal,
  handleMarkComplete,
}: IModalPropsType) => {
  return (
    <BaseModal
      isOpen={isOpen}
      closeModal={closeModal}
      className="lg:min-w-[394px] "
    >
      <div className="flex w-full h-auto flex-col items-center justify-center">
        <div className="flex bg-[#ddd] p-2 justify-between mb-4 items-center w-full">
          <p className="font-DMSans text-center w-full font-normal text-[20px] text-[#FF3B30]">
            Mark this lesson as complete
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
              onClick={closeModal}
              className="bg-[#ddd] px-4 py-2 mt-4 rounded-md"
            >
              <p className="font-DMSans font-semibold text-[17px]">
                No / Cancel
              </p>
            </button>
            <button
              onClick={handleMarkComplete}
              className="bg-[#F01E00] flex justify-center items-center gap-2 px-4 py-2 mt-4 rounded-md"
            >
              <p className="font-DMSans font-semibold text-[17px] text-[#fff]">
                Yes
              </p>
              {/* {accepting && <LoadingSpinner size="xs" />} */}
            </button>
          </div>
        </div>
      </div>
    </BaseModal>
  );
};
