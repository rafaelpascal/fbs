import { DashboardArea } from "~/layouts/DashboardArea";
import { GrLinkPrevious, GrLinkNext } from "react-icons/gr";
// import { HiOutlineHandThumbUp, HiOutlineHandThumbDown } from "react-icons/hi2";
// import { HiDotsHorizontal } from "react-icons/hi";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { useEffect, useRef, useState } from "react";
import { CourseServices } from "~/api/course";
import { useSidebar } from "~/context/Sidebar_Provider";
import { FaFilePdf } from "react-icons/fa";
// import PdfViewer from "~/components/Collapsible/pdfViewer";
import { SideNavProps } from "~/components/lecturesidebar/LectureItems";
import { GoDotFill } from "react-icons/go";
import { HiOutlineHandThumbDown, HiOutlineHandThumbUp } from "react-icons/hi2";
import { HiDotsHorizontal } from "react-icons/hi";
import { Markcomplete } from "~/components/Modal/Markcomplete";

// const Lecture = () => {
//   const { updateSidebarData } = useSidebar();
//   const [currentPage] = useState<number>(1);
//   const [lectureTitles, setlectureTitles] = useState<string[]>([]);
//   const [totalPages, setTotalPages] = useState<number>(0);
//   const { id } = useParams<{ id: string }>();
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const pdfViewerRef = useRef<any>(null);
//   const [currentLessonId, setCurrentLessonId] = useState<string | null>(null);

//   useEffect(() => {
//     if (pdfViewerRef.current) {
//       setTotalPages(pdfViewerRef.current.getTotalPages());
//     }
//   }, [pdfViewerRef.current]);

//   const fetLessons = async () => {
//     const payload = {
//       moduleid: JSON.parse(id ?? ""),
//     };
//     const res = await CourseServices.lessonsByModuleId(payload);
//     console.log("ressss", res);

//     setlectureTitles(res.data.course_lessons);
//     if (res.data.course_lessons.length > 0) {
//       const firstLesson = res.data.course_lessons[0];
//       setCurrentLessonId(firstLesson.lessonid);
//     }
//   };

//   const updateLecture = () => {
//     if (!lectureTitles.length) return;

//     const updatedData: SideNavProps[] = lectureTitles.map(
//       (lessonItem: any, index: number) => ({
//         href: `/module/${lessonItem.module_id}`,
//         icon: FaFilePdf,
//         dropdown: true,
//         playing: lessonItem.lessonid === currentLessonId,
//         text:
//           `LESSON ${index + 1}: ${lessonItem.lesson_title}` ||
//           "Untitled Lesson",
//         children: [
//           {
//             href: "#",
//             icon: GoDotFill,
//             dropdown: false,
//             text: "Lecture",
//           },
//           ...(lessonItem.hasQuiz === 1
//             ? [
//                 {
//                   href: `/assignment/${lessonItem.lessonid}`,
//                   icon: GoDotFill,
//                   dropdown: false,
//                   text: "Quiz",
//                 },
//               ]
//             : []),
//           // remember to change to check
//           ...(lessonItem.lessonid
//             ? [
//                 {
//                   href: `/exam/${lessonItem.lessonid}`,
//                   icon: GoDotFill,
//                   dropdown: false,
//                   text: "Exam",
//                 },
//               ]
//             : []),
//           // remember to change to check
//           ...(lessonItem.lessonid
//             ? [
//                 {
//                   href: `/newassignment/${lessonItem.lessonid}`,
//                   icon: GoDotFill,
//                   dropdown: false,
//                   text: "Assignment",
//                 },
//               ]
//             : []),
//           ...(lessonItem.lessonid
//             ? [
//                 {
//                   href: `/polls/${lessonItem.lessonid}`,
//                   icon: GoDotFill,
//                   dropdown: false,
//                   text: "Polls",
//                 },
//               ]
//             : []),
//           ...(lessonItem.assignment_id
//             ? [
//                 {
//                   href: lessonItem.stream_video_audio
//                     ? lessonItem.stream_video_audio
//                     : "#",
//                   icon: GoDotFill,
//                   dropdown: false,
//                   text: "Assignment",
//                 },
//               ]
//             : []),
//         ],
//       })
//     );

