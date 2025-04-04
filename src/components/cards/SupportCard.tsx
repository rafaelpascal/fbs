interface SupportCardProps {
  title: string;
  description: string;
  buttonText: string;
  buttonColor?: string;
  borderColor: string;
  isAvailable?: boolean;
  pendingMessages?: number;
  avatars?: string[];
  handleFunction?: () => void;
}

export const SupportCard = ({
  title,
  description,
  buttonText,
  buttonColor = "#C4C4C4",
  borderColor,
  isAvailable = true,
  pendingMessages = 0,
  avatars,
  handleFunction,
}: SupportCardProps) => {
  return (
    <div
      className={`border-2 mt-4 px-4 py-2 rounded-lg flex flex-col lg:flex-row justify-between items-center w-full`}
      style={{ borderColor }}
    >
      <div className="w-full lg:w-[60%]">
        <h2 className="text-2xl my-4 px-4 text-[#FF5050] text-left font-DMSans font-bold">
          {title}
        </h2>
        <p className="text-lg px-4 text-left font-DMSans font-normal">
          {description}
        </p>
        <button
          onClick={handleFunction}
          className={`text-2xl my-4 px-4 font-DMSans font-bold`}
          style={{ color: buttonColor }}
        >
          {buttonText}
        </button>
      </div>
      <div className="w-full lg:w-[40%] flex flex-col gap-4 justify-end items-end">
        <div className="flex justify-between items-center">
          <h2 className="text-lg px-4 text-left font-DMSans font-bold">
            {isAvailable ? "Available" : "Coming soon!"}
          </h2>
          <div className="avatar-group -space-x-6">
            {avatars?.map((avatar, index) => (
              <div key={index} className="avatar">
                <div className="w-12">
                  <img src={avatar} alt="Support Agent" />
                </div>
              </div>
            ))}
          </div>
        </div>
        {pendingMessages > 0 && (
          <button className="text-sm text-[#FF5050] px-4 text-left font-DMSans font-normal">
            Pending messages ({pendingMessages})
          </button>
        )}
      </div>
    </div>
  );
};
