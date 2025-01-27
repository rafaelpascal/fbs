import { SideNavProps } from "./LectureItems";
import { HiClipboardDocumentList } from "react-icons/hi2";
import { FaDotCircle } from "react-icons/fa";

export const lecturesidebarData: SideNavProps[] = [
  {
    href: "",
    icon: HiClipboardDocumentList,
    dropdown: true,
    playing: true,
    text: "Lesson 1: Introduction to Business consulting And Strategy ",
    children: [
      {
        href: "/lecture/:id",
        icon: FaDotCircle,
        dropdown: false,
        text: "Lecture",
        children: [],
      },
      {
        href: "/assignment",
        icon: FaDotCircle,
        dropdown: false,
        text: "Assignment",
        children: [],
      },
      {
        href: "",
        icon: FaDotCircle,
        dropdown: false,
        text: "Resources",
        children: [],
      },
    ],
  },
];
