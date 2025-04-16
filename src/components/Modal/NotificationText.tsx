import { useEffect, useState } from "react";
import { BaseModal } from "./BaseModal";
import { CourseServices } from "~/api/course";
import useToast from "~/hooks/useToast";
import { LoadingSpinner } from "../ui/loading-spinner";

interface IModalPropsType {
  isOpen: boolean;
  notificationId: number;
  closeModal: () => void;
}

export const NotificationText = ({
  isOpen,
  notificationId,
  closeModal,
}: IModalPropsType) => {
  const [loading, setLoading] = useState(false);
  const [message, setmessage] = useState("");
  const { error } = useToast();
  // Close modal
  const handleclose = () => {
    closeModal();
  };

  const getMyNotification = async () => {
    try {
      setLoading(true);
      const payload = {
        notificationid: notificationId,
      };
      const res = await CourseServices.getSingleNotification(payload);
      setmessage(res.data.data[0].messages);
      setLoading(false);
    } catch (err) {
      error("Failed to fetch Notification");
    }
  };

  useEffect(() => {
    if (notificationId) {
      getMyNotification();
    }
  }, [notificationId]);

  return (
    <BaseModal
      isOpen={isOpen}
      closeModal={closeModal}
      className="lg:min-w-[514px] "
    >
      <div className="flex w-full lg:w-[514px] h-auto p-6 flex-col items-center justify-center">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <h2 className="text-lg font-DMSans font-bold text-center w-full">
            {message}
          </h2>
        )}
        <div className="w-full flex justify-center items-center gap-3 mt-6">
          <button
            onClick={handleclose}
            className="w-auto px-8 py-2 rounded-[5px] text-[#fff] text-[16px] font-bold font-DMSans bg-[#ED342B] hover:bg-[#ED342B]/50 h-[36px] flex justify-center items-center"
          >
            Close
          </button>
        </div>
      </div>
    </BaseModal>
  );
};
