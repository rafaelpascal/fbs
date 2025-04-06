import { useEffect, useState } from "react";
import { CiCalendar } from "react-icons/ci";
import { FaArrowLeftLong } from "react-icons/fa6";
import { TbDeviceTabletSearch } from "react-icons/tb";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { CourseServices } from "~/api/course";
import SendMessageModal from "~/components/Modal/SendMessageModal";
import { WarningModal } from "~/components/Modal/WarningModal";
import { LoadingSpinner } from "~/components/ui/loading-spinner";
import { useTheme } from "~/context/theme-provider";
import useToast from "~/hooks/useToast";
import { DashboardArea } from "~/layouts/DashboardArea";
import { cn } from "~/utils/helpers";

const CourseApplications = () => {
  const { applicationId } = useParams();
  const navigate = useNavigate();
  const [accepting, setAccepting] = useState(false);
  const [isSendMessage, setIsSendMessage] = useState({
    status: false,
    id: 0,
  });
  const [isFeching, setisFeching] = useState(false);
  const { success, error } = useToast();
  const [applicationStatus, setApplicationStatus] = useState(0);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handlePreview = (url: string) => {
    setPreviewUrl(url);
    setIsPreviewOpen(true);
  };

  const closePreview = () => {
    setIsPreviewOpen(false);
    setPreviewUrl(null);
  };

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
    setIsSendMessage({
      status: false,
      id: 0,
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
    setisFeching(true);
    try {
      if (applicationId) {
        const payload = { applicationid: applicationId };
        const res = await CourseServices.fetchSingleApplication(payload);
        setApplicationStatus(res.data.data[0].application_status);
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
              key: "Curriculum Vitae",
              value: data.cv || "N/A",
              icon: TbDeviceTabletSearch,
            },
            {
              key: "Diploma Certificate",
              value: data.diplomaCertificate || "N/A",
              icon: TbDeviceTabletSearch,
            },
          ];
          setisFeching(false);
          setApplicationData(formattedData);
        } else {
          console.log("No data found for this application ID.");
        }
      } else {
        console.log("No application ID set.");
      }
    } catch (error) {
      setisFeching(false);
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
      setIsSendMessage({
        status: true,
        id: 1,
      });
      setAccepting(false);
    } catch (err) {
      error("Failed to reject Application|");
      setAccepting(false);
      console.log(err);
    }
  };

  const handleSubmit = () => {
    setIsSendMessage({
      status: false,
      id: 0,
    });
    success("Application accepted!");
    setTimeout(() => {
      navigate(`/admin/admission/application`);
    }, 2000);
  };

  const handleGoback = () => {
    navigate(`/admin/admission/application`);
  };

  return (
    <DashboardArea>
      <ToastContainer />
      <div className="flex justify-between items-center">
        <div className="flex flex-col lg:flex-row justify-start items-start lg:items-center gap-2">
          <button
            onClick={handleGoback}
            className="flex justify-between items-center gap-2 p-2 rounded-md bg-[#F01E00]"
          >
            <FaArrowLeftLong className="size-4 text-white" />
            <p className="font-DMSans font-normal text-[16px] text-white">
              Back
            </p>
          </button>
          <h2 className="font-DMSans font-semibold text-[18px]">
            STUDENT APPLICATION REVIEW
          </h2>
        </div>
        {applicationStatus === 2 && (
          <div>
            <h2 className="font-DMSans font-semibold text-[18px] text-green-500">
              Accepted
            </h2>
          </div>
        )}
        {applicationStatus === 3 && (
          <div>
            <h2 className="font-DMSans font-semibold text-[18px] text-red-500">
              Rejected
            </h2>
          </div>
        )}
        {applicationStatus === 1 && (
          <div>
            <h2 className="font-DMSans font-semibold text-[18px] text-yellow-500">
              Pending
            </h2>
          </div>
        )}
      </div>
      <div
        className={cn(
          "p-4 lg:p-8 border-[0.5px] border-[#ddd] h-[650px] mt-4 scrollbar-style overflow-y-auto shadow-lg rounded-md",
          theme === "dark" ? "bg-[#333]" : "bg-[#e5e5e5]"
        )}
      >
        {isFeching ? (
          <div className="w-full h-full justify-center flex items-center">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
            {application.map((app, index) => (
              <div key={index} className="w-full">
                <h2 className="font-DMSans text-[21px] font-semibold text-left">
                  {app.key}
                </h2>
                <div
                  className={cn(
                    "w-full rounded-md mt-3 shadow-md border-[0.5px] border-[#ddd] flex flex-col justify-start items-left p-4",
                    theme === "dark" ? "bg-[#333]" : "bg-[#fff]"
                  )}
                >
                  {app.key.includes("Certificate") ||
                  app.key.includes("Curriculum Vitae") ? (
                    <>
                      {app.value && app.value !== "N/A" ? (
                        <>
                          <div className=" flex justify-center items-center">
                            <p className="font-DMSans truncate text-[18px] font-semibold text-left">
                              {app.value}
                            </p>
                            <button onClick={() => handlePreview(app.value)}>
                              <TbDeviceTabletSearch className="size-8" />
                            </button>
                          </div>
                        </>
                      ) : (
                        <p className="font-bold text-red-500">
                          No certificate uploaded
                        </p>
                      )}
                    </>
                  ) : (
                    <p className="font-DMSans truncate text-[18px] font-semibold text-left">
                      {app.value}
                    </p>
                  )}
                </div>
              </div>
            ))}

            {/* Modal for Document Preview */}
            {isPreviewOpen && previewUrl && (
              <div className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-5 rounded-md shadow-lg min-w-[80%] h-[80%] relative">
                  <button
                    onClick={closePreview}
                    className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-md"
                  >
                    Close
                  </button>
                  {previewUrl.endsWith(".pdf") ? (
                    <iframe src={previewUrl} className="w-full h-full" />
                  ) : (
                    <img
                      src={previewUrl}
                      alt="Document Preview"
                      className="w-full h-auto rounded-md"
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        )}
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
      <SendMessageModal
        isOpen={isSendMessage.status}
        id={isSendMessage.id}
        closeModal={handleClose}
        handleSubmit={handleSubmit}
      />
    </DashboardArea>
  );
};

export default CourseApplications;
