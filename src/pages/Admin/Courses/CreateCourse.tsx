import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "~/components/constants/routes";
import { CourseCreatedModal } from "~/components/Modal/CourseCreatedModal";
import CourseBuilder from "~/feature/admin/CourseBuilder";
import Createcourseform from "~/feature/admin/Createcourseform";
import CredentialsForms from "~/feature/admin/CredentialsForms";
import { DashboardArea } from "~/layouts/DashboardArea";

const CreateCourse = () => {
  const navigate = useNavigate();
  const [width, setWidth] = useState(10);
  const [iscreateForm, setiscreateForm] = useState(true);
  const [isCredentials, setisCredentials] = useState(false);
  const [ismodule, setModule] = useState(false);
  const [ispublished, setIspublished] = useState(false);

  const [formData, setFormData] = useState({
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
                initialData={formData.createForm}
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
                initialData={formData.credentials}
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
                initialData={formData.courseBuilder}
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
