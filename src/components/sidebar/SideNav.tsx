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

type ActiveClass = { isActive: boolean };
type ClassName = (style: ActiveClass) => string;

export interface SideNavProps {
  className?: ClassName | string;
  iconOnly?: boolean;
}

// Sidebar Component
export const Sidebar = () => {
  // const user = useSelector((state: RootState) => state.user);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false); // New state for desktop collapse

  // Toggle side bar on mobile view
  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prevState) => !prevState);
  }, []);

  // Toggle collapse state for desktop view
  const toggleCollapse = useCallback(() => {
    setIsCollapsed((prevState) => !prevState);
  }, []);

  // const computedClassName = useMemo(() => style, [style]);

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
          className="fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-screen lg:flex lg:flex-col justify-between bg-[#EEF2F6] z-40 transition-transform transform",
          isSidebarOpen ? "translate-x-0 w-[200px]" : "-translate-x-full",
          "lg:translate-x-0 lg:relative",
          isCollapsed ? "lg:w-[80px]" : "lg:min-w-[200px]"
        )}
      >
        <div
          className={cn(
            "flex flex-col h-full bg-[#EEF2F6] w-full",
            "items-start lg:mx-0 justify-start max-lg:py-10 lg:items-start",
            isSidebarOpen ? "mx-4" : ""
          )}
        >
          {/* Logo and Collapse Toggle for Desktop */}
          <div className="relative flex mx-2 justify-between items-center w-full my-4">
            <img
              src={FBSlogo}
              alt="biopaylogo"
              width={isCollapsed ? 50 : 100} // Adjust logo size based on collapsed state
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
              "px-0 lg:px-[20px] bg-transparent grid grid-cols-1 overflow-y-auto",
              "transition-all duration-300",
              isCollapsed ? "gap-2" : "gap-4"
            )}
            style={{ maxHeight: "calc(100vh - 200px)" }}
          >
            {sidebarData.map((data) => (
              <SideNav
                key={data.text}
                {...data}
                textStyles={cn(
                  "hidden bg-transparent text-md my-3 lg:block",
                  isCollapsed && "hidden" // Hide text when collapsed
                )}
                iconOnly={isCollapsed} // Use this prop to control icon-only display
              />
            ))}
          </ul>

          {/* Bottom Settings and Logout */}
          <div className="absolute bottom-0 p-[20px] w-full bg-transparent">
            <button className="flex py-4 flex-row items-center gap-4">
              <LogoutOpen
                width={24}
                height={24}
                className="bg-transparent text-[#757575]"
              />
              {!isCollapsed && (
                <h2 className="text-[14px] bg-transparent text-[#757575] font-normal font-DMSans">
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