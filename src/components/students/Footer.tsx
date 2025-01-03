import { useTheme } from "~/context/theme-provider";
import FooterCard from "../cards/FooterCard";
import { GiGraduateCap } from "react-icons/gi";
import { learn } from "~/assets";
import FooterList from "../list/FooterList";
import {
  FBSworkshouse,
  FBSworksmed,
  FordaxAcre,
  FordaxAcre2,
  FordaxAcre3,
} from "~/assets";
import FooterBtnList from "../list/FooterBtnList";
type FacilitatorsProps = {
  Title: string;
  items: string[];
};

const FooterItems = [
  {
    title: "Expert faculty and thought leaders",
    text: "Learn from the best in the business. Our distinguished faculty and guest speakers are leaders in their respective fields, bringing real-world insights and practical ideas to the classroom.",
    icon: GiGraduateCap,
  },
  {
    title: "Expert faculty and thought leaders",
    text: "Learn from the best in the business. Our distinguished faculty and guest speakers are leaders in their respective fields, bringing real-world insights and practical ideas to the classroom.",
    icon: GiGraduateCap,
  },
  {
    title: "Expert faculty and thought leaders",
    text: "Learn from the best in the business. Our distinguished faculty and guest speakers are leaders in their respective fields, bringing real-world insights and practical ideas to the classroom.",
    icon: GiGraduateCap,
  },
  {
    title: "Expert faculty and thought leaders",
    text: "Learn from the best in the business. Our distinguished faculty and guest speakers are leaders in their respective fields, bringing real-world insights and practical ideas to the classroom.",
    icon: GiGraduateCap,
  },
  {
    title: "Expert faculty and thought leaders",
    text: "Learn from the best in the business. Our distinguished faculty and guest speakers are leaders in their respective fields, bringing real-world insights and practical ideas to the classroom.",
    icon: GiGraduateCap,
  },
  {
    title: "Expert faculty and thought leaders",
    text: "Learn from the best in the business. Our distinguished faculty and guest speakers are leaders in their respective fields, bringing real-world insights and practical ideas to the classroom.",
    icon: GiGraduateCap,
  },
];

const FacilitatorsItem: FacilitatorsProps[] = [
  {
    Title: "",
    items: [
      "No boring lectures, no tedious textbooks - you can read, listen to or watch lessons at your convenience.",
      "Enjoy delightful interactive instruction designed to make learning easier and faster.",
      "Digest core business principles and best practices without getting overwhelmed.",
      "Access additional materials and study resources, including e-books, videos, and audio books.",
      "Get a modern, valuable, relevant and accredited business education from a government approved business school.",
      "Work on real world business projects and build your portfolio with our business case projects.",
    ],
  },
];
const FooterbtnItem: FacilitatorsProps[] = [
  {
    Title: "ABOUT",
    items: [
      "About Us",
      "Learner Stories",
      "Careers",
      "Leadership",
      "Contact Us",
    ],
  },
  {
    Title: "CATEGORIES",
    items: [
      "Development",
      "Business",
      "Finance & Accounting",
      "Office Productivity",
    ],
  },
  {
    Title: "",
    items: [
      "Lifiestyle",
      "Photography & Video",
      "Health & Fitness",
      "Music",
      "UX Design",
      "Seo",
    ],
  },
  {
    Title: "SUPPORT",
    items: ["Documentation", "FAQS", "Dashboard", "Contact"],
  },
];

const Footer = () => {
  const { theme } = useTheme();

  return (
    <div className="w-full">
      <div
        className={`w-full p-4 lg:p-[10%] flex flex-col justify-center items-center shadow-md ${
          theme === "dark" ? "bg-[#000]" : "bg-[#000000]"
        }`}
      >
        <div className="mb-10">
          <h2 className="text-[30px] mb-4 font-DMSans text-[#fff] font-semibold text-center">
            ABOUT FORDAX
          </h2>
          <p className="text-center text-white font-DMSans font-normal w-full lg:w-[816px]">
            Fordax Business School, located in Abuja, is a prestigious private
            graduate business school that offers accelerated business programs
            to visionary founders, entrepreneurs and ambitious professionals.
            What sets Fordax apart is its innovative approach to learning, which
            seamlessly combines online and on-site experiences. This unique
            blend of learning ensures that students can easily fit their studies
            around their busy lives, without sacrificing the quality of their
            education.
          </p>
        </div>
        <div className="mb-10">
          <h2 className="text-[30px] mb-4 font-DMSans text-[#fff] font-semibold text-center">
            WHY FORDAX?
          </h2>
          {/* <p className="text-center text-white font-DMSans font-normal w-full lg:w-[816px]">
            Lorem ipsum dolor sit amet, consectetur.
          </p> */}
        </div>
        <div className="w-full grid grid-cols-1 sm:grid-cols-3">
          {FooterItems.map((items, index) => (
            <FooterCard
              key={index}
              title={items.title}
              text={items.text}
              icon={items.icon}
            />
          ))}
        </div>
      </div>
      <div className="p-4 lg:py-16 lg:px-[10%] flex flex-col gap-6 lg:flex-row justify-center items-center">
        <div className="w-full lg:w-[700px]">
          <h2 className="text-[45px] font-DMSans font-semibold w-full lg:w-[479px]">
            WHY STUDENTS LOVE FORDAX:
          </h2>
          {FacilitatorsItem.map((facilitator, index) => (
            <FooterList
              key={index}
              items={facilitator.items}
              title={facilitator.Title}
              ordered={false}
              customClass="p-2"
            />
          ))}
        </div>
        <img src={learn} alt="" />
      </div>
      <div className="py-10 flex justify-center flex-col items-center bg-[#F5F7FE] w-full">
        <p>Accreditations & Approvals by:</p>
        <div className="flex flex-col  lg:flex-row items-center gap-4 mt-4 justify-center w-full scroll-snap-x">
          <img
            src={FordaxAcre3}
            alt=""
            className="min-w-[206px] scroll-snap-align-start"
          />
          <img
            src={FordaxAcre2}
            alt=""
            className="min-w-[206px] scroll-snap-align-start"
          />
          <img
            src={FBSworksmed}
            alt=""
            className="min-w-[206px] scroll-snap-align-start"
          />
          <img
            src={FBSworkshouse}
            alt=""
            className="min-w-[206px] scroll-snap-align-start"
          />
          <img
            src={FordaxAcre}
            alt=""
            className="min-w-[206px] scroll-snap-align-start"
          />
        </div>
      </div>
      <div className="relative flex flex-col justify-center items-center bg-black w-full">
        <div className="w-full  flex justify-between items-center flex-col lg:flex-row lg:w-[1218px] ">
          <div className="text-[#fff]">
            <h2>Call us</h2>
            <p>07017695596</p>
            <div className="mt-8">
              {/* <h2>234 lorem ipsum </h2> */}
              <p>admin@fordaxbschool.com</p>
            </div>
          </div>
          {FooterbtnItem.map((facilitator, index) => (
            <FooterBtnList
              key={index}
              items={facilitator.items}
              title={facilitator.Title}
              ordered={false}
              customClass=""
            />
          ))}
        </div>
        <div className="text-white  flex-col lg:flex-row py-10 w-full lg:w-[1218px] flex justify-between items-center border-t-[1px] border-[#ddd]">
          <p>© 2024 fordax. All Right Reserved.</p>
          <div className="flex flex-col lg:flex-row justify-end items-center gap-4">
            <button>Help</button>
            <button>Privacy</button>
            <button>Policy</button>
            <button>Cookie</button>
            <button>Notice</button>
            <button>Security</button>
            <button>Terms of Use</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
