import { SideNavProps } from "./LectureItems";
import { HiClipboardDocumentList } from "react-icons/hi2";
import { FaDotCircle } from "react-icons/fa";

// export const lecturesidebarData: SideNavProps[] = [
//   {
//     href: "",
//     icon: HiClipboardDocumentList,
//     dropdown: true,
//     playing: true,
//     text: " ",
//     children: [
//       {
//         href: "/lecture/:id",
//         icon: FaDotCircle,
//         dropdown: false,
//         text: "Lecture",
//         children: [],
//       },
//       {
//         href: "/assignment",
//         icon: FaDotCircle,
//         dropdown: false,
//         text: "Assignment",
//         children: [],
//       },
//       {
//         href: "",
//         icon: FaDotCircle,
//         dropdown: false,
//         text: "Resources",
//         children: [],
//       },
//     ],
//   },
// ];
export const lecturesidebarData: SideNavProps[] = [
  {
    href: "",
    icon: HiClipboardDocumentList,
    dropdown: true,
    playing: true,
    text: " ",
    children: [
      {
        href: "/lecture/:id",
        icon: FaDotCircle,
        dropdown: false,
        text: "Lecture",
        children: [],
      },
      {
        href: "/resources",
        icon: FaDotCircle,
        dropdown: false,
        text: "Resources",
        children: [],
      },
    ],
  },
  // New Parent: Assessments
  {
    href: "",
    icon: HiClipboardDocumentList,
    dropdown: true,
    playing: false,
    text: "Assessments",
    children: [
      {
        href: "/quiz/:id",
        icon: FaDotCircle,
        dropdown: false,
        text: "Quiz",
        children: [],
      },
      {
        href: "/exam/:id",
        icon: FaDotCircle,
        dropdown: false,
        text: "Exam",
        children: [],
      },
      {
        href: "/assignment/:id",
        icon: FaDotCircle,
        dropdown: false,
        text: "Assignment",
        children: [],
      },
    ],
  },
];
