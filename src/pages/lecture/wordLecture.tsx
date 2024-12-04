import { DashboardArea } from "~/layouts/DashboardArea";
import { GrLinkPrevious, GrLinkNext } from "react-icons/gr";
import { HiOutlineHandThumbUp, HiOutlineHandThumbDown } from "react-icons/hi2";
import { useEffect, useRef, useState } from "react";
import pdffile from "../../assets/pdf/Teaching Excellence Guide.pdf";
import PdfViewer from "~/components/Collapsible/pdfViewer";
import { HiDotsHorizontal } from "react-icons/hi";
import { GoScreenFull } from "react-icons/go";
const lectureItems = {
  title: "Introduction to Business consulting And Strategy",
  videoSrc: "https://www.w3schools.com/html/mov_bbb.mp4",
};

const WordLecture = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const pdfViewerRef = useRef<any>(null);

  const handleNextPage = () => {
    if (pdfViewerRef.current) {
      pdfViewerRef.current.goToNextPage();
      setCurrentPage(pdfViewerRef.current.getCurrentPageNumber());
    }
  };

  const handlePrevPage = () => {
    if (pdfViewerRef.current) {
      pdfViewerRef.current.goToPrevPage();
      setCurrentPage(pdfViewerRef.current.getCurrentPageNumber());
    }
  };

  useEffect(() => {
    if (pdfViewerRef.current) {
      setTotalPages(pdfViewerRef.current.getTotalPages());
    }
  }, [pdfViewerRef.current]);

  const handleFullscreenToggle = () => {
    if (pdfViewerRef.current) {
      pdfViewerRef.current.toggleFullscreen(); // Call the toggleFullscreen method from PdfViewer
    }
  };

  return (
    <DashboardArea>
      <div>
        <div className="w-full bg-white p-4">
          <div className="w-full flex justify-center items-center bg-white">
            <PdfViewer ref={pdfViewerRef} file={pdffile} />
          </div>
          <div className="w-full flex justify-end items-center">
            <button onClick={handleFullscreenToggle} className="">
              <GoScreenFull className="text-[#757575] text-[45px]" />
            </button>
          </div>
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
            <button>
              <HiDotsHorizontal className="text-[#1B1919] text-[22px]" />
            </button>
          </div>
        </div>

        <div className="flex justify-between mt-8 items-center">
          <button
            className="bg-[#656565] rounded-md flex justify-center gap-4 items-center p-2 text-sm sm:text-base"
            onClick={handlePrevPage}
          >
            <GrLinkPrevious className="text-[16px] sm:text-[20px] text-white" />
            <p className="text-white font-semibold">PREVIOUS</p>
          </button>
          <p className="text-[20px] font-DMSans font-semibold text-center">
            {currentPage}/{totalPages}
          </p>
          <button
            className="bg-[#FF1515] rounded-md flex justify-center gap-4 items-center p-2 text-sm sm:text-base"
            onClick={handleNextPage}
          >
            <p className="text-white font-semibold">NEXT</p>
            <GrLinkNext className="text-[16px] sm:text-[20px] text-white" />
          </button>
        </div>
      </div>
    </DashboardArea>
  );
};

export default WordLecture;
