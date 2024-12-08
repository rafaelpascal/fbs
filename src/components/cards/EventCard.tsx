import { CiCalendarDate } from "react-icons/ci";
import { FaMapMarkerAlt } from "react-icons/fa";

type EventCardProps = {
  title: string;
  time: string;
  location: string;
  newevent: boolean;
  type: string;
};

const EventCard = ({
  title,
  time,
  location,
  newevent,
  type,
}: EventCardProps) => {
  return (
    <div className="w-full rounded-md shadow-lg">
      <div className="relative">
        <img
          src="https://s3-alpha-sig.figma.com/img/fca1/b527/3dc913d6a517b22891c56fc7d0adbaf0?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=b~OL50F~J9HsPHF-y~NV76Y5MBjWrWBXlfZV2BPSrDsIwsKn-dvV0bDCKn0gNnrobbd9OD1NaQRAGLBcUlJVpLVfxmXA8TJd8cbHdsze0jX8CsJOlCnIS6SSAdQabl9y9THTaaKgZ3-bqcZxtxEal~0xWXfR9Thy~Wx3tDQCK7BZ5ImUqCdaKcziAsZZN65QIDXmKh7PxIqtXMaLwOBN33FrDdWgSdjS6Ncb4nXMCLpFIgI8WPy8ufjutEgKZbfKTafOuKoF8J2oYpYx6xlCIFf0PlZBSFSh64CmRrwgLidjQKyohQ56DQMApc~Mn9womjp1RCT39-u3zZ1Wn~pcMQ__"
          alt=""
          className=" rounded-t-md"
        />
        {newevent && (
          <div className="absolute top-4 right-4 p-2 bg-[#8E8E93] rounded-md">
            <h2 className="font-DMSans text-[14px] text-white font-semibold">
              NEW EVENT
            </h2>
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex my-4 justify-start items-center gap-6">
          <CiCalendarDate className="text-[45px]" />
          <p className="font-DMSans text-[17px] font-semibold">{time}</p>
        </div>
        <h2 className="font-DMSans text-[24px] font-semibold">{title}</h2>
        <div className="rounded-b-md flex justify-start items-center gap-6 my-4">
          <FaMapMarkerAlt className="text-[25px]" />
          <p className="font-DMSans text-[14px] font-semibold">{location}</p>
        </div>
        <div className="flex justify-end items-center gap-4">
          <h2 className="font-DMSans text-[14px] font-semibold">{type}</h2>
          <button className="w-[140px] py-2 bg-[#FF3B30] rounded-md text-white font-DMSans font-semibold">
            Register Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
