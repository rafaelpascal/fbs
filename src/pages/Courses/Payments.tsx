import { useCallback, useState, useEffect } from "react";

// import { useDispatch } from "react-redux";
// import { useParams } from "react-router-dom";
import { cn } from "~/utils/helpers";
import { useTheme } from "~/context/theme-provider";
import { DashboardArea } from "~/layouts/DashboardArea";
import { CourseServices } from "~/api/course";
import OnlinePaymentsTable from "~/components/Payments/OnlinePaymentsTable";
import ManualPaymentsTable from "~/components/Payments/ManualPaymentsTable";

// type ProgramSpecification = {
//   title: string;
//   duration: string | null;
// };

// const PaymentPlan = [
//   { label: "Full Payment", value: 1 },
//   { label: "Installment", value: 2 },
// ];

const Payments = () => {
  // const dispatch = useDispatch();
  // const { id } = useParams();
  const { theme } = useTheme();
  const [listOfPayments, setListOfPayments] = useState([
    {
      amountPaid: 1000,
      application_id: 1,
      balance: 0,
      bankInfo: "NA",
      courseTitle:
        "Professional Certificate in Export Business And International Trade",
      datePaid: "2025-02-13T14:11:22.000Z",
      fullname: "Stephen Michael",
      paymentMode: "Manual Payment",
      paymentStatus: "Paid",
      payment_id: 1,
      phone_number: "+2347035957197",
      programmeType: "Professional Certific",
    },
  ]);
  const [activeState, setActiveState] = useState("OPayment");

  // Function to determine NavLink className
  const getNavLinkClassName = useCallback(
    (state: "OPayment" | "MPayment") => {
      const baseClasses =
        "text-[20px] h-[24px] w-auto px-2 flex justify-center items-center rounded-[4px] font-DMSans font-normal py-4 cursor-pointer";
      return activeState === state
        ? `${baseClasses} bg-[#FF3B30] text-[#FFFFFF]`
        : `${baseClasses} bg-transparent text-[#8F94A8]`;
    },
    [activeState]
  );

  const fetchApplicationPayments = async () => {
    try {
      const res = await CourseServices.getApplicationPayments();
      if (res.data && res.data.data && res.data.data.length > 0) {
        console.log(res.data.data);
        setListOfPayments(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching application Payments:", error);
    }
  };
  useEffect(() => {
    fetchApplicationPayments();
  }, []);

  return (
    <DashboardArea>
      <div
        className={cn(
          "w-full z-0 mt-6 pt-[16px] shadow-lg rounded-[8px]",
          theme === "dark" ? "bg-[#333]" : "bg-[#fff]"
        )}
      >
        <div className="w-auto mb-4 mx-4 overflow-x-auto border-[1px] border-[#F4F5F8] rounded-[8px] p-2 flex justify-start items-center gap-3">
          <div
            onClick={() => setActiveState("OPayment")}
            className={getNavLinkClassName("OPayment")}
          >
            {/* Online  */}Payments
          </div>
          {/* <div
            onClick={() => setActiveState("MPayment")}
            className={getNavLinkClassName("MPayment")}
          >
            Manual Payments
          </div> */}
        </div>
        <div className="p-4">
          {activeState === "OPayment" ? (
            <OnlinePaymentsTable data={listOfPayments} />
          ) : (
            <ManualPaymentsTable />
          )}
        </div>
      </div>
    </DashboardArea>
  );
};

export default Payments;
