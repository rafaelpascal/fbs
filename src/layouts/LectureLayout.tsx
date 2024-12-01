import { cn } from "~/utils/helpers";
import { Outlet } from "react-router-dom";
import { LectureSidebar } from "~/components/lecturesidebar/LectureSidebar";

// app layout
const AppLayout = () => {
  // const { loading } = useAuth();

  return (
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
  );
};

export default AppLayout;
