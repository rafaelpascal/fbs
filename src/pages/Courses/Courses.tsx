// import React from "react";

import { DashboardArea } from "~/layouts/DashboardArea";
import Collapsible from "~/components/Collapsible/Collapsible";
import { BaseButton } from "~/components/buttons/BaseButton";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "~/components/constants/routes";
import { IoMdUnlock } from "react-icons/io";
import CourseCard from "~/components/cards/CourseCard";
import { MdLock } from "react-icons/md";
import Carousel from "~/components/Carousel/Carousel";
import LessonsCard from "~/components/cards/LessonsCard";
import ForumsCard from "~/components/cards/ForumsCard";
import { useState } from "react";
import { useTheme } from "~/context/theme-provider";
import { FaChevronDown } from "react-icons/fa6";
import ModuleCards from "~/components/cards/ModuleCards";

const programSpecifications = [
  {
    title: "Format",
    duration: "Hybrid",
  },
  {
    title: "Course Starting",
    duration: "February 12",
  },
  {
    title: "Cohort",
    duration: "1/Dec 2025",
  },
  {
    title: "Application Date",
    duration: "March 23 2025",
  },
  {
    title: "Course Ending",
    duration: "March 23 2025",
  },
  {
    title: "Duration",
    duration: "6 week (s)",
  },
];

const courses = [
  {
    type: "word",
    lesson: "1",
    id: 1,
    title: "LEADERSHIP & STRATEGIC MANAGEMENT",
    description:
      "Distinguishing leadership from management, exploring roles, functions, achieving balance, and understanding the evolution through case....",
    lessonsInfo: "23 Lessons | 3 Case studies | 4 Quizzes",
    buttonText: "Resume Course",
    progress: "4/13",
    icon: IoMdUnlock,
    courseStarted: "started",
  },
  {
    id: 2,
    type: "video",
    lesson: "2",
    title: "BUSINESS COMMUNICATION SKILLS",
    description:
      "Mastering communication techniques, effective presentations, and team collaboration....",
    lessonsInfo: "18 Lessons | 2 Case studies | 3 Quizzes",
    buttonText: "Start Course",
    icon: MdLock,
    progress: "",
    courseStarted: "started",
  },
  {
    id: 3,
    type: "video",
    lesson: "3",
    title: "BUSINESS COMMUNICATION SKILLS",
    description:
      "Mastering communication techniques, effective presentations, and team collaboration....",
    lessonsInfo: "18 Lessons | 2 Case studies | 3 Quizzes",
    buttonText: "Start Course",
    icon: MdLock,
    progress: "",
    courseStarted: "not started",
  },
  {
    id: 4,
    type: "video",
    lesson: "4",
    title: "DATA ANALYTICS FUNDAMENTALS",
    description:
      "Understanding data analytics, tools, and case studies to drive data-driven decision making....",
    lessonsInfo: "30 Lessons | 5 Case studies | 6 Quizzes",
    buttonText: "Completed",
    progress: "30/30",
    icon: IoMdUnlock,
    courseStarted: "completed",
  },
];

