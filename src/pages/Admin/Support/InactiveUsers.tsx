import { useState } from "react";

const InactiveUsersData = [
  {
    id: 1,
    name: "Blessing Jumo",
    subject: "(Masters in Business Administration) last seen 5 days ago",
    createdAt: "2023-10-01",
  },
  {
    id: 2,
    name: "Jane Smith",
    subject: "(Masters in Business Administration) last seen 5 days ago",
    createdAt: "2023-10-01",
  },
  {
    id: 3,
    name: "Jane Smith",
    subject: "(Masters in Business Administration) last seen 5 days ago",
    createdAt: "2023-10-02",
  },
];

const InactiveUsers = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter tickets by name or subject
  const filteredTickets = InactiveUsersData.filter(
    (ticket) =>
      ticket.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="border border-[#ddd] p-2 rounded-md shadow-md">
      <div className="flex flex-col lg:flex-row justify-between items-center">
        <h2 className="text-xl text-[#FF3B30] mx-4 font-DMSans font-bold">
          Inactive students ({InactiveUsersData.length})
        </h2>

        {/* 🔍 Search Field */}
        <div className="flex justify-end items-center lg:my-0 mr-4 my-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-1 px-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF3B30]"
          />
          <h2 className="text-xl w-[50%] text-[#FF3B30] mx-4 font-DMSans font-bold">
            Date Due
          </h2>
        </div>
      </div>

      {/* 📝 Ticket List */}
      {filteredTickets.length > 0 ? (
        filteredTickets.map((ticket, index) => (
          <div
            key={ticket.id}
            className="group cursor-pointer relative w-full border-b border-[#ddd] p-4 flex justify-between items-center hover:bg-gray-50 transition  overflow-visible"
          >
            {/* Left Section */}
            <div className="flex justify-start items-center gap-4">
              <h2 className="font-DMSans font-semibold text-sm lg:text-lg">
                {index + 1}
              </h2>
              <h2 className="font-DMSans font-normal text-sm lg:text-lg">
                <span className="font-bold">{ticket.name}:</span>{" "}
                {ticket.subject}
              </h2>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500 font-DMSans py-8">
          No tickets match your search.
        </p>
      )}
    </div>
  );
};

export default InactiveUsers;
