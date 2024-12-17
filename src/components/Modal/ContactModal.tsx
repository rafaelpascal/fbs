import { BaseModal } from "./BaseModal";
import { useCallback } from "react";
import { MdOutlinePhone, MdWhatsapp } from "react-icons/md";
import { MdEmail } from "react-icons/md";

interface IModalPropsType {
  isOpen: boolean;
  closeModal: () => void;
}

export const ContactModal = ({ isOpen, closeModal }: IModalPropsType) => {
  // Close modal
  const handleclose = useCallback(() => {
    closeModal();
  }, []);

  return (
    <BaseModal isOpen={isOpen} closeModal={closeModal}>
      <div className="flex w-full lg:w-[394px] h-auto px-6 py-4 flex-col items-center justify-center">
        <div className="flex justify-between mb-4 items-center w-full">
          <p className="font-DMSans font-normal text-[16px] text-[#FF3B30]">
            <span className="font-bold">Last Seen: </span> 4 months ago
          </p>
          <p className="font-DMSans font-normal text-[16px] text-[#FF3B30]">
            Grade: 100
          </p>
        </div>
        <div className="flex mb-4 justify-between items-center w-full">
          <button className="flex flex-col justify-center items-center">
            <MdEmail className="text-[30px]" />
            <p className="font-DMSans font-normal text-[16px]">Email</p>
          </button>
          <button className="flex flex-col justify-center items-center">
            <MdWhatsapp className="text-[30px]" />
            <p className="font-DMSans font-normal text-[16px]">WhatsApp</p>
          </button>
          <button className="flex flex-col justify-center items-center">
            <MdOutlinePhone className="text-[30px]" />
            <p className="font-DMSans font-normal text-[16px]">Phone</p>
          </button>
        </div>
        <p className="w-full text-left font-DMSans font-semibold text-[17px]">
          Lessons Completed 3/43
        </p>
        <button
          onClick={handleclose}
          className="bg-[#ddd] px-4 py-2 mt-4 rounded-md"
        >
          <p className="font-DMSans font-semibold text-[17px]">Close</p>
        </button>
      </div>
    </BaseModal>
  );
};
