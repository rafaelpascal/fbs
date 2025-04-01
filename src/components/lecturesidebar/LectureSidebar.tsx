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
import { useNavigate, useParams } from "react-router-dom";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useDispatch } from "react-redux";
import {
  setNewCurrentLessonIndex,
  setLessonId,
} from "~/redux-store/slice/lessonSlice";
import { GoDotFill } from "react-icons/go";
import { FaFilePdf } from "react-icons/fa";
import { RootState } from "~/redux-store/store";
import { useSelector } from "react-redux";
import { resetModuleId } from "../../redux-store/slice/module.slice";
import { Button } from "../buttons/BaseButton";

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
interface CourseDetails {
  course_startdate: string;
  course_enddate: string;
}

interface CourseData {
  course_details: CourseDetails;
}
// Sidebar Component
export const LectureSidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const { id } = useParams<{ id: string }>();
  // const moduleId = useSelector((state: RootState) => state.module.module_id);
  const { quizId } = useParams<{ quizId: string }>();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setisCollapsed] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [fecthingWeek, setFecthingWeek] = useState(false);
  const { sidebarData, updateSidebarData } = useSidebar();
  const [moduleTitle, setModuleTitle] = useState("");
  const [moduleNumber, setModuleNumber] = useState("");
  const [courseId, setCourseId] = useState("");
  const [courseData, setCourseData] = useState<CourseData | null>(null);
  const [lectureTitles, setLectureTitles] = useState<any[]>([]);
  const [lessonIds, setLessonIds] = useState<string[]>([]);
  const lessonId = useSelector((state: RootState) => state.lesson.lessonId);
  const storedModuleId = localStorage.getItem("moduleId");

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

  const weekInfo = courseData?.course_details
    ? getCourseWeekInfo(
        courseData.course_details.course_startdate,
        courseData.course_details.course_enddate
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
        module_id: storedModuleId,
      };
      const res = await CourseServices.getModulebyId(payload);
      // setLectureTitles(res.data.course_lessons);
      if (res.data?.modules?.length > 0) {
        setModuleTitle(res.data.modules[0].module_title ?? "Unknown Module");
        setModuleNumber(res.data.modules[0].module_number ?? "0");
        setCourseId(res.data.modules[0].course_id);
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

  const fetchLessons = async () => {
    try {
      const payload = { moduleid: storedModuleId };
      const res = await CourseServices.lessonsByModuleId(payload);
      setLectureTitles(res.data.course_lessons);
      const extractedLessonIds = res.data.course_lessons.map(
        (lesson: any) => lesson.lessonid
      );
      setLessonIds(extractedLessonIds);
      navigate(`/lecture/${res.data.course_lessons[0].lessonid}`, {
        replace: true,
      });
    } catch (error) {
      console.error("Error fetching lessons:", error);
    }
  };

  useEffect(() => {
    fetchLessons();
  }, [storedModuleId]);

  useEffect(() => {
    if (lessonId) {
      const currentId = Number(lessonId);
      const lessonIdsNumbers = lessonIds.map(Number);
      const currentIndex = lessonIdsNumbers.indexOf(currentId);
      dispatch(setNewCurrentLessonIndex(currentIndex + 2));

      if (currentIndex !== -1) {
        const nextIndex = (currentIndex + 1) % lessonIdsNumbers.length;
        const nextLessonId = lessonIdsNumbers[nextIndex];
        navigate(`/lecture/${nextLessonId}`, { replace: true });
      }
    }
  }, [lessonId]);

  const updateLecture = () => {
    if (!lectureTitles.length) return;
    const updatedData: SideNavProps[] = lectureTitles.map(
      (lessonItem: any, index: number) => {
        const isPlaying = lessonItem.lessonid == id;
        return {
          href: `/module/${lessonItem.module_id}`,
          icon: FaFilePdf,
          dropdown: true,
          playing: isPlaying,
          text:
            `LESSON ${index + 1}: ${lessonItem.lesson_title}` ||
            "Untitled Lesson",
          children: [
            {
              href: `/lecture/${lessonItem.lessonid}`,
              icon: GoDotFill,
              dropdown: false,
              text: "Lecture",
            },
            ...(lessonItem.hasQuiz === 0
              ? [
                  {
                    href: `/assignment/${lessonItem.module_id}`,
                    icon: GoDotFill,
                    dropdown: false,
                    text: "Quiz",
                  },
                ]
              : []),
            ...(lessonItem.lessonid
              ? [
                  {
                    href: `/exam/${lessonItem.lessonid}`,
                    icon: GoDotFill,
                    dropdown: false,
                    text: "Exam",
                  },
                ]
              : []),
            ...(lessonItem.lessonid
              ? [
                  {
                    href: `/newassignment/${lessonItem.lessonid}`,
                    icon: GoDotFill,
                    dropdown: false,
                    text: "Assignment",
                  },
                ]
              : []),
            ...(lessonItem.lessonid
              ? [
                  {
                    href: `/polls/${lessonItem.lessonid}`,
                    icon: GoDotFill,
                    dropdown: false,
                    text: "Polls",
                  },
                ]
              : []),
            ...(lessonItem.assignment_id
              ? [
                  {
                    href: lessonItem.stream_video_audio
                      ? lessonItem.stream_video_audio
                      : "#",
                    icon: GoDotFill,
                    dropdown: false,
                    text: "Assignment",
                  },
                ]
              : []),
          ],
        };
      }
    );

    updateSidebarData(updatedData);
  };

  useEffect(() => {
    updateLecture();
  }, [id, lectureTitles]);

  useEffect(() => {
    if (storedModuleId) {
      fetModules();
    }
  }, [storedModuleId]);

  useEffect(() => {
    if (!courseId) return;

    const fetchData = async () => {
      try {
        setFecthingWeek(true);
        const res = await CourseServices.listCoursebyId(courseId);
        setCourseData(res);
        setFecthingWeek(false);
      } catch (error) {
        setFecthingWeek(false);
        console.error("Error fetching course:", error);
      }
    };

    fetchData();
  }, [courseId]);

  const toggleCollapse = () => {
    setisCollapsed(!isCollapsed);
  };

  useEffect(() => {
    if (quizId) {
      dispatch(setLessonId(JSON.parse(quizId)));
    }
  }, [quizId]);

  const handleHomeNavigation = () => {
    updateSidebarData([]);
    setLectureTitles([]);
    localStorage.removeItem("moduleId");
    dispatch(resetModuleId());
    navigate("/dashboard");
  };

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
          "fixed top-0 left-0 shadow-md h-screen lg:flex lg:flex-col justify-between z-40 transition-transform transform",
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
              <Button className="w-[20%]" onClick={handleHomeNavigation}>
                <RiHome2Line className="text-[35px]" />
              </Button>
              {fecthingWeek ? (
                <LoadingSpinner size="sm" />
              ) : (
                <h2 className="text-[20px] w-[80%] font-DMSans font-semibold">
                  <span className="text-[#1CB503]">{weekNumber} /</span>
                  <span> {totalWeeks}</span>
                </h2>
              )}
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
            <div className="w-full border border-[#ddd] shadow-md mt-4 rounded-md">
              {isLoading ? (
                <div className="w-full py-4 flex justify-center items-center">
                  <LoadingSpinner size="xs" />
                </div>
              ) : (
                <h2 className="mx-2 my-4 w-[90%] font-DMSans text-[18px] font-bold">
                  Module {moduleNumber}: {moduleTitle}
                </h2>
              )}
              <ul
                className={cn(
                  "w-full h-[400px] scrollbar-style py-4 rounded-md overflow-x-hidden overflow-y-auto",
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
            <div className="my-4 w-full">
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
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
