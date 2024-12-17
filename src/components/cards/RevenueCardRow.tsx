import { DashboardCard, RevenueCardProps } from "./RevenueCard";
import { cn } from "../../utils/helpers";
import { useTheme } from "~/context/theme-provider";

interface DashboardCardRowProps {
  dashboardHeroCards: RevenueCardProps[];
}

export const RevenueCardRow: React.FC<DashboardCardRowProps> = ({
  dashboardHeroCards,
}) => {
  const { theme } = useTheme();
  return (
    <div className={cn("relative rounded-[8px] h-full w-full")}>
      <div
        className={cn(
          " flex flex-row rounded-[8px] justify-between w-full h-full items-center gap-2 overflow-x-auto",
          theme === "dark" ? "bg-[#333]" : "bg-white"
        )}
      >
        {dashboardHeroCards.map((n) => (
          <DashboardCard
            key={n.title}
            {...n}
            childrenClassName="text-themeGrey bg-white px-4 text-sm"
            className="flex-1 min-w-[270px] max-md:min-w-[280px] h-auto bg-inherit"
          />
        ))}
      </div>
    </div>
  );
};
