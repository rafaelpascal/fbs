import { useState } from "react";
import { DashboardArea } from "~/layouts/DashboardArea";
import NotificationTable from "./NotificationTable/NotificationTable";
import { showAlert } from "~/utils/sweetAlert";
import { BiBell } from "react-icons/bi";
import { NewNotificationModal } from "~/components/Modal/NewNotificationModal";

const Notifications = () => {
  const [isNewAdmin, setisNewAdmin] = useState(false);
  const [created, setCreated] = useState(false);

  const handleSuccess = () => {
    setCreated(true);
    showAlert(
      "success",
      "Created!",
      "Notification sent Successfully!",
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
        <h2 className="text-[25px] font-DMSans font-semibold">
          Notification Management
        </h2>
        <button
          onClick={() => setisNewAdmin(true)}
          className="py-2 flex justify-between items-center gap-3 px-4 bg-[#FF1515] rounded-md"
        >
          <h2 className="text-[14px] font-DMSans font-semibold text-[#fff]">
            New Notification
          </h2>
          <BiBell className="size-6 text-white" />
        </button>
      </div>
      <NotificationTable created={created} />
      <NewNotificationModal
        isOpen={isNewAdmin}
        // isOpen={true}
        handlecreate={handleSuccess}
        closeModal={handleClose}
      />
    </DashboardArea>
  );
};

export default Notifications;
