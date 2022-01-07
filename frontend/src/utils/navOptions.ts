import {
  MdPermIdentity,
  MdHome,
  MdRoomPreferences,
  MdSpaceDashboard,
} from "react-icons/md";
import { GiTeacher, GiNotebook } from "react-icons/gi";
import { BsClock, BsFillCalendar2RangeFill } from "react-icons/bs";
export const notLoggedInNavOptions = [
  { text: "Home", href: "/", icon: MdHome },
  { text: "Login", href: "/login/", icon: MdPermIdentity },
];
export const studentNavOptions = [
  { text: "Dashboard", href: "/student", icon: MdPermIdentity },
];
export const adminNavOptions = [
  { text: "Dashboard", href: "/admin", icon: MdSpaceDashboard },
  { text: "Teachers", href: "/admin/teachers/", icon: GiTeacher },
  {
    text: "Classrooms and Groups",
    href: "/admin/classroomsandgroups/",
    icon: MdRoomPreferences,
  },
  { text: "Courses", href: "/admin/courses/", icon: GiNotebook },
  {
    text: "Hours and Days",
    href: "/admin/daysandhours/",
    icon: BsFillCalendar2RangeFill,
  },
  { text: "Lessons", href: "/admin/lessons/", icon: BsClock },
];
// { text: "Open", href: "/about/" },
