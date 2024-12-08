import { DashboardArea } from "~/layouts/DashboardArea";
import { BsAward } from "react-icons/bs";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";

const LectureComplete = () => {
  return (
    <DashboardArea>
      <h2 className="text-[22px] mb-4 font-DMSans font-semibold text-[#6440FB] ">
        LESSON COMPLETED
      </h2>
      <div className="w-full shadow-md">
        <div className="h-[190px] w-full bg-[#585757] px-4 flex justify-start items-center rounded-t-lg">
          <h2 className="text-[30px] lg:text-[65px] font-DMSans font-semibold text-white ">
            Congratulations!
          </h2>
        </div>
        <div className="w-full p-10 rounded-b-lg bg-white">
          <div className="w-full flex justify-between items-center flex-col lg:flex-row">
            <div className="w-full flex justify-start items-center gap-4 lg:w-[640px]">
              <h2 className="text-[35px] font-DMSans font-semibold">
                You've successfully completed this lesson and earned a reward!
              </h2>
              <BsAward className="text-[155px]" />
            </div>
            <div className="flex flex-col justify-center items-center">
              <h2 className="text-[90px] font-DMSans font-semibold">2</h2>
              <p className="text-[28px] font-DMSans font-semibold">
                Points earned
              </p>
            </div>
          </div>
          <p className="text-[20px] mt-5 italic text-[#FF5050] font-DMSans font-semibold">
            You can always go back to re-take these lessons.
          </p>
        </div>
      </div>
      <div className="flex justify-between mt-7 items-center">
        <button className="bg-[#656565] rounded-md flex justify-center gap-8 items-center p-2">
          <GrLinkPrevious className="text-[20px] font-DMSans font-semibold text-[#fff]" />
          <p className="text-[20px] font-DMSans font-semibold text-[#fff]">
            PREVIOUS
          </p>
        </button>
        <button className="bg-[#FF1515] rounded-md flex justify-center gap-8 items-center p-2">
          <p className="text-[20px] font-DMSans font-semibold text-[#fff]">
            NEXT
          </p>
          <GrLinkNext className="text-[20px] font-DMSans font-semibold text-[#fff]" />
        </button>
      </div>
    </DashboardArea>
  );
};

export default LectureComplete;
