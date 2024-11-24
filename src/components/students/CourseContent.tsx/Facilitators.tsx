import { IoIosStar } from "react-icons/io";
import List from "~/components/list/List";
const Facilitators = () => {
  type FacilitatorsProps = {
    Title: string;
    items: string[];
  };
  const FacilitatorsItem: FacilitatorsProps[] = [
    {
      Title: "Learning Objectives ",
      items: [
        "Five O'level credit passes including English Language and Mathematics.",
        "Bachelor's degree in any field from a recognised university, with a minimum of second class lower division.",
        "HND graduates with a minimum of upper credit may be considered.",
        "Candidates are required to have a minimum of one year post-graduation work experience.",
        "Applicants with lower academic qualifications may generally need to demonstrate longer duration of work experience.",
      ],
    },
    {
      Title: "Course Structure",
      items: [
        "Five O'level credit passes including English Language and Mathematics.",
        "Bachelor's degree in any field from a recognised university, with a minimum of second class lower division.",
        "HND graduates with a minimum of upper credit may be considered.",
        "Candidates are required to have a minimum of one year post-graduation work experience.",
        "Applicants with lower academic qualifications may generally need to demonstrate longer duration of work experience.",
      ],
    },
    {
      Title: "Assessment Methods",
      items: [
        "Five O'level credit passes including English Language and Mathematics.",
        "Bachelor's degree in any field from a recognised university, with a minimum of second class lower division.",
        "HND graduates with a minimum of upper credit may be considered.",
        "Candidates are required to have a minimum of one year post-graduation work experience.",
        "Applicants with lower academic qualifications may generally need to demonstrate longer duration of work experience.",
      ],
    },
    {
      Title: "Career Options & Opportunities",
      items: [
        "Five O'level credit passes including English Language and Mathematics.",
        "Bachelor's degree in any field from a recognised university, with a minimum of second class lower division.",
        "HND graduates with a minimum of upper credit may be considered.",
        "Candidates are required to have a minimum of one year post-graduation work experience.",
        "Applicants with lower academic qualifications may generally need to demonstrate longer duration of work experience.",
      ],
    },
    {
      Title: "Admission Requirements",
      items: [
        "Five O'level credit passes including English Language and Mathematics.",
        "Bachelor's degree in any field from a recognised university, with a minimum of second class lower division.",
        "HND graduates with a minimum of upper credit may be considered.",
        "Candidates are required to have a minimum of one year post-graduation work experience.",
        "Applicants with lower academic qualifications may generally need to demonstrate longer duration of work experience.",
      ],
    },
    {
      Title: "Who is this course for ?",
      items: [
        "Five O'level credit passes including English Language and Mathematics.",
        "Bachelor's degree in any field from a recognised university, with a minimum of second class lower division.",
        "HND graduates with a minimum of upper credit may be considered.",
        "Candidates are required to have a minimum of one year post-graduation work experience.",
        "Applicants with lower academic qualifications may generally need to demonstrate longer duration of work experience.",
      ],
    },
  ];

  return (
    <div>
      <div className="flex justify-start flex-col lg:flex-row items-start lg:items-center gap-4">
        <img
          src="https://s3-alpha-sig.figma.com/img/fca1/b527/3dc913d6a517b22891c56fc7d0adbaf0?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ONW8A23I~6CcWgzr1HJbjqvEoW3bwT1i55H2QsLoX6DrCNuXcpV5ifNj0SVdmpBroZDrl6Knu0Xzjnh25apBeE9SZpiSH~wKajVVh1ffBoWfbVyCEQj20nzVCsFB6PcSPa9LscnJZgX9XytwfcxmVXGsledYyk1MoXOZpVHrxxzdkvoavhJD5eJ0tgAKoIlWX6V0yuMtpOB6Gj01gDY7dZf8bXWb0Cu7ailML3gouHAbAejeo81EnY7BXRE1Bb5rd7DYS2K7PEv4T9CmKuj4SFzBHYa9~F~ocKgS4btoEtez8xPfN-epO6bOFU0GJEM5S2XG8BPexaksN1XJJfrxIQ__"
          alt=""
          className="w-[135.37px] rounded-[4px] h-[130.2px]"
        />
        <div className="w-full lg:w-[283px]">
          <h2 className="text-[22px] font-semibold font-DMSans">Floyd Miles</h2>
          <p className="text-[16px] font-normal font-DMSans">
            President of Sales, Coco Cola, Africa
          </p>
          <div className="flex mt-3 justify-start items-center gap-2">
            <IoIosStar className="text-[16px] text-[#E59819] font-DMSans" />
            <p className="text-[16px] text-[#E59819] font-DMSans">4.5</p>
            <p className="text-[16px] font-DMSans">Instructor Rating</p>
          </div>
        </div>
      </div>
      <p className="my-4 text-[20px]">
        Back in 2010, I started brainspin with a desire to design compelling and
        engaging apps. For over 7 years, I have designed many high profile web
        and iPhone applications. The applications range from 3D medical aided
        web applications to project management applications for niche
        industries.{" "}
      </p>
      {FacilitatorsItem.map((facilitator, index) => (
        <List
          key={index}
          items={facilitator.items}
          title={facilitator.Title}
          ordered={false}
          customClass="p-2"
        />
      ))}
    </div>
  );
};

export default Facilitators;
