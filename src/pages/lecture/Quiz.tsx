import { useState, useEffect } from "react";
import { DashboardArea } from "~/layouts/DashboardArea";
import { GrLinkPrevious } from "react-icons/gr";
import Carousel from "~/components/Carousel/Carousel";
import { useTheme } from "~/context/theme-provider";
import { cn } from "~/utils/helpers";
import useCountdown from "~/hooks/useCountdown";

const module1quiz = [
  {
    number: "1",
    title: "You are watching the TV news and see this appear on the screen",
    answers: [
      { value: "A", answer: "Tweet" },
      { value: "B", answer: "Facebook" },
      { value: "C", answer: "Instagram" },
    ],
  },
  {
    number: "2",
    title: "You are watching the TV news and see this appear on the screen",
    answers: [
      { value: "A", answer: "Home" },
      { value: "B", answer: "Office" },
      { value: "C", answer: "Car" },
    ],
  },
];

const Quiz = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { theme } = useTheme();
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >({});

  const handleOptionChange = (questionNumber: string, value: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [questionNumber]: value,
    }));
  };

  // Countdown logic with auto-slide to next question
  const { minutes, seconds, startCountdown, resetCountdown } = useCountdown(
    3,
    30
  );

  useEffect(() => {
    startCountdown();

    if (minutes === 0 && seconds === 0) {
      setActiveIndex((prev) =>
        prev < module1quiz.length - 1 ? prev + 1 : prev
      );
      resetCountdown();
    }
  }, [minutes, seconds, resetCountdown, module1quiz.length]);

  return (
    <DashboardArea>
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
                  Question {quiz.number} of {module1quiz.length}
                </h2>
                <h2 className="text-[#fff] text-[18px] lg:text-[28px] font-DMSans font-semibold text-left">
                  {quiz.title}
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
                        name={`radio-${quiz.number}`}
                        className={`radio checked:bg-[#FF3B30] ${
                          theme === "dark" ? "bg-[#fff]" : ""
                        }`}
                        checked={selectedOptions[quiz.number] === answer.value}
                        onChange={() =>
                          handleOptionChange(quiz.number, answer.value)
                        }
                      />
                      <span
                        className={cn(
                          `label-text text-[18px] lg:text-[22px] font-DMSans font-normal`,
                          theme === "dark" ? "text-[#fff]" : "",
                          selectedOptions[quiz.number] === answer.value
                            ? "text-red-500 font-bold"
                            : ""
                        )}
                      >
                        {answer.value}. {answer.answer}
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
          <button className="w-[160px] bg-[#FF1515] rounded-md p-2">
            <p className="text-[20px] font-DMSans font-semibold text-[#fff]">
              SUBMIT
            </p>
          </button>
        </div>
      </div>
    </DashboardArea>
  );
};

export default Quiz;
