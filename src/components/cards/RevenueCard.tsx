import { useTheme } from "~/context/theme-provider";
import { cn } from "../../utils/helpers";

export interface RevenueCardProps {
  icon: string;
  title: string;
  value: number;
  children?: React.ReactNode;
  childrenClassName?: string;
  className?: string;
  percentage: number;
  color: string;
}

export const DashboardCard = (props: RevenueCardProps) => {
  const { theme } = useTheme();
  const { children, icon, title, value, className } = props;

  return (
    <div
      className={cn(
        "border-r-[2px] w-full bg-themeWhite px-[22px] flex justify-between gap-4 items-start flex-col py-[10px]",
        className,
        theme === "dark" ? "border-[#333]" : "border-[#E6E6E8]"
      )}
    >
      <div className="w-full h-full flex justify-between items-center bg-inherit flow-row">
        <div className="bg-inherit flex justify-between bg-black h-full items-start  flex-col">
          <h2
            className={cn(
              "text-[14px] mb-5 font-medium bg-inherit font-DMSans",
              theme === "dark" ? "text-[#fff]" : "text-[#25313E]"
            )}
          >
            {title}
          </h2>
          <h2
            className={cn(
              "text-[20px] mb-5 bg-inherit font-bold font-DMSans",
              theme === "dark" ? "text-[#fff]" : "text-[#25313E]"
            )}
          >
            {value}
          </h2>
          <p
            className={cn(
              "text-[15px] bg-inherit font-normal font-DMSans",
              theme === "dark" ? "text-[#fff]" : "text-[#25313E]"
            )}
          >
            <span className="text-[#FF3B30]">$50</span> New Sales
          </p>
        </div>
        <div>
          <img src={icon} alt="" />
        </div>
      </div>
      {children && (
        <div
          className={cn("border-t bg-inherit  border-t-themeGrey/20 py-2.5")}
        >
          {children}
        </div>
      )}
    </div>
  );
};
