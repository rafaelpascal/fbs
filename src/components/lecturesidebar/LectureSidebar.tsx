// import { lecturesidebarData } from "./data";
import { cn } from "~/utils/helpers";
import { HiMenuAlt2 } from "react-icons/hi";
import { useCallback, useEffect, useState } from "react";
import { FBSlogo } from "~/assets";
import { useTheme } from "~/context/theme-provider";
import { LectureItems } from "./LectureItems";
import { RiHome2Line } from "react-icons/ri";
import { useSidebar } from "~/context/Sidebar_Provider";
import { CourseServices } from "~/api/course";
import { LoadingSpinner } from "../ui/loading-spinner";
import { Link, useParams } from "react-router-dom";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { setLessonId } from "~/redux-store/slice/lessonSlice";
import { fetchlistCoursebyId } from "~/api/course/hooks";

type ActiveClass = { isActive: boolean };
type ClassName = (style: ActiveClass) => string;

export interface SideNavProps {
  className?: ClassName | string;
  iconOnly?: boolean;
}

// Sidebar Component
export const LectureSidebar = () => {
  // const courseId = useSelector((state: RootState) => state.course.course_id);
  const courseId = localStorage.getItem("course_id");
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const { id } = useParams<{ id: string }>();
  const { quizId } = useParams<{ quizId: string }>();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setisCollapsed] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const { sidebarData } = useSidebar();
  const [moduleTitle, setModuleTitle] = useState("");
  const [moduleNumber, setModuleNumber] = useState("");
  const { data } = fetchlistCoursebyId(courseId ?? "");

  const getCourseWeekInfo = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const now = new Date();

    const totalWeeks = Math.ceil(
      (end.getTime() - start.getTime()) / (7 * 24 * 60 * 60 * 1000)
    );
    const currentWeek =
      Math.ceil((now.getTime() - start.getTime()) / (7 * 24 * 60 * 60 * 1000)) +
      1;

    return `Week ${Math.min(
      Math.max(currentWeek, 1),
      totalWeeks
    )} / ${totalWeeks} weeks`;
  };

  const weekInfo = data?.course_details
    ? getCourseWeekInfo(
        data.course_details.course_startdate,
        data.course_details.course_enddate
      )
    : "Week 0 / 0 weeks";

  const [weekNumber, totalWeeks] = weekInfo.split(" / ");
  // Toggle side bar on mobile view
  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prevState) => !prevState);
  }, []);

  const fetModules = async () => {
    setLoading(true);
    try {
      const payload = {
        module_id: JSON.parse(id ?? ""),
      };
      const res = await CourseServices.getModulebyId(payload);

      if (res.data?.modules?.length > 0) {
        setModuleTitle(res.data.modules[0].module_title ?? "Unknown Module");
        setModuleNumber(res.data.modules[0].module_number ?? "0");
      } else {
        setModuleTitle("Module Not Found");
        setModuleNumber("0");
      }
    } catch (error) {
      console.error("Error fetching module:", error);
      setModuleTitle("Error Loading Module");
      setModuleNumber("0");
    } finally {
      setLoading(false);
    }
  };

  // const fetModules = async () => {
  //   setLoading(true);
  //   try {
  //     const payload = {
  //       module_id: JSON.parse(id ?? ""),
  //     };
  //     const res = await CourseServices.getModulebyId(payload);
  //     setModuleTitle(res.data.modules[0].module_title);
  //     setModuleNumber(res.data.modules[0].module_number);
  //     setLoading(false);
  //   } catch (error) {
  //     setLoading(false);
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    if (id) {
      fetModules();
    }
  }, [id]);

  const toggleCollapse = () => {
    setisCollapsed(!isCollapsed);
  };

  useEffect(() => {
    if (quizId) {
      dispatch(setLessonId(JSON.parse(quizId)));
    }
  }, [quizId]);

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
          {!isCollapsed && (
            <div className="w-full flex mt-4 flex-row justify-start gap-6 items-center">
              <Link to="/dashboard">
                <RiHome2Line className="text-[35px]" />
              </Link>
              <h2 className="text-[20px] font-DMSans font-semibold">
                <span className="text-[#1CB503]">{weekNumber} /</span>
                <span> {totalWeeks}</span>
              </h2>
            </div>
          )}
          <button
            className="absolute top-16 shadow-md right-[-18px] hidden lg:flex items-center p-2 rounded-full bg-[#EEF2F6] text-[#FF3B30]"
            onClick={toggleCollapse}
          >
            {isCollapsed ? (
              <FiChevronRight size={20} />
            ) : (
              <FiChevronLeft size={20} />
            )}
          </button>

          {/* Navigation Items */}
          {!isCollapsed && (
            <div className="w-full shadow-md rounded-md">
              {isLoading ? (
                <div className="w-full py-4 flex justify-center items-center">
                  <LoadingSpinner size="xs" />
                </div>
              ) : (
                <h2 className="mx-2 my-4 font-DMSans text-[18px] font-bold w-full">
                  Module {moduleNumber}: {moduleTitle}
                </h2>
              )}
              <ul
                className={cn(
                  "w-full grid grid-cols-1 py-4 rounded-md overflow-x-hidden overflow-y-auto",
                  "transition-all duration-300",
                  isCollapsed ? "gap-2" : "gap-4",
                  theme === "light" ? "bg-[#fff]" : "bg-[#424141]"
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
          )}
          {!isCollapsed && (
            <>
              <button className="text-[14px] w-full py-4 rounded-md shadow-md bg-transparent">
                <p className="font-DMSans font-semibold text-[14px]">
                  My Notes
                </p>
              </button>
              <button className="text-[14px] w-full py-4 rounded-md shadow-md bg-transparent">
                <p className="font-DMSans font-semibold text-[14px]">
                  Support/Help
                </p>
              </button>
            </>
          )}
        </div>
      </aside>
    </>
  );
};
