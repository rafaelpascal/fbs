import { TableColumn } from "react-data-table-component";
// import { useNavigate } from "react-router-dom";
import moment from "moment";
import { cn } from "~/utils/helpers";
import InDataTable from "~/components/table/InDataTable";
import { courseData } from "~/components/constants/data";
import ActionMenu from "~/components/table/ActionMenu";
import { useEffect, useState } from "react";
import { useTheme } from "~/context/theme-provider";
import { fetchlistUsers } from "~/api/course/hooks";
import { LoadingSpinner } from "~/components/ui/loading-spinner";
import { NewAdminModal } from "~/components/Modal/NewAdminModal";
import { showAlert } from "~/utils/sweetAlert";
// import { ContactModal } from "~/components/Modal/ContactModal";

interface MerchantTableRow {
  user_id: number;
  id: number;
  firstname: string;
  sn: number;
  lastname: string;
  othernames: string;
  email: string;
  phone: string;
  created_by: string;
  created_at: string;
  user_role: number;
}

const AccountTable = ({ created }: { created: boolean }) => {
  const { theme } = useTheme();
  const [, setIscontact] = useState(false);
  //   const navigate = useNavigate();
  const [isNewAdmin, setisNewAdmin] = useState(false);
  const [adminId, setAdminId] = useState(0);
  //   const { success, error } = useToast();
  const { data, refetch } = fetchlistUsers();
  const [couseData, setCourseData] = useState(courseData);

  useEffect(() => {
    if (data) {
      setCourseData(data.data);
    }
  }, [data]);

  useEffect(() => {
    if (created) {
      refetch();
    }
  }, [created]);

  const handleSuccess = () => {
    refetch();
    showAlert(
      "success",
      "Created!",
      "Admin Successfully Updated!",
      "Ok",
      "#03435F"
    );
    setisNewAdmin(false);
  };

  // View a Row
  const handleEdit = (id: number) => {
    setisNewAdmin(true);
    setAdminId(id);
  };

  // Handle handlecontact
  const handlecontact = (id: number) => {
    console.log(id);
    setIscontact(true);
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
      name: "First Name",
      selector: (row: { firstname: string }) => row.firstname,
      sortable: true,
      cell: (row) => (
        <div className="flex justify-start gap-2 items-center">
          <h2 className="text-[16px] font-normal font-DMSans">
            {row.firstname}
          </h2>
        </div>
      ),
    },
    {
      name: "Last Name",
      selector: (row: { lastname: string }) => row.lastname,
      sortable: true,
      cell: (row) => (
        <div className="flex justify-start gap-2 items-center">
          <h2 className="text-[16px] font-normal font-DMSans">
            {row.lastname}
          </h2>
        </div>
      ),
    },
    {
      name: "User Type",
      selector: (row: { user_role: number }) => row.user_role,
      sortable: true,
      cell: (row) => (
        <div className="flex justify-start gap-2 items-center">
          <h2 className="text-[16px] font-normal font-DMSans">
            {row.user_role === 1 ? "Admin" : "User"}
          </h2>
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
      name: "Phone",
      selector: (row: { phone: string }) => row.phone,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row: { email: string }) => row.email,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <ActionMenu
          actions={[
            { label: "Edit", action: () => handleEdit(row.id) },
            { label: "Delete", action: () => handlecontact(row.id) },
          ]}
        />
      ),
      width: "80px",
      ignoreRowClick: true,
    },
  ];

  const handleClose = () => {
    setisNewAdmin(false);
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
      <NewAdminModal
        id={adminId}
        isOpen={isNewAdmin}
        handlecreate={handleSuccess}
        closeModal={handleClose}
      />
    </div>
  );
};

export default AccountTable;
``;
