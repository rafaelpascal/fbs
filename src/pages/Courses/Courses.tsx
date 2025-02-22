// import React from "react";

import { DashboardArea } from "~/layouts/DashboardArea";
import Collapsible from "~/components/Collapsible/Collapsible";
import { BaseButton } from "~/components/buttons/BaseButton";
import { useNavigate } from "react-router-dom";
import { IoMdUnlock } from "react-icons/io";
import CourseCard from "~/components/cards/CourseCard";
import Carousel from "~/components/Carousel/Carousel";
import LessonsCard from "~/components/cards/LessonsCard";
import ForumsCard from "~/components/cards/ForumsCard";
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
  course_format?: string;
  course_flexible?: number;
  start_date?: string;
  cohort_title?: string;
  created_at?: string;
  end_date?: string;
  duration?: number;
  coursesid?: number;
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

const Lessons = [
  {
    id: 1,
    image:
      "https://s3-alpha-sig.figma.com/img/fca1/b527/3dc913d6a517b22891c56fc7d0adbaf0?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ONW8A23I~6CcWgzr1HJbjqvEoW3bwT1i55H2QsLoX6DrCNuXcpV5ifNj0SVdmpBroZDrl6Knu0Xzjnh25apBeE9SZpiSH~wKajVVh1ffBoWfbVyCEQj20nzVCsFB6PcSPa9LscnJZgX9XytwfcxmVXGsledYyk1MoXOZpVHrxxzdkvoavhJD5eJ0tgAKoIlWX6V0yuMtpOB6Gj01gDY7dZf8bXWb0Cu7ailML3gouHAbAejeo81EnY7BXRE1Bb5rd7DYS2K7PEv4T9CmKuj4SFzBHYa9~F~ocKgS4btoEtez8xPfN-epO6bOFU0GJEM5S2XG8BPexaksN1XJJfrxIQ__",
    title: "Complete Python Bootcamp From Zero to Hero in Python",
  },
  {
    id: 2,
    image:
      "https://s3-alpha-sig.figma.com/img/fca1/b527/3dc913d6a517b22891c56fc7d0adbaf0?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ONW8A23I~6CcWgzr1HJbjqvEoW3bwT1i55H2QsLoX6DrCNuXcpV5ifNj0SVdmpBroZDrl6Knu0Xzjnh25apBeE9SZpiSH~wKajVVh1ffBoWfbVyCEQj20nzVCsFB6PcSPa9LscnJZgX9XytwfcxmVXGsledYyk1MoXOZpVHrxxzdkvoavhJD5eJ0tgAKoIlWX6V0yuMtpOB6Gj01gDY7dZf8bXWb0Cu7ailML3gouHAbAejeo81EnY7BXRE1Bb5rd7DYS2K7PEv4T9CmKuj4SFzBHYa9~F~ocKgS4btoEtez8xPfN-epO6bOFU0GJEM5S2XG8BPexaksN1XJJfrxIQ__",
    title: "Complete Python Bootcamp From Zero to Hero in Python",
  },
  {
    id: 3,
    image:
      "https://s3-alpha-sig.figma.com/img/fca1/b527/3dc913d6a517b22891c56fc7d0adbaf0?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ONW8A23I~6CcWgzr1HJbjqvEoW3bwT1i55H2QsLoX6DrCNuXcpV5ifNj0SVdmpBroZDrl6Knu0Xzjnh25apBeE9SZpiSH~wKajVVh1ffBoWfbVyCEQj20nzVCsFB6PcSPa9LscnJZgX9XytwfcxmVXGsledYyk1MoXOZpVHrxxzdkvoavhJD5eJ0tgAKoIlWX6V0yuMtpOB6Gj01gDY7dZf8bXWb0Cu7ailML3gouHAbAejeo81EnY7BXRE1Bb5rd7DYS2K7PEv4T9CmKuj4SFzBHYa9~F~ocKgS4btoEtez8xPfN-epO6bOFU0GJEM5S2XG8BPexaksN1XJJfrxIQ__",
    title: "Complete Python Bootcamp From Zero to Hero in Python",
  },
];
const Dashboard = () => {
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

  const handleStartCourse = (type: string, courseId: number) => {
    if (type === "word") {
      navigate(`/word-course/${courseId}`);
    } else if (type === "video") {
      navigate(`/lecture/${courseId}`);
    } else {
      console.error("Unknown course type");
    }
  };

  const fetchmyapplication = async () => {
    setLoading(true);
    try {
      const payload = {
        userid: Storeduser?.user,
      };
      const res = await CourseServices.fetchApplication(payload);
      setfirstCourseId(res.data.data[0].coursesid);
      if (res.data && res.data.data && res.data.data.length > 0) {
        const application = res.data.data;
        const anyEnrolled: boolean = application.some(
          (application: Application) => application.payment_status === 1
        );
        if (anyEnrolled) {
          setisEnrolled(true);
        }
        setapplications(application);
        const updatedProgramSpecifications: ProgramSpecification[] =
          application.map((app: Application) => ({
            courseTitle: app.course_title || "N/A",
            applicationid: app.applicationid || 0,
            specifications: [
              {
                title: "Format",
                duration: app.course_format || "N/A",
              },
              {
                title: "Course Starting",
                duration:
                  app.course_flexible === 0
                    ? app.start_date || "N/A"
                    : "Flexible",
              },
              {
                title: "Cohort",
                duration: app.cohort_title || "N/A",
              },
              {
                title: "Application Date",
                duration: app.created_at
                  ? new Date(app.created_at).toLocaleDateString()
                  : "N/A",
              },
              {
                title: "Course Ending",
                duration:
                  app.course_flexible === 0
                    ? app.end_date || "N/A"
                    : "Flexible",
              },
              {
                title: "Duration",
                duration:
                  app.duration && app.duration > 0
                    ? `${app.duration} week(s)`
                    : "N/A",
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
      const [chunk1, chunk2] = splitArray<Module>(res.data.course_modules);
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
                            className="mx-2 flex flex-row flex-wrap justify-start items-center"
                          >
                            <p className="text-[18px] font-semibold font-DMSans">
                              {spec.title}
                            </p>
                            {" : "}
                            <p className="text-[18px] capitalize font-normal font-DMSans">
                              {spec.duration}
                            </p>
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
          <Collapsible title="My Courses" initialState={true}>
            <div className="bg-[#EBEDF0] flex flex-col justify-center items-center w-full p-4 lg:p-10 rounded-[16px]">
              <div className="flex justify-between items-center w-full">
                <div className="relative">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn m-1 flex items-center justify-between"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    <p className="text-left font-DMSans text-[14px] font-semibold">
                      MODULES
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
                    initial={{ opacity: 0, y: 20 }} // Start invisible & slightly below
                    animate={{ opacity: 1, y: 0 }} // Animate to visible & original position
                    exit={{ opacity: 0, y: -20 }} // Animate out upwards
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
                              handleStartCourse("video", course.moduleid)
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
                                handleStartCourse(course.type, course.moduleid)
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
                  <div className="grid w-[100%] grid-cols-1 mt-8 gap-x-20 sm:grid-cols-2">
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
                    <div className="grid grid-cols-1 mt-8 gap-x-60 sm:grid-cols-2">
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
          </Collapsible>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <Collapsible
                title="Completed Lessons & Scores"
                initialState={true}
              >
                {Lessons.map((lessons) => (
                  <LessonsCard
                    key={lessons.id}
                    image={lessons.image}
                    title={lessons.title}
                  />
                ))}
              </Collapsible>
            </div>
            <div>
              <Collapsible title="Forum & Conversations" initialState={true}>
                {Lessons.map((lessons) => (
                  <ForumsCard
                    key={lessons.id}
                    image={lessons.image}
                    title={lessons.title}
                  />
                ))}
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
