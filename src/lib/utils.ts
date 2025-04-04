import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (dateString: string) => {
  if (!dateString) return "N/A"; // Handle undefined or null values
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(dateString));
};

export const getWeeksBetweenDates = (start: string, end: string): number => {
  const startDate: Date = new Date(start);
  const endDate: Date = new Date(end);
  const timeDiff: number = endDate.getTime() - startDate.getTime();
  const weeks: number = Math.ceil(timeDiff / (7 * 24 * 60 * 60 * 1000)); // Convert milliseconds to weeks
  return weeks;
};

export const getMonthsBetweenDates = (start: string, end: string): number => {
  const startDate: Date = new Date(start);
  const endDate: Date = new Date(end);

  const yearDiff: number = endDate.getFullYear() - startDate.getFullYear();
  const monthDiff: number = endDate.getMonth() - startDate.getMonth();

  return yearDiff * 12 + monthDiff + 1; // +1 to include the starting month
};

export const getSlideAnimation = ({
  slideDirection,
}: {
  slideDirection: string;
}) => {
  switch (slideDirection) {
    case "bottom":
      return {
        initial: { y: 100, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        exit: { y: 100, opacity: 0 },
      };
    case "left":
      return {
        initial: { x: -100, opacity: 0 },
        animate: { x: 0, opacity: 1 },
        exit: { x: -100, opacity: 0 },
      };
    case "right":
      return {
        initial: { x: 100, opacity: 0 },
        animate: { x: 0, opacity: 1 },
        exit: { x: 100, opacity: 0 },
      };
    case "top":
    default:
      return {
        initial: { y: -20, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        exit: { y: -20, opacity: 0 },
      };
  }
};
