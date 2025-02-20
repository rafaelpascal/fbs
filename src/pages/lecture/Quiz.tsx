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
// import { set } from "zod";

// type Answer = {
//   answer_id: number;
//   answer_text: string;
// };

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
  const [activeIndex, setActiveIndex] = useState(0);
  const [quizLoading, setQuizLoading] = useState(false);
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
      setActiveIndex((prev) =>
        prev < module1quiz.length - 1 ? prev + 1 : prev
      );
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
    console.log(response.data.data[0].quizid);
    setQuizId(response.data.data[0].quizid);
    setQuizTime(response.data.data[0].time); // Add this line
  };

  useEffect(() => {
    fetchQuiz();
  }, [quizId]);

  const fetQuizQuestions = async () => {
    setQuizLoading(true);
    try {
      const payload = {
        quiz_id: newQuizId,
      };
      const res = await CourseServices.fetchQuestions(payload);
      const quizData: QuizResponse = res.data;
      console.log(quizData.data.length);

      setQuestionlength(quizData.data.length);
      setmodule1quiz(quizData.data);
      setQuizLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (newQuizId) {
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

      const res = await CourseServices.submitAnswer(payload);
      setActiveIndex((prev) =>
        prev < module1quiz.length - 1 ? prev + 1 : prev
      );
      resetCountdown();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }, [lessonId, courseId, Storeduser, quizId]);

  if (quizLoading) {
    return (
      <div className="w-full h-[100vh] flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }
  return (
    <DashboardArea>
      {quizLoading ? (
        <div className="w-full h-[100vh] flex justify-center items-center">
          <LoadingSpinner />
        </div>
      ) : (
        <div>
          <div className="flex mb-4 justify-between items-center">
            <h2 className="text-[18px] font-DMSans font-semibold text-left">
              QUIZ
            </h2>
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
          </div>
          <Carousel activeIndex={activeIndex} onChange={setActiveIndex}>
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
                    <div key={index} className="mt-3 form-control">
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
          <div className="flex justify-between items-center">
            <button className="w-[160px] bg-[#656565] rounded-md flex justify-center gap-8 items-center p-2">
              <GrLinkPrevious className="text-[20px] font-DMSans font-semibold text-[#fff]" />
              <p className="text-[20px] font-DMSans font-semibold text-[#fff]">
                PREVIOUS{" "}
              </p>
            </button>
            <button
              onClick={handleSubmitAnswer}
              className="w-[160px] bg-[#FF1515] rounded-md p-2"
            >
              <p className="text-[20px] font-DMSans font-semibold text-[#fff]">
                SUBMIT
              </p>
            </button>
          </div>
        </div>
      )}
    </DashboardArea>
  );
};

export default Quiz;
