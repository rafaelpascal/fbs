import ApiTable from "~/components/table/ApiTable";
import { TableColumn } from "react-data-table-component";
import { Avatar } from "~/components/dashboard/Avatar";
import { useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import moment from "moment";
import { Status } from "~/components/ui/Badge";
import { statColorCode } from "~/utils/helpers";
import TableFilter from "~/components/table/TableFilter";

interface MerchantTableRow {
  id: string;
  db_id: string;
  avatar: string;
  sn: number;
  firstName: string;
  email: string;
  phone: string;
  address: string;
  createdAt: string;
  status: string;
}

const FacultiesTable = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    dateFrom: "",
    dateTo: "",
    status: "",
  });

  const handleStatusChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
      setFilters((prev) => ({
        ...prev,
        status: event.target.value,
      }));
    },
    []
  );

  // handleToggleAction
  const handleFilterChange = useCallback(
    (filter: { dateFrom?: string; dateTo?: string; status?: string }) => {
      setFilters((prev) => ({
        ...prev,
        ...filter,
      }));
    },
    []
  );

  // handle Date Change
  const handleDateChange = useCallback(
    (dateFrom: string, dateTo: string) => {
      handleFilterChange({ dateFrom, dateTo });
    },
    [handleFilterChange]
  );

  const handlemerchantRowClick = (id: string) => {
    navigate(`/account-management/merchant/${id}`);
  };

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
      selector: (row: { firstName: string }) => row.firstName,
      sortable: true,
      width: "250px",
      cell: (row) => (
        <div className="flex justify-start gap-2 items-center">
          <Avatar
            img={row.avatar ?? ""}
            name={row.firstName}
            avatarClassName="md:h-11 h-8 w-8 md:w-11"
            textClassName="font-medium text-sm max-md:hidden"
            wrapperClassName="max-md:gap-0"
          />
          <h2 className="text-[12px] font-semibold font-CircularStd text-[#515F76]">
            {row.firstName}
          </h2>
        </div>
      ),
    },
    {
      name: "Email Address",
      selector: (row: { email: string }) => row.email,
      sortable: true,
      width: "250px",
    },
    {
      name: "Phone",
      selector: (row: { phone: string }) => row.phone,
      sortable: true,
    },
    {
      name: "Address",
      selector: (row: { address: string }) => row.address,
      sortable: true,
      width: "200px",
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
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex gap-2 transition-transform duration-300 hover:translate-x-1">
          <button
            onClick={() => handlemerchantRowClick(row.id)}
            className="bg-[#03435F] px-2 h-[27px] flex justify-center items-center rounded-[4px] text-[12px] font-semibold font-DMSans text-[#fff] "
          >
            View
          </button>
        </div>
      ),
      ignoreRowClick: true,
    },
  ];

  return (
    <div className="relative">
      <ApiTable
        title="List of Payments"
        columns={columns}
        paginatable
        isFilterable
        filters={filters}
        apiUrl="https://dummyjson.com/users"
      >
        <TableFilter
          handleDateChange={handleDateChange}
          handleInputChange={handleStatusChange}
          filters={filters}
          showAmountFilter={false}
        />
      </ApiTable>
    </div>
  );
};

export default FacultiesTable;
