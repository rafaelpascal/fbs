import { useCallback } from "react";
import { NavLink } from "react-router-dom";
import { useTheme } from "~/context/theme-provider";
import { cn } from "~/utils/helpers";
import { BsQuestionSquareFill } from "react-icons/bs";

const PerformanceScores = () => {
  const { theme } = useTheme();
  const getNavLinkClassName = useCallback(
    ({ isActive }: { isActive: boolean }) =>
      isActive
        ? "bg-[#FFD8E4] text-[20px] h-[170px] shadow-md w-[345px] min-w-[300px] flex flex-col justify-center items-start  rounded-[4px] font-DMSans font-normal p-6 text-[#140342]"
        : `${cn(
            "text-[20px] h-[170px] w-[345px] shadow-md min-w-[300px]  flex flex-col  justify-center items-start  font-DMSans font-normal p-6 rounded-lg",
            theme === "dark"
              ? "bg-[#333] shadow-lg text-[#fff]"
              : "bg-[#FFFFFF] text-[#8F94A8]"
          )}`,
    [theme]
  );
  return (
    <div>
      <div className="my-4">
        <h2 className="font-DMSans font-semibold text-[20px]">
          Students’ performance & scores{" "}
        </h2>
      </div>
      <div>
        <div className="w-auto p-1 overflow-x-auto scrollbar-style rounded-[8px] flex justify-start items-center gap-3">
          <NavLink to="assignments" className={getNavLinkClassName}>
            <p className="text-[15px]">Assignments</p>
            <h2 className="text-[24px] my-2 font-semibold">26/50 students</h2>
            <p className="text-[#FF3B30] text-[15px]">Submitted</p>
          </NavLink>
          <NavLink to="application" className={getNavLinkClassName}>
            <p className="text-[15px]">Capstone</p>
            <h2 className="text-[24px] my-2 font-semibold">26/50 students</h2>
            <p className="text-[#FF3B30] text-[15px]">Submitted</p>
          </NavLink>
          <NavLink to="faculty" className={getNavLinkClassName}>
            <div className="flex justify-between items-center w-full">
              <div>
                <p className="text-[15px]">Quizzes</p>
                <h2 className="text-[24px] my-2 font-semibold">45/50</h2>
                <p className="text-[#FF3B30] text-[15px]">Submitted</p>
              </div>
              <BsQuestionSquareFill className="text-[34px]" />
            </div>
          </NavLink>
          <NavLink to="faculty" className={getNavLinkClassName}>
            <div className="flex justify-between items-center w-full">
              <div>
                <p className="text-[15px]">Polls</p>
                <h2 className="text-[24px] my-2 font-semibold">45/50</h2>
                <p className="text-[#FF3B30] text-[15px]">Submitted</p>
              </div>
              <BsQuestionSquareFill className="text-[34px]" />
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default PerformanceScores;
