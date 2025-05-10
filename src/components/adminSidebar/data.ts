import { MdDashboard, MdOutlineEventAvailable } from "react-icons/md";
import { SideNavProps } from "./AdminNavItem";
import { HiClipboardDocumentList, HiUserGroup } from "react-icons/hi2";
import { PiCertificateBold, PiStudentFill } from "react-icons/pi";
import { FaCcMastercard, FaSchoolCircleCheck } from "react-icons/fa6";
import { TiMessages } from "react-icons/ti";
import { FaCogs } from "react-icons/fa";

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
  {
    href: "/admin/students",
    icon: PiStudentFill,
    dropdown: false,
    text: "Students",
  },
  {
    href: "/admin/events",
    icon: MdOutlineEventAvailable,
    dropdown: false,
    text: "Events",
  },
  {
    href: "/admin/admission",
    icon: FaSchoolCircleCheck,
    dropdown: false,
    text: "Applications",
  },
  {
    href: "/admin/signup",
    icon: HiUserGroup,
    dropdown: false,
    text: "Faculties",
  },
  {
    href: "",
    icon: TiMessages,
    dropdown: false,
    text: "Message",
  },
  {
    href: "/admin/support",
    icon: TiMessages,
    dropdown: false,
    text: "Support",
  },
  {
    href: "",
    icon: PiCertificateBold,
    dropdown: false,
    text: "Certificates",
  },
  {
    href: "/admin/payments",
    icon: FaCcMastercard,
    dropdown: false,
    text: "Payments",
  },
  {
    href: "",
    icon: FaCogs,
    dropdown: false,
    text: "Settings",
  },
];