//     updateSidebarData(updatedData);
//   };

//   useEffect(() => {
//     updateLecture();
//   }, [id, lectureTitles]);

//   useEffect(() => {
//     fetLessons();
//   }, [id]);

//   const mediaItems = lectureTitles.flatMap((lesson: any) =>
//     [
//       lesson.upload_pdf,
//       lesson.upload_video_audio,
//       lesson.stream_video_audio,
//       lesson.upload_text,
//     ]
//       .filter(
//         (item) =>
//           item && item !== "https://api.fordaxbschool.com/assets/courses/null"
//       )
//       .map((media) => ({
//         media,
//         lessonId: lesson.lessonid,
//         title: lesson.lesson_title,
//       }))
//   );

//   const allMediaUrls = mediaItems.map((item) => item.media);

//   const handleNext = () => {
//     if (currentIndex < allMediaUrls.length - 1) {
//       const nextIndex = currentIndex + 1;
//       setCurrentIndex(nextIndex);
//       const nextLessonId = mediaItems[nextIndex]?.lessonId;
//       if (nextLessonId) {
//         setCurrentLessonId(nextLessonId);
//       }
//     }
//   };

//   const handlePrevious = () => {
//     if (currentIndex > 0) {
//       const prevIndex = currentIndex - 1;
//       setCurrentIndex(prevIndex);
//       const prevLessonId = mediaItems[prevIndex]?.lessonId;
//       console.log(prevLessonId);
//       if (prevLessonId) {
//         setCurrentLessonId(prevLessonId); // Set only if lessonId exists
//       }
//     }
//   };

//   useEffect(() => {
//     updateLecture();
//   }, [currentLessonId, lectureTitles]);

//   return (
//     <DashboardArea>
//       <div>
//         {mediaItems.length > 0 && (
//           <>
//             <div className="mb-8">
//               {allMediaUrls.map((media, idx) => {
//                 if (media.endsWith(".pdf")) {
//                   return (
//                     <div
//                       key={idx}
//                       className={`w-full flex justify-center items-center bg-white ${
//                         idx === currentIndex ? "block" : "hidden"
//                       }`}
//                     >
//                       {/* <PdfViewer ref={pdfViewerRef} file={media} /> */}
//                       <iframe
//                         src={`https://docs.google.com/gview?url=${encodeURIComponent(
//                           media
//                         )}&embedded=true`}
//                         width="100%"
//                         height="600px"
//                         className="border rounded-md shadow-lg w-full"
//                       />
//                     </div>
//                   );
//                 } else if (media.includes("youtube.com")) {
//                   return (
//                     <div
//                       key={idx}
//                       style={{
//                         maxWidth: "100%",
//                         position: "relative",
//                         paddingTop: "56.25%",
//                       }}
//                       className={idx === currentIndex ? "block" : "hidden"}
//                     >
//                       <ReactPlayer
//                         url={media}
//                         controls
//                         width="100%"
//                         height="100%"
//                         style={{ position: "absolute", top: 0, left: 0 }}
//                       />
//                     </div>
//                   );
//                 }
//                 return null;
//               })}
//             </div>

