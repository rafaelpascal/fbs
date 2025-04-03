import React, { useEffect, useState } from "react";
import { CourseServices } from "~/api/course";
import { useTheme } from "~/context/theme-provider";

// Define types for the AccordionItem props
interface AccordionItemProps {
  lessons: number;
  title: string;
  children: React.ReactNode;
  name: string;
  defaultOpen?: boolean;
}

// AccordionItem component for individual collapsible items
const AccordionItem: React.FC<AccordionItemProps> = ({
  lessons,
  title,
  children,
  name,
  defaultOpen = false,
}) => {
  const { theme } = useTheme();

  return (
    <div
      className={`collapse collapse-arrow mb-4 border-[1px] rounded-[8px] ${
        theme === "dark" ? "bg-[#333] border-[#ddd]" : "bg-[#fff] border-[#000]"
      }`}
    >
      <input type="radio" name={name} defaultChecked={defaultOpen} />
      <div className="collapse-title flex flex-col lg:flex-row w-full justify-between items-start lg:items-center">
        <p className="text-xl font-medium w-full lg:w-[80%]">{title}</p>
        <p className="text-xl lg:text-sm font-medium w-full lg:w-[20%] text-left lg:text-right">
          {lessons} lectures{" "}
        </p>
      </div>
      <div className="collapse-content">
        <div>{children}</div>
      </div>
    </div>
  );
};

// Define types for the Accordion props
interface AccordionProps {
  lessons: number;
  items: {
    moduleId: string;
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
  const [lessonsCount, setLessonsCount] = useState<{ [key: string]: number }>(
    {}
  );
  // Fetch lessons for each module
  const getLessons = async () => {
    try {
      const lessonPromises = items.map(async (item) => {
        const payload = { moduleid: item.moduleId };
        const response = await CourseServices.getLessonByModuleId(payload);
        return {
          moduleId: item.moduleId,
          lessonCount: response.data.course_lessons.length,
        };
      });

      // Resolve all promises
      const lessonsData = await Promise.all(lessonPromises);

      // Convert array to object for easy lookup
      const lessonCountsObject = lessonsData.reduce((acc, item) => {
        acc[item.moduleId] = item.lessonCount;
        return acc;
      }, {} as { [key: string]: number });

      setLessonsCount(lessonCountsObject);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLessons();
  }, [items]);

  return (
    <div>
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          lessons={lessonsCount[item.moduleId] || 0}
          // title={`${item.title} (${lessonsCount[item.moduleId] || 0} Lessons)`}
          title={`${item.title}`}
          name={accordionName}
          defaultOpen={item.defaultOpen}
        >
          {item.children}
        </AccordionItem>
      ))}
    </div>
  );
};

export default Accordion;
