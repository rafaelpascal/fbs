import { Bell } from "react-huge-icons/outline";
import { Avatar } from "./Avatar";
import { useTheme } from "~/context/theme-provider";
import ThemeToggle from "../buttons/ThemeController";
import { Link } from "react-router-dom";
import { CourseServices } from "~/api/course";
import { useEffect, useState } from "react";
import useToast from "~/hooks/useToast";
import { AuthService } from "~/api/auth";
import { useSelector } from "react-redux";
import { RootState } from "~/redux-store/store";

// Top Nav
export const TopNav = () => {
  const { theme } = useTheme();
  const { error } = useToast();
  const Storeduser = AuthService.getSession();
  const [newNotification, setNewNotification] = useState(0);
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (user.role === 0) {
      AuthService.destroySession();
    }
  }, [user]);

  const getMyNotification = async () => {
    try {
      const payload = {
        userid: Storeduser?.user,
      };
      const res = await CourseServices.getMyNotification(payload);
      const unreadCount = res.data.data.filter(
        (item: any) => item.status === 1
      ).length;
      setNewNotification(unreadCount);
    } catch (err) {
      error("Failed to fetch Notification");
    }
  };

  useEffect(() => {
    getMyNotification();
  }, []);

  return (
    // skipcq: JS-0415
    <header
      className={`flex py-2 px-2 w-full justify-end items-center max-md:items-start ${
        theme === "light" ? "bg-[#EEF2F6]" : "bg-[#424141]"
      }`}
    >
      <div className="flex justify-center items-center gap-2">
        {user.role === 2 ? (
          <Link to="/student-profile">
            <Avatar
              img=""
              name="Emehelu Raphae;"
              avatarClassName="md:h-11 h-8 w-8 md:w-11"
              textClassName="font-medium text-sm"
              wrapperClassName="max-md:gap-0"
            ></Avatar>
          </Link>
        ) : (
          <Avatar
            img=""
            name="Emehelu Raphae;"
            avatarClassName="md:h-11 h-8 w-8 md:w-11"
            textClassName="font-medium text-sm"
            wrapperClassName="max-md:gap-0"
          ></Avatar>
        )}

        {user.role === 2 ? (
          <Link to="/notifications" className="relative">
            <Bell
              className={`w-[36px] h-[36px] ${
                theme === "light" ? "bg-[#EEF2F6] text-[#9DA6AF]" : ""
              }`}
            />
            {newNotification !== 0 && (
              <div className="w-[50%] flex justify-center items-center h-[50%] rounded-full bg-[#ED342B] absolute top-0 right-0">
                <p className="w-[50%] h-[50%] flex justify-center items-center font-DMSans font-bold text-sm text-[#fff] rounded-full">
                  {newNotification}
                </p>
              </div>
            )}
          </Link>
        ) : (
          <Link to="/admin/notifications" className="relative">
            <Bell
              className={`w-[36px] h-[36px] ${
                theme === "light" ? "bg-[#EEF2F6] text-[#9DA6AF]" : ""
              }`}
            />
            {newNotification !== 0 && (
              <div className="w-[50%] flex justify-center items-center h-[50%] rounded-full bg-[#ED342B] absolute top-0 right-0">
                <p className="w-[50%] h-[50%] flex justify-center items-center font-DMSans font-bold text-sm text-[#fff] rounded-full">
                  {newNotification}
                </p>
              </div>
            )}
          </Link>
        )}
      </div>
      <ThemeToggle />
    </header>
  );
};
