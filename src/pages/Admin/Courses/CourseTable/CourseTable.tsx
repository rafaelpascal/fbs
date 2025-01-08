// import ApiTable from "~/components/table/ApiTable";
import { TableColumn } from "react-data-table-component";
import { useNavigate } from "react-router-dom";
// import { useCallback, useState } from "react";
import moment from "moment";
import { Status } from "~/components/ui/Badge";
import { cn, statColorCode } from "~/utils/helpers";
// import TableFilter from "~/components/table/TableFilter";
import InDataTable from "~/components/table/InDataTable";
import { courseData } from "~/components/constants/data";
import ActionMenu from "~/components/table/ActionMenu";
import { useState } from "react";
import { NewCohortModal } from "~/components/Modal/NewCohortModal";
import { showAlert } from "~/utils/sweetAlert";
import { useTheme } from "~/context/theme-provider";
// import { ContactModal } from "~/components/Modal/ContactModal";

interface MerchantTableRow {
  id: number;
  avatar: string;
  sn: number;
  title: string;
  starting: string;
  ending: string;
  application: string;
  creator: string;
  createdAt: string;
  status: string;
}

const CourseTable = () => {
  const { theme } = useTheme();
  const [, setIscontact] = useState(false);
  const [isNewcohort, setIsNewcohort] = useState({
    courseId: 0,
    status: false,
  });
  const navigate = useNavigate();
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
    navigate(`/admin/dashboard/application/${id}`);
  };

  // Handle handlecontact
  const handlecontact = (id: number) => {
    setIscontact(true);
    console.log(id);
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
      selector: (row: { title: string }) => row.title,
      sortable: true,
      cell: (row) => (
        <div className="flex justify-start gap-2 items-center">
          <h2 className="text-[16px] font-semibold font-CircularStd text-[#515F76]">
            {row.title}
          </h2>
        </div>
      ),
      width: "400px",
    },
    {
      name: "Date created",
      selector: (row: { createdAt: string }) => row.createdAt,
      cell: (row) => (
        <div className="flex justify-center items-center rounded-[4px]">
          {moment(row.createdAt).format("MM/DD/YYYY")}
        </div>
      ),
    },
    {
      name: "Status",
      selector: (row: { status: string }) => row.status,
      cell: (row) => (
        <Status
          status={statColorCode(row?.status?.toString())}
          text={row?.status?.toString() || ""}
        />
      ),
      width: "120px",
    },
    {
      name: "Creator",
      selector: (row: { creator: string }) => row.creator,
      sortable: true,
    },
    {
      name: "Starting",
      selector: (row: { starting: string }) => row.starting,
      cell: (row) => (
        <div className="flex justify-center items-center rounded-[4px]">
          {moment(row.starting).format("MM/DD/YYYY")}
        </div>
      ),
    },
    {
      name: "Ending",
      selector: (row: { ending: string }) => row.ending,
      cell: (row) => (
        <div className="flex justify-center items-center rounded-[4px]">
          {moment(row.ending).format("MM/DD/YYYY")}
        </div>
      ),
    },
    {
      name: "No. Applications",
      selector: (row: { application: string }) => row.application,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <ActionMenu
          actions={[
            { label: "Edit", action: () => handleView(row.id) },
            { label: "Delete", action: () => handlecontact(row.id) },
            {
              label: "Add Cohort",
              action: () => setIsNewcohort({ courseId: row.id, status: true }),
            },
            { label: "Suspend", action: () => handlecontact(row.id) },
            { label: "Copy link", action: () => handlecontact(row.id) },
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
      <div className="w-[99%]">
        <InDataTable<MerchantTableRow>
          columns={columns}
          data={courseData}
          paginatable={false}
          searchable={false}
          // pagination={false}
        />
      </div>
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
