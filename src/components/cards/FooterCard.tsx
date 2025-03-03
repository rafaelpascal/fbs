import { cn } from "~/utils/helpers";

type FooterCardProps = {
  icon: string; // Accepts both
  title: string;
  text: string;
  containerClass?: string;
  textClass?: string;
};

const FooterCard = ({
  icon: Icon,
  title,
  text,
  containerClass,
  textClass,
}: FooterCardProps) => {
  return (
    <div
      className={cn(
        "w-full mt-10 min:w-[410px] flex justify-evenly items-center flex-col border-[1px] rounded-[8px] border-[#FFFFFF]",
        containerClass
      )}
    >
      <div className="flex justify-between border-b-[1px] w-full border-[#ddd] h-[100px] py-6 px-10 items-center">
        <img src={Icon} alt="" className="w-[60px] lg:w-[15%]" />
        <h2
          className={cn(
            "text-[24px] w-[85%] font-DMSans text-[#fff] font-semibold text-center",
            textClass
          )}
        >
          {title}
        </h2>
      </div>
      <p
        className={cn(
          "text-[17px] font-DMSans py-6 px-10 lg:h-[250px] w-full text-[#fff] font-normal text-center",
          textClass
        )}
      >
        {text}
      </p>
    </div>
  );
};

export default FooterCard;
