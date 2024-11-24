import React from "react";
import { useTheme } from "~/context/theme-provider";

// Define types for the AccordionItem props
interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  name: string;
  defaultOpen?: boolean;
}

// AccordionItem component for individual collapsible items
const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  children,
  name,
  defaultOpen = false,
}) => {
  const { theme } = useTheme();

  return (
    <div
      className={`collapse collapse-arrow mb-4 border-[1px] rounded-[8px] ${
        theme === "dark"
          ? "bg-[#333] border-[#ddd]"
          : "bg-[#F7F8FB] border-[#000]"
      }`}
    >
      <input type="radio" name={name} defaultChecked={defaultOpen} />
      <div className="collapse-title h-[60px] flex justify-between items-center">
        <p className="text-xl font-medium">{title}</p>
        <p className="text-sm font-medium">5 lectures • 87 min</p>
      </div>
      <div className="collapse-content">
        <div>{children}</div>
      </div>
    </div>
  );
};

// Define types for the Accordion props
interface AccordionProps {
  items: {
    title: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
  }[];
  accordionName?: string;
}

// Accordion component that accepts an array of items
const Accordion: React.FC<AccordionProps> = ({
  items,
  accordionName = "my-accordion",
}) => {
  return (
    <div>
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          name={accordionName}
          defaultOpen={item.defaultOpen}
        >
          {item.children} {/* Pass children here */}
        </AccordionItem>
      ))}
    </div>
  );
};

export default Accordion;
