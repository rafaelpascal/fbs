import { DashboardArea } from "~/layouts/DashboardArea";
import CourseTable from "./CourseTable/CourseTable";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "~/components/constants/routes";

const AdminCourses = () => {
  const navigate = useNavigate();

  const handleCreateCourse = () => {
    navigate(ROUTES.NEWCOURSE);
  };
  return (
    <DashboardArea>
      <div>
        <div className="flex justify-between items-center">
          <h2 className="font-bold font-DMSans text-[30px] mb-2">Courses</h2>
          <button
            onClick={handleCreateCourse}
            className="p-2 rounded-md bg-[#47C839]"
          >
            <p className="font-bold font-DMSans text-[14px] text-[#fff]">
              New course
            </p>
          </button>
        </div>
        <CourseTable />
      </div>
    </DashboardArea>
  );
};

export default AdminCourses;
