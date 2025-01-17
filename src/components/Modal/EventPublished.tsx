import { BaseModal } from "./BaseModal";
import { useCallback, useState } from "react";
import { MdCancel } from "react-icons/md";
import { IoIosCopy } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "~/redux-store/store";

interface IModalPropsType {
  isOpen: boolean;
  //   message?: string;
  closeModal: () => void;
}

export const EventPublished = ({
  isOpen,
  //   message,
  closeModal,
}: IModalPropsType) => {
  const course_url = useSelector((state: RootState) => state.url.course_url);
  const [isCopied, setIsCopied] = useState(false);

  const handleclose = useCallback(() => {
    closeModal();
  }, []);

  const handleCopy = () => {
    if (course_url) {
      navigator.clipboard.writeText(course_url).then(
        () => {
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 2000);
        },
        (error) => {
          console.error("Failed to copy text: ", error);
        }
      );
    }
  };

  return (
    <BaseModal isOpen={isOpen} closeModal={closeModal}>
      <div className="relative flex w-full lg:w-[746px] h-auto p-6 flex-col items-start justify-start">
        <div className="w-full mb-4 flex justify-between items-start">
          <div className="">
            <h2 className="text-[33px] mb-4 font-bold font-DMSans">Kudos!</h2>
            <p className="text-[17px] mb-4 font-normal font-DMSans">
              <span className="font-bold"> Your event:</span> is successfully
              created and published!
            </p>
          </div>
          <button onClick={handleclose}>
            <MdCancel className="text-[30px] text-[#FF1515]" />
          </button>
        </div>
        <div className="w-full flex mt-4 justify-center items-start flex-col">
          <h2 className="text-[17px] mb-4 text-left font-DMSans font-semibold">
            Click the link below to copy or edit events that you created...
          </h2>
          <div className="w-full flex justify-start items-center gap-2">
            <p className="text-[16px] text-left font-DMSans font-normal ">
              {course_url}
            </p>
            <button onClick={handleCopy}>
              <IoIosCopy className="text-[30px]" />
            </button>
            {isCopied && (
              <span className="text-green-500 text-sm">Copied!</span>
            )}
          </div>
        </div>
        <button className="mt-14 flex justify-start items-center gap-4">
          <FaEdit className="text-[30px]" />
          <p className="text-[17px] text-left font-DMSans font-semibold">
            Edit/delete
          </p>
        </button>
      </div>
    </BaseModal>
  );
};
