import { useState, useEffect, useCallback } from "react";
import { DashboardArea } from "~/layouts/DashboardArea";
import { GrLinkPrevious } from "react-icons/gr";
import Carousel from "~/components/Carousel/Carousel";
import { useTheme } from "~/context/theme-provider";
import { cn } from "~/utils/helpers";
import useCountdown from "~/hooks/useCountdown";
// import { ROUTES } from "~/components/constants/routes";
import { useParams } from "react-router-dom";
import { CourseServices } from "~/api/course";
import { AuthService } from "~/api/auth";
import { useSelector } from "react-redux";
import { RootState } from "~/redux-store/store";
import { LoadingSpinner } from "~/components/ui/loading-spinner";
import { FaBell } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { Markcomplete } from "~/components/Modal/Markcomplete";
import { GiCancel } from "react-icons/gi";
// import { set } from "zod";

// type Answer = {
//   answer_id: number;
//   answer_text: string;
// };

const ExamInstructions = [
  {
    title: "Important Notice",
    item: [
      "You're about to begin an Quiz that may be timed. If a time limit applies, it will be displayed once you start.",
      "Ensure you're ready before clicking Start.",
      "We recommend using a computer for the best experience.",
      "If you force exit, your answers will be automatically submitted.",
    ],
  },
];

type Question = {
  question_id: string;
  number: number; // Add this line
  question_text: string;
  answers: { answer_id: string; value: string; answer_text: string }[];
  answer_id: string;
};

type QuizResponse = {
  status: string;
  success: boolean;
  message: string;
  data: Question[];
};

