import { useState, useEffect } from "react";
import { cn, dropdownVariants } from "~/utils/helpers";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { motion } from "framer-motion";
import { FaPlay } from "react-icons/fa";
import { NavLink } from "react-router-dom";

type ActiveClass = { isActive: boolean };

type ClassName = (style: ActiveClass) => string;

export interface SideNavProps {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  text: string;
  dropdown?: boolean;
  children?: SideNavProps[];
  href: string;
  textStyles?: string;
  className?: ClassName | string;
  permission?: string;
  iconOnly?: boolean;
  playing?: boolean;
}

export const LectureItems = (props: SideNavProps) => {
  const { icon: Icon, href, children, text, dropdown, playing } = props;

  const [isClicked, setIsClicked] = useState(false);
  const [, setIsMobile] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  // Update mobile state on window resize
  useEffect(() => {
    const updateIsMobile = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", updateIsMobile);
    updateIsMobile();
    return () => window.removeEventListener("resize", updateIsMobile);
  }, []);

  // Handler for expanding/collapsing the sidebar
  const handleDropdownClick = () => {
    setIsClicked(!isClicked);
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  // style
  // const style = ({ isActive }: ActiveClass) => {
  //   const baseStyles = cn(
  //     "relative flex flex-row w-full items-center px-2 gap-4 py-3 bg-transparent",
  //     isActive && "rounded-[8px] w-full text-[#FFFFFF] bg-[#FF3B30]"
  //   );

  //   if (typeof className === "string") return cn(baseStyles, className);

  //   return cn(baseStyles, className?.({ isActive }));
  // };

  return (
    <div className="w-full">
      {dropdown && children?.length !== 0 ? (
        <div className="w-full flex px-2 flex-col justify-between items-center">
          <button
            className={cn(
              "py-2 mb-1 flex justify-between items-center text-left w-full px-4 rounded-md",
              playing
                ? "bg-[#FF3B30]/10"
                : "bg-transparent border-[2px] border-[#FF3B30]/10"
            )}
            onClick={handleDropdownClick}
          >
            <div className="flex justify-start w-[90%] items-center">
              <div className="">
                {playing ? (
                  <div className="w-[40px] h-[40px] rounded-full bg-[#FF3B30]/20 flex justify-center items-center">
                    <FaPlay className={cn("bg-transparent text-[14px]")} />
                  </div>
                ) : (
                  <div className="w-[40px] h-[40px] rounded-full bg-[#FF3B30]/20 flex justify-center items-center">
                    <Icon className={cn("bg-transparent text-[24px]")} />
                  </div>
                )}
              </div>
              <div className="w-[80%] overflow-y-hidden">
                <p className=" ml-2 text-left text-[12px] lg:text-[14px] bg-transparent font-semibold font-DMSans">
                  {text}
                </p>
              </div>
            </div>
            <div className="w-[10%]">
              {dropdown && (
                <div className="">
                  {isClicked ? (
                    <IoIosArrowUp className="text-[25px]" />
                  ) : (
                    <IoIosArrowDown className="text-[25px]" />
                  )}
                </div>
              )}
            </div>
          </button>
          {isClicked && children && (
            <motion.div
              className="bg-inherit w-full mb-3 rounded-[4px] p-0 flex justify-start items-start"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={dropdownVariants}
            >
              <ul className="m-0 p-0 bg-inherit overflow-x-hidden flex justify-center gap-2 items-start flex-col w-full">
                {children.map((child) => (
                  <li
                    key={child.text}
                    className="pl-10 bg-inherit m-0 w-full text-[12px] border-[#fff] font-bold font-DMSans text-left"
                  >
                    <NavLink
                      to={child.href}
                      onClick={() => setIsClicked(false)}
                      className="hover:bg-[#FF3B30]/10 hover:border-[0.5px] hover:border-[#FF3B30] flex justify-start w-full items-center text-left py-1 px-4 rounded-md"
                    >
                      <child.icon
                        className={cn("bg-transparent text-[14px]")}
                      />
                      <span className="text-[14px] ml-2 truncate overflow-x-hidden w-full bg-transparent font-semibold font-DMSans">
                        {child.text}
                      </span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </div>
      ) : (
        <NavLink
          to={href}
          className="bg-[#FF3B30]/10 text-left w-full h-[60px] px-4 rounded-md"
        >
          <div className="w-full flex justify-start items-center gap-4">
            <div className="w-[40px] h-[40px] rounded-full bg-[#FF3B30]/20 flex justify-center items-center">
              <Icon className={cn("bg-transparent text-[24px]")} />
            </div>
            <span className="text-[14px] w-[80%] bg-transparent font-semibold font-DMSans">
              {text}
            </span>
          </div>
        </NavLink>
      )}
    </div>
  );
};
