import { Bell } from "react-huge-icons/outline";
import { TbGridDots } from "react-icons/tb";
import { Avatar } from "./Avatar";

// Top Nav
export const TopNav = () => {
  return (
    // skipcq: JS-0415
    <header className="flex py-2 bg-[#EEF2F6] w-full justify-end items-center max-md:items-start">
      <div className="flex bg-[#EEF2F6] justify-center items-center gap-3">
        <button>
          <Avatar
            img=""
            name="Emehelu Raphae;"
            avatarClassName="md:h-11 h-8 w-8 md:w-11"
            textClassName="font-medium text-sm"
            wrapperClassName="max-md:gap-0"
          ></Avatar>
        </button>
        <button className="bg-[#EEF2F6]">
          <TbGridDots className="bg-inherit w-[24px] h-[24px] text-[#03435F]" />
        </button>
        <div className="relative">
          <Bell className="w-[36px] bg-[#EEF2F6] text-[#9DA6AF] h-[36px]" />
          <div className="w-[10px] h-[10px] bg-[#ED342B] absolute top-[4px] right-[5.5px] rounded-full" />
        </div>
      </div>
    </header>
  );
};
