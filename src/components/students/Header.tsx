import { useEffect, useState } from "react";
import { FaPhoneAlt, FaBars, FaTimes } from "react-icons/fa";
import { MdOutlineAttachEmail } from "react-icons/md";
import { FaFacebookF, FaInstagram, FaChevronDown } from "react-icons/fa";
import { CiLinkedin, CiYoutube } from "react-icons/ci";
import { FBSlogo } from "~/assets";
import { useTheme } from "~/context/theme-provider";
import ThemeToggle from "../buttons/ThemeController";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ROUTES } from "../constants/routes";
import { cn } from "~/utils/helpers";

const navItems = [
  { label: "Home", href: "https://fordaxbschool.com" },
  { label: "About", href: "https://fordaxbschool.com/about" },
  { label: "Programs", href: "https://fordaxbschool.com/execs" },
  { label: "Events", href: "" },
  { label: "Blog", href: "https://fordaxbschool.com/blog" },
  { label: "Resources", href: "" },
  { label: "Contact", href: "https://fordaxbschool.com/contact" },
];

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

  const closeSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div
      className={cn(
        "fixed z-50 w-full",
        theme === "dark" ? "bg-[#333]" : "bg-white"
      )}
    >
      {/* Backdrop */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-md lg:hidden"
            onClick={closeSidebar}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>

      {/* Mobile Top Bar */}
      <div className="flex lg:hidden  justify-between items-center w-full p-4">
        <img src={FBSlogo} alt="biopaylogo" width={100} />
        <div>
          <ThemeToggle />
          <button onClick={toggleSidebar} className="text-2xl ml-2">
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            className={`fixed top-0 left-0 h-full w-[260px] z-[10001] shadow-lg rounded-r-3xl ${
              theme === "dark" ? "bg-[#333]" : "bg-white"
            }`}
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 25,
            }}
          >
            {/* Sidebar Header */}
            <div
              className={`flex justify-between items-center p-4 border-b border-red-500 rounded-r-3xl ${
                theme === "dark" ? "bg-[#333]" : "bg-white"
              }`}
            >
              <img src={FBSlogo} alt="biopaylogo" width={80} />
              <motion.button
                onClick={closeSidebar}
                className="ml-auto grid size-8 place-items-center rounded-full bg-[#FF5050] text-white"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.3 }}
              >
                <FaTimes size={18} />
              </motion.button>
            </div>

            {/* Sidebar Links */}
            {/* <nav
              className={`flex flex-col gap-4 px-6 py-4 mb-4 ${
                theme === "dark" ? "bg-[#333]" : "bg-white"
              }`}
            >
              <Link
                className="text-[18px] font-DMSans font-semibold"
                to="https://fordaxbschool.com"
              >
                Home
              </Link>
              <Link
                className="text-[18px] font-DMSans font-semibold"
                to="https://fordaxbschool.com/about"
              >
                About
              </Link>
              <Link
                className="text-[18px] font-DMSans font-semibold"
                to="https://fordaxbschool.com/execs"
              >
                Programs
              </Link>
              <Link
                to=""
                className="text-[18px] text-left font-DMSans font-semibold"
                onClick={handleNavigateEvents}
              >
                Events
              </Link>
              <Link
                className="text-[18px] font-DMSans font-semibold"
                to="https://fordaxbschool.com/blog"
              >
                Blog
              </Link>
              <Link
                to=""
                className="text-[18px]  text-left  font-DMSans font-semibold"
              >
                Resources
              </Link>
              <Link
                className="text-[18px] font-DMSans font-semibold"
                to="https://fordaxbschool.com/contact"
              >
                Contact
              </Link>
            </nav> */}
            <motion.ul
              className="flex flex-col items-center gap-3 pt-4 text-[16px] font-semibold"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
            >
              {navItems.map(({ href, label }) => (
                <motion.li
                  key={href}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <Link
                    to={href}
                    className={cn(
                      "text-xl font-DMSans font-medium",
                      theme === "dark" ? "text-[#fff]" : "text-[#FF5050]"
                    )}
                    onClick={closeSidebar}
                  >
                    {label}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
            <motion.div
              className="flex w-full flex-col items-center gap-[8px]"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.3 }}
            >
              <Link
                to="/login"
                className="block mx-4 my-4 text-center px-4 py-3 w-[70%] rounded-[8px] bg-[#FF1515] text-white text-[18px] font-DMSans font-semibold"
              >
                STUDENT LOGIN
              </Link>
              <ThemeToggle />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
            <Link
              to="https://fordaxbschool.com/execs"
              target="_blank"
              className="text-[20px] font-semibold hover:text-[#FF1515] font-DMSans text-[#757575]"
            >
              <p>Apply for a course</p>
            </Link>
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
