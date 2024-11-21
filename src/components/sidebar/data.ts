import { SideNavProps } from "./NavItem";
import { HiClipboardDocumentList } from "react-icons/hi2";
// import { BsBank, BsBarChartFill } from "react-icons/bs";
// import { RiHand } from "react-icons/ri";
// import { LuUserCircle } from "react-icons/lu";
// import { RiExchange2Fill } from "react-icons/ri";
// import { IoDocumentsOutline } from "react-icons/io5";

export const sidebarData: SideNavProps[] = [
  {
    href: "/dashboard",
    icon: HiClipboardDocumentList,
    dropdown: false,
    text: "My Courses",
  },
  {
    href: "/pro",
    icon: HiClipboardDocumentList,
    dropdown: false,
    text: "Profile",
  },
];
