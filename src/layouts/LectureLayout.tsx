import { cn } from "~/utils/helpers";
import { Outlet } from "react-router-dom";
import { LectureSidebar } from "~/components/lecturesidebar/LectureSidebar";
import { LectureProvider } from "~/redux-store/slice/LectureContext";

// app layout
const AppLayout = () => {
  // const { loading } = useAuth();

  return (
    <LectureProvider>
      <div
        className={cn(
          "bg-theme font-light text-themeText transition-[background-color] duration-500 ease-out"
        )}
      >
        <div className="flex max-sm:min-h-screen max-sm:pb-50">
          <LectureSidebar />
          <Outlet />
        </div>
      </div>
    </LectureProvider>
  );
};

export default AppLayout;
