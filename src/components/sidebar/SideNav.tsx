import { sidebarData } from "./data";
import { SideNav } from "./NavItem";
import { cn } from "~/utils/helpers";
import { LogoutOpen } from "react-huge-icons/outline";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { HiMenuAlt2 } from "react-icons/hi";
import { useCallback, useState } from "react";
// import { useSelector } from "react-redux";
// import { RootState } from "../../redux-store/store";
import { FBSlogo } from "~/assets";
import { useTheme } from "~/context/theme-provider";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/routes";

type ActiveClass = { isActive: boolean };
type ClassName = (style: ActiveClass) => string;

export interface SideNavProps {
  className?: ClassName | string;
  iconOnly?: boolean;
}

export const Sidebar = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  // const user = useSelector((state: RootState) => state.user);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Toggle side bar on mobile view
  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prevState) => !prevState);
  }, []);

  // Toggle collapse state for desktop view
  const toggleCollapse = useCallback(() => {
    setIsCollapsed((prevState) => !prevState);
  }, []);

  const handleLogout = () => {
    navigate(ROUTES.HOME);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="fixed top-2 left-2 z-50 lg:hidden bg-[#EEF2F6] p-2 rounded-full text-[red]"
        onClick={toggleSidebar}
      >
        <HiMenuAlt2 size={20} className="bg-transparent" />
      </button>

      {/* Overlay */}
      {isSidebarOpen && (
        <button
          className="fixed inset-0 bg-black bg-opacity-50 z-20 transition-opacity"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-screen lg:flex lg:flex-col justify-between z-40 transition-transform transform",
          isSidebarOpen ? "translate-x-0 w-[200px]" : "-translate-x-full",
          "lg:translate-x-0 lg:relative",
          isCollapsed ? "lg:w-[80px]" : "lg:min-w-[230px]",
          theme === "light" ? "bg-[#EEF2F6]" : "bg-[#424141]"
        )}
      >
        <div
          className={cn(
            "flex flex-col h-full w-full",
            "items-start lg:mx-0 justify-start max-lg:py-10 lg:items-start",
            isSidebarOpen ? "mx-4" : ""
          )}
        >
          {/* Logo and Collapse Toggle for Desktop */}
          <div className="relative flex mx-2 justify-between items-center w-full my-4">
            <img
              src={FBSlogo}
              alt="biopaylogo"
              width={isCollapsed ? 50 : 100}
              className={cn(isCollapsed && "mx-auto")}
            />
            {/* Toggle Collapse Button for Desktop */}
            <button
              className=" absolute top-14 shadow-md right-[-10px] hidden lg:flex items-center p-2 rounded-full bg-[#EEF2F6] text-[#FF3B30]"
              onClick={toggleCollapse}
            >
              {isCollapsed ? (
                <FiChevronRight size={20} />
              ) : (
                <FiChevronLeft size={20} />
              )}
            </button>
          </div>

          {/* Navigation Items */}
          <ul
            className={cn(
              "w-full px-4  bg-transparent grid grid-cols-1 overflow-y-auto",
              "transition-all duration-300",
              isCollapsed ? "gap-2" : "gap-3"
            )}
            style={{ maxHeight: "calc(100vh - 200px)" }}
          >
            {sidebarData.map((data) => (
              <SideNav
                key={data.text}
                {...data}
                textStyles={cn(
                  "hidden bg-transparent text-md lg:block",
                  isCollapsed && "hidden"
                )}
                iconOnly={isCollapsed}
              />
            ))}
          </ul>

          {/* Bottom Settings and Logout */}
          <div className="absolute bottom-0 p-[20px] w-full bg-transparent">
            <button
              onClick={handleLogout}
              className="flex p-2 hover:border-[0.5px] w-full hover:border-[#FF3B30] rounded-[8px] hover:text-[#FF3B30] flex-row items-center gap-4"
            >
              <LogoutOpen width={24} height={24} className="bg-transparent" />
              {!isCollapsed && (
                <h2 className="text-[14px] bg-transparent font-normal font-DMSans">
                  Logout
                </h2>
              )}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
