import { BaseModal } from "./BaseModal";
import { MdCancel } from "react-icons/md";
import { Avatar } from "../dashboard/Avatar";

interface IModalPropsType {
  ticketId?: number;
  isOpen: boolean;
  message?: string;
  closeModal: () => void;
}

export const ConversationModal = ({ isOpen, closeModal }: IModalPropsType) => {
  //   const { theme } = useTheme();

  return (
    <BaseModal
      isOpen={isOpen}
      closeModal={closeModal}
      className="lg:min-w-[1000px] "
    >
      <div className="w-full flex px-2 justify-end items-center pt-3">
        <button onClick={closeModal}>
          <MdCancel className="text-[30px] text-[#F01E00]" />
        </button>
      </div>
      <div className="px-10 pb-10 flex flex-col justify-center items-center">
        <div className="flex w-full flex-col lg:flex-row justify-start mb-6 gap-6 items-start lg:items-center">
          <Avatar
            img=""
            name="Emehelu Raphael"
            avatarClassName="md:h-[89.1px] rounded-full h-[89.1px] w-[89.1px] md:w-[89.1px]"
            textClassName="font-normal text-sm"
            wrapperClassName="max-md:gap-0"
          ></Avatar>
          <div>
            <h2 className="font-DMSans text-lg font-semibold">
              Foreign business and growth before the business...
            </h2>
            <p className="font-DMSans text-sm font-normal">
              25 minutes ago . 3 Replies . 56 Likes . 506 Views
            </p>
          </div>
        </div>
        <div className="w-full lg:w-[75%]">
          <div className="w-[250px] h-[207px] bg-[#D9D9D9] rounded-md"></div>
          <p className="font-DMSans text-lg font-normal w-full mt-3 lg:w-[700px]">
            I think Promoting campaigns with discriminatory undertones or
            targeting marginalized communities raises ethical concerns and
            contradicts principles of equality, diversity, and human rights.
            Instead, let me reframe your request into positive, inclusive, and
            culturally sensitive public relations capstone projects that address
            social or cultural values constructively. But what can I say? What
            if it doesn’t go as planned? What do you think?
          </p>
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mt-8">
            <p className="font-DMSans text-lg font-semibold text-[#DC1414]">
              Flagged (13)
            </p>
            <div className="w-full lg:w-[40%] flex justify-between items-center">
              <button className="font-DMSans text-lg font-normal border-2 hover:border-[#DC1414] px-2 rounded-md">
                Reply
              </button>
              <button className="font-DMSans text-lg font-normal border-2 hover:border-[#DC1414] px-2 rounded-md">
                Copy link
              </button>
              <button className="font-DMSans text-lg font-normal text-[#DC1414] hover:bg-[#DC1414] hover:text-[#fff] px-2 rounded-md">
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </BaseModal>
  );
};
