import { DashboardArea } from "~/layouts/DashboardArea";

const AdminEvents = () => {
  return (
    <DashboardArea>
      <div className="flex justify-between items-center">
        <h2 className="text-[40px] font-DMSans font-bold text-[#FF3B30]">
          Events
        </h2>
        <button className="border border-[#ddd] p-2 rounded-md">
          <p className="text-[18px] font-DMSans font-semibold ">
            Create new event
          </p>
        </button>
      </div>
    </DashboardArea>
  );
};

export default AdminEvents;
