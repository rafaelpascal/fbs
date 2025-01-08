import { useState } from "react";
import { NewAdminModal } from "~/components/Modal/NewAdminModal";
import { DashboardArea } from "~/layouts/DashboardArea";

const AdminManagement = () => {
  const [isNewAdmin, setisNewAdmin] = useState(true);

  const handleSuccess = () => {
    console.log("Success");
  };

  const handleClose = () => {
    setisNewAdmin(false);
  };
  return (
    <DashboardArea>
      <div className="flex justify-between items-center w-full">
        <h2 className="text-[18px] font-DMSans font-semibold">Admin</h2>
        <button
          onClick={() => setisNewAdmin(true)}
          className="py-2 px-4 bg-[#FF1515] rounded-md"
        >
          <h2 className="text-[14px] font-DMSans font-semibold text-[#fff]">
            Add Admin
          </h2>
        </button>
      </div>
      <NewAdminModal
        isOpen={isNewAdmin}
        handlecreate={handleSuccess}
        closeModal={handleClose}
      />
    </DashboardArea>
  );
};

export default AdminManagement;
