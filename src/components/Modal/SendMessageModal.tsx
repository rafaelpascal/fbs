import { BaseModal } from "./BaseModal";
import { GrAttachment } from "react-icons/gr";

interface IModalPropsType {
  id: number;
  isOpen: boolean;
  closeModal: () => void;
  handleSubmit: () => void;
}

const SendMessageModal = ({
  isOpen,
  closeModal,
  handleSubmit,
}: IModalPropsType) => {
  return (
    <BaseModal isOpen={isOpen} closeModal={closeModal}>
      <div className="flex w-full bg-[#F01E00B2]/70 lg:w-[614px] h-auto p-6 flex-col items-center justify-center">
        <div className="h-[55.66px] flex justify-between items-center px-2 w-full rounded-md bg-white">
          <h2 className="font-DMSans w-[13%] font-semibold text-[16px]">
            Subject :
          </h2>
          <input
            type="text"
            className="outline-none w-[85%] h-full font-DMSans font-normal text-[16px]"
          />
        </div>
        <div className="h-[55.66px] my-4 flex justify-between items-center px-2 w-full rounded-md bg-white">
          <h2 className="font-DMSans w-[15%] font-semibold text-[16px]">
            Recipient :
          </h2>
          <input
            type="text"
            className="outline-none w-[85%] h-full font-DMSans font-normal text-[16px]"
          />
        </div>
        <textarea
          placeholder="Message"
          className="textarea textarea-lg scrollbar-style h-48 w-full font-DMSans font-normal text-[16px]"
        ></textarea>
        <div className="w-full flex flex-row justify-between items-center mt-6">
          <button className="flex justify-start hover:border hover:border-[#fff] rounded-md p-2 items-center gap-2">
            <GrAttachment className="size-6 text-[#fff]" />
            <p className="font-DMSans text-[#fff] font-semibold text-[16px]">
              Attach files
            </p>
          </button>
          <div className="flex flex-row gap-2">
            <button className="bg-transparent h-[48px] px-4 text-[#fff] font-DMSans font-semibold text-[14px]">
              CANCEL
            </button>
            <button
              onClick={handleSubmit}
              className="bg-[#fff] h-[48px] px-4 text-[#000] font-DMSans font-semibold text-[14px]"
            >
              SEND NOW
            </button>
          </div>
        </div>
      </div>
    </BaseModal>
  );
};

export default SendMessageModal;
