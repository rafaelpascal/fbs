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
import ReactPlayer from "react-player";
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
import {
  formatDate,
  getMonthsBetweenDates,
  getWeeksBetweenDates,
} from "~/lib/utils";
import { cn } from "~/utils/helpers";
import { useTheme } from "~/context/theme-provider";

const tabsData = [
  { title: "Overview" },
  { title: "Course Content" },
  { title: "Faculties" },
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
    Title: "Program Objectives",
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
  id: string | undefined;
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

const Contents = ({ id }: CourseProps) => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isModuleCount, setIsModuleCount] = useState(false);
  const [lessons, setLessons] = useState(0);
  // const [moduleId, setModuleId] = useState(0);
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
    cohort_title: "",
    course_format: "",
    course_flexible: 0,
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
    course_enddate: "",
    learning_objective: "",
    assessment_method: "",
    career_option: "",
    course_for: "",
    course_startdate: "",
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

  const updatedFacilitatorsItem = FacilitatorsItem.map((facilitator) => {
    if (facilitator.Title === "Assessment Methods") {
      return {
        ...facilitator,
        items: [courseData.assessment_method],
      };
    }
    if (facilitator.Title === "Program Objectives") {
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
        // title: name,
        courseid: id,
      };
      const course = await CourseServices.getCourse(payload);
      console.log("course", course);

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
      const moduleResponse = await CourseServices.getModuleByCourseId(payload);

      const modules = moduleResponse.data.course_modules;
      setIsModule(modules);

      if (modules.length > 0) {
        const lessonCounts: { moduleid: number; lessonCount: number }[] =
          await Promise.all(
            modules.map(async (module: { moduleid: number }) => {
              const lessonPayload = { moduleid: module.moduleid };
              const lessonsResponse = await CourseServices.getLessonByModuleId(
                lessonPayload
              );
              return {
                moduleid: module.moduleid,
                lessonCount: lessonsResponse.data.course_lessons.length,
              };
            })
          );
        const totalLessons = lessonCounts.reduce(
          (sum, module) => sum + module.lessonCount,
          0
        );
        setLessons(totalLessons);
      }

      setIsModuleCount(false);
    } catch (error) {
      console.log(error);
      setIsModuleCount(false);
    }
  };

  // useEffect(() => {
  //   getLesson();
  // }, [moduleId]);

  useEffect(() => {
    if (courseData.coursesid) {
      getModule();
    }
  }, [courseData.coursesid]);

  useEffect(() => {
    getCourse();
  }, [id]);

  const namesArray = courseData.facilitators.split(",");
  facilitatorsData.forEach((facilitator, index) => {
    if (namesArray[index]) {
      facilitator.name = namesArray[index];
    }
  });

  const handleNavigate = () => {
    navigate(`/application/${courseData.course_title}/${courseData.coursesid}`);
  };

  useEffect(() => {
    setFooterBtnItem([
      {
        items: [
          {
            text:
              courseData.course_flexible === 0
                ? `${formatDate(courseData.course_startdate)} - ${formatDate(
                    courseData.course_enddate
                  )}`
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
            count: `${lessons}`,
          },
          {
            text: "Duration",
            icon: <CiClock1 />,
            count:
              courseData.course_run === "Weekly"
                ? `${getWeeksBetweenDates(
                    courseData.course_startdate,
                    courseData.course_enddate
                  )} Weeks`
                : courseData.course_run === "Monthly"
                ? `${getMonthsBetweenDates(
                    courseData.course_startdate,
                    courseData.course_enddate
                  )} Months`
                : "N/A",
          },
          { text: "Case Study", icon: <MdBarChart />, count: "9" },
          {
            text: courseData.course_type,
            icon: <BsAward />,
            count: "",
          },
        ],
        ordered: false,
        customClass: "",
      },
    ]);
  }, [courseData, courseData.coursesid, isModuleCount]);

  const monthlyPayment = courseData.naira_amount / courseData.installment;

  const lectureItems = {
    title: "Introduction to Business consulting And Strategy",
    videoSrc: `${courseData.video_url}`,
  };

  if (isLoading) {
    return (
      <div className="h-[400px] w-full flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }
  return (
    <div className="flex justify-center pt-[10%]  mb-[10%] font-DMSans items-center px-4">
      <div className="relative w-full lg:w-[80%] flex flex-wrap lg:flex-row justify-center gap-20 items-start">
        <div className="w-full lg:w-[819px]">
          <h2 className="text-[40px] my-3">{courseData.course_title}</h2>
          <p className="text-[18px] text-left  my-3">
            {courseData.course_highlight}
          </p>
          <p className="text-[20px]">
            <span className="text-[#FF3B30]">Cohort:</span>{" "}
            {courseData.cohort_title}
          </p>
          <p className="text-[20px] my-3">
            <span className="text-[#FF3B30]">Program:</span>{" "}
            {courseData.course_type}
          </p>
          <p className="text-[20px] mb-3">
            <span className="text-[#FF3B30]">Mode:</span>{" "}
            {courseData.course_mode}
          </p>
          {courseData.video_url ? (
            <div
              style={{
                maxWidth: "100%",
                position: "relative",
                paddingTop: "56.25%",
              }}
            >
              <ReactPlayer
                url={lectureItems.videoSrc}
                controls
                width="100%"
                height="100%"
                style={{ position: "absolute", top: 0, left: 0 }}
              />
            </div>
          ) : (
            <img src={courseData.images} alt="Video" className="rounded-lg" />
          )}
          <Tabs tabs={tabsData}>
            <>
              <Description description={courseData.description} />
            </>
            <>
              <CourseContents courseId={id ?? ""} />
            </>
            <>
              <Facilitators facilitatorsData={facilitatorsData} />
            </>
            <div className="">
              <Fee
                naira={courseData.naira_amount}
                usd={courseData.usd_amount}
                installment={courseData.installment}
              />
            </div>
          </Tabs>
          {updatedFacilitatorsItem.map((facilitator, index) => (
            <List
              key={index}
              items={facilitator.items}
              title={facilitator.Title}
              ordered={true}
              customClass="text-[#fff]"
            />
          ))}
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
            <Link
              to="https://fordaxbschool.com/contact"
              className={cn(
                "mt-4 w-full lg:w-[369.19px] h-[66px] flex justify-center items-center rounded-[8px] border-[1px]  text-[24px] font-bold font-DMSans ",
                theme === "dark"
                  ? "border-[#fff] text-[#fff]"
                  : "border-[#000] text-[#757575]"
              )}
              target="_blank"
            >
              <p>Contact us</p>
            </Link>
          </div>
        </div>
        <div
          id="side"
          className="w-full rounded-md lg:w-[443.02px] p-2 lg:sticky top-40 shadow-md"
        >
          <img src={courseData.images} alt="mbaimage" />
          <div className="flex py-2 justify-between items-center">
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
          <div className="flex mb-10 flex-col justify-between items-center w-full">
            <BaseButton
              containerCLassName="mt-4 w-full hover:bg-[#fff] border-[1px] hover:border-[#FF3B30] hover:text-[#FF3B30]  lg:w-[369.19px] h-[53px] w-full rounded-[8px] bg-[#FF3B30] text-[24px] font-bold font-DMSans text-[#fff]"
              hoverScale={1.01}
              hoverOpacity={0.8}
              tapScale={0.9}
              onClick={handleNavigate}
            >
              <p>Apply Now</p>
            </BaseButton>
            <Link
              to="https://fordaxbschool.com/wish"
              target="_blank"
              className={cn(
                "mt-4 w-full lg:w-[369.19px] border-[1px] hover:border-[#FF3B30] hover:text-[#FF3B30] flex justify-center items-center h-[53px] rounded-[8px] text-[24px] font-bold font-DMSans",
                theme === "dark"
                  ? "border-[#fff] text-[#fff]"
                  : "border-[#000] text-[#757575]"
              )}
            >
              <p>Add to wishlist</p>
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
            <p className="text-[#FF3B30] font-DMSans font-semibold text-[18px] w-full text-center py-4">
              Instalment Plan Available
            </p>
            <div className="flex justify-center gap-2 items-center">
              <Link
                to="https://web.facebook.com/fordaxbschool/"
                className="w-[45px] flex justify-center items-center h-[45px] rounded-full bg-[#EEF2F6] hover:bg-[#FF1515] hover:text-[#fff] transition duration-300 delay-200"
              >
                <FaFacebookF className="text-[#333]" />
              </Link>
              <Link
                to="https://x.com/Fordaxbschool"
                className="w-[45px] flex justify-center items-center h-[45px] rounded-full bg-[#EEF2F6] hover:bg-[#FF1515] hover:text-[#fff] transition duration-300 delay-200"
              >
                <FaTwitter className="text-[#333]" />
              </Link>
              <Link
                to=""
                className="w-[45px] flex justify-center items-center h-[45px] rounded-full bg-[#EEF2F6] hover:bg-[#FF1515] hover:text-[#fff] transition duration-300 delay-200"
              >
                <FaInstagramSquare className="text-[#333]" />
              </Link>
              <Link
                to="https://www.linkedin.com/company/fordaxbschool/"
                className="w-[45px] flex justify-center items-center h-[45px] rounded-full bg-[#EEF2F6] hover:bg-[#FF1515] hover:text-[#fff] transition duration-300 delay-200"
              >
                <FaLinkedin className="text-[#333]" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contents;
