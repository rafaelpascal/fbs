// import React from "react";

import { DashboardArea } from "~/layouts/DashboardArea";
import Collapsible from "~/components/Collapsible/Collapsible";
import { BaseButton } from "~/components/buttons/BaseButton";
import { useNavigate } from "react-router-dom";
import { IoMdUnlock } from "react-icons/io";
import CourseCard from "~/components/cards/CourseCard";
import Carousel from "~/components/Carousel/Carousel";
// import LessonsCard from "~/components/cards/LessonsCard";
// import ForumsCard from "~/components/cards/ForumsCard";
import { useEffect, useState } from "react";
import { useTheme } from "~/context/theme-provider";
import { FaChevronDown } from "react-icons/fa6";
import ModuleCards from "~/components/cards/ModuleCards";
import { CourseServices } from "~/api/course";
import { LoadingSpinner } from "~/components/ui/loading-spinner";
import { AuthService } from "~/api/auth";
import { splitArray } from "~/utils/helpers";
import { motion, AnimatePresence } from "framer-motion";
import { FaEye } from "react-icons/fa";
import { getMonthsBetweenDates, getWeeksBetweenDates } from "~/lib/utils";
import { setModuleId } from "../../redux-store/slice/module.slice";
import { useDispatch } from "react-redux";

type Specification = {
  id: string;
  title: string;
  duration: string | null;
};

type ProgramSpecification = {
  applicationid: string;
  courseTitle: string;
  specifications: Specification[];
};

interface Application {
  application_status: number;
  payment_status: number;
  applicationid: string;
  course_title: string;
  course_mode: string;
  course_format?: string;
  course_flexible?: number;
  start_date?: string;
  cohort_title?: string;
  created_at?: string;
  end_date?: string;
  duration?: number;
  coursesid?: number;
  course_run?: string;
  course_startdate?: string;
  course_enddate?: string;
}

type Module = {
  type: string;
  lesson: string;
  moduleid: number;
  programme_category_id: number;
  course_id: number;
  module_number: string;
  module_title: string;
  module_description: string;
  module_objectives: string;
  module_reading: string;
  module_image: string;
  created_at: string; // ISO date string
  lesson_title?: string;
};

const grades = [
  {
    title: "Assignment 1: Foundations of Entrepreneurship",
    dueDate: "Jan 5 2025",
    status: "Not Submitted",
    score: "0/20",
    rating: "-",
    bgColor: "bg-[#FFF]",
    statusColor: "text-red-500",
  },
  {
    title: "Quiz 1: Foundations of Entrepreneurship",
    dueDate: "Will show the date sub",
    status: "Submitted",
    score: "8/15",
    rating: "A",
    bgColor: "bg-[#E5F6FF]",
    statusColor: "text-green-600",
  },
  {
    title: "Capstone 1: Foundations of Entrepreneurship",
    dueDate: "Mar 15 2025",
    status: "Submitted",
    score: "20/25",
    rating: "B",
    bgColor: "bg-[#E5FFD9]",
    statusColor: "text-green-600",
  },
  {
    title: "Assignment 2: Building up the flavor guest in a changing world",
    dueDate: "Mar 15 2025",
    status: "Submitted",
    score: "2/15",
    rating: "D",
    bgColor: "bg-[#F7F7F7]",
    statusColor: "text-green-600",
  },
  {
    title: "Quiz 2: Foundations of Entrepreneurship",
    dueDate: "Will show the date sub",
    status: "Submitted",
    score: "8/15",
    rating: "C",
    bgColor: "bg-blue-100",
    statusColor: "text-green-600",
  },
  {
    title: "Exams",
    dueDate: "April 18 2025",
    status: "Submitted",
    score: "15/30",
    rating: "B",
    bgColor: "bg-[#FFF]",
    statusColor: "text-green-600",
  },
  {
    title: "Completed Lessons Bonus",
    dueDate: "Last lesson date",
    status: "Submitted",
    score: "16 points",
    rating: "-",
    bgColor: "bg-[#FFF]",
    statusColor: "text-green-600",
  },
];

