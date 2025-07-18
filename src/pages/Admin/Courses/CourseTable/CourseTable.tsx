// import ApiTable from "~/components/table/ApiTable";
import { TableColumn } from "react-data-table-component";
import { useNavigate } from "react-router-dom";
// import { useCallback, useState } from "react";
import moment from "moment";
// import { Status } from "~/components/ui/Badge";
import { cn } from "~/utils/helpers";
// import TableFilter from "~/components/table/TableFilter";
import InDataTable from "~/components/table/InDataTable";
import { courseData } from "~/components/constants/data";
import ActionMenu from "~/components/table/ActionMenu";
import { useEffect, useState } from "react";
import { NewCohortModal } from "~/components/Modal/NewCohortModal";
import { showAlert } from "~/utils/sweetAlert";
import { useTheme } from "~/context/theme-provider";
import { fetchlistCourses } from "~/api/course/hooks";
import useToast from "~/hooks/useToast";
import { LoadingSpinner } from "~/components/ui/loading-spinner";
import { DeleteCourseModal } from "~/components/Modal/DeleteCourseModal";

interface MerchantTableRow {
  coursesid: number;
  id: number;
  avatar: string;
  sn: number;
  course_title: string;
  course_startdate: string;
  course_enddate: string;
  application: string;
  creators: string;
  created_at: string;
  course_status: number;
  course_url: string;
  no_of_applications: number;
}

const CourseTable = () => {
  const { theme } = useTheme();
  const [, setIscontact] = useState(false);
  const [isNewcohort, setIsNewcohort] = useState({
    courseId: 0,
    status: false,
  });
  const [usedeleteCourse, setUsedeleteCourse] = useState({
    courseId: 0,
    status: false,
  });
  const navigate = useNavigate();
  const { success, error } = useToast();
  const { data, refetch } = fetchlistCourses();
  const [couseData, setCourseData] = useState(courseData);

  useEffect(() => {
    if (data?.course_details) {
      setCourseData(data?.course_details);
    }
  }, [data]);

  // View a Row
  const handleView = (id: number) => {
    navigate("/admin/courses/newcourse", { state: { courseId: id } });
  };

  // Handle handlecontact
  const handlecontact = (id: number) => {
    console.log(id);
    setIscontact(true);
  };

  const handleCopyLink = (courseUrl: string) => {
    navigator.clipboard.writeText(courseUrl).then(
      () => {
        success("Link copied!");
      },
      (err) => {
        error("Failed to copy link.");
        console.error("Failed to copy link:", err);
      }
    );
  };

  //   Merchant Table
  const columns: TableColumn<MerchantTableRow>[] = [
    {
      name: "S/N",
      selector: (row: { sn: number }) => row.sn,
      cell: (_row, index: number) => index + 1,
      width: "50px",
    },
    {
      name: "Title",
      selector: (row: { course_title: string }) => row.course_title,
      sortable: true,
      cell: (row) => (
        <div className="flex justify-start gap-2 items-center">
          <h2 className="text-[16px] font-normal font-DMSans">
            {row.course_title}
          </h2>
        </div>
      ),
      width: "400px",
    },
    {
      name: "Date created",
      selector: (row: { created_at: string }) => row.created_at,
      cell: (row) => (
        <div className="flex justify-center items-center rounded-[4px]">
          {moment(row.created_at).format("MM/DD/YYYY")}
        </div>
      ),
    },
    {
      name: "Status",
      selector: (row: { course_status: number }) => row.course_status,
      cell: (row) => (
        <div className="flex justify-center items-center rounded-[4px]">
          {row.course_status === 2 ? (
            <p className="font-semibold text-green-500 font-DMSans">
              Published
            </p>
          ) : (
            <p className="font-semibold text-gray-600 font-DMSans">Draft</p>
          )}
        </div>
      ),
      width: "120px",
    },
    {
      name: "Creator",
      selector: (row: { creators: string }) => row.creators,
      sortable: true,
    },
    {
      name: "Starting",
      selector: (row: { course_startdate: string }) => row.course_startdate,
      cell: (row) => (
        <div className="flex justify-center items-center rounded-[4px]">
          {moment(row.course_startdate).format("MM/DD/YYYY")}
        </div>
      ),
    },
    {
      name: "Ending",
      selector: (row: { course_enddate: string }) => row.course_enddate,
      cell: (row) => (
        <div className="flex justify-center items-center rounded-[4px]">
          {moment(row.course_enddate).format("MM/DD/YYYY")}
        </div>
      ),
    },
    {
      name: "No. Applications",
      selector: (row: { no_of_applications: number }) => row.no_of_applications,
      cell: (row) => (
        <div className="flex justify-center items-center rounded-[4px]">
          <p>{row.no_of_applications}</p>
        </div>
      ),
    },
    {
      name: "Actions",
      cell: (row) => (
        <ActionMenu
          actions={[
            { label: "Edit", action: () => handleView(row.coursesid) },
            {
              label: "Delete",
              action: () =>
                setUsedeleteCourse({ courseId: row.coursesid, status: true }),
            },
            {
              label: "Add Cohort",
              action: () => setIsNewcohort({ courseId: row.id, status: true }),
            },
            { label: "Suspend", action: () => handlecontact(row.id) },
            {
              label: "Copy link",
              action: () => handleCopyLink(row.course_url),
            },
          ]}
        />
      ),
      width: "80px",
      ignoreRowClick: true,
    },
  ];

  const handleSuccess = async () => {
    setIsNewcohort({
      courseId: 0,
      status: false,
    });
    await showAlert(
      "success",
      "Created!",
      "Cohort Successfully Created!",
      "Ok",
      "#03435F"
    );
  };

  const handleCourseDeleted = async () => {
    refetch();
    setUsedeleteCourse({
      courseId: 0,
      status: false,
    });
    await showAlert(
      "success",
      "Deleted!",
      "Course Deleted Successfully!",
      "Ok",
      "#03435F"
    );
  };

  const handleClose = () => {
    setIscontact(false);
    setIsNewcohort({
      courseId: 0,
      status: false,
    });
    setUsedeleteCourse({
      courseId: 0,
      status: false,
    });
  };

  return (
    <div
      className={cn(
        "w-full pb-4 flex mt-10 py-4 shadow-lg rounded-md justify-center items-center",
        theme === "dark" ? "bg-[#333] border border-[#ddd]" : "bg-[#fff]"
      )}
    >
      {!data ? (
        <div className=" w-full h-[300px] flex justify-center items-center">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="w-[99%]">
          <InDataTable<MerchantTableRow>
            columns={columns}
            data={couseData}
            paginatable
            // isFilterable
            searchable
            title="All Courses"
            // pagination
          />
        </div>
      )}

      <DeleteCourseModal
        id={usedeleteCourse.courseId}
        message="Are you sure you want to delete this course?"
        isOpen={usedeleteCourse.status}
        closeModal={handleClose}
        onsuccess={handleCourseDeleted}
      />
      <NewCohortModal
        courseId={isNewcohort.courseId}
        isOpen={isNewcohort.status}
        handlecreate={handleSuccess}
        closeModal={handleClose}
      />
    </div>
  );
};

export default CourseTable;
