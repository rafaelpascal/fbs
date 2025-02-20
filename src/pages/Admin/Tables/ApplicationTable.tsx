// import ApiTable from "~/components/table/ApiTable";
import { TableColumn } from "react-data-table-component";
import { Avatar } from "~/components/dashboard/Avatar";
import { useNavigate } from "react-router-dom";
// import { useCallback, useState } from "react";
import moment from "moment";
import InDataTable from "~/components/table/InDataTable";
import ActionMenu from "~/components/table/ActionMenu";
import { useEffect, useState } from "react";
import { ContactModal } from "~/components/Modal/ContactModal";
import { useFetchApplication } from "~/api/course/hooks";

interface MerchantTableRow {
  applicationid: string;
  avatar: string;
  sn: number;
  firstname: string;
  lastname: string;
  email: string;
  amount: string;
  course_title: string;
  createdAt: string;
  status: string;
  application_status: number;
}

const ApplicationTable = () => {
  const [isContact, setIscontact] = useState(false);
  const { data } = useFetchApplication();
  const navigate = useNavigate();
  const [applicationData, setapplicationData] = useState([]);
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

  useEffect(() => {
    if (data) {
      console.log(data);

      setapplicationData(data?.data);
    }
  }, [data]);

  // View a Row
  const handleView = (id: string) => {
    navigate(`/admin/dashboard/application/${id}`);
  };

  // Handle handlecontact
  const handlecontact = (id: string) => {
    setIscontact(true);
    console.log(id);
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
      selector: (row: { firstname: string }) => row.firstname,
      sortable: true,
      cell: (row) => (
        <div className="flex justify-start gap-2 items-center">
          <Avatar
            img={row.avatar ?? ""}
            name={`${row.lastname} ${row.firstname}`}
            avatarClassName="md:h-8 h-8 w-8 md:w-8 rounded-full"
            textClassName="font-medium text-sm max-md:hidden"
            wrapperClassName="max-md:gap-0"
          />
          <h2 className="text-[12px] font-semibold font-CircularStd text-[#515F76]">
            {row.lastname} {row.firstname}
          </h2>
        </div>
      ),
    },
    {
      name: "Program",
      selector: (row: { course_title: string }) => row.course_title,
      sortable: true,
    },
    {
      name: "Email Address",
      selector: (row: { email: string }) => row.email,
      sortable: true,
    },
    // {
    //   name: "Amount",
    //   selector: (row: { amount: string }) => row.amount,
    //   sortable: true,
    // },
    {
      name: "Application Date",
      selector: (row: { createdAt: string }) => row.createdAt,
      cell: (row) => (
        <div className="flex justify-center items-center rounded-[4px]">
          {moment(row.createdAt).format("MM/DD/YYYY")}
        </div>
      ),
    },
    {
      name: "Admission Status",
      selector: (row: { application_status: number }) => row.application_status,
      cell: (row) => (
        <div>
          {row.application_status === 2 && (
            <h2 className="text-green-600 font-semibold">Accepted</h2>
          )}
          {row.application_status === 1 && (
            <h2 className="text-yellow-600 font-semibold">Pending</h2>
          )}
          {row.application_status === 3 && (
            <h2 className="text-red-600 font-semibold">Rejected</h2>
          )}
        </div>
      ),
      width: "160px",
    },
    {
      name: "Application Status",
      selector: (row: { status: string }) => row.status,
      cell: (row) => (
        <div>
          {parseInt(row.status) === 1 ? (
            <h2 className="text-green-600 font-semibold">Completed</h2>
          ) : (
            <h2 className="text-red-600 font-semibold">Incomplete</h2>
          )}
        </div>
      ),
      width: "160px",
    },
    {
      name: "Actions",
      cell: (row) => (
        <ActionMenu
          actions={[
            { label: "View", action: () => handleView(row.applicationid) },
            {
              label: "Contact Student",
              action: () => handlecontact(row.applicationid),
            },
          ]}
        />
      ),
      width: "100px",
      ignoreRowClick: true,
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
          data={applicationData}
          paginatable={false}
          searchable={false}
          // pagination={false}
        />
      </div>
      <ContactModal isOpen={isContact} closeModal={handleClose} />
    </div>
  );
};

export default ApplicationTable;
