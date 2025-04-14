import { useState } from "react";

type MessageProps = {
  message: string;
  subject: string;
};

const Message = ({ message, subject }: MessageProps) => {
  const [messageLoading, setMessageLoading] = useState(true);

  setTimeout(() => {
    setMessageLoading(false);
  }, 1000);

  return (
    <div className="overflow-y-auto h-[560px]">
      {/* User message */}
      <div className="w-full flex justify-end mb-4 items-end flex-col">
        <h2 className="text-left w-full lg:w-[600px] text-[#6440FB] font-DMSans font-semibold text-xl mb-2">
          Ticket {subject}
        </h2>
        <div className="p-4 border border-[#8593ED] w-full lg:w-[600px] rounded-md bg-[#F1F3F4]">
          <p className="font-DMSans text-xl font-normal text-left">{message}</p>
        </div>
        <p className="text-[#C4C4C4] font-DMSans text-right italic">
          Sat. 19/03/2025, 18:10
        </p>
      </div>
      {/* Bot message */}
      {messageLoading ? (
        <div className="flex justify-end items-start flex-col">
          <h2 className="text-left w-full lg:w-[600px] text-[#F01E00] font-DMSans font-semibold text-2xl mb-2">
            FORDAX
          </h2>
          <div className="p-4 border border-[#F01E00] w-full lg:w-[600px] rounded-md bg-[#fff]">
            <p className="font-DMSans font-semibold text-2xl">Typing...</p>
          </div>
        </div>
      ) : (
        <div className="flex justify-end items-start flex-col">
          <h2 className="text-left w-full lg:w-[600px] text-[#F01E00] font-DMSans font-semibold text-xl mb-2">
            FORDAX
          </h2>
          <div className="p-4 border border-[#F01E00] w-full lg:w-[600px] rounded-md bg-[#fff]">
            <p className="font-DMSans text-xl font-normal text-left">
              Thank you for contacting us. Please bear with us while we review
              your message and get back to you as soon as possible. A reply will
              be sent to your email (
              <span className="text-[#F01E00]">iamdrmiki@gmail.com</span>)and
              you may be contacted for further assistance.
            </p>
            <p className="font-DMSans text-xl mt-6 font-normal text-left">
              Thank you!
            </p>
          </div>
          <p className="text-[#C4C4C4] font-DMSans text-right italic">
            Sat. 19/03/2025, 18:10
          </p>
        </div>
      )}
    </div>
  );
};

export default Message;
