import { useState } from "react";
import { ConversationModal } from "~/components/Modal/ConversationModal";
import ActionMenu from "~/components/table/ActionMenu";

const pendingTicketData = [
  {
    id: 1,
    name: "John Doe",
    subject: "Issue with payment",
    department: "Professional Certificate in Digital Marketing",
    createdAt: "2023-10-01",
  },
  {
    id: 2,
    name: "Jane Smith",
    subject: "Technical issue",
    department: "Professional Certificate in Digital Marketing",
    createdAt: "2023-10-02",
  },
];

const ConversationsScreen = () => {
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
  // Filter tickets by name or subject
  // const filteredTickets = pendingTicketData.filter(
  //   (ticket) =>
  //     ticket.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     ticket.department.toLowerCase().includes(searchTerm.toLowerCase())
  // );
  const filteredTickets = pendingTicketData.filter((ticket) => {
    const matchesSearch =
      ticket.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDepartment =
      selectedDepartment === "All" || ticket.department === selectedDepartment;

    return matchesSearch && matchesDepartment;
  });
  return (
    <div className="border border-[#ddd] p-2 rounded-md shadow-md">
      <div className="flex flex-col lg:flex-row justify-between items-center">
        <h2 className="text-xl text-[#FF3B30] w-full mx-4 font-DMSans font-bold">
          Conversations ({pendingTicketData.length})
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

      {/* 📝 Ticket List */}
      {filteredTickets.length > 0 ? (
        filteredTickets.map((ticket) => (
          <div
            key={ticket.id}
            className="w-full overflow-x-auto border-b border-[#ddd] p-4 flex justify-between items-center"
          >
            <div className="flex justify-start items-center gap-4">
              <input type="checkbox" defaultChecked className="checkbox" />
              <h2 className="font-DMSans font-normal text-sm lg:text-lg">
                <span className="font-bold">{ticket.name}:</span>{" "}
                {ticket.subject}
              </h2>
            </div>
            <h2 className="hidden lg:block font-DMSans font-normal text-sm lg:text-lg">
              {ticket.createdAt}
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
      <ConversationModal
        // isOpen={true}
        isOpen={isViewTicket.status}
        closeModal={handleClose}
        ticketId={isViewTicket.id}
      />
    </div>
  );
};

export default ConversationsScreen;
