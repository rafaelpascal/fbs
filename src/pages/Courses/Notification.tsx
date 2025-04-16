import moment from "moment";
import { useEffect, useState } from "react";
import { AuthService } from "~/api/auth";
import { CourseServices } from "~/api/course";
import { FBSlogo } from "~/assets";
import { NotificationText } from "~/components/Modal/NotificationText";
import { LoadingSpinner } from "~/components/ui/loading-spinner";
import useToast from "~/hooks/useToast";
import { DashboardArea } from "~/layouts/DashboardArea";

const Notification = () => {
  const [selectedNotificationId, setSelectedNotificationId] = useState<
    string | null
  >(null);
  const Storeduser = AuthService.getSession();
  const [notification, setNotification] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { error } = useToast();

  const getMyNotification = async () => {
    try {
      setLoading(true);
      const payload = {
        userid: Storeduser?.user,
      };
      const res = await CourseServices.getMyNotification(payload);
      setNotification(res.data.data);
      setLoading(false);
    } catch (err) {
      error("Failed to fetch Notification");
    }
  };

  useEffect(() => {
    getMyNotification();
  }, []);
  const handleClose = () => {
    setSelectedNotificationId(null);
  };

  const filteredNotifications = notification?.filter((item: any) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <DashboardArea>
      {loading ? (
        <div className="flex w-full items-center justify-center h-[100vh]">
          <LoadingSpinner />
        </div>
      ) : (
        <div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by title..."
            className="w-full max-w-md px-4 py-2 border-2 shadow-md outline-none rounded-md mb-6"
          />
          {filteredNotifications?.map((item: any, index: number) => (
            <div
              key={index}
              className="flex mt-4 flex-wrap w-full justify-center bg-[#FF5050] rounded-2xl items-center"
            >
              <div className="w-full lg:w-[20%] bg-white h-[210px] lg:rounded-l-lg flex justify-center items-center rounded-b-2xl lg:rounded-r-2xl">
                <img
                  src={FBSlogo}
                  alt="biopaylogo"
                  width="50%"
                  className="mx-auto my-auto"
                />
              </div>
              <div className="lg:w-[80%] h-[210px] p-6 flex flex-col justify-between items-start flex-wrap bg-[#FF5050] rounded-b-lg lg:rounded-r-lg">
                <div className="w-full flex justify-between items-start flex-wrap">
                  <p className="text-2xl font-DMSans font-bold text-white text-left">
                    {item.title}
                  </p>
                  <p className="text-2xl font-DMSans italic font-normal text-white text-left">
                    {moment(item.created_at).format("MM/DD/YYYY")}
                  </p>
                </div>

                <div className="w-full lg:w-[20%] flex justify-end items-center gap-4">
                  <button
                    onClick={() => {
                      setSelectedNotificationId(item.id);
                    }}
                    className="font-DMSans font-semibold text-lg text-white"
                  >
                    View Message
                  </button>
                  <button className="font-DMSans font-semibold text-lg text-white">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
          {selectedNotificationId && (
            <NotificationText
              notificationId={Number(selectedNotificationId)}
              isOpen={true}
              closeModal={handleClose}
            />
          )}
        </div>
      )}
    </DashboardArea>
  );
};

export default Notification;
