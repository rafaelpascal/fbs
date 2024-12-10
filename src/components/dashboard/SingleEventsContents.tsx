import { FaRegCalendarCheck } from "react-icons/fa";
import { CiLocationOn, CiShare2 } from "react-icons/ci";
import { useTheme } from "~/context/theme-provider";
import { cn } from "~/utils/helpers";
import EventReviews from "../cards/EventReviews";
import { BaseInput } from "../data-inputs/text-input";
import { useState } from "react";
import TextArea from "../data-inputs/Text-area";
import { BaseButton } from "../buttons/BaseButton";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineLockOpen } from "react-icons/md";
import SocialMedia from "./SocialMedia";

const Speakers = [
  {
    image:
      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
    name: "Jerome Bell",
    position: "Marketing Coordinator",
  },
  {
    image:
      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
    name: "Jerome Bell",
    position: "Marketing Coordinator",
  },
  {
    image:
      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
    name: "Jerome Bell",
    position: "Marketing Coordinator",
  },
  {
    image:
      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
    name: "Jerome Bell",
    position: "Marketing Coordinator",
  },
];

const Reviews = [
  {
    img: "",
    name: "Ali Tufan",
    time: "3 Days ago",
    title: "The best LMS Design",
    comment:
      "This course is a very applicable. Professor Ng explains precisely each algorithm and even tries to give an intuition for mathematical and statistic concepts behind each algorithm. Thank you very much.",
  },
  {
    img: "",
    name: "Ali Tufan",
    time: "3 Days ago",
    title: "The best LMS Design",
    comment:
      "This course is a very applicable. Professor Ng explains precisely each algorithm and even tries to give an intuition for mathematical and statistic concepts behind each algorithm. Thank you very much.",
  },
];

