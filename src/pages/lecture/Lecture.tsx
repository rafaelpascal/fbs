import { DashboardArea } from "~/layouts/DashboardArea";
import { GrLinkPrevious, GrLinkNext } from "react-icons/gr";
import { HiOutlineHandThumbUp, HiOutlineHandThumbDown } from "react-icons/hi2";
import { HiDotsHorizontal } from "react-icons/hi";
const lectureItems = {
  title: "Introduction to Business consulting And Strategy",
  videoSrc: "https://www.w3schools.com/html/mov_bbb.mp4",
};
const Lecture = () => {
  return (
    <DashboardArea>
      <div>
        <video width="100%" height="20%" controls>
          <source src={lectureItems.videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="flex justify-between items-center py-2 border-b-[2px] border-[#ddd] mb-2">
          <h2 className="text-[18px] font-DMSans font-semibold text-left">
            {lectureItems.title}
          </h2>
          <div className="flex justify-end items-center gap-4">
            <button>
              <HiOutlineHandThumbUp className="hover:text-[#FF1515] text-[22px]" />
            </button>
            <button>
              <HiOutlineHandThumbDown className="hover:text-[#FF1515] text-[22px]" />
            </button>
            <button>
              <HiDotsHorizontal className="text-[#1B1919] text-[22px]" />
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <button className="bg-[#656565] rounded-md flex justify-center gap-8 items-center p-2">
            <GrLinkPrevious className="text-[20px] font-DMSans font-semibold text-[#fff]" />
            <p className="text-[20px] font-DMSans font-semibold text-[#fff]">
              PREVIOUS{" "}
            </p>
          </button>
          <button className="bg-[#FF1515] rounded-md flex justify-center gap-8 items-center p-2">
            <p className="text-[20px] font-DMSans font-semibold text-[#fff]">
              NEXT{" "}
            </p>
            <GrLinkNext className="text-[20px] font-DMSans font-semibold text-[#fff]" />
          </button>
        </div>
      </div>
    </DashboardArea>
  );
};

export default Lecture;
