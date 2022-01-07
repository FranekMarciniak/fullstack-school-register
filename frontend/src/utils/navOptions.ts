import { MdPermIdentity, MdHome, MdSpaceDashboard } from "react-icons/md";
import { GiTeacher, GiNotebook } from "react-icons/gi";
import { BsClock } from "react-icons/bs";
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
  { text: "Courses", href: "/admin/courses/", icon: GiNotebook },
  { text: "Lessons", href: "/admin/lessons/", icon: BsClock },
];
// { text: "Open", href: "/about/" },
