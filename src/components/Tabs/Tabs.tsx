import React, { ReactNode, useState } from "react";
import { useTheme } from "~/context/theme-provider";

// Define the type for a single tab item
interface Tab {
  title: string;
}

// Define the props type for the Tabs component
interface TabsProps {
  tabs: Tab[];
  children: ReactNode;
}

// Reusable Tabs component in TypeScript
const Tabs: React.FC<TabsProps> = ({ tabs, children }) => {
  const { theme } = useTheme();
  // State to track which tab is active
  const [activeTab, setActiveTab] = useState<number>(0);

  // Convert children to an array for easy access by index
  const childrenArray = React.Children.toArray(children);

  // Handler to change the active tab
  const handleTabChange = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div className="tabs-container">
      {/* Tab headers */}
      <div role="tablist" className="flex flex-col lg:flex-row gap-4 mb-4">
        {tabs.map((tab, index) => (
          <div key={index} className="tab">
            <span
              role="tab"
              aria-selected={activeTab === index}
              className={`cursor-pointer text-[18px] font-DMSans font-semibold py-2 border-b-2 
          ${
            activeTab === index
              ? theme === "dark"
                ? "border-[#FF3B30] text-[#FF3B30]"
                : "border-[#FF3B30] text-[#FF3B30]"
              : theme === "dark"
              ? "border-transparent text-[#fff]"
              : "border-transparent text-[#333]"
          }`}
              onClick={() => handleTabChange(index)}
            >
              {tab.title}
            </span>
          </div>
        ))}
      </div>

      {/* Render the content of the active tab */}
      <div role="tabpanel" className="p-4">
        {childrenArray[activeTab]
          ? childrenArray[activeTab]
          : "No content available"}
      </div>
    </div>
  );
};

export default Tabs;
