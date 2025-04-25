import { FaCcMastercard, FaCogs, FaRegUserCircle } from "react-icons/fa";
import { SideNavProps } from "./NavItem";
import { HiClipboardDocumentList } from "react-icons/hi2";
import { CiBellOn } from "react-icons/ci";
import { MdOutlineEventAvailable, MdOutlineSupportAgent } from "react-icons/md";
import { AiOutlineTransaction } from "react-icons/ai";
import { ROUTES } from "../constants/routes";

export const sidebarData: SideNavProps[] = [
  {
    href: "/dashboard",
    icon: HiClipboardDocumentList,
    dropdown: false,
    text: "My Courses",
  },
  {
    href: ROUTES.STUDENTPROFILE,
    icon: FaRegUserCircle,
    dropdown: false,
    text: "My Profile",
  },
  {
    href: "/events",
    icon: MdOutlineEventAvailable,
    dropdown: false,
    text: "Events",
  },
  {
    href: "/transaction",
    icon: AiOutlineTransaction,
    dropdown: false,
    text: "Transactions",
  },
  {
    href: ROUTES.FORUM,
    icon: AiOutlineTransaction,
    dropdown: false,
    text: "Forum",
  },
  {
    href: ROUTES.NOTIFICATION,
    icon: CiBellOn,
    dropdown: false,
    text: "Notifications",
  },
  {
    href: ROUTES.PAYMENTPLAN,
    icon: FaCcMastercard,
    dropdown: false,
    text: "Payment Plans",
  },
  {
    href: "/settings",
    icon: FaCogs,
    dropdown: false,
    text: "Settings",
  },
  {
    href: "/support",
    icon: MdOutlineSupportAgent,
    dropdown: false,
    text: "Support",
  },
];
