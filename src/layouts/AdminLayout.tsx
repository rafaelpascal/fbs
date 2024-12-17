import { cn } from "~/utils/helpers";
import { Outlet } from "react-router-dom";
import { AdminSidebar } from "~/components/adminSidebar/AdminSideNav";

// app layout
const AdminAppLayout = () => {
  return (
    <div
      className={cn(
        "bg-theme font-light text-themeText transition-[background-color] duration-500 ease-out"
      )}
    >
      <div className="flex max-sm:min-h-screen max-sm:pb-50">
        <AdminSidebar />
        <Outlet />
      </div>
    </div>
  );
};

export default AdminAppLayout;
