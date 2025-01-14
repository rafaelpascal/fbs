import { mbaimage } from "~/assets";
import { BaseButton } from "../buttons/BaseButton";
import Tabs from "../Tabs/Tabs";
import Facilitators from "./CourseContent.tsx/Facilitators";
import Fee from "./CourseContent.tsx/Fee";
import CourseContents from "./CourseContents";
import Description from "./Description";
import MbaList from "../list/mba";
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

type Facilitator = {
  name: string;
  position: string;
  rating: number;
  description: string;
  image: string;
};
const facilitatorsData: Facilitator[] = [
  {
    name: "",
    position: "President of Sales, Coco Cola, Africa",
    rating: 4.5,
    description:
      "Back in 2010, I started brainspin with a desire to design compelling and engaging apps. For over 7 years, I have designed many high profile web and iPhone applications. The applications range from 3D medical-aided web applications to project management applications for niche industries.",
    image: "",
  },
  {
    name: "",
    position: "President of Sales, Coco Cola, Africa",
    rating: 4.5,
    description:
      "Back in 2010, I started brainspin with a desire to design compelling and engaging apps. For over 7 years, I have designed many high profile web and iPhone applications. The applications range from 3D medical-aided web applications to project management applications for niche industries.",
    image: "",
  },
  {
    name: "",
    position: "President of Sales, Coco Cola, Africa",
    rating: 4.5,
    description:
      "Back in 2010, I started brainspin with a desire to design compelling and engaging apps. For over 7 years, I have designed many high profile web and iPhone applications. The applications range from 3D medical-aided web applications to project management applications for niche industries.",
    image: "",
  },
];

const FacilitatorsItem: FacilitatorsProps[] = [
  {
    Title: "Learning Objectives",
    items: [],
  },
  {
    Title: "Course Structure",
    items: [],
  },
  {
    Title: "Assessment Methods",
    items: [],
  },
  {
    Title: "Career Options & Opportunities",
    items: [],
  },
  {
    Title: "Admission Requirements",
    items: [],
  },
  {
    Title: "Who is this course for ?",
    items: [],
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
    course_flexible: "",
    course_id: null,
    course_mode: "",
    course_run: "",
    course_title: "",
    course_highlight: "",
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
    images: "",
    imageid: 0,
    installment: 0,
    max_students: "",
    naira: 1,
    naira_amount: 0,
    program_fee: 0,
    program_plan: "",
    learning_objective: "",
    assessment_method: "",
    career_option: "",
    course_for: "",
    course_requirements: "",
    facilitators: "",
    course_structure: "",
    programme_category_id: 0,
    regular_fee: null,
    sales_fee: null,
    start_date: null,
    title: null,
    usd: 1,
    usd_amount: 100,
    video_url: "",
  });

  const namesArray = courseData.facilitators.split(",");
  facilitatorsData.forEach((facilitator, index) => {
    if (namesArray[index]) {
      facilitator.name = namesArray[index];
    }
  });
  const navigate = useNavigate();

  const updatedFacilitatorsItem = FacilitatorsItem.map((facilitator) => {
    if (facilitator.Title === "Assessment Methods") {
      return {
        ...facilitator,
        items: [courseData.assessment_method],
      };
    }
    if (facilitator.Title === "Learning Objectives") {
      return {
        ...facilitator,
        items: [courseData.learning_objective],
      };
    }
    if (facilitator.Title === "Course Structure") {
      return {
        ...facilitator,
        items: [courseData.course_structure],
      };
    }
    if (facilitator.Title === "Career Options & Opportunities") {
      return {
        ...facilitator,
        items: [courseData.career_option],
      };
    }
    if (facilitator.Title === "Who is this course for ?") {
      return {
        ...facilitator,
        items: [courseData.course_for],
      };
    }
    if (facilitator.Title === "Admission Requirements") {
      return {
        ...facilitator,
        items: [courseData.course_requirements],
      };
    }
    return facilitator;
  });

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
      setModuleId(module.data.course_modules[0].moduleid);
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

  const handleNavigate = () => {
    navigate(`/application/${courseData.course_title}/${courseData.coursesid}`);
  };

  useEffect(() => {
    setFooterBtnItem([
      {
        items: [
          {
            text:
              courseData.course_flexible === "0"
                ? `${courseData.start_date} - ${courseData.end_date}`
                : `Flexible`,
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
            count: courseData.course_run || "N/A",
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

  const monthlyPayment = courseData.naira_amount / courseData.installment;

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
          <p className="text-[20px]  my-3">{courseData.course_highlight}</p>
          <p className="text-[20px]">
            <span className="text-[#FF3B30]">Cohort</span> {courseData.cohort}
          </p>
          <p className="text-[20px] my-3">
            <span className="text-[#FF3B30]">Program:</span>{" "}
            {courseData.course_type}
          </p>
          <p className="text-[20px] mb-3">
            <span className="text-[#FF3B30]">Format:</span>{" "}
            {courseData.course_mode}
          </p>
          <img src={courseData.images} alt="Video" className="rounded-lg" />
          <Tabs tabs={tabsData}>
            <div>
              <Description description={courseData.description} />
            </div>
            <div>
              <CourseContents courseId={id} />
            </div>
            <div>
              <Facilitators facilitatorsData={facilitatorsData} />
            </div>
            <div className="">Course structure content goes here.</div>
            <div className="">Tuition content goes here.</div>
          </Tabs>
          {updatedFacilitatorsItem.map((facilitator, index) => (
            <List
              key={index}
              items={facilitator.items}
              title={facilitator.Title}
              ordered={false}
              customClass="p-2"
            />
          ))}
          <Fee
            naira={courseData.naira_amount}
            usd={courseData.usd_amount}
            installment={courseData.installment}
          />
          <div className="flex justify-between flex-col lg:flex-row flex-wrap w-full">
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
              <p>Contact us</p>
            </BaseButton>
          </div>
        </div>
        <div className="w-full lg:w-[443.02px] p-4 rounded-md shadow-md">
          <img src={mbaimage} alt="mbaimage" />
          <div className="flex py-4 justify-between items-center">
            <p className="font-DMSans font-semibold text-[18px]">
              {new Intl.NumberFormat("en-NG", {
                style: "currency",
                currency: "NGN",
              }).format(monthlyPayment)}
              /Instalment
            </p>
            <p className="font-DMSans font-semibold text-[18px]">
              {" "}
              {new Intl.NumberFormat("en-NG", {
                style: "currency",
                currency: "NGN",
              }).format(courseData.naira_amount)}
            </p>
          </div>
          <div className="flex flex-col justify-between items-center w-full">
            <BaseButton
              containerCLassName="mt-4 w-full hover:bg-[#fff] border-[1px] hover:border-[#FF3B30] hover:text-[#FF3B30]  lg:w-[369.19px] h-[66px] w-full rounded-[8px] bg-[#FF3B30] text-[24px] font-bold font-DMSans text-[#fff]"
              hoverScale={1.01}
              hoverOpacity={0.8}
              tapScale={0.9}
              onClick={handleNavigate}
            >
              <p>Apply Now</p>
            </BaseButton>
            <Link
              to="https://fordaxbschool.com/wish"
              className="mt-4 w-full lg:w-[369.19px] border-[1px] border-[#000] hover:border-[#FF3B30] hover:text-[#FF3B30] flex justify-center items-center h-[66px] rounded-[8px] text-[24px] font-bold font-DMSans text-[#757575]"
            >
              <p>Wishlist</p>
            </Link>
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
