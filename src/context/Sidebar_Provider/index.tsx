import { createContext, useState, useContext, ReactNode } from "react";
import { lecturesidebarData } from "~/components/lecturesidebar/data";

export interface SidebarContextType {
  sidebarData: typeof lecturesidebarData;
  updateSidebarData: (newData: typeof lecturesidebarData) => void;
}

// Create context
const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

// Provider component
export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [sidebarData, setSidebarData] = useState(lecturesidebarData);

  const updateSidebarData = (newData: typeof lecturesidebarData) => {
    setSidebarData(newData);
  };

  return (
    <SidebarContext.Provider value={{ sidebarData, updateSidebarData }}>
      {children}
    </SidebarContext.Provider>
  );
};

// Hook to use sidebar context
export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};
