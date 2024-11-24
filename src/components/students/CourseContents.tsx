import Accordion from "../Collapsible/Accordion";
import CourseItem from "./CourseContent.tsx/CourseItem";

const CourseContents = () => {
  const accordionItems = [
    {
      title: `Module 1`,
      defaultOpen: true,
      children: (
        <div>
          <CourseItem />
        </div>
      ),
    },
    {
      title: "Item 2",
      children: (
        <div>
          <h4>Content for Item 2</h4>
          <p>Additional information can go here.</p>
        </div>
      ),
    },
    {
      title: "Item 3",
      children: (
        <div>
          <p>Content for Item 3 with more details.</p>
        </div>
      ),
    },
  ];

  return (
    <div>
      <h2 className="font-DMSans font-semibold mb-4">Description</h2>
      <h2 className="mb-4">12 Modules • 40 lesson</h2>
      <Accordion items={accordionItems} accordionName="example-accordion" />
    </div>
  );
};

export default CourseContents;
