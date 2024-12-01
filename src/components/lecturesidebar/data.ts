import { SideNavProps } from "./LectureItems";
import { HiClipboardDocumentList } from "react-icons/hi2";
import { FaDotCircle } from "react-icons/fa";
import { IoDocumentTextOutline } from "react-icons/io5";

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
  {
    href: "",
    icon: IoDocumentTextOutline,
    dropdown: true,
    playing: false,
    text: "Lesson 2: Understanding The Different Types Of Consulting",
    children: [
      {
        href: "/word",
        icon: FaDotCircle,
        dropdown: false,
        text: "Lecture",
        children: [],
      },
      {
        href: "/module/assignment",
        icon: FaDotCircle,
        dropdown: false,
        text: "Quiz",
        children: [],
      },
      {
        href: "",
        icon: FaDotCircle,
        dropdown: false,
        text: "Case study",
        children: [],
      },
    ],
  },
];
