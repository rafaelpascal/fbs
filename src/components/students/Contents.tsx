import { mbaimage } from "~/assets";
import { BaseButton } from "../buttons/BaseButton";
import Tabs from "../Tabs/Tabs";
import Facilitators from "./CourseContent.tsx/Facilitators";
import Fee from "./CourseContent.tsx/Fee";
import CourseContents from "./CourseContents";
import Description from "./Description";
import MbaList from "../list/mba";
import { ROUTES } from "../constants/routes";
import { useNavigate } from "react-router-dom";
import { CiClock1 } from "react-icons/ci";
import { LuMonitorPlay } from "react-icons/lu";
import { IoExtensionPuzzleOutline } from "react-icons/io5";
import { MdBarChart } from "react-icons/md";
import { BsAward } from "react-icons/bs";
import {
  FaFacebookF,
  FaInstagramSquare,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";

const tabsData = [
  { title: "Overview" },
  { title: "Course Content" },
  { title: "Facilitators" },
  { title: "Course Structure" },
  { title: "Tuition" },
];

const FooterbtnItem: {
  items: { text: string; icon: JSX.Element; count?: string }[];
  ordered: boolean;
  customClass: string;
}[] = [
  {
    items: [
      { text: "9 March, 2025 - 10 July 2025", icon: <CiClock1 /> },
      { text: "Modules", icon: <LuMonitorPlay />, count: "12" },
      { text: "Lessons", icon: <IoExtensionPuzzleOutline />, count: "12" },
      { text: "Duration", icon: <CiClock1 />, count: "4 Months" },
      { text: "Case Study", icon: <MdBarChart />, count: "9" },
      { text: "Certificate", icon: <BsAward />, count: "Yes" },
    ],
    ordered: false,
    customClass: "",
  },
];

const Contents = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(ROUTES.APPLICATION);
  };

  return (
    <div className="flex justify-center  mb-[10%] font-DMSans items-center px-4">
      <div className="w-full lg:w-[80%] flex flex-wrap lg:flex-row justify-center gap-20 items-start">
        <div className="w-full lg:w-[819px]">
          <h2 className="text-[40px] my-3">
            Executive Diploma in Business Communication & Public Relations
          </h2>
          <p className="text-[20px]  my-3">
            Phasellus enim magna, varius et commodo ut, ultricies vitae velit.
            Ut nulla tellus, eleifend euismod pellentesque vel, sagittis vel
            justo. In libero urna s, eleifend euismod pellentesque vel, sagittis
            vel justo. In libero urna...
          </p>
          <p className="text-[20px] my-3">Cohort 1/Dec 2024 </p>
          <p className="text-[20px] my-3">
            <span className="">Program:</span> MBA Course{" "}
            <span className="">Format:</span> Hybrid{" "}
          </p>
          <img
            src="https://s3-alpha-sig.figma.com/img/fca1/b527/3dc913d6a517b22891c56fc7d0adbaf0?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ONW8A23I~6CcWgzr1HJbjqvEoW3bwT1i55H2QsLoX6DrCNuXcpV5ifNj0SVdmpBroZDrl6Knu0Xzjnh25apBeE9SZpiSH~wKajVVh1ffBoWfbVyCEQj20nzVCsFB6PcSPa9LscnJZgX9XytwfcxmVXGsledYyk1MoXOZpVHrxxzdkvoavhJD5eJ0tgAKoIlWX6V0yuMtpOB6Gj01gDY7dZf8bXWb0Cu7ailML3gouHAbAejeo81EnY7BXRE1Bb5rd7DYS2K7PEv4T9CmKuj4SFzBHYa9~F~ocKgS4btoEtez8xPfN-epO6bOFU0GJEM5S2XG8BPexaksN1XJJfrxIQ__"
            alt="Video"
          />

          <Tabs tabs={tabsData}>
            <div>
              <Description />
            </div>
            <div>
              <CourseContents />
            </div>
            <div>
              <Facilitators />
            </div>
            <div className="">Course structure content goes here.</div>
            <div className="">Tuition content goes here.</div>
          </Tabs>
          <Fee />
          <div className="flex justify-between items-center w-full">
            <BaseButton
              containerCLassName="mt-4 w-full lg:w-[369.19px] h-[66px] w-full rounded-[8px] bg-[#FF3B30] text-[24px] font-bold font-DMSans text-[#fff]"
              hoverScale={1.01}
              hoverOpacity={0.8}
              tapScale={0.9}
            >
              <p>Apply Now</p>
            </BaseButton>
            <BaseButton
              containerCLassName="mt-4 w-full lg:w-[369.19px] h-[66px] w-full rounded-[8px] border-[1px] border-[#000] text-[24px] font-bold font-DMSans text-[#757575]"
              hoverScale={1.01}
              hoverOpacity={0.8}
              tapScale={0.9}
            >
              <p>Contact us</p>
            </BaseButton>
          </div>
        </div>
        <div className="w-full lg:w-[443.02px] p-4 rounded-md shadow-md">
          <img src={mbaimage} alt="mbaimage" />
          <div className="flex py-4 justify-between items-center">
            <p>N96.000/Instalment</p>
            <p>$76.00</p>
          </div>
          <div className="flex flex-col justify-between items-center w-full">
            <BaseButton
              containerCLassName="mt-4 w-full lg:w-[369.19px] h-[66px] w-full rounded-[8px] bg-[#FF3B30] text-[24px] font-bold font-DMSans text-[#fff]"
              hoverScale={1.01}
              hoverOpacity={0.8}
              tapScale={0.9}
              onClick={handleNavigate}
            >
              <p>Apply Now</p>
            </BaseButton>
            <BaseButton
              containerCLassName="mt-4 w-full lg:w-[369.19px] h-[66px] w-full rounded-[8px] border-[1px] border-[#000] text-[24px] font-bold font-DMSans text-[#757575]"
              hoverScale={1.01}
              hoverOpacity={0.8}
              tapScale={0.9}
            >
              <p>Add to Cart</p>
            </BaseButton>
          </div>
          {FooterbtnItem.map((facilitator, index) => (
            <MbaList
              key={index}
              items={facilitator.items}
              ordered={facilitator.ordered}
              customClass={facilitator.customClass}
            />
          ))}
          <div className="w-full flex justify-center items-center flex-col">
            <p className="text-[#FF3B30] font-DMSans font-semibold text-[18px] w-full text-center py-10">
              Instalment Plan Available
            </p>
            <div className="flex justify-center items-center">
              <button className="w-[45px] flex justify-center items-center h-[45px] rounded-full hover:bg-[#EEF2F6]">
                <FaFacebookF />
              </button>
              <button className="w-[45px] flex justify-center items-center h-[45px] rounded-full hover:bg-[#EEF2F6]">
                <FaTwitter />
              </button>
              <button className="w-[45px] flex justify-center items-center h-[45px] rounded-full hover:bg-[#EEF2F6]">
                <FaInstagramSquare />
              </button>
              <button className="w-[45px] flex justify-center items-center h-[45px] rounded-full hover:bg-[#EEF2F6]">
                <FaLinkedin />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contents;
