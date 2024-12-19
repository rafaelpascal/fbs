// import ApiTable from "~/components/table/ApiTable";
import { TableColumn } from "react-data-table-component";
// import { useCallback, useState } from "react";
// import moment from "moment";
import { Status } from "~/components/ui/Badge";
import { statColorCode } from "~/utils/helpers";
// import TableFilter from "~/components/table/TableFilter";
import InDataTable from "~/components/table/InDataTable";
import { AssignmentData } from "~/components/constants/data";
import { useState } from "react";
import { ContactModal } from "~/components/Modal/ContactModal";

interface MerchantTableRow {
  id: string;
  avatar: string;
  sn: number;
  name: string;
  assignments: string;
  feedback: string;
  submitted: string;
  score: string;
  status: string;
}

const QuizzesTable = () => {
  const [isContact, setIscontact] = useState(false);
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

  //   Merchant Table
  const columns: TableColumn<MerchantTableRow>[] = [
    {
      name: "S/N",
      selector: (row: { sn: number }) => row.sn,
      cell: (_row, index: number) => index + 1,
      width: "60px",
    },
    {
      name: "Name",
      selector: (row: { name: string }) => row.name,
      sortable: true,
    },
    {
      name: "Submitted",
      selector: (row: { submitted: string }) => row.submitted,
      sortable: true,
    },
    {
      name: "Quizzes",
      selector: (row: { assignments: string }) => row.assignments,
      sortable: true,
    },
    {
      name: "Feedback",
      selector: (row: { feedback: string }) => row.feedback,
      cell: (row) => (
        <div className="flex justify-between items-center rounded-[4px]">
          <button className="p-2 text-[#333] font-DMSans font-semibold ml-2">
            {row.feedback}
          </button>
        </div>
      ),
      sortable: true,
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
    },
    {
      name: "Student’s Score",
      selector: (row: { score: string }) => row.score,
      cell: (row) => (
        <div className="flex justify-between items-center rounded-[4px]">
          <h2 className="border-[1px] border-[#333] p-2 font-DMSans font-semibold">
            {row.score}
          </h2>
          <button className="bg-[#F01E00] p-2 text-[#fff] font-DMSans font-semibold ml-2">
            Submit
          </button>
        </div>
      ),
      sortable: true,
      width: "160px",
    },
  ];

  const handleClose = () => {
    setIscontact(false);
  };

  return (
    <div className="w-full pb-4 flex justify-center items-center bg-[#fff]">
      <div className="w-[99%]">
        <InDataTable<MerchantTableRow>
          columns={columns}
          data={AssignmentData}
          paginatable={false}
          searchable={false}
          // pagination={false}
        />
      </div>
      <ContactModal isOpen={isContact} closeModal={handleClose} />
    </div>
  );
};

export default QuizzesTable;
