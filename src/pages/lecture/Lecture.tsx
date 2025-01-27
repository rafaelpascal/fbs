import { DashboardArea } from "~/layouts/DashboardArea";
import { GrLinkPrevious, GrLinkNext } from "react-icons/gr";
import { HiOutlineHandThumbUp, HiOutlineHandThumbDown } from "react-icons/hi2";
import { HiDotsHorizontal } from "react-icons/hi";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { useEffect, useRef, useState } from "react";
import { CourseServices } from "~/api/course";
import { useSidebar } from "~/context/Sidebar_Provider";
import { FaDotCircle, FaFilePdf, FaPlayCircle, FaVideo } from "react-icons/fa";
import PdfViewer from "~/components/Collapsible/pdfViewer";

const Lecture = () => {
  const { sidebarData, updateSidebarData } = useSidebar();
  const [currentPage] = useState<number>(1);
  const [lectureTitles, setlectureTitles] = useState<string[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const { id } = useParams<{ id: string }>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const pdfViewerRef = useRef<any>(null);

  // const handleNextPage = () => {
  //   if (pdfViewerRef.current) {
  //     pdfViewerRef.current.goToNextPage();
  //     setCurrentPage(pdfViewerRef.current.getCurrentPageNumber());
  //   }
  // };

  // const handlePrevPage = () => {
  //   if (pdfViewerRef.current) {
  //     pdfViewerRef.current.goToPrevPage();
  //     setCurrentPage(pdfViewerRef.current.getCurrentPageNumber());
  //   }
  // };

  useEffect(() => {
    if (pdfViewerRef.current) {
      setTotalPages(pdfViewerRef.current.getTotalPages());
    }
  }, [pdfViewerRef.current]);

  // const handleFullscreenToggle = () => {
  //   if (pdfViewerRef.current) {
  //     pdfViewerRef.current.toggleFullscreen(); // Call the toggleFullscreen method from PdfViewer
  //   }
  // };

  // const handlesubmit = () => {
  //   navigate(ROUTES.LECTURECOMPLETE);
  // };

  const fetLessons = async () => {
    const payload = {
      moduleid: JSON.parse(id ?? ""),
    };
    const res = await CourseServices.lessonsByModuleId(payload);
    setlectureTitles(res.data.course_lessons);
  };

  const updateLecture = () => {
    const updatedData = [...sidebarData];

    updatedData.forEach((lesson) => {
      if (lesson.children) {
        lesson.children = lectureTitles.map((lessonItem: any) => ({
          href: `/lecture/${lessonItem.module_id}`, // Dynamic href based on module_id
          icon: FaDotCircle,
          dropdown: true,
          text: lessonItem.lesson_title, // Use lesson_title as text
          children: [
            {
              href:
                lessonItem.upload_pdf !==
                "https://api.fordaxbschool.com/assets/courses/null"
                  ? lessonItem.upload_pdf
                  : "#",
              icon: FaFilePdf,
              dropdown: false,
              text: "PDF",
            },
            {
              href:
                lessonItem.upload_video_audio !==
                "https://api.fordaxbschool.com/assets/courses/null"
                  ? lessonItem.upload_video_audio
                  : "#",
              icon: FaVideo,
              dropdown: false,
              text: "Video/Audio",
            },
            {
              href: lessonItem.stream_video_audio
                ? lessonItem.stream_video_audio
                : "#",
              icon: FaPlayCircle,
              dropdown: false,
              text: "Stream",
            },
          ],
        }));
      }
    });

    updateSidebarData(updatedData);
  };

  useEffect(() => {
    updateLecture();
  }, [id, lectureTitles]);

  useEffect(() => {
    fetLessons();
  }, [id]);

  const mediaItems = lectureTitles.map((lesson: any) => ({
    title: lesson.lesson_title,
    media: [
      lesson.upload_pdf,
      lesson.upload_video_audio,
      lesson.stream_video_audio,
      lesson.upload_text,
    ].filter(
      (item) =>
        item && item !== "https://api.fordaxbschool.com/assets/courses/null"
    ),
  }));

  const allMediaUrls = mediaItems.flatMap((item) => item.media);

  const handlePrevious = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleNext = () => {
    if (currentIndex < allMediaUrls.length - 1)
      setCurrentIndex(currentIndex + 1);
  };

  return (
    <DashboardArea>
      <div>
        {mediaItems.length > 0 && (
          <>
            <div className="mb-8">
              {allMediaUrls.map((media, idx) => {
                if (media.endsWith(".pdf")) {
                  return (
                    <div
                      key={idx}
                      className={`w-full flex justify-center items-center bg-white ${
                        idx === currentIndex ? "block" : "hidden"
                      }`}
                    >
                      <PdfViewer ref={pdfViewerRef} file={media} />
                      {/* <iframe
                        src={`https://docs.google.com/gview?url=${encodeURIComponent(
                          media
                        )}&embedded=true`}
                        width="100%"
                        height="600px"
                        className="border rounded-md shadow-lg"
                      /> */}
                    </div>
                  );
                } else if (media.includes("youtube.com")) {
                  return (
                    <div
                      key={idx}
                      style={{
                        maxWidth: "100%",
                        position: "relative",
                        paddingTop: "56.25%",
                      }}
                      className={idx === currentIndex ? "block" : "hidden"}
                    >
                      <ReactPlayer
                        url={media}
                        controls
                        width="100%"
                        height="100%"
                        style={{ position: "absolute", top: 0, left: 0 }}
                      />
                    </div>
                  );
                }
                return null;
              })}
            </div>

            <div className="flex justify-between items-center py-2 border-b-[2px] border-[#ddd] mb-2">
              {/* <h2 className="text-[18px] font-DMSans font-semibold text-left">
                {mediaItems.length > 0
                  ? mediaItems[currentIndex].title
                  : "No Content"}
              </h2> */}
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
            <div className="flex justify-between flex-row flex-wrap items-center">
              <button
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className={`rounded-md flex justify-center gap-8 items-center p-2 ${
                  currentIndex === 0 ? "bg-gray-400" : "bg-[#656565]"
                }`}
              >
                <GrLinkPrevious className="text-[20px] font-DMSans font-semibold text-[#fff]" />
                <p className="text-[20px] font-DMSans font-semibold text-[#fff]">
                  PREVIOUS
                </p>
              </button>
              <div>
                {currentPage} of {totalPages}
              </div>
              <button
                onClick={handleNext}
                // disabled={currentIndex === mediaItems.length - 1}
                className={`rounded-md flex justify-center gap-8 items-center p-2 ${
                  currentIndex === allMediaUrls.length - 1
                    ? "bg-gray-400"
                    : "bg-[#FF1515]"
                }`}
              >
                <p className="text-[20px] font-DMSans font-semibold text-[#fff]">
                  NEXT
                </p>
                <GrLinkNext className="text-[20px] font-DMSans font-semibold text-[#fff]" />
              </button>
            </div>
          </>
        )}
      </div>
    </DashboardArea>
  );
};

export default Lecture;
