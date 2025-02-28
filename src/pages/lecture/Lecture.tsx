import { DashboardArea } from "~/layouts/DashboardArea";
import { GrLinkPrevious, GrLinkNext } from "react-icons/gr";
import { HiOutlineHandThumbUp, HiOutlineHandThumbDown } from "react-icons/hi2";
import { HiDotsHorizontal } from "react-icons/hi";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { useEffect, useRef, useState } from "react";
import { CourseServices } from "~/api/course";
import { useSidebar } from "~/context/Sidebar_Provider";
import { FaFilePdf } from "react-icons/fa";
// import PdfViewer from "~/components/Collapsible/pdfViewer";
import { SideNavProps } from "~/components/lecturesidebar/LectureItems";
import { GoDotFill } from "react-icons/go";

const Lecture = () => {
  const { updateSidebarData } = useSidebar();
  const [currentPage] = useState<number>(1);
  const [lectureTitles, setlectureTitles] = useState<string[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const { id } = useParams<{ id: string }>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const pdfViewerRef = useRef<any>(null);
  const [currentLessonId, setCurrentLessonId] = useState<string | null>(null);

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
    if (res.data.course_lessons.length > 0) {
      const firstLesson = res.data.course_lessons[0];
      setCurrentLessonId(firstLesson.lessonid);
    }
  };

  const updateLecture = () => {
    if (!lectureTitles.length) return;

    const updatedData: SideNavProps[] = lectureTitles.map(
      (lessonItem: any, index: number) => ({
        href: `/module/${lessonItem.module_id}`,
        icon: FaFilePdf,
        dropdown: true,
        playing: lessonItem.lessonid === currentLessonId,
        text:
          `LESSON ${index + 1}: ${lessonItem.lesson_title}` ||
          "Untitled Lesson",
        children: [
          {
            href: "#",
            icon: GoDotFill,
            dropdown: false,
            text: "Lecture",
          },
          ...(lessonItem.hasQuiz === 1
            ? [
                {
                  href: `/assignment/${lessonItem.lessonid}`,
                  icon: GoDotFill,
                  dropdown: false,
                  text: "Quiz",
                },
              ]
            : []),
          // remember to change to check
          ...(lessonItem.lessonid
            ? [
                {
                  href: `/exam/${lessonItem.lessonid}`,
                  icon: GoDotFill,
                  dropdown: false,
                  text: "Exam",
                },
              ]
            : []),
          // remember to change to check
          ...(lessonItem.lessonid
            ? [
                {
                  href: `/newassignment/${lessonItem.lessonid}`,
                  icon: GoDotFill,
                  dropdown: false,
                  text: "Assignment",
                },
              ]
            : []),
          ...(lessonItem.lessonid
            ? [
                {
                  href: `/polls/${lessonItem.lessonid}`,
                  icon: GoDotFill,
                  dropdown: false,
                  text: "Polls",
                },
              ]
            : []),
          ...(lessonItem.assignment_id
            ? [
                {
                  href: lessonItem.stream_video_audio
                    ? lessonItem.stream_video_audio
                    : "#",
                  icon: GoDotFill,
                  dropdown: false,
                  text: "Assignment",
                },
              ]
            : []),
        ],
      })
    );

    updateSidebarData(updatedData);
  };

  // const updateLecture = () => {
  //   if (!lectureTitles.length) return;

  //   const updatedData: SideNavProps[] = lectureTitles.map(
  //     (lessonItem: any) => ({
  //       href: `/module/${lessonItem.module_id}`,
  //       icon: FaFilePdf,
  //       dropdown: true,
  //       playing: lessonItem.lessonid == currentLessonId,
  //       text: lessonItem.lesson_title || "Untitled Lesson",
  //       children: [
  //         {
  //           href: lessonItem.upload_pdf !== "" ? lessonItem.upload_pdf : "#",
  //           icon: GoDotFill,
  //           dropdown: false,
  //           text: "Lecture",
  //         },
  //         {
  //           href:
  //             lessonItem.upload_video_audio !== ""
  //               ? lessonItem.upload_video_audio
  //               : "#",
  //           icon: GoDotFill,
  //           dropdown: false,
  //           text: "Quiz",
  //         },
  //         {
  //           href: lessonItem.stream_video_audio
  //             ? lessonItem.stream_video_audio
  //             : "#",
  //           icon: GoDotFill,
  //           dropdown: false,
  //           text: "Assignment",
  //         },
  //       ],
  //     })
  //   );

  //   // Update sidebar state with dynamic data
  //   updateSidebarData(updatedData);
  // };

  useEffect(() => {
    updateLecture();
  }, [id, lectureTitles]);

  useEffect(() => {
    fetLessons();
  }, [id]);

  const mediaItems = lectureTitles.flatMap((lesson: any) =>
    [
      lesson.upload_pdf,
      lesson.upload_video_audio,
      lesson.stream_video_audio,
      lesson.upload_text,
    ]
      .filter(
        (item) =>
          item && item !== "https://api.fordaxbschool.com/assets/courses/null"
      )
      .map((media) => ({
        media,
        lessonId: lesson.lessonid,
        title: lesson.lesson_title,
      }))
  );

  const allMediaUrls = mediaItems.map((item) => item.media);

  const handleNext = () => {
    if (currentIndex < allMediaUrls.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      const nextLessonId = mediaItems[nextIndex]?.lessonId;
      console.log(nextLessonId);

      if (nextLessonId) {
        setCurrentLessonId(nextLessonId); // Set only if lessonId exists
      }
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      const prevLessonId = mediaItems[prevIndex]?.lessonId;
      console.log(prevLessonId);
      if (prevLessonId) {
        setCurrentLessonId(prevLessonId); // Set only if lessonId exists
      }
    }
  };

  // const handleNext = () => {
  //   if (currentIndex < allMediaUrls.length - 1) {
  //     const nextIndex = currentIndex + 1;
  //     setCurrentIndex(nextIndex);
  //     setCurrentLessonId(mediaItems[nextIndex]?.lessonId); // ✅ Correctly set the lesson ID
  //   }
  // };

  // const handlePrevious = () => {
  //   if (currentIndex > 0) {
  //     const prevIndex = currentIndex - 1;
  //     setCurrentIndex(prevIndex);
  //     setCurrentLessonId(mediaItems[prevIndex]?.lessonId); // ✅ Correctly set the lesson ID
  //   }
  // };

  useEffect(() => {
    updateLecture();
  }, [currentLessonId, lectureTitles]);

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
                      {/* <PdfViewer ref={pdfViewerRef} file={media} /> */}
                      <iframe
                        src={`https://docs.google.com/gview?url=${encodeURIComponent(
                          media
                        )}&embedded=true`}
                        width="100%"
                        height="600px"
                        className="border rounded-md shadow-lg w-full"
                      />
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
              <h2 className="text-[18px] font-DMSans font-semibold text-left">
                {mediaItems.length > 0
                  ? `${currentIndex + 1}. ${mediaItems[currentIndex]?.title}`
                  : "No Content"}
              </h2>
              <div className="flex justify-end items-center gap-4">
                <button>
                  <HiOutlineHandThumbUp className="hover:text-[#FF1515] text-[22px]" />
                </button>
                <button>
                  <HiOutlineHandThumbDown className="hover:text-[#FF1515] text-[22px]" />
                </button>
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="btn m-1">
                    <HiDotsHorizontal className="text-[#1B1919] text-[22px]" />
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                  >
                    <li className="font-DMSans text-[14px] font-semibold">
                      <a>Add note</a>
                    </li>
                    <li className="font-DMSans text-[14px] font-semibold">
                      <a>Feedback</a>
                    </li>
                    <li className="font-DMSans text-[14px] font-semibold">
                      <a>View Capstone</a>
                    </li>
                    <li className="font-DMSans text-[14px] font-semibold">
                      <a>Open discussion</a>
                    </li>
                  </ul>
                </div>
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
