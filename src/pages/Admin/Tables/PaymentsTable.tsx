// import ApiTable from "~/components/table/ApiTable";
import { TableColumn } from "react-data-table-component";
import { Avatar } from "~/components/dashboard/Avatar";
// import { useNavigate } from "react-router-dom";
// import { useCallback, useState } from "react";
import moment from "moment";
import { Status } from "~/components/ui/Badge";
import { statColorCode } from "~/utils/helpers";
// import TableFilter from "~/components/table/TableFilter";
import InDataTable from "~/components/table/InDataTable";
import { paymentData } from "~/components/constants/data";
import FilterDropdown from "~/components/table/filterOptions";
import { useState } from "react";

interface MerchantTableRow {
  id: string;
  avatar: string;
  sn: number;
  name: string;
  email: string;
  amount: string;
  program: string;
  createdAt: string;
  status: string;
}

const payment_status = [
  { value: "", label: "All" },
  { value: 2, label: "Accepted" },
  { value: 0, label: "Rejected" },
  { value: 1, label: "Pending" },
];

const PaymentsTable = () => {
  const [filter, setFilter] = useState("");

  //   Merchant Table
  const columns: TableColumn<MerchantTableRow>[] = [
    {
      name: "S/N",
      selector: (row: { sn: number }) => row.sn,
      cell: (_row, index: number) => index + 1,
      width: "60px",
    },
    {
      name: "Full name",
      selector: (row: { name: string }) => row.name,
      sortable: true,
      cell: (row) => (
        <div className="flex justify-start gap-2 items-center">
          <Avatar
            img={row.avatar ?? ""}
            name={row.name}
            avatarClassName="md:h-8 h-8 w-8 md:w-8 rounded-full"
            textClassName="font-medium text-sm max-md:hidden"
            wrapperClassName="max-md:gap-0"
          />
          <h2 className="text-[12px] font-semibold font-CircularStd text-[#515F76]">
            {row.name}
          </h2>
        </div>
      ),
    },
    {
      name: "Program",
      selector: (row: { program: string }) => row.program,
      sortable: true,
    },
    {
      name: "Email Address",
      selector: (row: { email: string }) => row.email,
      sortable: true,
    },
    {
      name: "Amount",
      selector: (row: { amount: string }) => row.amount,
      sortable: true,
    },
    {
      name: "Date",
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
      width: "160px",
    },
  ];

  return (
    <div className="w-full pb-4 flex justify-center items-center bg-[#fff]">
      <div className="w-[99%]">
        <InDataTable<MerchantTableRow>
          columns={columns}
          data={paymentData}
          paginatable={false}
          searchable
          title="Student Payment"
          isFilterable
          // pagination={false}
        >
          <FilterDropdown
            filter={filter}
            setFilter={setFilter}
            options={payment_status}
          />
        </InDataTable>
      </div>
    </div>
  );
};

export default PaymentsTable;
