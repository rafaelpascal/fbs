import { DashboardArea } from "~/layouts/DashboardArea";
import { GrLinkPrevious, GrLinkNext } from "react-icons/gr";
import { HiOutlineHandThumbUp, HiOutlineHandThumbDown } from "react-icons/hi2";
const lectureItems = {
  title: "Introduction to Business consulting And Strategy",
  videoSrc: "https://www.w3schools.com/html/mov_bbb.mp4",
};
const WordLecture = () => {
  return (
    <DashboardArea>
      <div>
        <div className="w-full h-[679px] overflow-y-auto p-10 items-center bg-white">
          <iframe
            src="https://docs.google.com/gview?url=https://file-examples.com/storage/fe65b1c3d0b374e2ab2b24a/2017/02/file-sample_100kB.docx&embedded=true"
            className="w-full h-full"
            frameBorder="0"
          />
        </div>
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

export default WordLecture;
