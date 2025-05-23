import { DashboardArea } from "~/layouts/DashboardArea";
import { GrLinkPrevious, GrLinkNext } from "react-icons/gr";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { useEffect, useState } from "react";
import { CourseServices } from "~/api/course";
import { HiDotsHorizontal } from "react-icons/hi";
import { motion } from "framer-motion";
import { Markcomplete } from "~/components/Modal/Markcomplete";
import { LoadingSpinner } from "~/components/ui/loading-spinner";
import { useDispatch } from "react-redux";
import {
  setLessonId,
  setNewCurrentLessonIndex,
  setTotalLessons,
} from "~/redux-store/slice/lessonSlice";
import { cn } from "~/utils/helpers";
import { useTheme } from "~/context/theme-provider";
import { useSelector } from "react-redux";
import { RootState } from "~/redux-store/store";
// import { GiNotebook } from "react-icons/gi";
import { BsChatRightText } from "react-icons/bs";
import { SupportModal } from "~/components/Modal/SupportModal";
import { getSlideAnimation } from "~/lib/utils";

const Lecture = () => {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const [lectureTitles, setLectureTitles] = useState<any[]>([]);
  const [markcomplete, setMarkComplete] = useState(false);
  const { id } = useParams<{ id: string }>();
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [Moduleloading, setModuleLoading] = useState(false);
  // const [noteHovered, setNoteHovered] = useState(false);
  // const [supportHovered, setSupportHovered] = useState(false);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [supportOpen, setSupportOpen] = useState(false);
  // const [completedLessons] = useState<Set<number>>(new Set());
  const [lessonStarted, setLessonStarted] = useState(false);
  // const [isMinimized, setIsMinimized] = useState(false);
  const [currentLessonId, setCurrentLessonId] = useState<number | null>(null);
  const totalLessons = useSelector(
    (state: RootState) => state.lesson.totalLessons
  );
  const storedModuleId = localStorage.getItem("moduleId");
  const newLessonIndex = useSelector(
    (state: RootState) => state.lesson.currentLessonIndex
  );
  const [moduleDetails, setModuleDetails] = useState({
    moduleid: 0,
    module_number: 0,
    module_title: "",
    module_content: [
      {
        title: "",
        content: "",
      },
    ],
  });

  const fetchLessons = async () => {
    try {
      const payload = { moduleid: JSON.parse(id ?? "") };
      const res = await CourseServices.lessonsByModuleId(payload);
      // setLectureTitles(res.data.course_lessons);
      if (res.data.course_lessons.length > 0) {
        setTimeout(() => {
          dispatch(setTotalLessons(res.data.course_lessons.length));
          const firstLesson = res.data.course_lessons[0];
          setCurrentLessonId(firstLesson.lessonid);
        }, 500);
      }
    } catch (error) {
      console.error("Error fetching lessons:", error);
    }
  };

  useEffect(() => {
    fetchLessons();
  }, []);

  const fetchSingleLesson = () => {
    setLoading(true);
    if (id) {
      const payload = { lesson_id: id };
      CourseServices.listLessonbyId(payload)
        .then((res) => {
          setLectureTitles(res.data.lessons);
          setCurrentLessonId(res.data.lessons[0].lessonid);
        })
        .catch((error) => {
          console.error("Error fetching single lesson:", error);
        });
    }
  };

  useEffect(() => {
    fetchSingleLesson();
  }, [id]);

  const fetModules = async () => {
    setModuleLoading(true);
    try {
      const payload = {
        module_id: storedModuleId,
      };
      const res = await CourseServices.getModulebyId(payload);

      if (res.data.success && res.data.modules.length > 0) {
        const module = res.data.modules[0];

        setModuleDetails({
          moduleid: module.moduleid,
          module_number: Number(module.module_number),
          module_title: module.module_title,
          module_content: [
            {
              title: "Description",
              content: module.module_description || "",
            },
            {
              title: "Objectives",
              content: module.module_objectives || "",
            },
            {
              title: "Recommended reading",
              content: module.module_reading || "",
            },
          ],
        });
      }

      setModuleLoading(false);
      // setLectureTitles(res.data.course_lessons);
    } catch (error) {
      console.error("Error fetching module:", error);
    } finally {
      setModuleLoading(false);
    }
  };

  useEffect(() => {
    fetModules();
  }, [storedModuleId]);

  const lessonMedia = lectureTitles.map((lesson) => ({
    lessonId: lesson.lessonid,
    number: lesson.lesson_number,
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
      setCurrentLessonId(prevLesson.lessonId);
      setCurrentMediaIndex(0);
    }
  };

  const markLessonComplete = (id: number | null) => {
    if (id) {
      dispatch(setLessonId(id));
    }
  };

  const handleclose = () => {
    setMarkComplete(false);
  };

  const handleStartLesson = () => {
    dispatch(setNewCurrentLessonIndex(1));
    setLessonStarted(true);
  };

  const handleMinimize = () => {
    setSupportOpen(false);
    // setIsMinimized(true);
  };
  const handleClose = () => {
    setSupportOpen(false);
    // setIsMinimized(false);
  };

  return (
    <DashboardArea>
      {!lessonStarted ? (
        <>
          <div className="w-full p-4 lg:p-20 shadow-lg h-auto lg:h-[579px] overflow-y-auto mt-6 border border-[#B3B3B3]">
            {Moduleloading ? (
              <div
                className={cn(
                  "absolute inset-0 flex justify-center items-center  shadow-lg z-10",
                  theme === "dark" ? "bg-[#333]" : "bg-[#fff]"
                )}
              >
                <LoadingSpinner />
              </div>
            ) : (
              <div className=" ">
                <h2
                  className={cn(
                    "font-DMSans mb-10 font-bold text-2xl lg:text-4xl",
                    theme === "dark" ? "text-[#fff]" : "text-[#140342]"
                  )}
                >
                  Module {moduleDetails.module_number}:{" "}
                  {moduleDetails.module_title}
                </h2>
                {moduleDetails.module_content.map((content, idx) => (
                  <div key={idx} className="">
                    <h2 className="text-lg lg:text-xl italic uppercase my-4 font-semibold font-DMSans">
                      {content.title}:{" "}
                    </h2>
                    <p className="text-lg lg:text-xl text-left font-normal font-DMSans">
                      {content.content}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="flex justify-between items-center py-2 border-b-[2px] border-[#ddd] mb-2">
            <h2 className="text-[14px] lg:text-[18px] font-DMSans font-semibold text-left">
              Module {moduleDetails.module_number}: {moduleDetails.module_title}
            </h2>
            <div className="flex justify-end items-center gap-4">
              <div className="dropdown dropdown-end">
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
            <p className="text-[14px] lg:text-[20px] font-DMSans font-semibold text-left">
              0 of {totalLessons}
            </p>
            <button
              onClick={handleStartLesson}
              className="bg-[#FF1515] rounded-md flex justify-center gap-4 lg:gap-8 items-center p-2"
            >
              <p className="text-[14px] lg:text-[20px] font-DMSans font-semibold text-[#fff]">
                START LESSON
              </p>
              <GrLinkNext className="text-[14px] lg:text-[20px] font-DMSans font-semibold text-[#fff]" />
            </button>
          </div>
        </>
      ) : (
        <div className="relative">
          {lessonMedia.length > 0 && currentLesson && (
            <>
              <div className="mb-4">
                {currentLesson.media.map((media, idx) => {
                  if (idx !== currentMediaIndex) return null;

                  if (media.endsWith(".pdf")) {
                    return (
                      <div
                        key={idx}
                        className="relative w-full flex justify-center items-center bg-white"
                      >
                        {loading && (
                          <div
                            className={cn(
                              "absolute inset-0 flex justify-center items-center  shadow-lg z-10",
                              theme === "dark" ? "bg-[#333]" : "bg-[#fff]"
                            )}
                          >
                            <LoadingSpinner />
                          </div>
                        )}
                        <iframe
                          src={`https://docs.google.com/gview?url=${encodeURIComponent(
                            media
                          )}&embedded=true`}
                          width="100%"
                          height="600px"
                          className="border rounded-md shadow-lg w-full"
                          onLoad={() => setLoading(false)}
                          onError={() => setLoading(false)}
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
                  } else if (media.includes("drive.google.com")) {
                    const match = media.match(/\/d\/(.*)\/view/);
                    const fileId = match ? match[1] : null;

                    if (fileId) {
                      return (
                        <div
                          key={idx}
                          className="relative w-full flex justify-center items-center bg-white"
                        >
                          <iframe
                            src={`https://drive.google.com/file/d/${fileId}/preview`}
                            width="100%"
                            height="600px"
                            allow="autoplay"
                            className="rounded-md shadow"
                          />
                        </div>
                      );
                    }
                  }
                  return null;
                })}
              </div>

              <div className="flex justify-between items-center py-2 border-b-[2px] border-[#ddd] mb-2">
                <h2 className="text-[18px] font-DMSans font-semibold text-left">
                  {`${currentLesson.number}. ${currentLesson.title}`}
                </h2>
                <div className="flex  justify-end items-center gap-4">
                  {/* <div className="relative">
                    <button
                      onMouseEnter={() => setNoteHovered(true)}
                      onMouseLeave={() => setNoteHovered(false)}
                      className="p-3 flex justify-center items-center rounded-full "
                    >
                      <GiNotebook
                        className={cn(
                          "hover:text-[#FF1515] text-[36px]",
                          theme === "dark" ? "text-[#fff]" : "text-[#333]"
                        )}
                      />
                    </button>

                    {noteHovered && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        className="absolute -bottom-16 transform -translate-x-1/2 bg-gray-800 text-white text-sm px-3 py-1 rounded-md shadow-md"
                      >
                        <p className="text-[14px] font-DMSans font-normal text-left">
                          Take a note
                        </p>
                      </motion.div>
                    )}
                  </div> */}

                  {/* {!isMinimized && (
                    <div className="relative">
                      <button
                        onClick={() => setSupportOpen(true)}
                        onMouseEnter={() => setSupportHovered(true)}
                        onMouseLeave={() => setSupportHovered(false)}
                        className="p-3 flex justify-center items-center rounded-full bg-[#FF1515]"
                      >
                        <BsChatRightText className="text-[25px] text-[#fff]" />
                      </button>

                      {supportHovered && (
                        <motion.div
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 5 }}
                          className="absolute -bottom-10 transform -translate-x-1/2 bg-gray-800 text-white text-sm px-3 py-1 rounded-md shadow-md"
                        >
                          <p className="text-[14px] font-DMSans font-normal text-left">
                            Support
                          </p>
                        </motion.div>
                      )}
                    </div>
                  )} */}
                  <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn m-1">
                      <HiDotsHorizontal className="text-[#1B1919] text-[22px]" />
                    </div>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                    >
                      <li className="font-DMSans text-[14px] font-semibold">
                        <a>Notes</a>
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
                  className={`rounded-md flex justify-center gap-4 lg:gap-8 items-center p-2 ${
                    currentLessonIndex === 0 ? "bg-gray-400" : "bg-[#656565]"
                  }`}
                >
                  <GrLinkPrevious className="text-[14px] lg:text-[20px] font-DMSans font-semibold text-[#fff]" />
                  <p className="text-[14px] lg:text-[20px] font-DMSans font-semibold text-[#fff]">
                    PREVIOUS
                  </p>
                </button>

                <div>
                  {newLessonIndex} of {totalLessons}
                </div>

                {currentMediaIndex === currentLesson.media.length - 1 ? (
                  <button
                    onClick={() => setMarkComplete(true)}
                    className="bg-[#FF1515] rounded-md text-white font-bold py-2 px-4"
                  >
                    Mark Complete
                  </button>
                ) : (
                  <button
                    onClick={handleNextMedia}
                    className="bg-[#FF1515] rounded-md flex justify-center gap-4 lg:gap-8 items-center p-2"
                  >
                    <p className="text-[14px] lg:text-[20px] font-DMSans font-semibold text-[#fff]">
                      NEXT
                    </p>
                    <GrLinkNext className="text-[14px] lg:text-[20px] font-DMSans font-semibold text-[#fff]" />
                  </button>
                )}
              </div>
            </>
          )}

          <motion.div
            {...getSlideAnimation({ slideDirection: "top" })}
            transition={{ duration: 0.5 }}
            className="fixed bottom-10 right-10"
          >
            <button
              onClick={() => setSupportOpen(true)}
              className="p-3 flex justify-center items-center rounded-full bg-[#FF1515]"
            >
              <BsChatRightText className="text-[25px] text-[#fff]" />
            </button>
          </motion.div>
        </div>
      )}
      <Markcomplete
        id={currentLessonId}
        message="Have you completed this topic?"
        isOpen={markcomplete}
        closeModal={handleclose}
        handleMarkComplete={() => {
          markLessonComplete(currentLessonId);
          setMarkComplete(false);
        }}
      />
      <SupportModal
        isOpen={supportOpen}
        closeModal={handleClose}
        minimized={handleMinimize}
      />
    </DashboardArea>
  );
};

export default Lecture;
