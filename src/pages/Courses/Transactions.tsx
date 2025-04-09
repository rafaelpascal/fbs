import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CourseServices } from "~/api/course";
import { BaseButton } from "~/components/buttons/BaseButton";
import TransactionCard from "~/components/cards/TransactionCard";
import Collapsible from "~/components/Collapsible/Collapsible";
import { ROUTES } from "~/components/constants/routes";
import { LoadingSpinner } from "~/components/ui/loading-spinner";
import { DashboardArea } from "~/layouts/DashboardArea";

const TransactionsArray = [
  {
    title: "Diploma in Business Admi...",
    price: "105,000",
    installment: "3 Months",
    issueDate: "October 5th 2024",
    amount: "N55,000",
    paid: true,
    datePaid: "Nov 5th 2024",
  },
  {
    title: "Diploma in Business Admi...",
    price: "105,000",
    installment: "3 Months",
    issueDate: "October 5th 2024",
    amount: "N55,000",
    paid: false,
    datePaid: "Nov 5th 2024",
  },
  {
    title: "Diploma in Business Admi...",
    price: "105,000",
    installment: "3 Months",
    issueDate: "October 5th 2024",
    amount: "N55,000",
    paid: true,
    datePaid: "Nov 5th 2024",
  },
  {
    title: "Diploma in Business Admi...",
    price: "105,000",
    installment: "3 Months",
    issueDate: "October 5th 2024",
    amount: "N55,000",
    paid: false,
    datePaid: "Nov 5th 2024",
  },
];

type ProgramSpecification = {
  title: string;
  duration: string | null;
};

const Transactions = () => {
  const [courseTitle, setCourseTitle] = useState("");
  const [programSpecifications, setProgramSpecifications] = useState<
    ProgramSpecification[]
  >([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [enrolled] = useState(location.state?.enrolled || false);

  const handlePayment = () => {
    navigate(ROUTES.PAYMENT);
  };

  const fetchmyapplication = async () => {
    setLoading(true);
    try {
      const payload = {
        userid: 23, // Example user ID
      };
      const res = await CourseServices.fetchApplication(payload);

      if (res.data && res.data.data && res.data.data.length > 0) {
        const application = res.data.data[0];
        setCourseTitle(application.course_title);
        // Map database response to programSpecifications format
        const updatedProgramSpecifications = [
          {
            title: "Format",
            duration: application.course_mode || "N/A",
          },
          {
            title: "Course Starting",
            duration: application.start_date || "N/A",
          },
          {
            title: "Cohort",
            duration: application.cohort || "N/A",
          },
          {
            title: "Application Date",
            duration: application.created_at
              ? new Date(application.created_at).toLocaleDateString()
              : "N/A",
          },
          {
            title: "Course Ending",
            duration: application.end_date || "N/A",
          },
          {
            title: "Duration",
            duration: application.duration
              ? `${application.duration} week(s)`
              : "N/A",
          },
        ];
        // Set the updated programSpecifications to state or use it elsewhere
        setProgramSpecifications(updatedProgramSpecifications);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching application:", error);
    }
  };

  useEffect(() => {
    fetchmyapplication();
  }, []);
  return (
    <DashboardArea>
      <div>
        <Collapsible title="My Enrollments" initialState={false}>
          <div className="w-full flex justify-center items-center">
            <div className=" lg:w-[90%]">
              <p className="text-left capitalize font-DMSans text-[20px] font-semibold">
                {courseTitle}
              </p>
              {loading ? (
                <div className="flex justify-center items-center w-full py-6">
                  <LoadingSpinner size="sm" />
                </div>
              ) : (
                <div className="w-full my-4 flex justify-center items-center">
                  <div className="w-full my-4 grid grid-cols-1 lg:grid-cols-3">
                    {programSpecifications.map((specifications, index) => (
                      <div
                        key={index}
                        className="mx-2 flex flex-row flex-wrap justify-start items-center"
                      >
                        <p className="text-[18px] font-semibold font-DMSans">
                          {specifications.title}
                        </p>
                        {" : "}
                        <p className="text-[18px] capitalize font-normal font-DMSans">
                          {specifications.duration}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="flex flex-col lg:flex-row justify-between items-center">
                <div className="flex w-full justify-start items-center gap-2">
                  <p className="text-center font-DMSans text-[20px] font-semibold">
                    Application status:
                  </p>
                  <span className="text-[#158608] font-DMSans text-[24px] font-semibold">
                    Accepted
                  </span>
                </div>
                {!enrolled && (
                  <BaseButton
                    containerCLassName={`mt-4 h-[49px] w-full lg:w-[280px] rounded-[8px] bg-[#FF3B30] text-[16px] font-bold font-DMSans text-[#fff] `}
                    hoverScale={1.01}
                    hoverOpacity={0.8}
                    tapScale={0.9}
                    onClick={handlePayment}
                  >
                    <p>Proceed with payment</p>
                  </BaseButton>
                )}
              </div>
            </div>
          </div>
        </Collapsible>
        <h2 className="font-DMSans font-semibold text-[25px] my-4">
          Transactions
        </h2>
        <div className="flex justify-between items-start flex-col lg:flex-row flex-wrap w-full gap-2">
          <div className="w-full lg:w-[49%] shadow-md rounded-md border-[0.5px] p-4 border-[#ddd] overflow-y-auto min-h-[600px]">
            <h2 className="font-DMSans font-semibold py-6 capitalize text-[18px]">
              INVOICES
            </h2>
            {TransactionsArray.map((card, index) => (
              <TransactionCard key={index} cards={card} />
            ))}
          </div>
          <div className="w-full lg:w-[49%] shadow-md rounded-md border-[0.5px] p-4 border-[#ddd] overflow-y-auto min-h-[400px]">
            <div className="flex justify-end items-center">
              <button className="font-DMSans font-semibold py-4 capitalize  text-[18px]">
                VIEW ALL
              </button>
            </div>
            <div className="border-b-2 border-[#ddd]">
              <h2 className="font-DMSans font-semibold py-6 capitalize  text-[18px]">
                ACTIVE LESSONS
              </h2>
              <h2 className="font-DMSans font-semibold py-6 capitalize  text-[18px]">
                7 of 28
              </h2>
            </div>
            <div>
              <h2 className="font-DMSans font-semibold py-6 capitalize text-[#FF1515] text-[18px]">
                INACTIVE LESSONS
              </h2>
              <h2 className="font-DMSans font-semibold py-6 capitalize  text-[18px]">
                21
              </h2>
            </div>
          </div>
        </div>
      </div>
    </DashboardArea>
  );
};

export default Transactions;
