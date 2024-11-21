import { BaseButton } from "~/components/buttons/BaseButton";
import { DashboardArea } from "~/layouts/DashboardArea";

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

const Payment = () => {
  return (
    <DashboardArea>
      <div className="bg-[#fff] flex justify-center items-center rounded-[12px] w-full h-full py-12">
        <div className="w-full lg:w-[80%] ">
          <p className="text-[#140342] mb-6 font-DMSans text-[24px] font-semibold">
            Payment
          </p>
          <div className=" lg:w-[90%]">
            <p className="text-[#000000] text-left font-DMSans text-[20px] font-semibold">
              Professional Certificate in Communication And Public Relations
            </p>
            <div className="w-full border-b-2 border-[#7F7F7F] py-10 flex justify-center items-center">
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
            <div className="py-8">
              <p className="text-[#140342] mb-6 font-DMSans text-[24px] font-semibold">
                Chose A Payment Plan
              </p>

              <div className="w-full lg:w-[399px] border-[1px] border-[#000000]"></div>
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
              >
                <p>Proceed with payment</p>
              </BaseButton>
            </div>
          </div>
        </div>
      </div>
    </DashboardArea>
  );
};

export default Payment;