//             <div className="flex justify-between items-center py-2 border-b-[2px] border-[#ddd] mb-2">
//               <h2 className="text-[18px] font-DMSans font-semibold text-left">
//                 {mediaItems.length > 0
//                   ? `${currentIndex + 1}. ${mediaItems[currentIndex]?.title}`
//                   : "No Content"}
//               </h2>
//               <div className="flex justify-end items-center gap-4">
//                 <button>
//                   <HiOutlineHandThumbUp className="hover:text-[#FF1515] text-[22px]" />
//                 </button>
//                 <button>
//                   <HiOutlineHandThumbDown className="hover:text-[#FF1515] text-[22px]" />
//                 </button>
//                 <div className="dropdown dropdown-end">
//                   <div tabIndex={0} role="button" className="btn m-1">
//                     <HiDotsHorizontal className="text-[#1B1919] text-[22px]" />
//                   </div>
//                   <ul
//                     tabIndex={0}
//                     className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
//                   >
//                     <li className="font-DMSans text-[14px] font-semibold">
//                       <a>Add note</a>
//                     </li>
//                     <li className="font-DMSans text-[14px] font-semibold">
//                       <a>Feedback</a>
//                     </li>
//                     <li className="font-DMSans text-[14px] font-semibold">
//                       <a>View Capstone</a>
//                     </li>
//                     <li className="font-DMSans text-[14px] font-semibold">
//                       <a>Open discussion</a>
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//             </div>
//             <div className="flex justify-between flex-row flex-wrap items-center">
//               <button
//                 onClick={handlePrevious}
//                 disabled={currentIndex === 0}
//                 className={`rounded-md flex justify-center gap-8 items-center p-2 ${
//                   currentIndex === 0 ? "bg-gray-400" : "bg-[#656565]"
//                 }`}
//               >
//                 <GrLinkPrevious className="text-[20px] font-DMSans font-semibold text-[#fff]" />
//                 <p className="text-[20px] font-DMSans font-semibold text-[#fff]">
//                   PREVIOUS
//                 </p>
//               </button>
//               <div>
//                 {currentPage} of {totalPages}
//               </div>
//               <button
//                 onClick={handleNext}
//                 // disabled={currentIndex === mediaItems.length - 1}
//                 className={`rounded-md flex justify-center gap-8 items-center p-2 ${
//                   currentIndex === allMediaUrls.length - 1
//                     ? "bg-gray-400"
//                     : "bg-[#FF1515]"
//                 }`}
//               >
//                 <p className="text-[20px] font-DMSans font-semibold text-[#fff]">
//                   NEXT
//                 </p>
//                 <GrLinkNext className="text-[20px] font-DMSans font-semibold text-[#fff]" />
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//     </DashboardArea>
//   );
// };

