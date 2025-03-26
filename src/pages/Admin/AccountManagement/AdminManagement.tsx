import { useState } from "react";
import { NewAdminModal } from "~/components/Modal/NewAdminModal";
import { DashboardArea } from "~/layouts/DashboardArea";
import AccountTable from "./AccountTable/AccountTable";
import { showAlert } from "~/utils/sweetAlert";

const AdminManagement = () => {
  const [isNewAdmin, setisNewAdmin] = useState(false);
  const [created, setCreated] = useState(false);

  const handleSuccess = () => {
    setCreated(true);
    showAlert(
      "success",
      "Created!",
      "Admin Successfully Created!",
      "Ok",
      "#03435F"
    );
  };

  const handleClose = () => {
    setisNewAdmin(false);
  };
  return (
    <DashboardArea>
      <div className="flex justify-between items-center w-full">
        <h2 className="text-[25px] font-DMSans font-semibold">Admin</h2>
        <button
          onClick={() => setisNewAdmin(true)}
          className="py-2 px-4 bg-[#FF1515] rounded-md"
        >
          <h2 className="text-[14px] font-DMSans font-semibold text-[#fff]">
            Add Admin
          </h2>
        </button>
      </div>
      <AccountTable created={created} />
      <NewAdminModal
        isOpen={isNewAdmin}
        handlecreate={handleSuccess}
        closeModal={handleClose}
      />
    </DashboardArea>
  );
};

export default AdminManagement;
