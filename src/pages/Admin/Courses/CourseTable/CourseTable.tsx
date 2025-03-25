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
// import { ContactModal } from "~/components/Modal/ContactModal";

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
  status: string;
  course_url: string;
}

const CourseTable = () => {
  const { theme } = useTheme();
  const [, setIscontact] = useState(false);
  const [isNewcohort, setIsNewcohort] = useState({
    courseId: 0,
    status: false,
  });
  const navigate = useNavigate();
  const { success, error } = useToast();
  const { data } = fetchlistCourses();
  const [couseData, setCourseData] = useState(courseData);

  useEffect(() => {
    if (data?.course_details) {
      setCourseData(data?.course_details);
    }
  }, [data]);

  // const [filters, setFilters] = useState({
  //   dateFrom: "",
  //   dateTo: "",
  //   status: "",
  // });

  // const handleStatusChange = useCallback(
  //   (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
  //     setFilters((prev) => ({
  //       ...prev,
  //       status: event.target.value,
  //     }));
  //   },
  //   []
  // );

  // handleToggleAction
  // const handleFilterChange = useCallback(
  //   (filter: { dateFrom?: string; dateTo?: string; status?: string }) => {
  //     setFilters((prev) => ({
  //       ...prev,
  //       ...filter,
  //     }));
  //   },
  //   []
  // );

  // // handle Date Change
  // const handleDateChange = useCallback(
  //   (dateFrom: string, dateTo: string) => {
  //     handleFilterChange({ dateFrom, dateTo });
  //   },
  //   [handleFilterChange]
  // );

  // View a Row
  const handleView = (id: number) => {
    navigate("/admin/students/newcourse", { state: { courseId: id } });
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
    // {
    //   name: "Status",
    //   selector: (row: { status: string }) => row.status,
    //   cell: (row) => (
    //     <Status
    //       status={statColorCode(row?.status?.toString())}
    //       text={row?.status?.toString() || ""}
    //     />
    //   ),
    //   width: "120px",
    // },
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
    // {
    //   name: "No. Applications",
    //   selector: (row: { application: string }) => row.application,
    //   sortable: true,
    // },
    {
      name: "Actions",
      cell: (row) => (
        <ActionMenu
          actions={[
            { label: "Edit", action: () => handleView(row.coursesid) },
            { label: "Delete", action: () => handlecontact(row.coursesid) },
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

  const handleClose = () => {
    setIscontact(false);
    setIsNewcohort({
      courseId: 0,
      status: false,
    });
  };

  return (
    <div
      className={cn(
        "w-full pb-4 flex justify-center items-center",
        theme === "dark" ? "bg-[#333]" : "bg-[#fff]"
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
            searchable={false}
            // pagination
          />
        </div>
      )}

      {/* <ContactModal isOpen={isContact} closeModal={handleClose} /> */}
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
