import { useState } from "react";
import { fetchlistTickets } from "~/api/course/hooks";
import { PendingTicketsReply } from "~/components/Modal/PendingTicketsReply";
import ActionMenu from "~/components/table/ActionMenu";
import { LoadingSpinner } from "~/components/ui/loading-spinner";

const PendingTicket = () => {
  const { data: pendingTicketData, isLoading: pendingTicketLoading } =
    fetchlistTickets();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [isViewTicket, setIsViewTicket] = useState({
    status: false,
    id: 0,
  });

  const handleView = (id: number) => {
    setIsViewTicket({ status: true, id });
  };

  const handleClose = () => {
    setIsViewTicket({
      status: false,
      id: 0,
    });
  };

  if (pendingTicketLoading || !pendingTicketData.data) {
    return (
      <div className="flex justify-center items-center h-full">
        <LoadingSpinner />
      </div>
    );
  }

  const filteredTickets = pendingTicketData.data.filter((ticket: any) => {
    const matchesSearch =
      ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDepartment =
      selectedDepartment === "All" || ticket.department === selectedDepartment;

    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="border border-[#ddd] p-2 rounded-md shadow-md">
      <div className="flex flex-col lg:flex-row justify-between items-center">
        <h2 className="text-xl text-[#FF3B30] w-full mx-4 font-DMSans font-bold">
          Pending tickets ({pendingTicketData.data.length})
        </h2>

        {/* 🔍 Search Field */}
        <div className="w-full lg:my-0 mr-4 lg:w-[20%] my-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-1 px-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF3B30]"
          />
        </div>
        <div className="w-full lg:w-[20%] my-2 lg:my-0">
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="w-full py-1 px-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF3B30]"
          >
            <option value="All">Filter...</option>
            <option value="Billing">Billing</option>
            <option value="Support">Support</option>
            {/* Add more departments as needed */}
          </select>
        </div>
      </div>

      <div className="w-full h-[500px] overflow-y-auto">
        {/* 📝 Ticket List */}
        {filteredTickets.length > 0 ? (
          filteredTickets.map((ticket: any) => (
            <div
              key={ticket.id}
              className="w-full overflow-x-auto border-b border-[#ddd] p-4 flex justify-between items-center"
            >
              <div className="flex justify-start items-center gap-4">
                <input type="checkbox" defaultChecked className="checkbox" />
                <h2 className="font-DMSans capitalize font-normal text-sm lg:text-lg">
                  <span className="font-bold ">{ticket.title}:</span>{" "}
                  {ticket.subject}
                </h2>
              </div>
              <h2 className="hidden lg:block font-DMSans font-normal text-sm lg:text-lg">
                {new Date(ticket.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </h2>
              <h2 className="font-DMSans mr-3 font-normal text-sm lg:text-lg">
                {ticket.department}
              </h2>
              <ActionMenu
                actions={[
                  { label: "Read", action: () => handleView(ticket.id) },
                  { label: "Reply", action: () => handleView(ticket.id) },
                  { label: "Delete", action: () => handleView(ticket.id) },
                ]}
              />
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 font-DMSans py-8">
            No tickets match your search.
          </p>
        )}
      </div>
      <PendingTicketsReply
        // isOpen={true}
        isOpen={isViewTicket.status}
        closeModal={handleClose}
        ticketId={isViewTicket.id}
      />
    </div>
  );
};

export default PendingTicket;
