// import { lecturesidebarData } from "./data";
import { cn } from "~/utils/helpers";
import { HiMenuAlt2 } from "react-icons/hi";
import { useCallback, useEffect, useState } from "react";
import { FBSlogo } from "~/assets";
import { useTheme } from "~/context/theme-provider";
import { LectureItems } from "./LectureItems";
import { RiHome2Line } from "react-icons/ri";
import { useSidebar } from "~/context/Sidebar_Provider";
import { useSelector } from "react-redux";
import { RootState } from "~/redux-store/store";
import { CourseServices } from "~/api/course";

type ActiveClass = { isActive: boolean };
type ClassName = (style: ActiveClass) => string;

export interface SideNavProps {
  className?: ClassName | string;
  iconOnly?: boolean;
}

// Sidebar Component
export const LectureSidebar = () => {
  const courseId = useSelector((state: RootState) => state.course.course_id);
  const { theme } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed] = useState(false);
  const { sidebarData } = useSidebar();
  const [moduleTitle, setModuleTitle] = useState("");

  // Toggle side bar on mobile view
  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prevState) => !prevState);
  }, []);

  const fetModules = async () => {
    try {
      const payload = {
        courseid: courseId,
      };
      console.log(payload);
      const res = await CourseServices.getModuleByCourseId(payload);

      setModuleTitle(res.data.course_modules[0].module_title);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetModules();
  }, [courseId]);

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
          isCollapsed ? "lg:w-[80px]" : "lg:w-[600px]",
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
          <div className="w-full shadow-md rounded-md">
            <h2 className="mx-2 my-4 font-DMSans text-[18px] font-bold w-full">
              Module 1: {moduleTitle}
            </h2>
            <ul
              className={cn(
                "w-full grid grid-cols-1 overflow-x-hidden overflow-y-auto",
                "transition-all duration-300",
                isCollapsed ? "gap-2" : "gap-4",
                theme === "light" ? "bg-[#EEF2F6]" : "bg-[#424141]"
              )}
              style={{ maxHeight: "calc(100vh - 200px)" }}
            >
              {sidebarData.map((data) => (
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
          </div>
          <button className="text-[14px] w-full py-4 rounded-md shadow-md bg-transparent">
            <p className="font-DMSans font-semibold text-[14px]">My Notes</p>
          </button>
          <button className="text-[14px] w-full py-4 rounded-md shadow-md bg-transparent">
            <p className="font-DMSans font-semibold text-[14px]">
              Support/Help
            </p>
          </button>
        </div>
      </aside>
    </>
  );
};
