import { lecturesidebarData } from "./data";
import { cn } from "~/utils/helpers";
import { HiMenuAlt2 } from "react-icons/hi";
import { useCallback, useState } from "react";
import { FBSlogo } from "~/assets";
import { useTheme } from "~/context/theme-provider";
import { LectureItems } from "./LectureItems";
import { RiHome2Line } from "react-icons/ri";
import LectureCollapsible from "../Collapsible/LectureCollapsible";

type ActiveClass = { isActive: boolean };
type ClassName = (style: ActiveClass) => string;

export interface SideNavProps {
  className?: ClassName | string;
  iconOnly?: boolean;
}

// Sidebar Component
export const LectureSidebar = () => {
  const { theme } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed] = useState(false);

  // Toggle side bar on mobile view
  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prevState) => !prevState);
  }, []);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="fixed top-2 left-2 z-50 lg:hidden bg-[#EEF2F6] p-2 rounded-full text-[red]"
        onClick={toggleSidebar}
      >
        <HiMenuAlt2 size={20} className="bg-transparent" />
      </button>

      {/* Overlay */}
      {isSidebarOpen && (
        <button
          className="fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-screen lg:flex lg:flex-col justify-between z-40 transition-transform transform",
          isSidebarOpen ? "translate-x-0 w-[300px]" : "-translate-x-full",
          "lg:translate-x-0 lg:relative",
          isCollapsed ? "lg:w-[80px]" : "lg:min-w-[472px]",
          theme === "light" ? "bg-[#EEF2F6]" : "bg-[#424141]"
        )}
      >
        <div
          className={cn(
            "flex relative flex-col justify-center items-center h-full w-full",
            "items-start p-2 lg:p-10 lg:mx-0 justify-start max-lg:py-10 lg:items-start",
            isSidebarOpen ? "" : ""
          )}
        >
          {/* Logo and Collapse Toggle for Desktop */}
          <div className="flex mx-2 justify-start lg:justify-end items-end w-full my-4">
            <img
              src={FBSlogo}
              alt="biopaylogo"
              width={isCollapsed ? 50 : 100}
              className={cn(isCollapsed && "mx-auto")}
            />
          </div>
          <div className="w-full flex mt-4 flex-row justify-start gap-6 items-center">
            <RiHome2Line className="text-[35px]" />
            <h2 className="text-[20px] font-DMSans font-semibold">
              <span className="text-[#1CB503]">Week 2</span> / 12 weeks
            </h2>
          </div>
          {/* <button
            className="absolute top-16 shadow-md right-[-18px] hidden lg:flex items-center p-2 rounded-full bg-[#EEF2F6] text-[#FF3B30]"
            onClick={toggleCollapse}
          >
            {isCollapsed ? (
              <FiChevronRight size={20} />
            ) : (
              <FiChevronLeft size={20} />
            )}
          </button> */}

          {/* Navigation Items */}
          <LectureCollapsible
            title="Module 1: Introduction to Consulting And Business Strategy"
            initialState={true}
            headerClassName="text-[18px]"
          >
            <ul
              className={cn(
                "w-full grid grid-cols-1 overflow-y-auto",
                "transition-all duration-300",
                isCollapsed ? "gap-2" : "gap-4",
                theme === "light" ? "bg-[#EEF2F6]" : "bg-[#424141]"
              )}
              style={{ maxHeight: "calc(100vh - 200px)" }}
            >
              {lecturesidebarData.map((data) => (
                <LectureItems
                  key={data.text}
                  {...data}
                  textStyles={cn(
                    "hidden bg-transparent text-md my-3 lg:block",
                    isCollapsed && "hidden"
                  )}
                  iconOnly={isCollapsed}
                />
              ))}
            </ul>
          </LectureCollapsible>
          <LectureCollapsible
            title="My Notes"
            initialState={false}
            headerClassName="text-[14px] h-[20px]"
          >
            <ul>
              <li>My Notes</li>
            </ul>
          </LectureCollapsible>
          <LectureCollapsible
            title="Support/Help"
            initialState={false}
            headerClassName="text-[14px] bg-[#3D85F9] text-[#fff] h-[20px]"
            containerClassname="bg-[#3D85F9]"
          >
            <ul>
              <li>My Notes</li>
            </ul>
          </LectureCollapsible>
        </div>
      </aside>
    </>
  );
};
