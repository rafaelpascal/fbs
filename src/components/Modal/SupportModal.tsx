import { BaseModal } from "./BaseModal";
import { useEffect, useState } from "react";
import { MdCancel } from "react-icons/md";
import { FaLeftLong } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa";
import { SupportCard } from "../cards/SupportCard";
import Support from "../support/Support";
import Message from "../support/Message";
import TicketList from "../support/TicketList";
import SingleTicket from "../support/SingleTicket";
import Resources from "~/pages/Admin/Support/Resources";

interface IModalPropsType {
  isOpen: boolean;
  message?: string;
  closeModal: () => void;
  minimized: () => void;
}

const Tickets = [
  {
    ticketNumber: "2345645",
    title: "Help ,me reset password",
    date: "12/03/2025 (11:15pm)",
    status: "Answered",
  },
  {
    ticketNumber: "2345645",
    title: "Help ,me reset password",
    date: "12/03/2025 (11:15pm)",
    status: "Closed",
  },
  {
    ticketNumber: "2345645",
    title: "Help ,me reset password",
    date: "12/03/2025 (11:15pm)",
    status: "Waiting",
  },
  {
    ticketNumber: "2345645",
    title: "Help ,me reset password",
    date: "12/03/2025 (11:15pm)",
    status: "Waiting",
  },
];

export const SupportModal = ({
  isOpen,
  closeModal,
  minimized,
}: IModalPropsType) => {
  const [reportData, setReportData] = useState({
    subject: "",
    message: "",
  });
  const [currentView, setCurrentView] = useState<
    | "home"
    | "support"
    | "aiChat"
    | "message"
    | "tickets"
    | "viewTicket"
    | "resources"
  >("home");

  useEffect(() => {
    if (reportData.message !== "") {
      setCurrentView("message");
    }
  }, [reportData]);

  const handleViewTicket = () => {
    setCurrentView("viewTicket");
  };

  const handleModalClose = () => {
    setReportData({
      subject: "",
      message: "",
    });
    closeModal();
    setCurrentView("home");
  };

  return (
    <BaseModal
      isOpen={isOpen}
      closeModal={handleModalClose}
      parentClassName="flex justify-end items-end"
      className="lg:min-w-[614px] overflow-y-hidden rounded-l-lg h-[100vh] rounded-r-none"
      slideDirection="right"
    >
      {/* Header */}
      <Header
        currentView={currentView}
        setCurrentView={setCurrentView}
        closeModal={handleModalClose}
        minimized={minimized}
      />

      {/* Body */}
      <div className="w-full lg:w-[814px] h-[570px] overflow-y-auto  p-4">
        {(() => {
          switch (currentView) {
            case "support":
              return <Support setReportData={setReportData} />;

            case "message":
              return (
                <>
                  <Message
                    message={reportData.message}
                    subject={reportData.subject}
                  />

                  <button onClick={() => setCurrentView("tickets")}>
                    <p className="text-xl mt-4 text-[#FF5050] text-left font-DMSans font-semibold ">
                      Go to pending messages (2)
                    </p>
                  </button>
                </>
              );

            case "tickets":
              return (
                <>
                  {Tickets.map((ticket) => (
                    <TicketList
                      ticketNumber={ticket.ticketNumber}
                      title={ticket.title}
                      date={ticket.date}
                      status={ticket.status}
                      action={handleViewTicket}
                    />
                  ))}
                  <button onClick={() => setCurrentView("home")}>
                    <p className="text-xl mt-4 text-[#FF5050] text-left font-DMSans font-semibold ">
                      Create New Ticket
                    </p>
                  </button>
                </>
              );
            case "resources":
              return (
                <>
                  <Resources />
                </>
              );
            case "viewTicket":
              return (
                <>
                  <SingleTicket />
                </>
              );

            case "aiChat":
              return (
                <>
                  <SingleTicket />
                </>
              );

            default:
              return (
                <div className=" w-full lg:min-w-[614px] mt-4 px-2">
                  <SupportCard
                    title="Speak with Support"
                    description="You may send a message to us regarding your experience, inquiries, concerns, challenges or requests."
                    buttonText="Create a ticket"
                    buttonColor="#6440FB"
                    borderColor="#336CFB"
                    handleFunction={() => setCurrentView("support")}
                    pendingMessages={2}
                    avatars={[
                      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
                      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
                      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
                      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
                    ]}
                  />

                  <SupportCard
                    title="Chat with AI Assistant"
                    description="Get instant answers and support anytime! Our AI assistant is available 24/7 to assist with your queries."
                    buttonText="Start conversation"
                    handleFunction={() => setCurrentView("aiChat")}
                    borderColor="#FF5050"
                    isAvailable={false}
                    pendingMessages={0}
                  />
                  <div className="w-full border p-2 my-4 flex justify-between items-center border-[#C4C4C4] rounded-lg">
                    <p className="text-xl my-4 px-4 text-left font-DMSans font-semibold ">
                      Visit our FAQ page for general inquiries{" "}
                    </p>
                    <button className="bg-[#F01E00] rounded-lg text-white text-lg italic py-2 px-4 text-left font-DMSans font-normal">
                      See FAQ page
                    </button>
                  </div>
                  <SupportCard
                    title="Resources"
                    description="Curated case studies, business reports, business reviews, business templates, and whatever resources you need to stay ahead in your business or career."
                    buttonText="Get started"
                    handleFunction={() => setCurrentView("resources")}
                    borderColor="#12A815"
                    isAvailable={false}
                  />
                </div>
              );
          }
        })()}
      </div>
    </BaseModal>
  );
};

