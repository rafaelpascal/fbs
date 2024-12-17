import { MdDashboard } from "react-icons/md";
import { SideNavProps } from "./AdminNavItem";
import { HiClipboardDocumentList } from "react-icons/hi2";
// import { BsBank, BsBarChartFill } from "react-icons/bs";
// import { RiHand } from "react-icons/ri";
// import { LuUserCircle } from "react-icons/lu";
// import { RiExchange2Fill } from "react-icons/ri";
// import { IoDocumentsOutline } from "react-icons/io5";

export const sidebarData: SideNavProps[] = [
  {
    href: "/admin/dashboard",
    icon: MdDashboard,
    dropdown: false,
    text: "Dashboard",
  },
  {
    href: "/admin/courses",
    icon: HiClipboardDocumentList,
    dropdown: false,
    text: "Courses",
  },
];
