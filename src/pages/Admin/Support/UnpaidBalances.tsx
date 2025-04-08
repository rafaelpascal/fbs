import { useState } from "react";

const ConversationsData = [
  {
    id: 1,
    name: "John Doe",
    subject:
      "(Paid: N75,000 | Bal: N75,000) | Masters in Business Administration",
    createdAt: "2023-10-01",
  },
  {
    id: 2,
    name: "Jane Smith",
    subject: "(Paid: N75,000 | Bal: N75,000) | Masters in Psychology",
    createdAt: "2023-10-02",
  },
];

const UnpaidBalances = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter tickets by name or subject
  const filteredTickets = ConversationsData.filter(
    (ticket) =>
      ticket.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="border border-[#ddd] p-2 rounded-md shadow-md">
      <div className="flex flex-col lg:flex-row justify-between items-center">
        <h2 className="text-xl text-[#FF3B30] mx-4 font-DMSans font-bold">
          Unpaid balances (N204,000/$105)
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
            className="group relative w-full border-b border-[#ddd] p-4 flex justify-between items-center hover:bg-gray-50 transition  overflow-visible"
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

            {/* Right Section */}
            <h2 className="hidden lg:block font-DMSans font-semibold text-sm lg:text-lg">
              {ticket.createdAt}
            </h2>

            {/* Dropdown (only visible on hover) */}
            <div className="absolute z-50 right-4 top-full mt-2 hidden group-hover:flex flex-col bg-white border border-gray-300 shadow-md rounded-md p-4 w-72 text-sm text-gray-700 font-DMSans">
              <p className="font-DMSans text-lg font-bold text-[#6440FB]">
                {ticket.name}
              </p>
              <p>
                <span className="font-semibold">Course:</span> Masters in
                Business Administration
              </p>
              <p>
                <span className="font-semibold">Applied on:</span> 3/20/2025
              </p>
              <p>
                <span className="font-semibold">Status:</span> Admitted
              </p>
              <p>
                <span className="font-semibold">Phone:</span> 07035957197
              </p>
              <p>
                <span className="font-semibold">Email:</span> jmark@gmail.com
              </p>
              <p>
                <span className="font-semibold">Balance:</span> N45,000
              </p>
              <p>
                <span className="font-semibold">Score:</span> 38/106
              </p>
              <p className="text-blue-500 hover:underline cursor-pointer mt-2">
                Other profile details
              </p>
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

export default UnpaidBalances;