// Header Component
interface HeaderProps {
  currentView:
    | "home"
    | "support"
    | "aiChat"
    | "message"
    | "tickets"
    | "viewTicket"
    | "resources";
  setCurrentView: (
    view:
      | "home"
      | "support"
      | "aiChat"
      | "message"
      | "tickets"
      | "viewTicket"
      | "resources"
  ) => void;
  closeModal: () => void;
  minimized: () => void;
}

const Header = ({
  currentView,
  setCurrentView,
  closeModal,
  minimized,
}: HeaderProps) => {
  return (
    <div className="w-full bg-[#FF5050] py-4 flex justify-between items-start px-4">
      {currentView == "support" && (
        <div>
          <button
            onClick={() => setCurrentView("home")}
            className="p-2 rounded-md border border-white flex items-center gap-2"
          >
            <FaLeftLong className="size-6 text-white" />
            <p className="text-sm text-white font-semibold">Back</p>
          </button>
          <div className="flex flex-col">
            <h2 className="text-2xl my-4 text-white text-left font-DMSans font-semibold ">
              Speak with support
            </h2>
            <p className="text-xl w-full lg:w-[614px] text-white text-left font-DMSans font-normal ">
              Please select the department you wish to talk to.
            </p>
          </div>
        </div>
      )}
      {currentView == "tickets" && (
        <div>
          <button
            onClick={() => setCurrentView("message")}
            className="p-2 rounded-md border border-white flex items-center gap-2"
          >
            <FaLeftLong className="size-6 text-white" />
            <p className="text-sm text-white font-semibold">Back</p>
          </button>
          <div className="flex flex-col">
            <h2 className="text-2xl my-4 text-white text-left font-DMSans font-semibold ">
              Recent Support Tickets
            </h2>
          </div>
        </div>
      )}
      {currentView == "viewTicket" && (
        <div>
          <button
            onClick={() => setCurrentView("message")}
            className="p-2 rounded-md border border-white flex items-center gap-2"
          >
            <FaLeftLong className="size-6 text-white" />
            <p className="text-sm text-white font-semibold">Back</p>
          </button>
          <div className="flex flex-col">
            <h2 className="text-2xl my-4 text-white text-left font-DMSans font-semibold ">
              View Ticket
            </h2>
          </div>
        </div>
      )}
      {currentView == "message" && (
        <div>
          <button
            onClick={() => setCurrentView("support")}
            className="p-2 rounded-md border border-white flex items-center gap-2"
          >
            <FaLeftLong className="size-6 text-white" />
            <p className="text-sm text-white font-semibold">Back</p>
          </button>
          <div className="flex flex-col">
            <h2 className="text-2xl my-4 text-white text-left font-DMSans font-semibold ">
              Message sent!
            </h2>
          </div>
        </div>
      )}
      {currentView == "aiChat" && (
        <div>
          <button
            onClick={() => setCurrentView("support")}
            className="p-2 rounded-md border border-white flex items-center gap-2"
          >
            <FaLeftLong className="size-6 text-white" />
            <p className="text-sm text-white font-semibold">Back</p>
          </button>
          <div className="flex flex-col">
            <h2 className="text-2xl text-white text-left font-DMSans font-semibold ">
              AI Assistance
            </h2>
            <h2 className="text-lg text-white text-left font-DMSans font-semibold ">
              Please ask specifc question to Fordax AI Assistant.
            </h2>
          </div>
        </div>
      )}
      {currentView == "home" && (
        <div className="flex flex-col">
          <h2 className="text-2xl text-white font-semibold">Fodax Support</h2>
          <h2 className="text-2xl my-4 text-white text-left font-DMSans font-semibold ">
            Hello Stephen,
          </h2>
          <p className="text-xl w-full lg:w-[614px] text-white text-left font-DMSans font-normal ">
            Welcome to our live chat. Our live and AI support is available
            24/7/365 to assist with inquiries and support queries.
          </p>
        </div>
      )}
      {currentView == "resources" && (
        <div>
          <button
            onClick={() => setCurrentView("support")}
            className="p-2 rounded-md border border-white flex items-center gap-2"
          >
            <FaLeftLong className="size-6 text-white" />
            <p className="text-sm text-white font-semibold">Back</p>
          </button>
          <div className="flex flex-col">
            <h2 className="text-2xl mt-2 text-white text-left font-DMSans font-semibold ">
              Fordax Resources
            </h2>
            <h2 className="text-sm w-full lg:w-[600px] text-white text-left font-DMSans font-normal mt-2 ">
              Download curated case studies, business reports, business reviews,
              business templates and whatever resources you ned to stay ahead in
              your buiness or career.
            </h2>
            <div className="w-full mt-4 flex justify-between items-center gap-4">
              <select defaultValue="Pick a color" className="select w-[50%]">
                <option disabled={true}>Filter by</option>
                <option>Crimson</option>
                <option>Amber</option>
                <option>Velvet</option>
              </select>
              <select defaultValue="Pick a color" className="select w-[50%]">
                <option disabled={true}>Sorted by</option>
                <option>Crimson</option>
                <option>Amber</option>
                <option>Velvet</option>
              </select>
            </div>
            <p className="text-xs w-full text-white text-left font-DMSans font-light italic mt-2 ">
              Showing 1-40 of 302 results
            </p>
          </div>
        </div>
      )}

      <div className="flex gap-4">
        <button onClick={minimized}>
          <FaMinus className="size-8 text-white" />
        </button>
        <button onClick={closeModal}>
          <MdCancel className="size-8 text-white" />
        </button>
      </div>
    </div>
  );
};
