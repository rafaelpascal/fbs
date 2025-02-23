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

  const handleIscredentials = () => {
    handleChangeWidth(40);
    setiscreateForm(false);
    setisCredentials(true);
  };

  const handleIsModule = () => {
    handleChangeWidth(70);
    setiscreateForm(false);
    setisCredentials(false);
    setModule(true);
  };
  const handlePublish = () => {
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
            <h2 className="font-DMSans font-semibold min-w-[200px] text-[18px]">
              CREATE COURSE
            </h2>
            <h2 className="font-DMSans font-semibold min-w-[200px] text-[18px]">
              CREDENTIALS/FORM
            </h2>
            <h2 className="font-DMSans font-semibold min-w-[200px] text-[18px]">
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
              <Createcourseform created={handleIscredentials} />
            </div>
          )}
          {isCredentials && (
            <div>
              <CredentialsForms created={handleIsModule} />
            </div>
          )}
          {ismodule && (
            <div>
              <CourseBuilder created={handlePublish} />
            </div>
          )}
        </div>
        <CourseCreatedModal isOpen={ispublished} closeModal={handleclose} />
      </div>
    </DashboardArea>
  );
};

export default CreateCourse;
