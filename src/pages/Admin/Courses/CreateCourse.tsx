import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "~/components/constants/routes";
import { CourseCreatedModal } from "~/components/Modal/CourseCreatedModal";
import CourseBuilder from "~/feature/admin/CourseBuilder";
import Createcourseform from "~/feature/admin/Createcourseform";
import CredentialsForms, {
  CourseRequirement,
} from "~/feature/admin/CredentialsForms";
import { DashboardArea } from "~/layouts/DashboardArea";
import { useLocation } from "react-router-dom";
import { CourseServices } from "~/api/course";
import { LoadingSpinner } from "~/components/ui/loading-spinner";
import { useSelector } from "react-redux";

const CreateCourse = () => {
  const navigate = useNavigate();
  const [width, setWidth] = useState(10);
  const [loading, setLoading] = useState(true);
  const [initialCourseId, setInitialCourseId] = useState<number>(0);
  const [courseRequirements, setCourseRequirements] = useState<
    CourseRequirement[]
  >([]);
  const [modules, setModules] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [quiz, setInitialQuiz] = useState([]);
  const [courseData, setCourseData] = useState<{
    courseid: any;
    courseTitle: any;
    courseType: any;
    facilitator: any;
    editors: any;
    supervisors: any;
    description: any;
    highlight: any;
    featuredImages: any[];
    featuredVideo: any;
    orientation: any;
    maxStudents: any;
    courseRun: any;
    enrollmentSchedule: any;
    courseSchedule: any;
    difficultyLevel: any;
    courserun: any;
    instructoreType: any;
    courseFormat: any;
    cohortTag: any;
    enrollmentStartDate: any;
    enrollmentEndDate: any;
    courseStartDate: any;
    courseEndDate: any;
    currency: any;
    nairaAmount: any;
    dollarAmount: any;
    paymentplan: any;
    selectedMonths: any;
  } | null>(null);

  const [refreshKey, setRefreshKey] = useState(0);
  const [iscreateForm, setiscreateForm] = useState(true);
  const [isCredentials, setisCredentials] = useState(false);
  const [ismodule, setModule] = useState(false);
  const [ispublished, setIspublished] = useState(false);
  const location = useLocation();
  const courseId = location.state?.courseId;
  const booleanState = useSelector((state: any) => state.boolean.value);

  const fetchCourseData = async (id: string) => {
    try {
      const payload = {
        course_id: id,
      };

      const res = await CourseServices.getCreatedCourse(payload);

      const courseDetails = res.data.course_details;
      // Map API response to your form structure
      const transformedData = {
        courseid: courseDetails.coursesid,
        courseTitle: courseDetails.course_title,
        courseType: courseDetails.course_type,
        facilitator: courseDetails.facilitators || [],
        editors: courseDetails.creators || [],
        supervisors: courseDetails.supervisors || [],
        description: courseDetails.description,
        highlight: courseDetails.course_highlight,
        featuredImages: [courseDetails.modules[0]?.module_image || ""], // Example
        featuredVideo: courseDetails.video_url,
        orientation: courseDetails.course_mode,
        maxStudents: courseDetails.max_students,
        courseRun: courseDetails.course_run,
        enrollmentSchedule: courseDetails.enrollment_all_times
          ? "Always Open"
          : "Scheduled",
        courseSchedule: courseDetails.course_flexible ? "Flexible" : "Fixed",
        difficultyLevel: courseDetails.difficulty_level,
        courserun: courseDetails.course_run,
        instructoreType: courseDetails.course_format,
        courseFormat: courseDetails.course_format,
        cohortTag: courseDetails.cohort_title,
        enrollmentStartDate: courseDetails.enrollment_startdate,
        enrollmentEndDate: courseDetails.enrollment_enddate,
        courseStartDate: courseDetails.course_startdate,
        courseEndDate: courseDetails.course_enddate,
        currency: { NGN: !!courseDetails.naira, USD: !!courseDetails.usd },
        nairaAmount: courseDetails.naira_amount,
        dollarAmount: courseDetails.usd_amount,
        paymentplan: courseDetails.program_plan || "",
        selectedMonths: courseDetails.installment || 0,
      };
      setCourseData(transformedData);
      setInitialCourseId(courseDetails.coursesid);
      setCourseRequirements(courseDetails.course_requirements);
      setLessons(courseDetails.lessons);
      setInitialQuiz(courseDetails.quiz);
      setModules(courseDetails.modules);
    } catch (error) {
      console.error("Error fetching course data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getCourseRequirement = async (id: string) => {
    try {
      const payload = {
        course_id: id,
      };
      await CourseServices.getRequirement(payload);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (courseId) {
      fetchCourseData(courseId);
      getCourseRequirement(courseId);
    }
  }, [courseId, refreshKey, booleanState]);

  const [, setFormData] = useState({
    createForm: {},
    credentials: {},
    courseBuilder: {},
  });

  const handleChangeWidth = (newWidth: number) => {
    setWidth(newWidth);
  };

  const widthClass = (width: number) => {
    const classes: Record<string, string> = {
      10: "10",
      40: "40",
      70: "70",
      100: "100",
    };

    return classes[width] || "w-10";
  };

  const updateFormData = (section: string, data: any) => {
    setFormData((prev) => ({
      ...prev,
      [section]: data,
    }));
  };

  const goToStep = (step: string) => {
    switch (step) {
      case "create":
        setWidth(10);
        setiscreateForm(true);
        setisCredentials(false);
        setModule(false);
        break;
      case "credentials":
        setWidth(40);
        setiscreateForm(false);
        setisCredentials(true);
        setModule(false);
        break;
      case "module":
        setWidth(70);
        setiscreateForm(false);
        setisCredentials(false);
        setModule(true);
        break;
    }
  };

  const handleIscredentials = (data: any) => {
    updateFormData("createForm", data);
    goToStep("credentials");
  };

  const handleIsModule = (data: any) => {
    setRefreshKey((prev) => prev + 1);
    updateFormData("credentials", data);
    goToStep("module");
  };

  const handlePublish = (data: any) => {
    updateFormData("courseBuilder", data);
    handleChangeWidth(100);
    setiscreateForm(false);
    setisCredentials(false);
    setModule(false);
    setIspublished(true);
  };

  const handleclose = () => {
    navigate(ROUTES.COURSES);
    setIspublished(false);
  };

  const CreatedNewItem = () => {
    setRefreshKey((prev) => prev + 1);
  };

  if (courseId && loading) {
    return (
      <div className="w-full h-[100vh] flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }
  return (
    <DashboardArea>
      <div className="relative">
        <div className="w-full">
          <div className="flex w-full overflow-x-auto justify-between items-center mb-2">
            <h2
              className="font-DMSans font-semibold min-w-[200px] text-[18px] cursor-pointer"
              onClick={() => goToStep("create")}
            >
              CREATE COURSE
            </h2>
            <h2
              className="font-DMSans font-semibold min-w-[200px] text-[18px] cursor-pointer"
              onClick={() => goToStep("credentials")}
            >
              CREDENTIALS/FORM
            </h2>
            <h2
              className="font-DMSans font-semibold min-w-[200px] text-[18px] cursor-pointer"
              onClick={() => goToStep("module")}
            >
              COURSE BUILDER
            </h2>
            <h2 className="font-DMSans font-semibold min-w-[200px] text-[18px]">
              PUBLISH
            </h2>
          </div>
          <div className="w-full bg-[#ddd] flex justify-start rounded-md items-start">
            <progress
              className="progress progress-error w-100"
              value={widthClass(width)}
              max="100"
            ></progress>
          </div>
        </div>
        <div className="mt-8">
          {iscreateForm && (
            <div>
              <Createcourseform
                created={handleIscredentials}
                // initialData={formData.createForm}
                initialData={courseData || {}}
              />
            </div>
          )}
          {isCredentials && (
            <div>
              <div className="mb-4">
                <button
                  onClick={() => goToStep("create")}
                  className="px-6 py-2 bg-gray-200 rounded-md text-gray-700 hover:bg-gray-300 transition-colors"
                >
                  ← Back to Create Course
                </button>
              </div>
              <CredentialsForms
                created={handleIsModule}
                initialCourseId={initialCourseId || 0}
                initialData={courseRequirements || {}}
              />
            </div>
          )}
          {ismodule && (
            <div>
              <div className="mb-4">
                <button
                  onClick={() => goToStep("credentials")}
                  className="px-6 py-2 bg-gray-200 rounded-md text-gray-700 hover:bg-gray-300 transition-colors"
                >
                  ← Back to Credentials
                </button>
              </div>
              <CourseBuilder
                created={handlePublish}
                CreatedNewItem={CreatedNewItem}
                Initialmodules={modules || []}
                Initiallessons={lessons || []}
                InitialQuiz={quiz || []}
              />
            </div>
          )}
        </div>
        <CourseCreatedModal isOpen={ispublished} closeModal={handleclose} />
      </div>
    </DashboardArea>
  );
};

export default CreateCourse;
