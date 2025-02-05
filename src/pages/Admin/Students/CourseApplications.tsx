import { useEffect, useState } from "react";
import { CiCalendar } from "react-icons/ci";
import { TbDeviceTabletSearch } from "react-icons/tb";
import { useNavigate, useParams } from "react-router-dom";
import { CourseServices } from "~/api/course";
import { WarningModal } from "~/components/Modal/WarningModal";
import { LoadingSpinner } from "~/components/ui/loading-spinner";
import { useTheme } from "~/context/theme-provider";
import { DashboardArea } from "~/layouts/DashboardArea";
import { cn } from "~/utils/helpers";

const CourseApplications = () => {
  const { applicationId } = useParams();
  const navigate = useNavigate();
  const [accepting, setAccepting] = useState(false);
  interface ApplicationData {
    key: string;
    value: string;
    phone?: string;
    icon?: React.ComponentType;
  }

  const [application, setApplicationData] = useState<ApplicationData[]>([]);
  const [isReject, setisReject] = useState({
    id: 0,
    status: false,
    message: "",
  });
  const { theme } = useTheme();

  const handleClose = () => {
    setisReject({
      id: 0,
      status: false,
      message: "",
    });
  };
  const handleReject = () => {
    setisReject({
      id: Number(applicationId) ?? 0,
      status: true,
      message: "Are you sure you want to reject this application? ",
    });
  };

  const fetchMyApplication = async () => {
    try {
      if (applicationId) {
        const payload = { applicationid: applicationId };
        const res = await CourseServices.fetchSingleApplication(payload);
        if (res.data && res.data.data) {
          const data = res.data.data[0];
          const formattedData = [
            { key: "First Name", value: data.firstname || "N/A" },
            { key: "Last Name/Surname", value: data.lastname || "N/A" },
            { key: "Email Address", value: data.email || "N/A" },
            { key: "Phone Number", value: data.phone || "N/A" },
            { key: "Call Phone Line", value: data.phone || "N/A" },
            { key: "WhatsApp", value: data.whatsapp_phone || "N/A" },
            {
              key: "Residential Address",
              value: data.address || "N/A",
            },
            { key: "Country", value: data.country || "N/A" },
            { key: "State", value: data.state || "N/A" },
            {
              key: "Date of Birth",
              value: data.dob || "N/A",
              icon: CiCalendar,
            },
            { key: "Gender", value: data.gender || "N/A" },
            {
              key: "O'Level Certificate",
              value: data.oLevelCertificate || "N/A",
              icon: TbDeviceTabletSearch,
            },
            {
              key: "Diploma Certificate",
              value: data.diplomaCertificate || "N/A",
              icon: TbDeviceTabletSearch,
            },
          ];

          setApplicationData(formattedData);
        } else {
          console.log("No data found for this application ID.");
        }
      } else {
        console.log("No application ID set.");
      }
    } catch (error) {
      console.error("Error fetching application:", error);
    }
  };

  useEffect(() => {
    if (applicationId) {
      fetchMyApplication();
    }
  }, [applicationId]);

  const handleAccept = async () => {
    setAccepting(true);
    try {
      const payload = {
        applicationid: applicationId,
      };
      await CourseServices.acceptApplication(payload);
      navigate(`/admin/dashboard/application`);
      setAccepting(false);
    } catch (error) {
      setAccepting(false);
      console.log(error);
    }
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
          {application.map((app, index) => (
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
                {app.icon && <app.icon />}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-start items-center gap-4 mt-4">
          <button
            onClick={handleAccept}
            className="w-full flex justify-center items-center gap-2 lg:w-[331px] py-4 rounded-md bg-[#6440FB]"
          >
            <p className="font-DMSans text-[18px] font-semibold text-center text-[#fff]">
              Accept application
            </p>
            {accepting && <LoadingSpinner size="xs" />}
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
