import { useState } from "react";
import { CiCalendar } from "react-icons/ci";
import { TbDeviceTabletSearch } from "react-icons/tb";
import { WarningModal } from "~/components/Modal/WarningModal";
import { useTheme } from "~/context/theme-provider";
import { DashboardArea } from "~/layouts/DashboardArea";
import { cn } from "~/utils/helpers";

const applicationInfo = [
  {
    key: "firstname",
    value: "Samuel",
  },
  {
    key: "Last name/Surname",
    value: "Samuel",
  },
  {
    key: "Email Address",
    value: "Samuel984@gmail.com ",
  },
  {
    key: "Phone number",
    value: "Samuel984@gmail.com ",
  },
  {
    phone: "NGN",
    key: "Call phone line ",
    value: "07035957197",
  },
  {
    phone: "NGN",
    key: "WhatsApp",
    value: "07035957197",
  },
  {
    key: "Residential Address ",
    value: "07035957197",
  },
  {
    key: "Country",
    value: "NIGERIA",
  },
  {
    key: "Sate",
    value: "IMO",
  },
  {
    key: "Date of birth",
    value: "02/12/1990",
    icon: CiCalendar,
  },
  {
    key: "Gender",
    value: "Male",
  },
  {
    key: "O'Level Certificate",
    value: "Preview students document",
    icon: TbDeviceTabletSearch,
  },
  {
    key: "Diploam Certificate",
    value: "Preview students document",
    icon: TbDeviceTabletSearch,
  },
];

const CourseApplications = () => {
  const [isReject, setisReject] = useState({
    id: "",
    status: false,
    message: "",
  });
  const { theme } = useTheme();

  const handleClose = () => {
    setisReject({
      id: "",
      status: false,
      message: "",
    });
  };
  const handleReject = () => {
    setisReject({
      id: "askas",
      status: true,
      message: "Are you sure you want to reject this application? ",
    });
  };
  return (
    <DashboardArea>
      <h2 className="font-DMSans font-semibold text-[18px]">
        STUDENT APPLICATION REVIEW
      </h2>
      <div
        className={cn(
          "p-8 border-[0.5px] border-[#ddd] h-[650px] mt-4 scrollbar-style overflow-y-auto shadow-lg rounded-md",
          theme === "dark" ? "bg-[#333]" : "bg-[#e5e5e5]"
        )}
      >
        <div className="w-full grid grid-cols-2 gap-4">
          {applicationInfo.map((app, index) => (
            <div key={index} className="w-full">
              <h2 className="font-DMSans text-[21px] font-semibold text-left">
                {app.key}
              </h2>
              <div
                className={cn(
                  "w-full rounded-md mt-3 shadow-md border-[0.5px] border-[#ddd] flex justify-between items-center p-4",
                  theme === "dark" ? "bg-[#333]" : "bg-[#fff]",
                  app.phone && "flex gap-4 justify-start items-center"
                )}
              >
                {app.phone && (
                  <p className="font-DMSans text-[18px] font-semibold text-left">
                    {app.phone}
                  </p>
                )}
                <p className="font-DMSans text-[18px] font-semibold text-left">
                  {app.value}
                </p>
                {app.icon && (
                  <app.icon className={cn("bg-transparent text-[24px]")} />
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-start items-center gap-4 mt-4">
          <button className="w-full lg:w-[331px] py-4 rounded-md bg-[#6440FB]">
            <p className="font-DMSans text-[18px] font-semibold text-center text-[#fff]">
              Accept application
            </p>
          </button>
          <button
            onClick={handleReject}
            className="w-full lg:w-[331px] py-4 rounded-md bg-[#F01E00]"
          >
            <p className="font-DMSans text-[18px] font-semibold text-center text-[#fff]">
              Reject application
            </p>
          </button>
        </div>
      </div>
      <WarningModal
        id={isReject.id}
        isOpen={isReject.status}
        message={isReject.message}
        closeModal={handleClose}
      />
    </DashboardArea>
  );
};

export default CourseApplications;
