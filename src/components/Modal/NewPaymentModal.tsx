import { BaseModal } from "./BaseModal";
import { useCallback } from "react";
import { MdOutlinePayments } from "react-icons/md";
import { MdCancel } from "react-icons/md";
import { cn } from "~/utils/helpers";
import { ROUTES } from "../constants/routes";
import { useNavigate } from "react-router-dom";

interface IModalPropsType {
  isOpen: boolean;
  closeModal: () => void;
}

export const NewPaymentModal = ({ isOpen, closeModal }: IModalPropsType) => {
  const navigate = useNavigate();
  // Close modal
  const handleclose = useCallback(() => {
    closeModal();
  }, []);

  const handleBankTransfer = () => {
    navigate(ROUTES.BANKTRANSFER);
  };
  return (
    <BaseModal isOpen={isOpen} closeModal={closeModal}>
      <div className="flex w-full lg:w-[514px] h-auto p-6 flex-col items-center justify-center">
        <div className="w-full flex justify-end items-center">
          <div className="flex justify-between items-start w-full lg:w-[55%]">
            <div className="h-[80px] w-[80px] bg-slate-300 rounded-full flex justify-center items-center">
              <div className="h-[50px] w-[50px] bg-slate-400 rounded-full flex justify-center items-center">
                <MdOutlinePayments className="text-[25px]" />
              </div>
            </div>
            <button onClick={handleclose}>
              <MdCancel className="text-[20px]" />
            </button>
          </div>
        </div>
        <div className="w-full flexm mt-4 justify-center items-center flex-col">
          <h2 className="text-[20px] mb-4 text-center font-DMSans font-bold">
            Proceed to payment
          </h2>
          <p className="text-[16px] text-center font-DMSans font-normal ">
            You can choose any of this option to complete your payment.
          </p>
        </div>
        <div className="flex gap-4 p-4 justify-between items-center">
          <button
            className={cn(
              "rounded-md p-2  bg-[#6440FB] text-[#fff] hover:bg-[#6440FB]/60"
            )}
          >
            <p className="font-DMSans text-[14px] font-semibold items-center">
              Pay Online
            </p>
            <p className="font-DMSans text-[14px] font-semibold items-center">
              Pay with your bank card using Flutterwave{" "}
            </p>
          </button>
          <button
            onClick={handleBankTransfer}
            className={cn(
              "rounded-md p-2 bg-[#6440FB] text-[#fff] hover:bg-[#6440FB]/60"
            )}
          >
            <p className="font-DMSans text-[14px] font-semibold items-center">
              Bank Transfer{" "}
            </p>
            <p className="font-DMSans text-[14px] font-semibold items-center">
              Transfer or deposit directly to Fordax
            </p>
          </button>
        </div>
      </div>
    </BaseModal>
  );
};
