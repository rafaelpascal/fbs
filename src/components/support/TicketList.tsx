import { useTheme } from "~/context/theme-provider";
import { cn } from "~/utils/helpers";

type TicketProps = {
  ticketNumber: string;
  date: string;
  status: string;
  action: () => void;
};

const TicketList = ({ ticketNumber, action, date, status }: TicketProps) => {
  const { theme } = useTheme();
  return (
    <button
      onClick={action}
      className="w-full border-b-2 py-6 border-[#C4C4C4] flex justify-between items-center"
    >
      <div>
        <h2 className="font-DMSans font-normal text-left text-2xl">
          <span className="font-bold">{ticketNumber}</span>
        </h2>
        <h2
          className={cn(
            "font-DMSans  font-normal text-left text-2xl",
            theme === "dark" ? "text-[#fff]" : "text-[#757575]"
          )}
        >
          Last update: {date}{" "}
        </h2>
      </div>
      <button
        className={cn(
          "w-[139px] py-2 flex justify-center items-center",
          status === "Answered" && "bg-[#6440FB]",
          status === "Closed" && "bg-[#000000]",
          status === "Waiting" && "bg-[#FF5050]"
        )}
      >
        <p className="font-DMSans  font-normal text-left text-xl text-white">
          {status}
        </p>
      </button>
    </button>
  );
};

export default TicketList;
