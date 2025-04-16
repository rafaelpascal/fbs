import { TableColumn } from "react-data-table-component";
// import { useNavigate } from "react-router-dom";
import moment from "moment";
import { cn } from "~/utils/helpers";
import InDataTable from "~/components/table/InDataTable";
import { courseData } from "~/components/constants/data";
import ActionMenu from "~/components/table/ActionMenu";
import { useEffect, useState } from "react";
import { useTheme } from "~/context/theme-provider";
import { fetchlistNotification, fetchlistUsers } from "~/api/course/hooks";
import { LoadingSpinner } from "~/components/ui/loading-spinner";
// import { NewAdminModal } from "~/components/Modal/NewAdminModal";
// import { showAlert } from "~/utils/sweetAlert";
import FilterDropdown from "~/components/table/filterOptions";

interface NotificationTableRow {
  sn: number;
  id: number;
  title: string;
  messages: string;
  userid: number;
  status: number;
  created_at: string;
}

const filterOptions = [
  { value: "", label: "All" },
  { value: 1, label: "Admin" },
  { value: 0, label: "User" },
];

const NotificationTable = ({ created }: { created: boolean }) => {
  const { theme } = useTheme();
  const [, setIscontact] = useState(false);
  //   const navigate = useNavigate();
  // const [isNewAdmin, setisNewAdmin] = useState(false);
  // const [adminId, setAdminId] = useState(0);
  //   const { success, error } = useToast();
  const { data, refetch } = fetchlistUsers();
  const { data: notificationData } = fetchlistNotification();

  const [couseData, setCourseData] =
    useState<NotificationTableRow[]>(courseData);
  const [filter, setFilter] = useState("");

  const filteredData = filter
    ? couseData.filter((item) => item.title === filter)
    : couseData;

  useEffect(() => {
    if (notificationData) {
      setCourseData(notificationData.data);
    }
  }, [notificationData]);

  useEffect(() => {
    if (created) {
      refetch();
    }
  }, [created]);

  // const handleSuccess = () => {
  //   refetch();
  //   showAlert(
  //     "success",
  //     "Created!",
  //     "Notification sent Successfully!",
  //     "Ok",
  //     "#03435F"
  //   );
  //   setisNewAdmin(false);
  // };

  // View a Row
  // const handleEdit = (id: number) => {
  //   setisNewAdmin(true);
  //   setAdminId(id);
  // };

  // Handle handlecontact
  const handlecontact = (id: number) => {
    console.log(id);
    setIscontact(true);
  };

  //   Merchant Table
  const columns: TableColumn<NotificationTableRow>[] = [
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
          <h2 className="text-[16px] font-normal font-DMSans">{row.title}</h2>
        </div>
      ),
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
      selector: (row: { status: number }) => row.status,
      cell: (row) => (
        <div className="flex justify-center items-center rounded-[4px]">
          {row.status === 1 ? (
            <p className="font-DMSans text-red-500 text-sm font-semibold">
              Unread
            </p>
          ) : (
            <p className="font-DMSans text-green-500 text-sm font-semibold">
              Read
            </p>
          )}
        </div>
      ),
      sortable: true,
      //   width: "80px",
    },
    {
      name: "Actions",
      cell: (row) => (
        <ActionMenu
          actions={[
            // { label: "Edit", action: () => handleEdit(row.id) },
            { label: "Delete", action: () => handlecontact(row.id) },
          ]}
        />
      ),
      width: "80px",
      ignoreRowClick: true,
    },
  ];

  // const handleClose = () => {
  //   setisNewAdmin(false);
  // };

  return (
    <div
      className={cn(
        "w-full pb-4 flex justify-center mt-10 py-4 shadow-lg rounded-md items-center",
        theme === "dark" ? "bg-[#333] border border-[#ddd]" : "bg-[#fff]"
      )}
    >
      {!data ? (
        <div className=" w-full h-[300px] flex justify-center items-center">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="w-[99%]">
          <InDataTable<NotificationTableRow>
            title="Notification"
            columns={columns}
            data={filteredData}
            paginatable
            isFilterable={false}
            searchable
            // pagination
          >
            <FilterDropdown
              filter={filter}
              setFilter={setFilter}
              options={filterOptions}
            />
          </InDataTable>
        </div>
      )}
      {/* <NewAdminModal
        id={adminId}
        isOpen={isNewAdmin}
        handlecreate={handleSuccess}
        closeModal={handleClose}
      /> */}
    </div>
  );
};

export default NotificationTable;
``;