const Quiz = () => {
  // const navigate = useNavigate();
  const { quizId } = useParams<{ quizId: string }>();
  const [quizStarted, setquizStarted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [quizLoading, setQuizLoading] = useState(true);
  const [isskipQuiz, setIsskipQuiz] = useState(false);
  const [questionId, setquestionId] = useState("");
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const { theme } = useTheme();
  const [module1quiz, setmodule1quiz] = useState<Question[]>([]);
  const [newQuizId, setQuizId] = useState(0);
  const [questionlength, setQuestionlength] = useState(0);
  const [quizTime, setQuizTime] = useState(0);
  const lessonId = useSelector((state: RootState) => state.lesson.lessonId);
  const courseId = localStorage.getItem("course_id");
  const [minutesValue, setMinutesValue] = useState(0);
  const [secondsValue, setSecondsValue] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >({});

  const Storeduser = AuthService.getSession();

  const handleOptionChange = (questionId: string, answerId: string) => {
    setquestionId(questionId);
    setSelectedAnswer(answerId);
    setSelectedOptions((prev) => ({
      ...prev,
      [questionId]: answerId,
    }));
  };

  useEffect(() => {
    if (quizTime > 0 && questionlength > 0) {
      setMinutesValue(Math.floor(quizTime / questionlength));
      setSecondsValue(0);
    }
  }, [quizTime, questionlength]);

  const { minutes, seconds, startCountdown, resetCountdown } = useCountdown(
    minutesValue,
    secondsValue
  );

  useEffect(() => {
    startCountdown();
    if (minutes === 0 && seconds === 0) {
      setActiveIndex(0);
      resetCountdown();
    }
  }, [minutes, questionlength, seconds, resetCountdown, module1quiz.length]);

  // const handlesubmit = () => {
  //   navigate(ROUTES.CONGRATULATIONS);
  // };

  const fetchQuiz = async () => {
    const payload = {
      lesson_id: JSON.parse(quizId ?? ""),
    };
    const response = await CourseServices.listQuiz(payload);
    setQuizId(response.data.data[0].quizid);
    setQuizTime(response.data.data[0].time); // Add this line
  };

  useEffect(() => {
    fetchQuiz();
  }, [quizId]);

  const fetQuizQuestions = async () => {
    // setQuizLoading(true);
    try {
      const payload = {
        quiz_id: newQuizId,
      };
      const res = await CourseServices.fetchQuestions(payload);
      const quizData: QuizResponse = res.data;
      setQuestionlength(quizData.data.length);
      setmodule1quiz(quizData.data);
      setQuizLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (newQuizId) {
      resetCountdown();
      fetQuizQuestions();
    }
  }, [newQuizId]);

  const handleSubmitAnswer = useCallback(async () => {
    try {
      const payload = {
        course_id: JSON.parse(courseId ?? ""),
        lesson_id: lessonId,
        user_id: JSON.parse(Storeduser?.user ?? ""),
        quiz_id: JSON.parse(quizId ?? ""),
        question_id: JSON.parse(questionId),
        selected_answer_id: JSON.parse(selectedAnswer ?? ""),
      };

      await CourseServices.submitAnswer(payload);
      setActiveIndex((prev) =>
        prev < module1quiz.length - 1 ? prev + 1 : prev
      );
      resetCountdown();
    } catch (error) {
      console.log(error);
    }
  }, [lessonId, courseId, Storeduser, quizId]);

  const handleNextQuestion = () => {
    resetCountdown();
    if (activeIndex < module1quiz.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };

  const handleStartQuiz = () => {
    setquizStarted(true);
    startCountdown();
  };

  const handleclose = () => {
    setIsskipQuiz(false);
    resetCountdown();
    // setquizStarted(false);
  };

  return (
    <DashboardArea>
      {quizLoading ? (
        <div className="w-full h-[100vh] flex justify-center items-center">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          <div className="flex mb-4 justify-between items-center">
            <h2 className="text-[18px] font-DMSans font-semibold text-left">
              QUIZ
            </h2>
            {quizStarted && (
              <div className="bg-[#fff] flex justify-start items-center">
                <div className="flex justify-center items-center p-2 border-[1px] border-[#000000]">
                  <p className="text-[#F01E00] text-[16px] font-DMSans font-semibold">
                    {minutes.toString().padStart(2, "0")}
                  </p>
                </div>
                <div className="p-2 flex justify-center items-center border-[1px] border-[#000000]">
                  <p className="text-[#F01E00] text-[16px] font-DMSans font-semibold">
                    {seconds.toString().padStart(2, "0")}
                  </p>
                </div>
              </div>
            )}
          </div>
          {quizStarted ? (
            <div>
              <Carousel
                activeIndex={activeIndex}
                onChange={setActiveIndex}
                isNavigation={false}
              >
                {module1quiz.map((quiz, index) => (
                  <div key={index}>
                    <div className="w-full rounded-t-[8px] flex flex-col justify-between items-start gap-10 p-8 bg-[#585757]">
                      <h2 className="text-[#fff] font-DMSans font-semibold text-left">
                        Question {index + 1} of {module1quiz.length}
                      </h2>
                      <h2 className="text-[#fff] text-[18px] lg:text-[28px] font-DMSans font-semibold text-left">
                        {quiz.question_text}
                      </h2>
                    </div>
                    <div className="w-full rounded-b-[8px] shadow-md p-4 lg:p-10">
                      <h2 className="font-DMSans font-semibold text-left">
                        Select one:
                      </h2>
                      {quiz.answers.map((answer, index) => (
                        <div key={index} className="mt-3 h-[70px] form-control">
                          <label className="label flex justify-start items-center gap-3 cursor-pointer">
                            <input
                              type="radio"
                              name={`radio-${quiz.question_id}`}
                              className={`radio checked:bg-[#FF3B30] ${
                                theme === "dark" ? "bg-[#fff]" : ""
                              }`}
                              checked={
                                selectedOptions[quiz.question_id] ===
                                answer.answer_id
                              }
                              onChange={() =>
                                handleOptionChange(
                                  quiz.question_id,
                                  answer.answer_id
                                )
                              }
                            />
                            <span
                              className={cn(
                                "label-text text-[18px] capitalize lg:text-[22px] font-DMSans font-normal",
                                theme === "dark" ? "text-[#fff]" : "",
                                selectedOptions[quiz.question_id] ===
                                  answer.answer_id
                                  ? "text-red-500 font-bold"
                                  : ""
                              )}
                            >
                              {answer.answer_text}
                            </span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </Carousel>
            </div>
          ) : (
            <div className="lg:h-[572px] h-auto border-2  shadow-md flex justify-center items-center mb-4 w-full border-[#ddd]">
              {ExamInstructions.map((instructioon, index) => (
                <div key={index} className="w-[70%]">
                  <div className="flex justify-start mb-4 items-center gap-3">
                    <FaBell className="size-12 text-yellow-400" />
                    <h2 className="text-[40px] text-[#F01E00] font-DMSans font-bold text-left">
                      {instructioon.title}
                    </h2>
                  </div>
                  {instructioon.item.map((item, index) => (
                    <ul key={index} className="list-disc">
                      <li
                        className={cn(
                          "text-[25px] py-1 text-[#000000] font-DMSans text-left",
                          index === 0 ? "font-semibold" : "font-normal"
                        )}
                      >
                        {item}
                      </li>
                    </ul>
                  ))}
                  <p className="text-[25px] mt-10 py-1 text-green-500 font-DMSans font-semibold text-left">
                    Good Luck!
                  </p>
                </div>
              ))}
            </div>
          )}
          {quizStarted ? (
            <div className="flex justify-between items-center">
              {activeIndex !== 0 ? (
                <button
                  className="w-[160px] bg-[#656565] rounded-md flex justify-center gap-8 items-center p-2"
                  onClick={() =>
                    setActiveIndex((prev) => Math.max(0, prev - 1))
                  }
                >
                  <GrLinkPrevious className="text-[20px] font-DMSans font-semibold text-[#fff]" />
                  <p className="text-[20px] font-DMSans font-semibold text-[#fff]">
                    PREV
                  </p>
                </button>
              ) : (
                <button
                  className="w-[160px] bg-[#656565] rounded-md flex justify-center gap-8 items-center p-2"
                  // onClick={() => setActiveIndex((prev) => Math.max(0, prev - 1))}
                  onClick={() => setIsskipQuiz(true)}
                >
                  <GiCancel className="text-[20px] font-DMSans font-semibold text-[#fff]" />
                  <p className="text-[20px] font-DMSans font-semibold text-[#fff]">
                    Skip Quiz
                  </p>
                </button>
              )}

              <button
                onClick={
                  activeIndex === module1quiz.length - 1
                    ? handleSubmitAnswer
                    : handleNextQuestion
                }
                className="w-[160px] bg-[#FF1515] rounded-md p-2"
              >
                <p className="text-[20px] font-DMSans font-semibold text-[#fff]">
                  {activeIndex === module1quiz.length - 1 ? "SUBMIT" : "NEXT"}
                </p>
              </button>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <button className="bg-[#656565] rounded-md flex justify-center gap-8 items-center p-2">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="#fff"
                  xmlns="http://www.w3.org/2000/svg"
                  xlinkHref="http://www.w3.org/1999/xlink"
                >
                  <rect
                    width="30"
                    height="30"
                    fill="url(#pattern0_2964_18891)"
                  />
                  <defs>
                    <pattern
                      id="pattern0_2964_18891"
                      patternContentUnits="objectBoundingBox"
                      width="1"
                      height="1"
                    >
                      <use
                        xlinkHref="#image0_2964_18891"
                        transform="scale(0.0111111)"
                      />
                    </pattern>
                    <image
                      id="image0_2964_18891"
                      width="90"
                      height="90"
                      preserveAspectRatio="none"
                      xlinkHref="data:image/png;base64,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"
                    />
                  </defs>
                </svg>

                <p className="text-[20px] font-DMSans font-semibold text-[#fff]">
                  TAKE LATER{" "}
                </p>
              </button>
              <button
                onClick={handleStartQuiz}
                className="w-[160px] flex justify-between items-center gap-3 bg-[#FF1515] rounded-md p-3"
              >
                <p className="text-[20px] font-DMSans font-semibold text-[#fff]">
                  PROCEED
                </p>
                <FaArrowRightLong className="size-8 text-[#fff]" />
              </button>
            </div>
          )}
        </>
      )}
      <Markcomplete
        id={0}
        message="Do you really want to skip this Quiz?"
        isOpen={isskipQuiz}
        closeModal={handleclose}
        handleMarkComplete={() => {
          setquizStarted(false);
          setIsskipQuiz(false);
        }}
      />
    </DashboardArea>
  );
};

export default Quiz;
