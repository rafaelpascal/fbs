import { useEffect, useRef, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "~/components/constants/routes";
import { DashboardArea } from "~/layouts/DashboardArea";

const data = [
  {
    date: "JUL. 12",
    image:
      "https://s3-alpha-sig.figma.com/img/aa7a/4a9c/996f7f9ec33dc08441531168ad8ee98d?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=WUNYnk2gUAgJgyVuDGDT1ow0Fi0JOibTkfQe2ovgoFZP44~kDYcCVFmlfne23TjwfIQPeaFkk1wWir8WEOAb9Bru2hB96xPeZ2kOR5wyQtb3YJBgZCB41~GJXF58LaX3eq9g-RVD783VwdaS6nK75l3nYT~D6jdWFRMPxcYoji8XLOdhy83adpJWEOPAYewWvWfj8YhXPrZbsEr0SxHObJyBmD7~IUsM1F3sJXnnix8ZODRdo92HCa969w1nlNlXIYQ2onDEGWzt5UUbGfDnE4ZqLhFumEC7CJgnhWPsmYSk4XBKht~T92wIvwqa7TAX3-PO5vrsVhVl8KjCsuA6YQ__",
    title: "How to start & Manage an Enterprise ",
    type: "Exclusive Event",
    paid: "Free",
    dateType: "Single Date",
    exactDate: "Saturday December 12 2024 at 03:15 PM",
    totalReg: "12",
    totalRev: "N100.00",
    status: "On-going",
  },
  {
    date: "JUL. 12",
    image:
      "https://s3-alpha-sig.figma.com/img/aa7a/4a9c/996f7f9ec33dc08441531168ad8ee98d?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=WUNYnk2gUAgJgyVuDGDT1ow0Fi0JOibTkfQe2ovgoFZP44~kDYcCVFmlfne23TjwfIQPeaFkk1wWir8WEOAb9Bru2hB96xPeZ2kOR5wyQtb3YJBgZCB41~GJXF58LaX3eq9g-RVD783VwdaS6nK75l3nYT~D6jdWFRMPxcYoji8XLOdhy83adpJWEOPAYewWvWfj8YhXPrZbsEr0SxHObJyBmD7~IUsM1F3sJXnnix8ZODRdo92HCa969w1nlNlXIYQ2onDEGWzt5UUbGfDnE4ZqLhFumEC7CJgnhWPsmYSk4XBKht~T92wIvwqa7TAX3-PO5vrsVhVl8KjCsuA6YQ__",
    title: "How to start & Manage an Enterprise ",
    type: "Exclusive Event",
    paid: "Free",
    dateType: "Single Date",
    exactDate: "Saturday December 12 2024 at 03:15 PM",
    totalReg: "12",
    totalRev: "N100.00",
    status: "On-going",
  },
  {
    date: "JUL. 12",
    image:
      "https://s3-alpha-sig.figma.com/img/aa7a/4a9c/996f7f9ec33dc08441531168ad8ee98d?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=WUNYnk2gUAgJgyVuDGDT1ow0Fi0JOibTkfQe2ovgoFZP44~kDYcCVFmlfne23TjwfIQPeaFkk1wWir8WEOAb9Bru2hB96xPeZ2kOR5wyQtb3YJBgZCB41~GJXF58LaX3eq9g-RVD783VwdaS6nK75l3nYT~D6jdWFRMPxcYoji8XLOdhy83adpJWEOPAYewWvWfj8YhXPrZbsEr0SxHObJyBmD7~IUsM1F3sJXnnix8ZODRdo92HCa969w1nlNlXIYQ2onDEGWzt5UUbGfDnE4ZqLhFumEC7CJgnhWPsmYSk4XBKht~T92wIvwqa7TAX3-PO5vrsVhVl8KjCsuA6YQ__",
    title: "How to start & Manage an Enterprise ",
    type: "Exclusive Event",
    paid: "Free",
    dateType: "Single Date",
    exactDate: "Saturday December 12 2024 at 03:15 PM",
    totalReg: "12",
    totalRev: "N100.00",
    status: "On-going",
  },
];
const AdminEvents = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [eventTypeFilter, setEventTypeFilter] = useState("All");
  const [filteredEvents] = useState(data);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const eventTypes = ["All", ...new Set(data.map((event) => event.type))];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = (index: number) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const handleNewEvent = () => {
    navigate(ROUTES.EVENTMANAGEMENT);
  };

  return (
    <DashboardArea>
      <div className="flex justify-between items-center">
        <h2 className="text-[40px] font-DMSans font-bold text-[#FF3B30]">
          Events
        </h2>

        <div className="flex flex-col lg:flex-row gap-4">
          <input
            type="text"
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-[#ddd] px-3 py-2 rounded-md text-[18px] font-DMSans"
          />

          <select
            value={eventTypeFilter}
            onChange={(e) => setEventTypeFilter(e.target.value)}
            className="border border-[#ddd] px-3 py-2 rounded-md text-[18px] font-DMSans"
          >
            {eventTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>

          <button
            onClick={handleNewEvent}
            className="border border-[#ddd] p-2 rounded-md"
          >
            <p className="text-[18px] font-DMSans font-semibold">
              Create new event
            </p>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto mt-6">
        <table className="table">
          <thead className="bg-[#FF3B30]">
            <tr>
              <th className="w-1/2 text-[#FFFFFF] font-DMSans text-sm">
                Events
              </th>
              <th className="w-1/12 text-[#FFFFFF] font-DMSans text-sm">
                Registrations
              </th>
              <th className="w-1/12 text-[#FFFFFF] font-DMSans text-sm">
                Revenue
              </th>
              <th className="w-1/12 text-[#FFFFFF] font-DMSans text-sm">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event, index) => (
                <tr key={index} className="border-y-2 border-[#757575]">
                  <th className="w-1/2 py-8">
                    <div className="flex justify-start flex-col lg:flex-row items-start lg:items-center gap-4">
                      <p className="text-[#7545F0] font-DMSans text-[18px] lg:text-[26px] font-bold">
                        {event.date}
                      </p>
                      <div className="flex w-full justify-start flex-col lg:flex-row items-start lg:items-start gap-3">
                        <img
                          src={event.image}
                          alt="Event"
                          className="w-[145px] object-fill h-[132.82px] rounded-md"
                        />
                        <div className="flex flex-col w-full justify-between items-start h-full">
                          <p className="text-[#FF5A5A] font-DMSans text-[18px] lg:text-[26px] font-bold">
                            {event.title}
                          </p>
                          <p className="text-[20px] font-DMSans my-4 text-[#757575] font-normal">
                            {event.paid} |{" "}
                            <span className="text-[#6440FB]">{event.type}</span>{" "}
                            | {event.dateType}
                          </p>
                          <p className="text-[20px] font-DMSans text-[#757575] font-normal">
                            {event.exactDate}
                          </p>
                        </div>
                      </div>
                    </div>
                  </th>
                  <td className="py-8">
                    <div className="bg-[#FF5A5A] flex justify-center items-center w-[55px] h-[55px] rounded-full">
                      <p className="text-[20px] font-DMSans text-[#fff] font-normal">
                        {event.totalReg}
                      </p>
                    </div>
                  </td>
                  <td className="text-[20px] py-8 font-DMSans text-[#757575] font-normal">
                    {event.totalRev}
                  </td>
                  <td className="py-8 relative">
                    <div className="flex justify-start items-center gap-2">
                      <p className="text-[20px] font-DMSans text-[#757575] font-normal">
                        {event.status}
                      </p>
                      <button onClick={() => toggleDropdown(index)}>
                        <HiDotsVertical className="size-6" />
                      </button>
                    </div>

                    {/* Dropdown Menu */}
                    {openDropdown === index && (
                      <div
                        ref={dropdownRef}
                        className="absolute z-10 right-0 top-10 bg-white shadow-xl rounded-md border border-gray-300 w-40"
                      >
                        <ul className="py-2 text-left">
                          <li className="px-4 py-2 font-DMSans text-[14px] font-semibold hover:bg-gray-100 cursor-pointer">
                            View Event
                          </li>
                          <li className="px-4 py-2 font-DMSans text-[14px] font-semibold hover:bg-gray-100 cursor-pointer">
                            View registrations
                          </li>
                          <li className="px-4 py-2 font-DMSans text-[14px] font-semibold hover:bg-gray-100 cursor-pointer">
                            Edit
                          </li>
                          <li className="px-4 py-2 font-DMSans text-[14px] font-semibold hover:bg-gray-100 cursor-pointer">
                            Copy link
                          </li>
                          <li className="px-4 py-2 font-DMSans text-[14px] font-semibold hover:bg-gray-100 cursor-pointer">
                            Duplicate
                          </li>
                          <li className="px-4 py-2 font-DMSans text-[14px] font-semibold hover:bg-gray-100 cursor-pointer">
                            Close Event
                          </li>
                          <li className="px-4 py-2 font-DMSans text-[14px] font-semibold hover:bg-red-500 hover:text-white cursor-pointer">
                            Delete
                          </li>
                        </ul>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="text-center py-6 text-[#757575] font-DMSans text-lg"
                >
                  No events found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </DashboardArea>
  );
};

export default AdminEvents;
