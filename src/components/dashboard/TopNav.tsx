import { Bell } from "react-huge-icons/outline";
import { Avatar } from "./Avatar";
import { useTheme } from "~/context/theme-provider";
import ThemeToggle from "../buttons/ThemeController";

// Top Nav
export const TopNav = () => {
  const { theme } = useTheme();

  return (
    // skipcq: JS-0415
    <header
      className={`flex py-2 px-2 w-full justify-end items-center max-md:items-start ${
        theme === "light" ? "bg-[#EEF2F6]" : "bg-[#424141]"
      }`}
    >
      <div className="flex justify-center items-center gap-2">
        <button>
          <Avatar
            img=""
            name="Emehelu Raphae;"
            avatarClassName="md:h-11 h-8 w-8 md:w-11"
            textClassName="font-medium text-sm"
            wrapperClassName="max-md:gap-0"
          ></Avatar>
        </button>
        <div className="relative">
          <Bell
            className={`w-[36px] h-[36px] ${
              theme === "light" ? "bg-[#EEF2F6] text-[#9DA6AF]" : ""
            }`}
          />
          <div className="w-[10px] h-[10px] bg-[#ED342B] absolute top-[4px] right-[5.5px] rounded-full" />
        </div>
      </div>
      <ThemeToggle />
    </header>
  );
};
