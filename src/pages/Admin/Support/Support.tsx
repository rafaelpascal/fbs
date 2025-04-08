import { useCallback } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useTheme } from "~/context/theme-provider";
import { DashboardArea } from "~/layouts/DashboardArea";
import { cn } from "~/utils/helpers";

const Support = () => {
  const { theme } = useTheme();
  // Function to determine NavLink className
  const getNavLinkClassName = useCallback(
    ({ isActive }: { isActive: boolean }) =>
      isActive
        ? "bg-[#FF3B30] text-[20px] h-[24px] min-w-[200px] px-2 flex justify-center items-center rounded-[4px] font-DMSans font-normal py-4 text-[#FFFFFF]"
        : "text-[20px] h-[24px] min-w-[200px] flex justify-center items-center font-DMSans font-normal bg-transparent text-[#8F94A8] px-2 py-4 rounded-[4px]",
    []
  );
  return (
    <DashboardArea>
      <div
        className={cn(
          "w-full  z-0 mt-6 pt-[16px] rounded-[8px]",
          theme === "dark" ? "bg-[#333]" : "bg-[#fff]"
        )}
      >
        <div className="flex justify-center items-center">
          <div className="w-full lg:w-[80%] mb-4 mx-4 overflow-x-auto border-[1px] border-[#F4F5F8] rounded-[8px] p-2 flex justify-between items-center ">
            <NavLink to="pending" className={getNavLinkClassName}>
              Pending tickets
            </NavLink>
            <NavLink to="conversation" className={getNavLinkClassName}>
              Conversations
            </NavLink>
            <NavLink to="unpaidbalances" className={getNavLinkClassName}>
              Unpaid Balances
            </NavLink>
            <NavLink to="inactiveusers" className={getNavLinkClassName}>
              Inactive students
            </NavLink>
            <NavLink to="emails" className={getNavLinkClassName}>
              Email list
            </NavLink>
          </div>
        </div>
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </DashboardArea>
  );
};

export default Support;
