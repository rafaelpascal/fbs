import { FaChevronDown } from "react-icons/fa";
import EventCard from "../cards/EventCard";
import Carousel from "../Carousel/Carousel";
import RecentEventsCard from "../cards/RecentEventsCard";
import { cn } from "~/utils/helpers";
import { useTheme } from "~/context/theme-provider";
import { useNavigate } from "react-router-dom";

const Events = [
  {
    id: "sjahsjashjshj",
    title: "Eco-Education in Our Lives: We Can Change the Future",
    time: "09:00pm, 6 April, 2025 - 7 April 2025",
    location: "Event Mall, Abuja Nigeria",
    newevent: true,
    type: "Exclusive",
  },
  {
    id: "sjahsashjjasjashjshj",
    title: "Eco-Education in Our Lives: We Can Change the Future",
    time: "09:00pm, 6 April, 2025 - 7 April 2025",
    location: "Event Mall, Abuja Nigeria",
    newevent: true,
    type: "Open",
  },
  {
    id: "sjahslskajashjshj",
    title: "Eco-Education in Our Lives: We Can Change the Future",
    time: "09:00pm, 6 April, 2025 - 7 April 2025",
    location: "Event Mall, Abuja Nigeria",
    newevent: false,
    type: "Open",
  },
  {
    id: "sjahsjuajjashjshj",
    title: "Eco-Education in Our Lives: We Can Change the Future",
    time: "09:00pm, 6 April, 2025 - 7 April 2025",
    location: "Event Mall, Abuja Nigeria",
    newevent: false,
    type: "Exclusive",
  },
];

const EventsContents = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const registerevent = (id: string) => {
    navigate(`/event/${id}`);
  };

  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-full lg:w-[80%]">
        <h2 className="font-DMSans text-[40px] font-semibold text-center">
          Events
        </h2>
        <p className="font-DMSans text-[17px] font-semibold text-center">
          featured event speakers, workshops, school activities...
        </p>
        <div className="w-full flex-col mt-8 lg:flex-row flex-wrap flex justify-between items-start">
          <div className="w-full px-4 lg:px-0  lg:w-[20%]">
            <div className="flex justify-between flex-col items-start my-10">
              <h2 className="font-DMSans text-[17px] font-semibold text-left">
                Find Event
              </h2>
              <div className="w-full mt-4">
                <div className="h-[50px] w-full rounded-md flex justify-between items-center px-4 border-[1px] border-[#DDDDDD]">
                  <input
                    type="date"
                    placeholder="Event From"
                    className="w-full outline-none h-full bg-transparent"
                  />
                  {/* <CiCalendarDate
                    className={cn(
                      "text-[25px]",
                      theme === "dark" ? "text-[#fff]" : "text-[#333]"
                    )}
                  /> */}
                </div>
                <div className="dropdown w-full">
                  <div
                    tabIndex={0}
                    role="button"
                    className={cn(
                      "btn w-full flex justify-between items-center mt-4",
                      theme === "dark" ? "bg-[#333]" : "bg-white"
                    )}
                  >
                    <p
                      className={cn(
                        "text-left font-DMSans text-[14px] font-semibold",
                        theme === "dark" ? "text-[#fff]" : "text-[#333]"
                      )}
                    >
                      All Categories
                    </p>
                    <FaChevronDown
                      className={cn(
                        "text-left font-DMSans text-[14px] font-semibold",
                        theme === "dark" ? "text-[#fff]" : "text-[#333]"
                      )}
                    />
                  </div>
                  <ul
                    tabIndex={0}
                    className={cn(
                      "dropdown-content w-full menu bg-base-100 rounded-box z-[1] p-2 shadow-lg",
                      theme === "dark" ? "bg-[#333]" : "bg-white"
                    )}
                  >
                    <li
                      className={cn(
                        "text-left font-DMSans text-[14px] rounded-md font-semibold",
                        theme === "dark" ? "hover:bg-[#ddd]" : ""
                      )}
                    >
                      <a>Most Popular</a>
                    </li>
                    <li
                      className={cn(
                        "text-left font-DMSans text-[14px] rounded-md font-semibold",
                        theme === "dark" ? "hover:bg-[#ddd]" : ""
                      )}
                    >
                      <a>Most Popular</a>
                    </li>
                  </ul>
                </div>
                <div className="dropdown w-full">
                  <div
                    tabIndex={0}
                    role="button"
                    className={cn(
                      "btn w-full flex justify-between items-center mt-4",
                      theme === "dark" ? "bg-[#333]" : "bg-white"
                    )}
                  >
                    <p
                      className={cn(
                        "text-left font-DMSans text-[14px] font-semibold",
                        theme === "dark" ? "text-[#fff]" : "text-[#333]"
                      )}
                    >
                      Location
                    </p>
                    <FaChevronDown
                      className={cn(
                        "text-left font-DMSans text-[14px] font-semibold",
                        theme === "dark" ? "text-[#fff]" : "text-[#333]"
                      )}
                    />
                  </div>
                  <ul
                    tabIndex={0}
                    className={cn(
                      "dropdown-content w-full menu bg-base-100 rounded-box z-[1] p-2 shadow-lg",
                      theme === "dark" ? "bg-[#333]" : "bg-white"
                    )}
                  >
                    <li
                      className={cn(
                        "text-left font-DMSans text-[14px] rounded-md font-semibold",
                        theme === "dark" ? "hover:bg-[#ddd]" : ""
                      )}
                    >
                      <a>Most Popular</a>
                    </li>
                    <li
                      className={cn(
                        "text-left font-DMSans text-[14px] rounded-md font-semibold",
                        theme === "dark" ? "hover:bg-[#ddd]" : ""
                      )}
                    >
                      <a>Most Popular</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div>
              <h2 className="font-DMSans text-[20px] font-semibold text-left mb-3">
                Recent Posts
              </h2>
              <RecentEventsCard />
            </div>
          </div>
          <div className="w-full px-4 lg:px-0 lg:w-[75%]">
            <div className="flex flex-col lg:flex-row justify-between items-center my-8">
              <h2 className="font-DMSans text-[17px] font-semibold text-left">
                Showing 250 total results
              </h2>
              <div className="flex flex-col lg:flex-row justify-end items-center">
                <h2 className="font-DMSans text-[17px] font-semibold">
                  Sort by:
                </h2>
                <div className="dropdown">
                  <div tabIndex={0} role="button" className="btn ml-0 lg:ml-4">
                    <p className="text-left font-DMSans text-[14px] font-semibold">
                      Most Popular
                    </p>
                    <FaChevronDown />
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                  >
                    <li className="text-left font-DMSans text-[14px] font-semibold">
                      <a>Most Popular</a>
                    </li>
                    <li className="text-left font-DMSans text-[14px] font-semibold">
                      <a>Most Popular</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <Carousel>
              <div className="w-full grid grid-cols-1 gap-8 sm:grid-cols-2">
                {Events.map((event, index) => (
                  <EventCard
                    key={index}
                    id={event.id}
                    title={event.title}
                    time={event.time}
                    location={event.location}
                    newevent={event.newevent}
                    type={event.type}
                    handleNavigation={registerevent}
                  />
                ))}
              </div>
              <div className="w-full grid grid-cols-1 gap-8 sm:grid-cols-2">
                {Events.map((event, index) => (
                  <EventCard
                    id={event.id}
                    key={index}
                    title={event.title}
                    time={event.time}
                    location={event.location}
                    newevent={event.newevent}
                    type={event.type}
                    handleNavigation={registerevent}
                  />
                ))}
              </div>
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsContents;
