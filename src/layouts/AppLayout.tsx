import { cn } from "~/utils/helpers";
import { Outlet } from "react-router-dom";
import { Sidebar } from "~/components/sidebar/SideNav";

// app layout
export const AppLayout = () => {
  // const { loading } = useAuth();

  return (
    <div
      className={cn(
        "bg-theme font-light bg-[#F0F4F5] text-themeText transition-[background-color] duration-500 ease-out"
      )}
    >
      <div className="flex max-sm:min-h-screen max-sm:pb-50">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
};
