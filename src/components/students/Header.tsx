import { useEffect, useState } from "react";
import { FaPhoneAlt, FaBars, FaTimes } from "react-icons/fa";
import { MdOutlineAttachEmail } from "react-icons/md";
import { FaFacebookF, FaInstagram, FaChevronDown } from "react-icons/fa";
import { CiLinkedin, CiYoutube } from "react-icons/ci";
import { FBSlogo } from "~/assets";
import { useTheme } from "~/context/theme-provider";
import ThemeToggle from "../buttons/ThemeController";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/routes";

const Header = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false); // State to track scrolling
  const { theme } = useTheme();

  useEffect(() => {
    // Update the document's theme attribute
    document.documentElement.setAttribute("data-theme", theme);

    // Event listener for scroll
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Attach scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [theme]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleNavigateEvents = () => {
    navigate(ROUTES.EVENTS);
  };

  const handleLogin = () => {
    navigate(ROUTES.HOME);
  };

  return (
    <div className="relative h-[193px] w-full">
      {/* Mobile Menu Icon */}
      <div className="flex lg:hidden justify-between items-center w-full p-4">
        <img src={FBSlogo} alt="biopaylogo" width={100} />
        <div>
          <ThemeToggle />
          <button onClick={toggleSidebar} className="text-2xl ml-2">
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Sidebar for Mobile */}
      <div
        className={`fixed top-0 left-0 h-full w-[250px] shadow-lg transform
          ${theme === "dark" ? "bg-[#333]" : "bg-white"} ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <div
          className={`flex justify-between items-center p-4 border-b ${
            theme === "dark" ? "bg-[#333]" : "bg-white"
          }`}
        >
          <img src={FBSlogo} alt="biopaylogo" width={80} />
        </div>
        <nav
          className={`flex flex-col mb-4 gap-4 p-4 ${
            theme === "dark" ? "bg-[#333]" : "bg-white"
          }`}
        >
          <Link
            className="text-[18px] font-DMSans font-semibold text-left"
            to="https://fordaxbschool.com"
          >
            Home
          </Link>
          <Link
            className="text-[18px] font-DMSans font-semibold text-left"
            to="https://fordaxbschool.com/about"
          >
            About
          </Link>
          <Link
            className="text-[18px] font-DMSans font-semibold text-left"
            to="https://fordaxbschool.com/execs"
          >
            Programs
          </Link>
          <button
            className="text-[18px] font-DMSans font-semibold text-left"
            onClick={handleNavigateEvents}
          >
            Events
          </button>
          <Link
            className="text-[18px] font-DMSans font-semibold text-left"
            to="https://fordaxbschool.com/blog"
          >
            Blog
          </Link>
          <button className="text-[18px] font-DMSans font-semibold text-left">
            Resources
          </button>
          <Link
            className="text-[18px] font-DMSans font-semibold text-left"
            to="https://fordaxbschool.com/contact"
          >
            Contact
          </Link>
        </nav>
        <Link
          to="/login"
          className="w-full text-[18px] font-DMSans font-semibold text-center mx-4 px-2 py-4 text-[#fff] bg-[#FF1515] rounded-[8px]"
        >
          STUDENT LOGIN
        </Link>
      </div>

      {/* Main Header Content for larger screens */}
      <div
        className={`hidden fixed w-full z-50 lg:flex flex-col px-4 ${
          theme === "dark" ? "bg-[#333]" : "bg-white"
        } ${isScrolled ? "shadow-md" : ""} transition-shadow duration-300`}
      >
        <div className="flex justify-between items-center w-full border-b-[0.5px] border-b-[#ddd] py-3">
          <div className="flex gap-4 justify-start items-center">
            <div className="flex justify-start items-center gap-3">
              <FaPhoneAlt />
              <p className="font-DMSans text-[14px] font-semibold">
                07017695596
              </p>
            </div>
            <div className="flex justify-start items-center gap-2">
              <MdOutlineAttachEmail />
              <p className="font-DMSans text-[14px] font-semibold">
                admin@fordaxbschool.com
              </p>
            </div>
          </div>
          <div className="flex gap-4 justify-end items-center">
            <button className="flex justify-start items-center gap-3">
              <FaFacebookF />
            </button>
            <button className="flex justify-start items-center gap-2">
              <CiLinkedin />
            </button>
            <button className="flex justify-start items-center gap-3">
              <FaInstagram />
            </button>
            <button className="flex justify-start items-center gap-2">
              <CiYoutube />
            </button>
            <button className="flex justify-end items-center gap-2">
              <p>English</p>
              <FaChevronDown />
            </button>
            <ThemeToggle />
          </div>
        </div>

        <div className="flex justify-between items-center w-full py-3">
          <div className="flex justify-start gap-10 items-center w-full lg:w-[50%]">
            <img src={FBSlogo} alt="biopaylogo" width={100} />
            <div className="hidden lg:flex gap-4">
              <Link to="https://fordaxbschool.com">Home</Link>
              <Link to="https://fordaxbschool.com/about">About</Link>
              <Link to="https://fordaxbschool.com/execs">Programs</Link>
              <button onClick={handleNavigateEvents}>Events</button>
              <Link to="https://fordaxbschool.com/blog">Blog</Link>
              <button>Resources</button>
              <Link to="https://fordaxbschool.com/contact">Contact</Link>
            </div>
          </div>
          <div className="flex justify-end items-center gap-3">
            <p>Apply for a course</p>
            <button
              onClick={handleLogin}
              className="w-[222px] h-[54px] text-[#fff] bg-[#FF1515] rounded-[8px]"
            >
              STUDENT LOGIN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
