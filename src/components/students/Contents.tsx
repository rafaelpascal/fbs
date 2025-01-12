import { mbaimage } from "~/assets";
import { BaseButton } from "../buttons/BaseButton";
import Tabs from "../Tabs/Tabs";
import Facilitators from "./CourseContent.tsx/Facilitators";
import Fee from "./CourseContent.tsx/Fee";
import CourseContents from "./CourseContents";
import Description from "./Description";
import MbaList from "../list/mba";
import { ROUTES } from "../constants/routes";
import { Link, useNavigate } from "react-router-dom";
import { CiClock1 } from "react-icons/ci";
import { LuMonitorPlay } from "react-icons/lu";
import { IoExtensionPuzzleOutline } from "react-icons/io5";
import { MdBarChart } from "react-icons/md";
import { BsAward } from "react-icons/bs";
import {
  FaFacebookF,
  FaInstagramSquare,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import List from "../list/List";
import { CourseServices } from "~/api/course";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "../ui/loading-spinner";

const tabsData = [
  { title: "Overview" },
  { title: "Course Content" },
  { title: "Faculties" },
  { title: "Course Structure" },
  { title: "Tuition" },
];

type FacilitatorsProps = {
  Title: string;
  items: string[];
};
const FacilitatorsItem: FacilitatorsProps[] = [
  {
    Title: "Learning Objectives ",
    items: [
      "Five O'level credit passes including English Language and Mathematics.",
      "Bachelor's degree in any field from a recognised university, with a minimum of second class lower division.",
      "HND graduates with a minimum of upper credit may be considered.",
      "Candidates are required to have a minimum of one year post-graduation work experience.",
      "Applicants with lower academic qualifications may generally need to demonstrate longer duration of work experience.",
    ],
  },
  {
    Title: "Course Structure",
    items: [
      "Five O'level credit passes including English Language and Mathematics.",
      "Bachelor's degree in any field from a recognised university, with a minimum of second class lower division.",
      "HND graduates with a minimum of upper credit may be considered.",
      "Candidates are required to have a minimum of one year post-graduation work experience.",
      "Applicants with lower academic qualifications may generally need to demonstrate longer duration of work experience.",
    ],
  },
  {
    Title: "Assessment Methods",
    items: [
      "Five O'level credit passes including English Language and Mathematics.",
      "Bachelor's degree in any field from a recognised university, with a minimum of second class lower division.",
      "HND graduates with a minimum of upper credit may be considered.",
      "Candidates are required to have a minimum of one year post-graduation work experience.",
      "Applicants with lower academic qualifications may generally need to demonstrate longer duration of work experience.",
    ],
  },
  {
    Title: "Career Options & Opportunities",
    items: [
      "Five O'level credit passes including English Language and Mathematics.",
      "Bachelor's degree in any field from a recognised university, with a minimum of second class lower division.",
      "HND graduates with a minimum of upper credit may be considered.",
      "Candidates are required to have a minimum of one year post-graduation work experience.",
      "Applicants with lower academic qualifications may generally need to demonstrate longer duration of work experience.",
    ],
  },
  {
    Title: "Admission Requirements",
    items: [
      "Five O'level credit passes including English Language and Mathematics.",
      "Bachelor's degree in any field from a recognised university, with a minimum of second class lower division.",
      "HND graduates with a minimum of upper credit may be considered.",
      "Candidates are required to have a minimum of one year post-graduation work experience.",
      "Applicants with lower academic qualifications may generally need to demonstrate longer duration of work experience.",
    ],
  },
  {
    Title: "Who is this course for ?",
    items: [
      "Five O'level credit passes including English Language and Mathematics.",
      "Bachelor's degree in any field from a recognised university, with a minimum of second class lower division.",
      "HND graduates with a minimum of upper credit may be considered.",
      "Candidates are required to have a minimum of one year post-graduation work experience.",
      "Applicants with lower academic qualifications may generally need to demonstrate longer duration of work experience.",
    ],
  },
];

type CourseProps = {
  id: string;
  name: string;
};

type FooterItem = {
  text: string;
  icon: JSX.Element;
  count?: string | number;
};

type FooterbtnItem = {
  items: FooterItem[];
  ordered: boolean;
  customClass: string;
};

const Contents = ({ id, name }: CourseProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModuleCount, setIsModuleCount] = useState(false);
  const [lessons, setLessons] = useState([]);
  const [moduleId, setModuleId] = useState(0);
  const [ismodule, setIsModule] = useState([]);
  const [footerBtnItem, setFooterBtnItem] = useState<FooterbtnItem[]>([
    {
      items: [],
      ordered: false,
      customClass: "",
    },
  ]);
  const [courseData, setCourseData] = useState({
    certificate_type: "",
    cohort: null,
    cohortid: null,
    course_format: "",
    course_id: null,
    course_mode: "",
    course_run: "",
    course_title: "",
    course_type: "",
    course_url: "",
    coursesid: 0,
    created_at: "",
    creator: "",
    creatorid: 0,
    current_cohort: null,
    description: "",
    difficulty_level: "",
    duration: null,
    end_date: null,
    facilitator_name: "",
    facilitatorid: 43,
    flexible: null,
    image_url: "",
    imageid: 0,
    installment: null,
    max_students: "",
    naira: 1,
    naira_amount: 0,
    program_fee: 0,
    program_plan: "",
    programme_category_id: 0,
    regular_fee: null,
    sales_fee: null,
    start_date: null,
    title: null,
    usd: 1,
    usd_amount: 100,
    video_url: "",
  });
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(ROUTES.APPLICATION);
  };

  const getCourse = async () => {
    try {
      setIsLoading(true);
      const payload = {
        title: name,
        courseid: JSON.parse(id),
      };
      const course = await CourseServices.getCourse(payload);
      setCourseData(course.data.course_details[0]);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getModule = async () => {
    try {
      setIsModuleCount(true);
      const payload = { courseid: courseData.coursesid };
      const module = await CourseServices.getModuleByCourseId(payload);
      setIsModule(module.data.course_modules);
      setModuleId(module.data.course_modules.setModuleId);
      setIsModuleCount(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getLesson = async () => {
    setIsModuleCount(true);
    try {
      const payload = {
        moduleid: moduleId,
      };
      const lessons = await CourseServices.getLessonByModuleId(payload);
      setLessons(lessons.data.course_lessons);
      setIsModuleCount(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLesson();
  }, [moduleId]);

  useEffect(() => {
    if (courseData.coursesid) {
      getModule();
    }
  }, [courseData.coursesid]);

  useEffect(() => {
    getCourse();
  }, [id, name]);

  useEffect(() => {
    setFooterBtnItem([
      {
        items: [
          {
            text: `${courseData.start_date} - ${courseData.end_date}`,
            icon: <CiClock1 />,
          },
          {
            text: "Modules",
            icon: <LuMonitorPlay />,
            count: `${ismodule.length}`,
          },
          {
            text: "Lessons",
            icon: <IoExtensionPuzzleOutline />,
            count: `${lessons.length}`,
          },
          {
            text: "Duration",
            icon: <CiClock1 />,
            count: courseData.duration || "N/A",
          },
          { text: "Case Study", icon: <MdBarChart />, count: "9" },
          {
            text: "Certificate",
            icon: <BsAward />,
            count: courseData.certificate_type || "No",
          },
        ],
        ordered: false,
        customClass: "",
      },
    ]);
  }, [courseData, courseData.coursesid, isModuleCount]);

  if (isLoading) {
    return (
      <div className="h-[400px] w-full flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }
  return (
    <div className="flex justify-center  mb-[10%] font-DMSans items-center px-4">
      <div className="w-full lg:w-[80%] flex flex-wrap lg:flex-row justify-center gap-20 items-start">
        <div className="w-full lg:w-[819px]">
          <h2 className="text-[40px] my-3">{courseData.course_title}</h2>
          <p className="text-[20px]  my-3">
            Phasellus enim magna, varius et commodo ut, ultricies vitae velit.
            Ut nulla tellus, eleifend euismod pellentesque vel, sagittis vel
            justo. In libero urna s, eleifend euismod pellentesque vel, sagittis
            vel justo. In libero urna...
          </p>
          <p className="text-[20px]">
            <span className="text-[#FF3B30]">Cohort</span> 1/Dec 2024{" "}
          </p>
          <p className="text-[20px] my-3">
            <span className="text-[#FF3B30]">Program:</span>{" "}
            {courseData.course_type}
          </p>
          <p className="text-[20px] mb-3">
            <span className="text-[#FF3B30]">Format:</span>{" "}
            {courseData.course_mode}
          </p>
          {courseData.image_url && (
            <img
              src={courseData.image_url}
              alt="Video"
              className="rounded-lg"
            />
          )}

          <Tabs tabs={tabsData}>
            <div>
              <Description description={courseData.description} />
            </div>
            <div>
              <CourseContents courseId={id} />
            </div>
            <div>
              <Facilitators />
            </div>
            <div className="">Course structure content goes here.</div>
            <div className="">Tuition content goes here.</div>
          </Tabs>
          {FacilitatorsItem.map((facilitator, index) => (
            <List
              key={index}
              items={facilitator.items}
              title={facilitator.Title}
              ordered={false}
              customClass="p-2"
            />
          ))}
          <Fee naira={courseData.naira_amount} usd={courseData.usd_amount} />
          <div className="flex justify-between items-center w-full">
            <BaseButton
              containerCLassName="mt-4 w-full lg:w-[369.19px] h-[66px] w-full rounded-[8px] bg-[#FF3B30] text-[24px] font-bold font-DMSans text-[#fff]"
              hoverScale={1.01}
              hoverOpacity={0.8}
              tapScale={0.9}
            >
              <p>Apply Now</p>
            </BaseButton>
            <BaseButton
              containerCLassName="mt-4 w-full lg:w-[369.19px] h-[66px] w-full rounded-[8px] border-[1px] border-[#000] text-[24px] font-bold font-DMSans text-[#757575]"
              hoverScale={1.01}
              hoverOpacity={0.8}
              tapScale={0.9}
            >
              <p>Contact us</p>
            </BaseButton>
          </div>
        </div>
        <div className="w-full lg:w-[443.02px] p-4 rounded-md shadow-md">
          <img src={mbaimage} alt="mbaimage" />
          <div className="flex py-4 justify-between items-center">
            <p>N96.000/Instalment</p>
            <p>$76.00</p>
          </div>
          <div className="flex flex-col justify-between items-center w-full">
            <BaseButton
              containerCLassName="mt-4 w-full lg:w-[369.19px] h-[66px] w-full rounded-[8px] bg-[#FF3B30] text-[24px] font-bold font-DMSans text-[#fff]"
              hoverScale={1.01}
              hoverOpacity={0.8}
              tapScale={0.9}
              onClick={handleNavigate}
            >
              <p>Apply Now</p>
            </BaseButton>
            <BaseButton
              containerCLassName="mt-4 w-full lg:w-[369.19px] h-[66px] w-full rounded-[8px] border-[1px] border-[#000] text-[24px] font-bold font-DMSans text-[#757575]"
              hoverScale={1.01}
              hoverOpacity={0.8}
              tapScale={0.9}
            >
              <p>Add to Cart</p>
            </BaseButton>
          </div>
          {footerBtnItem.map((facilitator, index) => (
            <MbaList
              key={index}
              items={facilitator.items}
              ordered={facilitator.ordered}
              customClass={facilitator.customClass}
            />
          ))}
          <div className="w-full flex justify-center items-center flex-col">
            <p className="text-[#FF3B30] font-DMSans font-semibold text-[18px] w-full text-center py-10">
              Instalment Plan Available
            </p>
            <div className="flex justify-center gap-2 items-center">
              <Link
                to="https://web.facebook.com/fordaxbschool/"
                className="w-[45px] flex justify-center items-center h-[45px] rounded-full bg-[#EEF2F6] hover:bg-[#FF1515] hover:text-[#fff] transition duration-300 delay-200"
              >
                <FaFacebookF />
              </Link>
              <Link
                to="https://x.com/Fordaxbschool"
                className="w-[45px] flex justify-center items-center h-[45px] rounded-full bg-[#EEF2F6] hover:bg-[#FF1515] hover:text-[#fff] transition duration-300 delay-200"
              >
                <FaTwitter />
              </Link>
              <Link
                to=""
                className="w-[45px] flex justify-center items-center h-[45px] rounded-full bg-[#EEF2F6] hover:bg-[#FF1515] hover:text-[#fff] transition duration-300 delay-200"
              >
                <FaInstagramSquare />
              </Link>
              <Link
                to="https://www.linkedin.com/company/fordaxbschool/"
                className="w-[45px] flex justify-center items-center h-[45px] rounded-full bg-[#EEF2F6] hover:bg-[#FF1515] hover:text-[#fff] transition duration-300 delay-200"
              >
                <FaLinkedin />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contents;
