import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  fetchdashboardstats,
  fetchlistCourses,
  fetchlistNotification,
} from "~/api/course/hooks";
import CourseListCard from "~/components/cards/CourseListCard";
import InstructorsCard from "~/components/cards/InstructorsCard";
import NotificationCard from "~/components/cards/NotificationCard";
import { RevenueCardRow } from "~/components/cards/RevenueCardRow";
import { DoughnutChartDemo } from "~/components/charts/Doughnut";
import { LineChartDemo } from "~/components/charts/line-chart";
import { Instructurs, Notifications } from "~/components/constants/data";
import { RevenueCards } from "~/components/dashboard/RevenueCards";
import { DashboardArea } from "~/layouts/DashboardArea";

type APINotification = {
  id: number;
  title: string;
  messages: string;
  userid: number;
  status: number;
  created_at: string;
};

type Course = {
  course_title: string;
  images: string;
  creators: string;
  total_lessons: string; // if this is a number, you can change it to `lesson: number;`
  duration: string;
};

type StyledNotification = APINotification & {
  icon: React.FC<React.SVGProps<SVGSVGElement>>; // since you're assigning components like GrDocumentUser
  containerClass: string;
};

const Dashboard = () => {
  const { data: notificationData } = fetchlistNotification();
  const { data: dashboardStats } = fetchdashboardstats();
  const { data: courseList } = fetchlistCourses();
  const [courseData, setCourseData] = useState<Course[]>([]);
  const [newdashboardData, setDashboardData] = useState({
    Totalcourses: 0,
    Totalsales: 0,
    totalStudent: 0,
    totalLecturer: 0,
  });

  const [mergedNotifications, setMergedNotifications] = useState<
    StyledNotification[]
  >([]);

  useEffect(() => {
    if (dashboardStats && dashboardStats.data) {
      setDashboardData({
        Totalcourses: dashboardStats.data.total_courses || 0,
        Totalsales: 0,
        totalStudent: dashboardStats.data.total_students || 0,
        totalLecturer: dashboardStats.data.total_instructors || 0,
      });
    }
  }, [dashboardStats]);

  useEffect(() => {
    if (courseList?.course_details) {
      setCourseData(courseList?.course_details);
    }
  }, [courseList]);

  useEffect(() => {
    if (notificationData?.data) {
      const styled = notificationData.data.map(
        (item: APINotification, index: number): StyledNotification => {
          const styleInfo = Notifications[index % Notifications.length];
          return {
            ...item,
            icon: styleInfo.icon,
            containerClass: styleInfo.containerClass,
          };
        }
      );
      setMergedNotifications(styled);
    }
  }, [notificationData]);

  const dashboardData = {
    businessCount: newdashboardData.Totalcourses,
    customersCount: newdashboardData.totalLecturer,
    merchantCount: 0,
    beneficiaryCount: newdashboardData.totalStudent,
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
        <div className="flex flex-row w-full flex-wrap justify-between items-start">
          <div className="rounded-lg w-full lg:w-[33%] shadow-lg p-4">
            <div className="flex border-b-[2px] py-4 justify-between items-center">
              <h2 className="font-DMSans font-bold text-[17px]">Instructors</h2>
              <Link
                to="/admin/signup"
                className="underline text-[#FF3B30] text-[14px] font-DMSans font-semibold"
              >
                View All
              </Link>
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
              <Link
                to="/admin/signup"
                className="text-[#FF3B30] text-[16px] p-2 rounded-md hover:bg-[#FF3B30] hover:text-[#fff] text-right font-DMSans font-semibold transition delay-150 duration-300 ease-in-out"
              >
                + Add New Instructor
              </Link>
            </div>
          </div>
          <div className="rounded-lg w-full lg:w-[33%] shadow-lg p-4">
            <div className="flex border-b-[2px] py-4 justify-between items-center">
              <h2 className="font-DMSans font-bold text-[17px]">Courses</h2>
              <Link
                to="/admin/courses"
                className="underline text-[#FF3B30] text-[14px] font-DMSans font-semibold"
              >
                View All
              </Link>
            </div>
            <div className="h-[356px] scrollbar-style overflow-y-auto">
              {courseData.map((course: Course, index: number) => (
                <CourseListCard
                  key={index}
                  title={course.course_title}
                  img={course.images}
                  instructorname={course.creators}
                  lesson={course.total_lessons}
                  duration={course.duration}
                />
              ))}
            </div>
            <div className="w-full mt-4 flex justify-end items-center">
              <Link
                to="/admin/courses/newcourse"
                className="text-[#FF3B30] text-[16px] p-2 rounded-md hover:bg-[#FF3B30] hover:text-[#fff] text-right font-DMSans font-semibold transition delay-150 duration-300 ease-in-out"
              >
                + Add New Course
              </Link>
            </div>
          </div>
          <div className="rounded-lg w-full lg:w-[33%] shadow-lg p-4">
            <div className="flex border-b-[2px] py-4 justify-between items-center">
              <h2 className="font-DMSans font-bold text-[17px]">
                Notifications
              </h2>
            </div>
            <div className="h-[356px] scrollbar-style overflow-y-auto">
              {mergedNotifications?.map(
                (nf: StyledNotification, index: number) => (
                  <NotificationCard
                    key={index}
                    icon={nf.icon}
                    title={nf.title}
                    time={nf.created_at}
                    containerClass={nf.containerClass}
                  />
                )
              )}
            </div>
            <div className="w-full mt-4 flex justify-end items-center">
              <button className="text-[#FF3B30] text-[16px] p-2 rounded-md hover:bg-[#FF3B30] hover:text-[#fff] text-right font-DMSans font-semibold transition delay-150 duration-300 ease-in-out">
                Create Notification
              </button>
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
