import { BaseModal } from "./BaseModal";
import { useCallback } from "react";
import { MdCancel } from "react-icons/md";
import { IoIosCopy } from "react-icons/io";
import { FaEdit } from "react-icons/fa";

interface IModalPropsType {
  isOpen: boolean;
  //   message?: string;
  closeModal: () => void;
}

export const CourseCreatedModal = ({
  isOpen,
  //   message,
  closeModal,
}: IModalPropsType) => {
  // Close modal
  const handleclose = useCallback(() => {
    closeModal();
  }, []);

  return (
    <BaseModal isOpen={isOpen} closeModal={closeModal}>
      <div className="relative flex w-full lg:w-[746px] h-auto p-6 flex-col items-start justify-start">
        <div className="w-full mb-4 flex justify-between items-start">
          <div className="">
            <h2 className="text-[33px] mb-4 font-bold font-DMSans">Kudos!</h2>
            <p className="text-[17px] mb-4 font-normal font-DMSans">
              <span className="font-bold">Course title</span> is successfully
              published now.{" "}
            </p>
          </div>
          <button onClick={handleclose}>
            <MdCancel className="text-[30px] text-[#FF1515]" />
          </button>
        </div>
        <div className="w-full flex mt-4 justify-center items-start flex-col">
          <h2 className="text-[17px] mb-4 text-left font-DMSans font-semibold">
            Copy the application page link
          </h2>
          <div className="w-full flex justify-start items-center gap-2">
            <p className="text-[16px] text-left font-DMSans font-normal ">
              https://docs.google.com/document/d/
            </p>
            <button>
              <IoIosCopy className="text-[30px]" />
            </button>
          </div>
        </div>
        <button className="mt-14 flex justify-start items-center gap-4">
          <FaEdit className="text-[30px]" />
          <p className="text-[17px] text-left font-DMSans font-semibold">
            Edit course/delete
          </p>
        </button>
      </div>
    </BaseModal>
  );
};
