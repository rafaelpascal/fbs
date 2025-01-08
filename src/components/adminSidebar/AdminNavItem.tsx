import { useState, useEffect } from "react";
import { cn, dropdownVariants } from "~/utils/helpers";
import { NavLink } from "react-router-dom";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { motion } from "framer-motion";

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
}

export const SideNav = (props: SideNavProps) => {
  const {
    icon: Icon,
    iconOnly,
    children,
    href,
    text,
    dropdown,
    className,
  } = props;

  const [isClicked, setIsClicked] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true); // Initialized to true for mobile

  // Update mobile state on window resize
  useEffect(() => {
    const updateIsMobile = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", updateIsMobile);
    updateIsMobile(); // Initial check
    return () => window.removeEventListener("resize", updateIsMobile);
  }, []);

  // Handler for expanding/collapsing the sidebar
  const handleDropdownClick = () => {
    setIsClicked(!isClicked);
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  // style
  const style = ({ isActive }: ActiveClass) => {
    const baseStyles = cn(
      "relative flex flex-row w-full hover:border-[0.5px] hover:border-[#FF3B30] rounded-[8px] hover:text-[#FF3B30] justify-start gap-2 items-center p-2 bg-transparent",
      isActive &&
        "rounded-[8px] hover:border-[0.5px] hover:border-[#FF3B30] hover:text-[#FFFFFF] w-full text-[#FFFFFF] bg-[#FF3B30]"
    );

    if (typeof className === "string") return cn(baseStyles, className);

    return cn(baseStyles, className?.({ isActive }));
  };

  return (
    <div className="w-full">
      {dropdown && children?.length !== 0 ? (
        <div className="w-full flex flex-col px-4 justify-between items-center">
          <button
            className={cn("flex py-3 items-center justify-between w-full")}
            onClick={handleDropdownClick}
          >
            <div className="flex gap-5 justify-start items-center">
              <Icon className={cn("bg-transparent text-[24px]")} />
              {/* Show text if sidebar is expanded or in mobile mode */}
              {(isMobile || isSidebarExpanded) && (
                <span className="text-[14px] pr-6 bg-transparent font-normal font-DMSans">
                  {text}
                </span>
              )}
            </div>
            {dropdown && (
              <div className="bg-inherit">
                {isClicked ? (
                  <IoIosArrowUp className="bg-inherit" />
                ) : (
                  <IoIosArrowDown className="bg-inherit" />
                )}
              </div>
            )}
          </button>
          {isClicked && children && (
            <motion.div
              className="bg-inherit w-full rounded-[4px] p-0 flex justify-start items-start"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={dropdownVariants}
            >
              <ul className="m-0 p-0 bg-inherit flex justify-center items-start flex-col w-full">
                {children.map((child) => (
                  <li
                    key={child.text}
                    className="pl-10 bg-inherit m-0 w-full text-[12px] border-[#fff] font-bold font-DMSans text-center"
                  >
                    <NavLink
                      to={child.href}
                      onClick={() => setIsClicked(false)}
                      className={style}
                    >
                      <child.icon
                        className={cn("bg-transparent text-[24px]")}
                      />
                      {(isMobile || isSidebarExpanded) && (
                        <span className="text-[14px] bg-transparent font-normal font-DMSans">
                          {child.text}
                        </span>
                      )}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </div>
      ) : (
        <NavLink to={href} className={style}>
          {isMobile || (isSidebarExpanded && !iconOnly) ? (
            <>
              <Icon className={cn("bg-transparent text-[24px]")} />
              <span className="text-[14px] bg-transparent font-normal font-DMSans">
                {text}
              </span>
            </>
          ) : (
            <Icon className={cn("bg-transparent text-[24px]")} />
          )}
        </NavLink>
      )}
    </div>
  );
};
