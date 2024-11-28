import { TopNav } from "~/components/dashboard/TopNav";
import { motion } from "framer-motion";
import { useTheme } from "~/context/theme-provider";

interface DashboardAreaProps {
  children: React.ReactNode;
}

export const DashboardArea = (props: DashboardAreaProps) => {
  const { children } = props;
  const { theme } = useTheme();

  return (
    <main className="fixed flex w-full h-[100vh] flex-col overflow-y-hidden sm:relative sm:overflow-y-auto">
      <TopNav />
      <div
        className={`max-h-[calc(100vh)] h-[90vh] overflow-y-auto overflow-x-hidden p-2 lg:px-10 py-10 ${
          theme === "light" ? "bg-[#F7F8FB]" : ""
        }`}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="lg:pb-4 pb-10"
        >
          {children}
        </motion.div>
      </div>
    </main>
  );
};
