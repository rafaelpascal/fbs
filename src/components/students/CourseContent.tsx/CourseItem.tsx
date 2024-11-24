import { FaPlay } from "react-icons/fa6";

const CourseItem = () => {
  const Items = [
    {
      title: "Introduction to the User Experience Course",
      duration: "03:56",
      started: true,
    },
    {
      title: "Getting started with your Adobe XD project",
      duration: "03:56",
      started: false,
    },
    {
      title:
        "What is UI vs UX - User Interface vs User Experience vs Product Designer",
      duration: "03:56",
      started: false,
    },
    {
      title: "Wireframing (low fidelity) in Adobe XD",
      duration: "03:56",
      started: false,
    },
    {
      title: "Viewing your prototype on a mobile device",
      duration: "03:56",
      started: false,
    },
    {
      title: "Sharing your design",
      duration: "03:56",
      started: false,
    },
  ];

  return (
    <div>
      {Items.map((item, index) => (
        <div key={index} className="flex justify-between items-center mb-4">
          <div className="flex justify-start gap-4 items-center">
            <div className="h-6 w-6 flex justify-center items-center rounded-full bg-[#FF3B30]/10">
              <FaPlay className="text-[#FF3B30] text-[10px]" />
            </div>
            <h2>{item.title}</h2>
          </div>
          <div className="flex justify-end items-center gap-4">
            {item.started && (
              <button className="text-[#FF3B30] underline">Continue</button>
            )}
            <button>{item.duration}</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseItem;
