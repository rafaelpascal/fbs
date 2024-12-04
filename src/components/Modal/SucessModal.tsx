import { BaseModal } from "./BaseModal";
import { useCallback } from "react";
import { MdCancel } from "react-icons/md";
import { ROUTES } from "../constants/routes";
import { useNavigate } from "react-router-dom";
import { FaCheckDouble } from "react-icons/fa6";

interface IModalPropsType {
  isOpen: boolean;
  message?: string;
  closeModal: () => void;
}

export const SucessModal = ({
  isOpen,
  message,
  closeModal,
}: IModalPropsType) => {
  const navigate = useNavigate();
  // Close modal
  const handleclose = useCallback(() => {
    closeModal();
  }, []);

  const handleBankTransfer = () => {
    navigate(ROUTES.DASHBOARD, { state: { enrolled: true } });
  };
  return (
    <BaseModal isOpen={isOpen} closeModal={closeModal}>
      <div className="flex w-full lg:w-[514px] h-auto p-6 flex-col items-center justify-center">
        <div className="w-full flex justify-end items-center">
          <div className="flex justify-between items-start w-full lg:w-[58%]">
            <div className="h-[80px] w-[80px] bg-slate-300 rounded-full flex justify-center items-center">
              <div className="h-[50px] w-[50px] bg-slate-400 rounded-full flex justify-center items-center">
                <FaCheckDouble className="text-[25px]" />
              </div>
            </div>
            <button onClick={handleclose}>
              <MdCancel className="text-[20px]" />
            </button>
          </div>
        </div>
        <div className="w-full flexm mt-4 justify-center items-center flex-col">
          <h2 className="text-[20px] mb-4 text-center font-DMSans font-bold">
            Submitted
          </h2>
          <p className="text-[18px] text-center font-DMSans font-normal ">
            {message}
          </p>
        </div>
        <div className="w-full flex justify-center items-center gap-3 mt-6">
          <button
            onClick={handleBankTransfer}
            className="w-auto px-8 py-2 rounded-[5px] text-[#fff] text-[16px] font-bold font-DMSans bg-[#ED342B] hover:bg-[#ED342B]/50 h-[36px] flex justify-center items-center"
          >
            Close
          </button>
        </div>
      </div>
    </BaseModal>
  );
};
