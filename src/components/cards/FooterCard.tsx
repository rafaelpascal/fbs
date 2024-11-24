import { cn } from "~/utils/helpers";

type FooterCardProps = {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  title: string;
  text: string;
};

const FooterCard = ({ icon: Icon, title, text }: FooterCardProps) => {
  return (
    <div className="w-full mt-10 lg:w-[410px] flex justify-evenly items-center flex-col border-[1px] rounded-[8px] border-[#FFFFFF]">
      <div className="flex justify-between border-b-[1px] border-[#ddd]  py-6 px-10 items-center">
        <Icon className={cn("bg-transparent text-[#fff] text-[70px]")} />
        <h2 className="text-[24px] font-DMSans text-[#fff] font-semibold text-center">
          {title}
        </h2>
      </div>
      <p className="text-[17px] font-DMSans py-6 px-10  text-[#fff] font-normal text-center">
        {text}
      </p>
    </div>
  );
};

export default FooterCard;
