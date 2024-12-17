import { coupon, playbtn } from "~/assets";
// import { RevenueCardProps } from "~/components/dashboard/RevenueCard";

import { RevenueCardProps } from "../cards/RevenueCard";

// Define the constant for revenueHeroCards outside the component
export const RevenueCards = (
  dashboardData: AccountDetails
): RevenueCardProps[] => {
  return [
    {
      icon: coupon,
      percentage: 50,
      title: "Total Sales",
      value: (dashboardData.merchantCount || dashboardData.merchants) ?? 0,
      color: "#4643D9",
    },
    {
      icon: playbtn,
      percentage: 90,
      title: "Total Courses",
      value: (dashboardData.businessCount || dashboardData.businesses) ?? 0,
      color: "#40AD93",
    },
    {
      icon: coupon,
      percentage: 80,
      title: "Total Students",
      value:
        (dashboardData.beneficiaryCount || dashboardData.beneficiaries) ?? 0,
      color: "#E25590",
    },
    {
      icon: playbtn,
      percentage: 30,
      title: "Total Instructor",
      value: (dashboardData.customersCount || dashboardData.customers) ?? 0,
      color: "#B54ED9",
    },
  ];
};
