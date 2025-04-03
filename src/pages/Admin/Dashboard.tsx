import CourseListCard from "~/components/cards/CourseListCard";
import InstructorsCard from "~/components/cards/InstructorsCard";
import NotificationCard from "~/components/cards/NotificationCard";
import { RevenueCardRow } from "~/components/cards/RevenueCardRow";
import { DoughnutChartDemo } from "~/components/charts/Doughnut";
import { LineChartDemo } from "~/components/charts/line-chart";
import {
  CourseList,
  Instructurs,
  Notifications,
} from "~/components/constants/data";
import { RevenueCards } from "~/components/dashboard/RevenueCards";
import { DashboardArea } from "~/layouts/DashboardArea";

const Dashboard = () => {
  const dashboardData = {
    businessCount: 0,
    customersCount: 0,
    merchantCount: 0,
    beneficiaryCount: 0,
  };
  const {
    businessCount = 0,
    customersCount = 0,
    merchantCount = 0,
    beneficiaryCount = 0,
  } = dashboardData;

  const revenueHeroCards = RevenueCards({
    merchantCount,
    businessCount,
    beneficiaryCount,
    customersCount,
  });

  // Function to determine NavLink className
  // const getNavLinkClassName = useCallback(
  //   ({ isActive }: { isActive: boolean }) =>
  //     isActive
  //       ? "bg-[#FF3B30] text-[20px] h-[24px] w-auto px-2 flex justify-center items-center rounded-[4px] font-DMSans font-normal py-4 text-[#FFFFFF]"
  //       : "text-[20px] h-[24px] w-auto flex justify-center items-center font-DMSans font-normal bg-transparent text-[#8F94A8] px-2 py-4 rounded-[4px]",
  //   []
  // );
  return (
    <DashboardArea>
      <div>
        <h2 className="font-bold font-DMSans text-[30px]">Dashboard</h2>
        <div className="w-full py-2 rounded-[8px] shadow-lg my-6 z-0">
          <RevenueCardRow dashboardHeroCards={revenueHeroCards} />
        </div>
        <div className="flex flex-col lg:flex-row flex-wrap w-full h-full my-4 justify-between items-center">
          <div className="w-full lg:w-[49%] shadow-lg rounded-lg">
            <LineChartDemo />
          </div>
          <div className="w-full lg:w-[49%] shadow-lg rounded-lg">
            <DoughnutChartDemo />
          </div>
        </div>
        <div className="flex justify-between flex-col lg:flex-row items-start">
          <div className="rounded-lg w-full lg:w-[470px] shadow-lg p-4">
            <div className="flex border-b-[2px] py-4 justify-between items-center">
              <h2 className="font-DMSans font-bold text-[17px]">Instructors</h2>
              <button className="underline text-[#FF3B30] text-[14px] font-DMSans font-semibold">
                View All
              </button>
            </div>
            <div className="h-[356px] scrollbar-style overflow-y-auto">
              {Instructurs.map((details, index) => (
                <InstructorsCard
                  key={index}
                  name={details.name}
                  Reviews={details.Reviews}
                  Students={details.Students}
                  Courses={details.Courses}
                />
              ))}
            </div>
            <div className="w-full mt-4 flex justify-end items-center">
              <button className="text-[#FF3B30] text-[16px] p-2 rounded-md hover:bg-[#FF3B30] hover:text-[#fff] text-right font-DMSans font-semibold transition delay-150 duration-300 ease-in-out">
                + Add New Instructor
              </button>
            </div>
          </div>
          <div className="rounded-lg w-full lg:w-[470px] shadow-lg p-4">
            <div className="flex border-b-[2px] py-4 justify-between items-center">
              <h2 className="font-DMSans font-bold text-[17px]">Courses</h2>
              <button className="underline text-[#FF3B30] text-[14px] font-DMSans font-semibold">
                View All
              </button>
            </div>
            <div className="h-[356px] scrollbar-style overflow-y-auto">
              {CourseList.map((course, index) => (
                <CourseListCard
                  key={index}
                  title={course.title}
                  img={course.img}
                  instructorname={course.name}
                  lesson={course.lesson}
                  duration={course.duration}
                />
              ))}
            </div>
            <div className="w-full mt-4 flex justify-end items-center">
              <button className="text-[#FF3B30] text-[16px] p-2 rounded-md hover:bg-[#FF3B30] hover:text-[#fff] text-right font-DMSans font-semibold transition delay-150 duration-300 ease-in-out">
                + Add New Course
              </button>
            </div>
          </div>
          <div className="rounded-lg w-full lg:w-[470px] shadow-lg p-4">
            <div className="flex border-b-[2px] py-4 justify-between items-center">
              <h2 className="font-DMSans font-bold text-[17px]">
                Notifications
              </h2>
            </div>
            <div className="h-[414px] scrollbar-style overflow-y-auto">
              {Notifications.map((nf, index) => (
                <NotificationCard
                  key={index}
                  icon={nf.icon}
                  title={nf.title}
                  time={nf.time}
                  containerClass={nf.containerClass}
                />
              ))}
            </div>
          </div>
        </div>
        {/* <div
          className={cn(
            "w-full  z-0 mt-6 pt-[16px] shadow-lg rounded-[8px]",
            theme === "dark" ? "bg-[#333]" : "bg-[#fff]"
          )}
        >
          <div className="w-auto mb-4 mx-4 overflow-x-auto border-[1px] border-[#F4F5F8] rounded-[8px] p-2 flex justify-start items-center gap-3">
            <NavLink to="payment" className={getNavLinkClassName}>
              Payments
            </NavLink>
            <NavLink to="application" className={getNavLinkClassName}>
              Students/Applications
            </NavLink>
            <NavLink to="faculty" className={getNavLinkClassName}>
              Faculties
            </NavLink>
          </div>
          <div className="p-4">
            <Outlet />
          </div>
        </div> */}
      </div>
    </DashboardArea>
  );
};

export default Dashboard;