const Lecture = () => {
  // const [loading, setLoading] = useState(true);
  const { updateSidebarData } = useSidebar();
  const [currentPage] = useState<number>(1);
  const [lectureTitles, setLectureTitles] = useState<any[]>([]);
  const [markcomplete, setMarkComplete] = useState(false);
  const [totalPages, setTotalPages] = useState<number>(0);
  const { id } = useParams<{ id: string }>();
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0); // Track media index
  const pdfViewerRef = useRef<any>(null);
  const [completedLessons, setCompletedLessons] = useState<Set<number>>(
    new Set()
  );
  const [currentLessonId, setCurrentLessonId] = useState<string | null>(null);

  useEffect(() => {
    if (pdfViewerRef.current) {
      setTotalPages(pdfViewerRef.current.getTotalPages());
    }
  }, [pdfViewerRef.current]);

  const fetchLessons = async () => {
    try {
      const payload = { moduleid: JSON.parse(id ?? "") };
      const res = await CourseServices.lessonsByModuleId(payload);
      setLectureTitles(res.data.course_lessons);
      if (res.data.course_lessons.length > 0) {
        const firstLesson = res.data.course_lessons[0];
        setCurrentLessonId(firstLesson.lessonid);
      }
    } catch (error) {
      console.error("Error fetching lessons:", error);
    }
  };

  useEffect(() => {
    fetchLessons();
  }, [id]);

  const fetchSingleLesson = () => {
    if (currentLessonId) {
      const payload = { lessonid: currentLessonId };
      CourseServices.listLessonbyId(payload)
        .then((res) => {
          console.log(res);
          // if (res.data && res.data.data && res.data.data.length > 0) {
          //   const lesson = res.data.data[0];
          //   setCurrentLessonId(lesson.lessonid);
          // }
        })
        .catch((error) => {
          console.error("Error fetching single lesson:", error);
        });
    }
  };

  useEffect(() => {
    fetchSingleLesson();
  }, [currentLessonId]);

  const updateLecture = () => {
    if (!lectureTitles.length) return;
    const updatedData: SideNavProps[] = lectureTitles.map(
      (lessonItem: any, index: number) => {
        const isPlaying = lessonItem.lessonid === currentLessonId;
        return {
          href: `/module/${lessonItem.module_id}`,
          icon: FaFilePdf,
          dropdown: true,
          playing: isPlaying,
          text:
            `LESSON ${index + 1}: ${lessonItem.lesson_title}` ||
            "Untitled Lesson",
          children: [
            {
              href: `/lecture/${lessonItem.module_id}`,
              icon: GoDotFill,
              dropdown: false,
              text: "Lecture",
            },
            ...(lessonItem.hasQuiz === 0
              ? [
                  {
                    href: `/assignment/${lessonItem.module_id}`,
                    icon: GoDotFill,
                    dropdown: false,
                    text: "Quiz",
                  },
                ]
              : []),
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
        };
      }
    );

    updateSidebarData(updatedData);
  };

  useEffect(() => {
    updateLecture();
  }, [currentLessonId, lectureTitles]);

  const lessonMedia = lectureTitles.map((lesson) => ({
    lessonId: lesson.lessonid,
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

  const currentLesson = lessonMedia[currentLessonIndex];

  const handleNextMedia = () => {
    if (currentMediaIndex < currentLesson.media.length - 1) {
      setCurrentMediaIndex((prev) => prev + 1);
      setCurrentLessonId(currentLesson.lessonId);
    } else if (currentLessonIndex < lessonMedia.length - 1) {
      setCurrentLessonIndex((prev) => prev + 1);
      setCurrentLessonId(currentLesson.lessonId);
      setCurrentMediaIndex(0);
    }
  };

  const handlePreviousLesson = () => {
    if (currentMediaIndex > 0) {
      setCurrentMediaIndex((prev) => prev - 1);
    } else if (currentLessonIndex > 0) {
      const prevLesson = lessonMedia[currentLessonIndex - 1];
      setCurrentLessonIndex((prev) => prev - 1);
      setCurrentLessonId(prevLesson.lessonId); // Update lesson ID
      setCurrentMediaIndex(0);
    }
  };

  const markLessonComplete = () => {
    setCompletedLessons((prev) => new Set(prev).add(currentLesson.lessonId));
    setCurrentLessonId(currentLesson.lessonId);
    if (currentLessonIndex < lessonMedia.length - 1) {
      setCurrentLessonId(currentLesson.lessonId);
      setCurrentLessonIndex((prev) => prev + 1);
      setCurrentMediaIndex(0);
    }
  };

  const handleclose = () => {
    setMarkComplete(false);
  };

  return (
    <DashboardArea>
      <div>
        {lessonMedia.length > 0 && currentLesson && (
          <>
            <div className="mb-8">
              {currentLesson.media.map((media, idx) => {
                if (idx !== currentMediaIndex) return null;

                if (media.endsWith(".pdf")) {
                  return (
                    <div
                      key={idx}
                      className="w-full flex justify-center items-center bg-white"
                    >
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
                {`${currentLessonIndex + 1}. ${currentLesson.title}`}
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
                onClick={handlePreviousLesson}
                disabled={currentLessonIndex === 0}
                className={`rounded-md flex justify-center gap-8 items-center p-2 ${
                  currentLessonIndex === 0 ? "bg-gray-400" : "bg-[#656565]"
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

              {currentMediaIndex === currentLesson.media.length - 1 ? (
                <button
                  // onClick={markLessonComplete}
                  onClick={() => setMarkComplete(true)}
                  className="bg-[#FF1515] rounded-md text-white font-bold py-2 px-4"
                >
                  Mark Complete
                </button>
              ) : (
                <button
                  onClick={handleNextMedia}
                  className="bg-[#FF1515] rounded-md flex justify-center gap-8 items-center p-2"
                >
                  <p className="text-[20px] font-DMSans font-semibold text-[#fff]">
                    NEXT
                  </p>
                  <GrLinkNext className="text-[20px] font-DMSans font-semibold text-[#fff]" />
                </button>
              )}
            </div>

            <div className="flex justify-center mt-6">
              {completedLessons.has(currentLesson.lessonId) && (
                <p className="text-green-500 font-semibold">Lesson Completed</p>
              )}
            </div>
          </>
        )}
      </div>
      <Markcomplete
        id={currentLessonId}
        message="Have you completed this topic?"
        isOpen={markcomplete}
        closeModal={handleclose}
        handleMarkComplete={() => {
          markLessonComplete();
          setMarkComplete(false);
        }}
      />
    </DashboardArea>
  );
};

export default Lecture;