const updates = [
  {
    title: "Started Module 1",
    description: "Python Bootcamp From Zero to Hero in Python",
    time: "17:52",
    date: "Mon. 21 Oct. 2025",
    points: "0",
    titleColor: "text-purple-700 font-bold",
  },
  {
    title: "Submitted Quiz",
    description: "Python Bootcamp From Zero to Hero in Python",
    time: "17:52",
    date: "Mon. 21 Oct. 2025",
    points: "12",
    titleColor: "text-purple-700 font-bold",
  },
  {
    title: "Conversation",
    description:
      "Stephen Jym started a new conversation titled “What must we do to excel?”",
    time: "17:52",
    date: "Mon. 21 Oct. 2025",
    points: "0",
    titleColor: "text-black font-bold",
  },
  {
    title: "Submitted assignment",
    description: "Python Bootcamp From Zero to Hero in Python",
    time: "17:52",
    date: "Mon. 21 Oct. 2025",
    points: "N/A",
    titleColor: "text-purple-700 font-bold",
  },
];
const Dashboard = () => {
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [isEnrolled, setisEnrolled] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [firstCourseId, setfirstCourseId] = useState("");
  const [courses, setcourses] = useState<Module[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [secondcourses, setsecondcourses] = useState<Module[]>([]);
  const navigate = useNavigate();
  const [programSpecifications, setProgramSpecifications] = useState<
    ProgramSpecification[]
  >([]);
  const [applications, setapplications] = useState<Application[]>([]);
  // const location = useLocation();
  // const [enrolled] = useState(location.state?.enrolled || false);
  const [selectedOption, setSelectedOption] = useState<string | null>(
    "MODULES"
  );
  const Storeduser = AuthService.getSession();

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const handlePayment = (applicationId: string) => {
    navigate(`/payment/${applicationId}`);
  };

  const handleStartCourse = (courseId: number) => {
    localStorage.setItem("moduleId", courseId.toString());
    dispatch(setModuleId(courseId));
    navigate(`/lecture/${courseId}`);
  };

  const fetchmyapplication = async () => {
    setLoading(true);
    try {
      const payload = {
        userid: Storeduser?.user,
      };
      const res = await CourseServices.fetchApplication(payload);
      // setfirstCourseId(res.data.data[0].coursesid);
      if (res.data && res.data.data && res.data.data.length > 0) {
        const application = res.data.data;

        const firstEnrolledApp = application.find(
          (app: Application) => app.payment_status === 1
        );

        if (firstEnrolledApp) {
          setfirstCourseId(firstEnrolledApp.coursesid);
        }

        const anyEnrolled: boolean = application.some(
          (app: Application) => app.payment_status === 1
        );
        if (anyEnrolled) {
          setisEnrolled(true);
        }
        // const application = res.data.data;
        // const anyEnrolled: boolean = application.some(
        //   (application: Application) => application.payment_status === 1
        // );
        // if (anyEnrolled) {
        //   setisEnrolled(true);
        // }
        setapplications(application);

        const updatedProgramSpecifications: ProgramSpecification[] =
          application.map((app: Application) => ({
            courseTitle: app.course_title || "N/A",
            applicationid: app.applicationid || 0,
            specifications: [
              {
                title: "Mode: ",
                duration: app.course_mode || "N/A",
              },
              {
                title: "Course Starting: ",
                duration:
                  app.course_flexible === 0
                    ? app.start_date || "N/A"
                    : "Flexible",
              },
              {
                title: "Cohort: ",
                duration: app.cohort_title || "N/A",
              },
              {
                title: "Application Date: ",
                duration: app.created_at
                  ? new Date(app.created_at).toLocaleDateString()
                  : "N/A",
              },
              {
                title: "Course Ending: ",
                duration:
                  app.course_flexible === 0
                    ? app.end_date || "N/A"
                    : "Flexible",
              },
              {
                title: "Duration: ",
                duration:
                  (app.course_run?.replace(/"/g, "") ?? "") === "Weekly"
                    ? `${getWeeksBetweenDates(
                        app.course_startdate ?? "",
                        app.course_enddate ?? ""
                      )} Weeks`
                    : app.course_run === "Monthly"
                    ? `${getMonthsBetweenDates(
                        app.course_startdate ?? "",
                        app.course_enddate ?? ""
                      )} Months`
                    : "N/A",
                // app.duration && app.duration > 0
                //   ? `${app.duration} week(s)`
                //   : "N/A",
              },
            ],
          }));
        setProgramSpecifications(updatedProgramSpecifications);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching application:", error);
    }
  };

  useEffect(() => {
    setSelectedId(firstCourseId ?? "");
  }, [firstCourseId]);

  const fetModules = async () => {
    try {
      const payload = {
        courseid: selectedId,
      };
      const res = await CourseServices.getModuleByCourseId(payload);
      const [chunk1, chunk2] = splitArray<Module>(res.data.course_modules, 4);
      setcourses(chunk1);
      setsecondcourses(chunk2);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (selectedId) {
      fetModules();
    }
  }, [selectedId]);

  useEffect(() => {
    fetchmyapplication();
  }, []);

  const handleViewApplication = (courseId: number | undefined) => {
    setSelectedId(JSON.stringify(courseId));
  };

  return (
    <DashboardArea>
      <Collapsible title="My Enrollments" initialState={true}>
        <div className="h-[400px] overflow-y-auto scrollbar-style">
          {applications.map((program, index) => (
            <div
              key={index}
              className="w-full border-[1px] rounded-md my-2 border-[#ddd] py-2 flex justify-center items-center"
            >
              <div className=" lg:w-[90%]">
                <div className="flex justify-between items-center">
                  <p className="text-left capitalize font-DMSans text-[20px] font-semibold">
                    {program.course_title}
                  </p>
                  {program.payment_status == 1 && (
                    <button
                      className="text-green-400 flex justify-between items-center gap-4 border-[1px] rounded-md border-green-400 px-4 font-DMSans text-[16px] font-semibold"
                      onClick={() => handleViewApplication(program.coursesid)}
                    >
                      <p>View</p>
                      <FaEye className="size-5" />
                    </button>
                  )}
                </div>
                {loading ? (
                  <div className="flex justify-center items-center w-full py-6">
                    <LoadingSpinner size="sm" />
                  </div>
                ) : (
                  <div className="w-full my-4 flex justify-center items-center">
                    <div className="w-full my-4 grid grid-cols-1 lg:grid-cols-3">
                      {programSpecifications[index]?.specifications?.map(
                        (spec, specIndex) => (
                          <div
                            key={specIndex}
                            className="mx-2 flex gap-2 flex-row flex-wrap justify-start items-center"
                          >
                            <span className="text-[18px] font-semibold font-DMSans">
                              {spec.title}
                            </span>
                            <span className="text-[18px] capitalize font-normal font-DMSans">
                              {spec.duration}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}
                <div className="flex flex-col lg:flex-row justify-between items-center">
                  <div className="flex w-full justify-start items-center gap-2">
                    <p className="text-center font-DMSans text-[20px] font-semibold">
                      Application status:
                    </p>
                    {program.application_status === 2 && (
                      <span className="text-[#158608] font-DMSans text-[24px] font-semibold">
                        Accepted
                      </span>
                    )}

                    {program.application_status === 3 && (
                      <span className="text-[#FF1515] font-DMSans text-[24px] font-semibold">
                        Rejected
                      </span>
                    )}
                    {program.application_status === 1 && (
                      <span className="text-yellow-400 font-DMSans text-[24px] font-semibold">
                        Pending
                      </span>
                    )}
                  </div>
                  {program.payment_status === null &&
                    program.application_status === 2 && (
                      <BaseButton
                        containerCLassName={`mt-4 h-[49px] w-full lg:w-[280px] rounded-[8px] bg-[#FF3B30] text-[14px] lg:text-[16px] font-bold font-DMSans text-[#fff] `}
                        hoverScale={1.01}
                        hoverOpacity={0.8}
                        tapScale={0.9}
                        onClick={() =>
                          handlePayment(
                            programSpecifications[index]?.applicationid
                          )
                        }
                      >
                        <p>Proceed with payment</p>
                      </BaseButton>
                    )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Collapsible>
      {isEnrolled ? (
        <>
          <div className="bg-white shadow-xl  rounded-[8px] mt-3">
            <div className="w-full px-4 flex justify-start items-center h-[80px]">
              <h2 className="font-DMSans text-[24px] font-semibold">
                My Courses
              </h2>
            </div>
            <div className="bg-[#EBEDF0] flex flex-col justify-center items-center w-full p-4 lg:p-10 rounded-[8px]">
              <div className="flex justify-between items-center w-full">
                <div className="relative">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn m-1 flex items-center justify-between"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    <p className="text-left font-DMSans text-[14px] font-semibold">
                      {selectedOption}
                    </p>
                    <FaChevronDown />
                  </div>

                  {isOpen && (
                    <ul
                      tabIndex={0}
                      className="absolute left-0 mt-1 w-52 rounded-box bg-base-100 p-2 shadow z-10"
                    >
                      <li
                        className="cursor-pointer text-left font-DMSans text-[14px] font-semibold hover:bg-gray-200 p-2"
                        onClick={() => handleOptionSelect("MODULES")}
                      >
                        MODULES
                      </li>
                      <li
                        className="cursor-pointer text-left font-DMSans text-[14px] font-semibold hover:bg-gray-200 p-2"
                        onClick={() => handleOptionSelect("LESSONS")}
                      >
                        LESSONS
                      </li>
                    </ul>
                  )}
                </div>
                <div className="dropdown">
                  <div tabIndex={0} role="button" className="btn m-1">
                    <p className="text-left font-DMSans text-[14px] font-semibold uppercase">
                      Course Status
                    </p>
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                  >
                    <li className="text-left font-DMSans text-[14px] font-semibold">
                      <a>Item 1</a>
                    </li>
                    <li className="text-left font-DMSans text-[14px] font-semibold">
                      <a>Item 2</a>
                    </li>
                  </ul>
                </div>
              </div>
              {selectedOption === "MODULES" && (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    <Carousel>
                      <div className="grid w-[100%] grid-cols-1 gap-x-20 gap-y-10 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
                        {courses.map((course) => (
                          <CourseCard
                            moduleNumber={course.module_number}
                            key={course.moduleid}
                            moduleId={course.moduleid}
                            title={course.module_title}
                            description={course.module_description}
                            lessonsInfo={course.module_objectives}
                            buttonText="Start Module"
                            progress="0/15"
                            icon={IoMdUnlock}
                            courseStarted="not started"
                            onButtonClick={() =>
                              handleStartCourse(course.moduleid)
                            }
                          />
                        ))}
                      </div>
                      {secondcourses && secondcourses.length > 0 && (
                        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
                          {secondcourses.map((course) => (
                            <CourseCard
                              moduleNumber={course.module_number}
                              key={course.moduleid}
                              moduleId={course.moduleid}
                              title={course.module_title}
                              description={course.module_description}
                              lessonsInfo={course.module_objectives}
                              buttonText="Start Module"
                              progress="0/15"
                              icon={IoMdUnlock}
                              courseStarted="not started"
                              onButtonClick={() =>
                                handleStartCourse(course.moduleid)
                              }
                            />
                          ))}
                        </div>
                      )}
                    </Carousel>
                  </motion.div>
                </AnimatePresence>
              )}
              {selectedOption === "LESSONS" && (
                <Carousel>
                  <div className="grid w-[100%] grid-cols-1 mt-8 gap-x-10 sm:grid-cols-2">
                    {courses.map((course, index) => (
                      <ModuleCards
                        key={index}
                        moduleNumber={course.moduleid}
                        // courseStarted="not started"
                        // lesson={course.lesson_title}
                      />
                    ))}
                  </div>
                  {secondcourses && secondcourses.length > 0 && (
                    <div className="grid grid-cols-1 mt-8 gap-x-10 sm:grid-cols-2">
                      {secondcourses.map((course, index) => (
                        <ModuleCards
                          key={index}
                          moduleNumber={course.moduleid}
                          // courseStarted="not started"
                          // lesson={course.lesson_title}
                        />
                      ))}
                    </div>
                  )}
                </Carousel>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <Collapsible
                title={`My Grades: ${applications[0]?.course_title}`}
                initialState={true}
              >
                <div
                  // className="w-[750px]"
                  style={{ overflowX: "auto" }}
                >
                  <div
                    className="max-w-7xl mx-auto p-3 border-t-2"
                    style={{ minWidth: "500px" }}
                  >
                    {/* <h2 className="text-xl font-semibold mb-4">
      My Grades for: Write The Program Title Here
    </h2> */}

                    <div className="flex justify-between mb-4 mt-5">
                      <div>
                        <h1 className="font-semibold">Modules</h1> <br />
                        <select className="border p-2 rounded w-1/2.5">
                          {courses.map((course, index) => (
                            <option key={index}>
                              {`Module ${course.module_number}: ${course.module_title}`}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <h1 className="font-semibold">Arrange by</h1> <br />
                        <select className="border p-2 rounded w-1/2.5">
                          <option>All</option>
                          <option>Quizzes</option>
                          <option>Assignments</option>
                          <option>Capstones</option>
                          <option>Exams</option>
                        </select>
                      </div>
                    </div>

                    <div style={{ overflowX: "auto" }}>
                      <table
                        className="w-full border-separate border-spacing-y-4 text-left"
                        style={{ minWidth: "500px" }}
                      >
                        <thead>
                          <tr className="border-b">
                            <th className="p-2">Title</th>
                            <th className="p-2">Due Date</th>
                            <th className="p-2">Status</th>
                            <th className="p-2">Score</th>
                            <th className="p-2">Rating</th>
                          </tr>
                        </thead>
                        <tbody>
                          {grades.map((item, index) => (
                            <tr
                              key={index}
                              className={`${item.bgColor} pb-4 overflow-hidden`}
                            >
                              <td className="p-2 rounded-l-lg overflow-hidden font-semibold">
                                {item.title}
                              </td>
                              <td className="p-2 font-normal">
                                {item.dueDate}
                              </td>
                              <td
                                className={`p-2 font-medium ${item.statusColor}`}
                              >
                                {item.status}
                              </td>
                              <td className="p-2 font-normal">{item.score}</td>
                              <td className="p-2 font-medium">{item.rating}</td>
                              <td className="p-7 rounded-r-lg overflow-hidden">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="4"
                                  height="13"
                                  viewBox="0 0 4 13"
                                  fill="none"
                                >
                                  <path
                                    d="M0.885 2.3C0.885 1.91667 1.00767 1.59467 1.253 1.334C1.51367 1.08867 1.828 0.966 2.196 0.966C2.564 0.966 2.87067 1.08867 3.116 1.334C3.37667 1.59467 3.507 1.91667 3.507 2.3C3.507 2.68333 3.37667 2.99767 3.116 3.243C2.87067 3.48833 2.564 3.611 2.196 3.611C1.828 3.611 1.51367 3.48833 1.253 3.243C1.00767 2.99767 0.885 2.68333 0.885 2.3ZM0.885 6.85957C0.885 6.47624 1.00767 6.15424 1.253 5.89357C1.51367 5.64824 1.828 5.52557 2.196 5.52557C2.564 5.52557 2.87067 5.64824 3.116 5.89357C3.37667 6.15424 3.507 6.47624 3.507 6.85957C3.507 7.2429 3.37667 7.55724 3.116 7.80257C2.87067 8.0479 2.564 8.17057 2.196 8.17057C1.828 8.17057 1.51367 8.0479 1.253 7.80257C1.00767 7.55724 0.885 7.2429 0.885 6.85957ZM0.885 11.4191C0.885 11.0358 1.00767 10.7138 1.253 10.4531C1.51367 10.2078 1.828 10.0851 2.196 10.0851C2.564 10.0851 2.87067 10.2078 3.116 10.4531C3.37667 10.7138 3.507 11.0358 3.507 11.4191C3.507 11.8025 3.37667 12.1168 3.116 12.3621C2.87067 12.6075 2.564 12.7301 2.196 12.7301C1.828 12.7301 1.51367 12.6075 1.253 12.3621C1.00767 12.1168 0.885 11.8025 0.885 11.4191Z"
                                    fill="#555050"
                                  />
                                </svg>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                      <span className="text-lg font-bold">Total</span>
                      <span className="text-lg font-bold">54/103 B</span>
                    </div>
                  </div>
                </div>
              </Collapsible>
              <h1 className="mt-5 font-semibold">Download transcript </h1>
            </div>
            <div>
              <Collapsible title="My Updates" initialState={true}>
                <div
                  style={{ fontFamily: "Arial Rounded MT" }}
                  className="max-w-7xl mx-auto p-4 border-t-2   w-[100%] "
                >
                  {/* <div className="flex justify-between items-center border-b pb-3 mb-3">
                    <h2 className="text-lg font-semibold">Updates</h2>
                  </div> */}
                  <div className="flex justify-between mb-4">
                    <button className="p-2 border rounded-lg flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="17"
                        height="16"
                        viewBox="0 0 17 16"
                        fill="none"
                      >
                        <path
                          d="M8.45696 0C4.04579 0 0.457031 3.58869 0.457031 7.99977C0.457031 12.4112 4.04579 16 8.45696 16C12.868 16 16.4567 12.4111 16.4567 7.99977C16.4567 3.58869 12.868 0 8.45696 0ZM8.45696 14.8532C4.67813 14.8532 1.60382 11.7787 1.60382 7.99977C1.60382 4.22102 4.67813 1.14679 8.45696 1.14679C12.2357 1.14679 15.3099 4.22102 15.3099 7.99977C15.3099 11.7787 12.2357 14.8532 8.45696 14.8532Z"
                          fill="#6A7A99"
                        />
                        <path
                          d="M12.5703 7.86549H8.81085V3.75601C8.81085 3.43935 8.5542 3.18262 8.23746 3.18262C7.92079 3.18262 7.66406 3.43935 7.66406 3.75601V8.43889C7.66406 8.75556 7.92079 9.01228 8.23746 9.01228H12.5703C12.8871 9.01228 13.1437 8.75556 13.1437 8.43889C13.1437 8.12222 12.887 7.86549 12.5703 7.86549Z"
                          fill="#6A7A99"
                        />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="15"
                        viewBox="0 0 16 15"
                        fill="none"
                      >
                        <path
                          d="M8.20171 9.86424L11.989 6.07685C12.0767 5.98925 12.125 5.87231 12.125 5.74763C12.125 5.62294 12.0767 5.50601 11.989 5.41841L11.7102 5.13949C11.5285 4.958 11.2332 4.958 11.0518 5.13949L7.87138 8.31986L4.68748 5.13596C4.59982 5.04837 4.48295 5 4.35833 5C4.23358 5 4.11671 5.04837 4.02898 5.13596L3.7502 5.41488C3.66253 5.50255 3.61423 5.61941 3.61423 5.7441C3.61423 5.86878 3.66253 5.98572 3.7502 6.07332L7.54099 9.86424C7.62893 9.95205 7.74635 10.0003 7.87117 10C7.99648 10.0003 8.11383 9.95205 8.20171 9.86424Z"
                          fill="#4F547B"
                        />
                      </svg>
                    </button>
                    <button className="p-2 border rounded-lg flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="21"
                        height="20"
                        viewBox="0 0 21 20"
                        fill="none"
                      >
                        <path
                          d="M5.75054 4.375L5.75047 14.115L6.5586 13.3081L7.44248 14.1919L5.12554 16.5089L2.80859 14.1919L3.69248 13.3081L4.50047 14.115L4.50054 4.375H5.75054ZM11.3755 13.75V15H8.25054V13.75H11.3755ZM13.2506 10.625V11.875H8.25054V10.625H13.2506ZM15.1256 7.5V8.75H8.25054V7.5H15.1256ZM17.0006 4.375V5.625H8.25054V4.375H17.0006Z"
                          fill="#6A7A99"
                        />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="15"
                        viewBox="0 0 16 15"
                        fill="none"
                      >
                        <path
                          d="M8.20171 9.86424L11.989 6.07685C12.0767 5.98925 12.125 5.87231 12.125 5.74763C12.125 5.62294 12.0767 5.50601 11.989 5.41841L11.7102 5.13949C11.5285 4.958 11.2332 4.958 11.0518 5.13949L7.87138 8.31986L4.68748 5.13596C4.59982 5.04837 4.48295 5 4.35833 5C4.23358 5 4.11671 5.04837 4.02898 5.13596L3.7502 5.41488C3.66253 5.50255 3.61423 5.61941 3.61423 5.7441C3.61423 5.86878 3.66253 5.98572 3.7502 6.07332L7.54099 9.86424C7.62893 9.95205 7.74635 10.0003 7.87117 10C7.99648 10.0003 8.11383 9.95205 8.20171 9.86424Z"
                          fill="#4F547B"
                        />
                      </svg>
                    </button>
                  </div>
                  <div>
                    {updates.map((update, index) => (
                      <div key={index} className="border-b py-3">
                        <p className={`${update.titleColor} text-[20px]`}>
                          {update.title}:{" "}
                          <span className="text-black font-normal text-[18px]">
                            {update.description}
                          </span>
                        </p>
                        <div className="text-gray-500 text-sm flex space-x-4">
                          <span>{update.time}</span>
                          <span>{update.date}</span>
                          <span className="text-green-600 font-semibold">
                            Points: {update.points}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3">
                    <button className="flex items-center space-x-1 p-2 border rounded-lg">
                      <span>Show 10</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="15"
                        viewBox="0 0 16 15"
                        fill="none"
                      >
                        <path
                          d="M8.20171 9.86424L11.989 6.07685C12.0767 5.98925 12.125 5.87231 12.125 5.74763C12.125 5.62294 12.0767 5.50601 11.989 5.41841L11.7102 5.13949C11.5285 4.958 11.2332 4.958 11.0518 5.13949L7.87138 8.31986L4.68748 5.13596C4.59982 5.04837 4.48295 5 4.35833 5C4.23358 5 4.11671 5.04837 4.02898 5.13596L3.7502 5.41488C3.66253 5.50255 3.61423 5.61941 3.61423 5.7441C3.61423 5.86878 3.66253 5.98572 3.7502 6.07332L7.54099 9.86424C7.62893 9.95205 7.74635 10.0003 7.87117 10C7.99648 10.0003 8.11383 9.95205 8.20171 9.86424Z"
                          fill="#4F547B"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </Collapsible>
            </div>
          </div>
        </>
      ) : (
        <div
          className={`w-full py-6 rounded-md px-2 shadow-md mt-2 ${
            theme === "light" ? "bg-[#fff]" : ""
          }`}
        >
          <h2 className="font-DMSans text-[24px] font-semibold">My Courses </h2>
          <p className="text-left font-DMSans text-[18px] text-[#E61A1A] font-semibold">
            You do not have active courses yet. Once your enrollment is
            complete, your courses will appear here...
          </p>
        </div>
      )}
    </DashboardArea>
  );
};

export default Dashboard;
