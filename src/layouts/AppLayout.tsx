import { cn } from "~/utils/helpers";
import { Outlet } from "react-router-dom";
import { Sidebar } from "~/components/sidebar/SideNav";

// app layout
const AppLayout = () => {
  return (
    <div
      className={cn(
        "bg-theme font-light text-themeText transition-[background-color] duration-500 ease-out"
      )}
    >
      <div className="flex max-sm:min-h-screen max-sm:pb-50">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
