import { useState } from "react";
import Createcourseform from "~/feature/admin/Createcourseform";
import { DashboardArea } from "~/layouts/DashboardArea";

const CreateCourse = () => {
  const [width] = useState(10);

  // const handleChangeWidth = (newWidth: number) => {
  //   setWidth(newWidth);
  // };

  const widthClass = (width: number) => {
    const classes: Record<string, string> = {
      10: "10",
      40: "40",
      70: "70",
      100: "100",
    };

    return classes[width] || "w-10";
  };

  return (
    <DashboardArea>
      <div>
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-DMSans font-semibold text-[18px]">
            CREATE COURSE
          </h2>
          <h2 className="font-DMSans font-semibold text-[18px]">
            CREDENTIALS/FORM
          </h2>
          <h2 className="font-DMSans font-semibold text-[18px]">
            COURSE BUILDER
          </h2>
          <h2 className="font-DMSans font-semibold text-[18px]">PUBLISH</h2>
        </div>
        <div className="w-full bg-[#ddd] flex justify-start rounded-md items-start">
          <progress
            className="progress progress-error w-100"
            value={widthClass(width)}
            max="100"
          ></progress>
        </div>
        <div>
          <div>
            <Createcourseform />
          </div>
          {/* <button
            onClick={() => handleChangeWidth(40)}
            className="btn btn-primary"
          >
            Set Width to 40
          </button>
          <button
            onClick={() => handleChangeWidth(70)}
            className="btn btn-primary"
          >
            Set Width to 60
          </button>
          <button
            onClick={() => handleChangeWidth(100)}
            className="btn btn-primary"
          >
            Set Width to 100
          </button> */}
        </div>
      </div>
    </DashboardArea>
  );
};

export default CreateCourse;