const SingleEventsContents = () => {
  const { theme } = useTheme();
  const [text, setText] = useState("");

  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-full lg:w-[80%] p-4 h-full">
        <div className="w-full flex flex-col lg:flex-row justify-between items-center text-white p-4 lg:px-20 lg:py-28 bg-[#140342]/70 rounded-t-lg h-auto lg:h-[480px]">
          <div className="w-full lg:w-[80%]">
            <div className="flex flex-col lg:flex-row flex-wrap justify-start items-center gap-4 mb-10">
              <div className="flex justify-start items-center gap-4">
                <FaRegCalendarCheck className="text-[30px]" />
                <p className="font-DMSans font-normal text-[15px] text-left">
                  09:00AM - 6 April, 2025 - 7 April, 2025
                </p>
              </div>
              <div className="flex justify-start items-center gap-4">
                <CiLocationOn className="text-[35px]" />
                <p className="font-DMSans font-normal text-[15px] text-left">
                  Event Mall, Abuja Nigeria
                </p>
              </div>
            </div>
            <h2 className="font-DMSans w-full lg:w-[565px] mb-10 font-semibold text-[30px] text-center lg:text-left">
              Build A Successful Business Using AI Business Tools
            </h2>
            <div className="flex justify-start items-center gap-8">
              <div>
                <h2 className="font-DMSans font-semibold text-[40px] text-left">
                  20
                </h2>
                <p className="font-DMSans font-semibold text-[15px] text-left">
                  Days
                </p>
              </div>
              <div>
                <h2 className="font-DMSans font-semibold text-[40px] text-left">
                  32
                </h2>
                <p className="font-DMSans font-semibold text-[15px] text-left">
                  Hours
                </p>
              </div>
              <div>
                <h2 className="font-DMSans font-semibold text-[40px] text-left">
                  57
                </h2>
                <p className="font-DMSans font-semibold text-[15px] text-left">
                  Mins
                </p>
              </div>
              <div>
                <h2 className="font-DMSans font-semibold text-[40px] text-left">
                  13
                </h2>
                <p className="font-DMSans font-semibold text-[15px] text-left">
                  Seconds
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center flex-col">
            <h2 className="font-DMSans font-semibold text-[20px] text-left">
              Invite Someone
            </h2>
            <button>
              <CiShare2 className="text-[40px] font-semibold" />
            </button>
          </div>
        </div>
        <div className="relative p-4 lg:p-10 flex flex-col lg:flex-row shadow-lg gap-8">
          <div className="w-full lg:w-[70%] mb-6 md:mb-0">
            <h2 className="text-[20px] mb-4 font-DMSans font-semibold text-left">
              About The Event
            </h2>
            <p className="text-[14px] sm:text-[16px] font-DMSans font-normal text-left mb-6">
              Phasellus enim magna, varius et commodo ut, ultricies vitae velit.
              Ut nulla tellus, eleifend euismod pellentesque vel, sagittis vel
              justo. In libero urna, venenatis sit amet ornare non, suscipit nec
              risus. Sed consequat justo non mauris pretium at tempor justo
              sodales. Quisque tincidunt laoreet malesuada. Cum sociis natoque
              penatibus et magnis dis parturient montes, nascetur.
            </p>
            <p className="text-[14px] sm:text-[16px] font-DMSans font-normal text-left mb-6">
              This course is aimed at people interested in UI/UX Design. We’ll
              start from the very beginning and work all the way through, step
              by step. If you already have some UI/UX Design experience but want
              to get up to speed using Adobe XD then this course is perfect for
              you too!
            </p>
            <p className="text-[14px] sm:text-[16px] font-DMSans font-normal text-left mb-6">
              First, we will go over the differences between UX and UI Design.
              We will look at what our brief for this real-world project is,
              then we will learn about low-fidelity wireframes and how to make
              use of existing UI design kits.
            </p>

            <h2 className="text-[20px] mb-4 font-DMSans font-semibold text-left">
              Event Content
            </h2>
            <div className="ml-4">
              <ul className="list-disc">
                <li className="text-[14px] sm:text-[16px] font-DMSans font-normal text-left mb-4">
                  You will need a copy of Adobe XD 2019 or above. A free trial
                  can be downloaded from Adobe.
                </li>
                <li className="text-[14px] sm:text-[16px] font-DMSans font-normal text-left mb-4">
                  No previous design experience is needed.
                </li>
                <li className="text-[14px] sm:text-[16px] font-DMSans font-normal text-left mb-4">
                  No previous Adobe XD skills are needed.
                </li>
              </ul>
            </div>

            <h2 className="text-[20px] mb-4 font-DMSans font-semibold text-left">
              Speakers
            </h2>

            <div className="flex justify-between items-center gap-4 flex-col lg:flex-row my-5">
              {Speakers.map((speaker, index) => (
                <div
                  key={index}
                  className="flex flex-col justify-center items-center w-[20%]"
                >
                  <div className="avatar">
                    <div className="w-44 rounded-full">
                      <img src={speaker.image} />
                    </div>
                  </div>
                  <h2 className="text-[20px] text-center mb-2 font-DMSans font-semibold">
                    {speaker.name}
                  </h2>
                  <p className="text-[15px] text-center mb-4 font-DMSans font-normal">
                    {speaker.position}
                  </p>
                </div>
              ))}
            </div>

            <h2 className="text-[20px] mb-4 font-DMSans font-semibold text-left">
              Reviews
            </h2>
            <div>
              {Reviews.map((review, index) => (
                <EventReviews
                  key={index}
                  img={review.img}
                  name={review.name}
                  time={review.time}
                  title={review.title}
                  comment={review.comment}
                />
              ))}
            </div>

            <h2 className="text-[20px] mb-4 font-DMSans font-semibold text-left">
              Write a Review
            </h2>
            <p>What is it like to Course?</p>

            <div>
              <BaseInput
                labelClassName="text-[17px]"
                containerClassname="my-4"
                label="Review Title"
                placeholder="Review Title"
                type="text"
              />
              <TextArea
                label="Review Content"
                value={text}
                onChange={setText}
                placeholder="Write something..."
                maxLength={300}
                rows={6}
                showCharCount={true}
                className="w-full bg-transparent"
              />

              <BaseButton
                containerCLassName={`mt-4 h-[66px] w-full lg:w-[221px] rounded-[8px] bg-[#FF3B30] text-[16px] font-bold font-DMSans text-[#fff]`}
                hoverScale={1.01}
                hoverOpacity={0.8}
                tapScale={0.9}
                // onClick={handleLogin}
              >
                <p>Submit Review</p>
              </BaseButton>
            </div>
          </div>

          <div
            className={cn(
              "w-[28%] absolute top-[-3%] p-10 ml-4 right-[30px] hidden lg:flex flex-col items-start h-[362px] rounded-lg shadow-lg",
              theme === "dark" ? "bg-[#333]" : "bg-white"
            )}
          >
            <div className="flex justify-between w-full items-center gap-2">
              <h2>$96.00</h2>
              <div className="flex justify-end items-center gap-2">
                <h2>$76.00</h2>
                <button className="bg-[#00FF84] rounded-md font-DMSans font-semibold p-2">
                  91% off
                </button>
              </div>
            </div>
            <div className="flex w-full my-6 justify-between items-center">
              <div className="flex justify-start items-center gap-3">
                <FaRegUser />
                <h2 className="text-[15px] font-DMSans font-semibold">
                  Total Slot
                </h2>
              </div>
              <p className="text-[15px] font-DMSans font-semibold">987</p>
            </div>
            <div className="flex w-full mb-4 justify-between items-center">
              <div className="flex justify-start items-center gap-3">
                <MdOutlineLockOpen />
                <h2 className="text-[15px] font-DMSans font-semibold">
                  Booked Slot
                </h2>
              </div>
              <p className="text-[15px] font-DMSans font-semibold">987</p>
            </div>
            <BaseButton
              containerCLassName={`mt-4 h-[66px] w-full rounded-[8px] bg-[#FF3B30] text-[16px] font-bold font-DMSans text-[#fff]`}
              hoverScale={1.01}
              hoverOpacity={0.8}
              tapScale={0.9}
              // onClick={handleLogin}
            >
              <p>Join Now</p>
            </BaseButton>
            <SocialMedia />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleEventsContents;
