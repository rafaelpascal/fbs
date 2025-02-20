import SelectionDropdown from "~/components/Collapsible/SelectionDropdown";
import { FaFilter } from "react-icons/fa6";
import { NavLink, Outlet } from "react-router-dom";
import { BsQuestionSquareFill } from "react-icons/bs";
import { useTheme } from "~/context/theme-provider";
import { useCallback } from "react";
import { cn } from "~/utils/helpers";
import { DashboardArea } from "~/layouts/DashboardArea";

const options = [
  { label: "Master of Business Administration 1", value: 1 },
  { label: "Master of Business Administration 2", value: 2 },
  { label: "Master of Business Administration 3", value: 3 },
];

const StudentsManagement = () => {
  const { theme } = useTheme();
  const getNavLinkClassName = useCallback(
    ({ isActive }: { isActive: boolean }) =>
      isActive
        ? "bg-[#FFD8E4] text-[20px] h-[170px] shadow-md w-[345px] min-w-[300px] flex flex-col justify-center items-start  rounded-[4px] font-DMSans font-normal p-6 text-[#140342]"
        : `${cn(
            "text-[20px] h-[170px] w-[345px] shadow-md min-w-[300px]  flex flex-col  justify-center items-start  font-DMSans font-normal p-6 rounded-lg",
            theme === "dark"
              ? "bg-[#333] border-[0.5px] border-[#ddd] shadow-lg text-[#fff]"
              : "bg-[#FFFFFF] text-[#8F94A8]"
          )}`,
    [theme]
  );

  const handleSelect = (option: { label: string; value: string | number }) => {
    console.log("Selected option:", option);
  };
  return (
    <DashboardArea>
      {" "}
      <div>
        <div className="my-4">
          <h2 className="font-DMSans font-semibold text-[20px]">
            Students’ performance & scores{" "}
          </h2>
        </div>
        <div className="flex flex-col lg:flex-row flex-wrap justify-between items-center">
          <div className="w-full lg:w-[350px] mb-6">
            <SelectionDropdown
              options={options}
              placeholder="Select Program"
              onSelect={handleSelect}
            />
          </div>
          <button
            className={cn(
              "w-full lg:w-[350px] flex justify-between items-center rounded-md p-2 border-[0.5px] border-[#ddd] py-2 mb-6",
              theme === "dark" ? "bg-[#333]" : "bg-white"
            )}
          >
            <p>Search</p>
            <FaFilter className="text-[30px]" />
          </button>
        </div>
        <div>
          <div className="w-auto p-1 overflow-x-auto scrollbar-style rounded-[8px] flex justify-start items-center gap-3">
            <NavLink to="assignments" className={getNavLinkClassName}>
              <p className="text-[15px]">Assignments</p>
              <h2 className="text-[24px] my-2 font-semibold">26/50 students</h2>
              <p className="text-[#FF3B30] text-[15px]">Submitted</p>
            </NavLink>
            <NavLink to="capstone" className={getNavLinkClassName}>
              <p className="text-[15px]">Capstone</p>
              <h2 className="text-[24px] my-2 font-semibold">26/50 students</h2>
              <p className="text-[#FF3B30] text-[15px]">Submitted</p>
            </NavLink>
            <NavLink to="quizes" className={getNavLinkClassName}>
              <div className="flex justify-between items-center w-full">
                <div>
                  <p className="text-[15px]">Quizzes</p>
                  <h2 className="text-[24px] my-2 font-semibold">45/50</h2>
                  <p className="text-[#FF3B30] text-[15px]">Submitted</p>
                </div>
                <BsQuestionSquareFill className="text-[#FF3B30] text-[34px]" />
              </div>
            </NavLink>
            <NavLink to="pollstable" className={getNavLinkClassName}>
              <div className="flex justify-between items-center w-full">
                <div>
                  <p className="text-[15px]">Polls</p>
                  <h2 className="text-[24px] my-2 font-semibold">45/50</h2>
                  <p className="text-[#FF3B30] text-[15px]">Submitted</p>
                </div>
                <BsQuestionSquareFill className="text-[#FF3B30] text-[34px]" />
              </div>
            </NavLink>
            <NavLink to="pollstable" className={getNavLinkClassName}>
              <div className="flex justify-between items-center w-full">
                <div>
                  <p className="text-[15px]">Exams</p>
                  <h2 className="text-[24px] my-2 font-semibold">45/50</h2>
                  <p className="text-[#FF3B30] text-[15px]">Submitted</p>
                </div>
                <BsQuestionSquareFill className="text-[#FF3B30] text-[34px]" />
              </div>
            </NavLink>
          </div>
        </div>
      </div>
      <div className="p-4">
        <Outlet />
      </div>
    </DashboardArea>
  );
};

export default StudentsManagement;
