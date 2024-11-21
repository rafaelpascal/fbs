// import React from "react";

import { DashboardArea } from "~/layouts/DashboardArea";
import Collapsible from "~/components/Collapsible/Collapsible";
import { BaseButton } from "~/components/buttons/BaseButton";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "~/components/constants/routes";

const programSpecifications = [
  {
    title: "Format",
    duration: "Hybrid",
  },
  {
    title: "Starting",
    duration: "February 12",
  },
  {
    title: "Cohort",
    duration: "1/Dec 2025",
  },
  {
    title: "Application Date",
    duration: "March 23 2025",
  },
  {
    title: "Ending",
    duration: "March 23 2025",
  },
  {
    title: "Duration",
    duration: "6 week (s)",
  },
];

const Dashboard = () => {
  const navigate = useNavigate();

  const handlePayment = () => {
    navigate(ROUTES.PAYMENT);
  };
  return (
    <DashboardArea>
      <Collapsible title="My Enrollments" initialState={true}>
        <div className="w-full flex justify-center items-center">
          <div className=" lg:w-[90%]">
            <p className="text-[#000000] text-left font-DMSans text-[20px] font-semibold">
              Professional Certificate in Communication And Public Relations
            </p>
            <div className="w-full my-4 flex justify-center items-center">
              <div className="w-full my-4 grid grid-cols-1 sm:grid-cols-3">
                {programSpecifications.map((specifications, index) => (
                  <div
                    key={index}
                    className="flex justify-start items-center gap-2"
                  >
                    <p className="text-[#5D5C5D] text-[18px] font-semibold font-DMSans">
                      {specifications.title}
                    </p>
                    <p className="text-[#5D5C5D] text-[18px] font-normal font-DMSans">
                      {specifications.duration}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col lg:flex-row justify-between items-center">
              <div className="flex w-full justify-start items-center gap-2">
                <p className="text-[#000000] text-center font-DMSans text-[20px] font-semibold">
                  Application status:
                </p>
                <span className="text-[#158608] font-DMSans text-[24px] font-semibold">
                  Accepted
                </span>
              </div>
              <BaseButton
                containerCLassName={`mt-4 h-[49px] w-full lg:w-[280px] rounded-[8px] bg-[#FF3B30] text-[16px] font-bold font-DMSans text-[#fff] `}
                hoverScale={1.01}
                hoverOpacity={0.8}
                tapScale={0.9}
                onClick={handlePayment}
              >
                <p>Proceed with payment</p>
              </BaseButton>
            </div>
          </div>
        </div>
      </Collapsible>
    </DashboardArea>
  );
};

export default Dashboard;