const secondcourses = [
  {
    id: 1,
    type: "video",
    lesson: "1",
    title: "LEADERSHIP & STRATEGIC MANAGEMENT",
    description:
      "Distinguishing leadership from management, exploring roles, functions, achieving balance, and understanding the evolution through case....",
    lessonsInfo: "23 Lessons | 3 Case studies | 4 Quizzes",
    buttonText: "Resume Course",
    progress: "12/13",
    icon: IoMdUnlock,
    status: "started",
  },
  {
    id: 2,
    type: "video",
    lesson: "2",
    title: "BUSINESS COMMUNICATION SKILLS",
    description:
      "Mastering communication techniques, effective presentations, and team collaboration....",
    lessonsInfo: "18 Lessons | 2 Case studies | 3 Quizzes",
    buttonText: "Start Course",
    icon: MdLock,
    progress: "",
    status: "not started",
  },
  {
    id: 3,
    type: "video",
    lesson: "3",
    title: "BUSINESS COMMUNICATION SKILLS",
    description:
      "Mastering communication techniques, effective presentations, and team collaboration....",
    lessonsInfo: "18 Lessons | 2 Case studies | 3 Quizzes",
    buttonText: "Start Course",
    icon: MdLock,
    progress: "",
    status: "not started",
  },
  {
    id: 4,
    type: "video",
    lesson: "4",
    title: "DATA ANALYTICS FUNDAMENTALS",
    description:
      "Understanding data analytics, tools, and case studies to drive data-driven decision making....",
    lessonsInfo: "30 Lessons | 5 Case studies | 6 Quizzes",
    buttonText: "Completed",
    progress: "15/15",
    icon: IoMdUnlock,
    status: "completed",
  },
];

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
  const navigate = useNavigate();
  const location = useLocation();
  const [enrolled] = useState(location.state?.enrolled || false);
  const [selectedOption, setSelectedOption] = useState<string | null>(
    "MODULES"
  );

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    console.log(`Selected option: ${option}`);
  };

  const handlePayment = () => {
    navigate(ROUTES.PAYMENT);
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

  return (
    <DashboardArea>
      <Collapsible title="My Enrollments" initialState={true}>
        <div className="w-full flex justify-center items-center">
          <div className=" lg:w-[90%]">
            <p className="text-left font-DMSans text-[20px] font-semibold">
              Professional Certificate in Communication And Public Relations
            </p>
            <div className="w-full my-4 flex justify-center items-center">
              <div className="w-full my-4 grid grid-cols-1 lg:grid-cols-3">
                {programSpecifications.map((specifications, index) => (
                  <div
                    key={index}
                    className="mx-2 flex flex-row flex-wrap justify-start items-center"
                  >
                    <p className="text-[18px] font-semibold font-DMSans">
                      {specifications.title}
                    </p>
                    <p className="text-[18px] font-semibold font-DMSans"> : </p>
                    <p className="text-[18px] font-normal font-DMSans">
                      {specifications.duration}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col lg:flex-row justify-between items-center">
              <div className="flex w-full justify-start items-center gap-2">
                <p className="text-center font-DMSans text-[20px] font-semibold">
                  Application status:
                </p>
                <span className="text-[#158608] font-DMSans text-[24px] font-semibold">
                  Accepted
                </span>
              </div>
              {!enrolled && (
                <BaseButton
                  containerCLassName={`mt-4 h-[49px] w-full lg:w-[280px] rounded-[8px] bg-[#FF3B30] text-[16px] font-bold font-DMSans text-[#fff] `}
                  hoverScale={1.01}
                  hoverOpacity={0.8}
                  tapScale={0.9}
                  onClick={handlePayment}
                >
                  <p>Proceed with payment</p>
                </BaseButton>
              )}
            </div>
          </div>
        </div>
      </Collapsible>
      {enrolled ? (
        <>
          <Collapsible title="My Courses" initialState={true}>
            <div className="bg-[#EBEDF0] flex flex-col justify-center items-center w-full p-4 lg:p-10 rounded-[16px]">
              <div className="flex justify-between items-center w-full">
                <div className="dropdown">
                  <div tabIndex={0} role="button" className="btn m-1">
                    <p className="text-left font-DMSans text-[14px] font-semibold">
                      MODULES
                    </p>
                    <FaChevronDown />
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                  >
                    <li className="text-left font-DMSans text-[14px] font-semibold">
                      <a onClick={() => handleOptionSelect("MODULES")}>
                        MODULES
                      </a>
                    </li>
                    <li className="text-left font-DMSans text-[14px] font-semibold">
                      <a onClick={() => handleOptionSelect("LESSONS")}>
                        LESSONS
                      </a>
                    </li>
                  </ul>
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
                <Carousel>
                  <div className="grid grid-cols-1 gap-x-60 gap-y-10 sm:grid-cols-2">
                    {courses.map((course) => (
                      <CourseCard
                        key={course.id}
                        title={course.title}
                        description={course.description}
                        lessonsInfo={course.lessonsInfo}
                        buttonText={course.buttonText}
                        progress={course.progress}
                        icon={course.icon}
                        courseStarted={course.courseStarted}
                        onButtonClick={() =>
                          handleStartCourse(course.type, course.id)
                        }
                      />
                    ))}
                  </div>

                  <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
                    {secondcourses.map((course) => (
                      <CourseCard
                        key={course.id}
                        title={course.title}
                        description={course.description}
                        lessonsInfo={course.lessonsInfo}
                        buttonText={course.buttonText}
                        progress={course.progress}
                        icon={course.icon}
                        courseStarted={course.status}
                        onButtonClick={() =>
                          console.log(`${course.title} resumed!`)
                        }
                      />
                    ))}
                  </div>
                </Carousel>
              )}
              {selectedOption === "LESSONS" && (
                <Carousel>
                  <div className="grid grid-cols-1 mt-8 gap-x-60 sm:grid-cols-2">
                    <div className="h-[89px] w-full flex justify-start items-center px-4 bg-[#FF1515]">
                      <h2 className="text-left font-DMSans text-[20px] text-[#fff] font-semibold">
                        MODULE 1: LEADERSHIP & STRATEGIC MANAGEMENT
                      </h2>
                    </div>
                    <div className="h-[89px] w-full flex justify-start items-center px-4 bg-[#FF1515]">
                      <h2 className="text-left font-DMSans text-[20px] text-[#fff] font-semibold">
                        MODULE 1: LEADERSHIP & STRATEGIC MANAGEMENT
                      </h2>
                    </div>
                    {courses.map((course) => (
                      <ModuleCards
                        key={course.id}
                        courseStarted={course.courseStarted}
                        lesson={course.lesson}
                        title={course.title}
                      />
                    ))}
                  </div>
                  <div className="grid grid-cols-1 mt-8 gap-x-60 sm:grid-cols-2">
                    {courses.map((course) => (
                      <ModuleCards
                        key={course.id}
                        courseStarted={course.courseStarted}
                        lesson={course.lesson}
                        title={course.title}
                      />
                    ))}
                  </div>
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
