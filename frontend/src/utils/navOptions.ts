import {
  MdPermIdentity,
  MdHome,
  MdRoomPreferences,
  MdSpaceDashboard,
} from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { GiTeacher, GiNotebook } from "react-icons/gi";
import { RiNumber5 } from "react-icons/ri";
import {
  BsClock,
  BsFillCalendar2RangeFill,
  BsFillCalendarEventFill,
} from "react-icons/bs";

export const notLoggedInNavOptions = [
  { text: "Home", href: "/", icon: MdHome },
  { text: "Login", href: "/login/", icon: MdPermIdentity },
];
export const studentNavOptions = [
  { text: "Dashboard", href: "/student", icon: MdPermIdentity },
  {
    text: "Timetable",
    href: "/student/timetable",
    icon: BsFillCalendarEventFill,
  },
  {
    text: "Grades",
    href: "/student/grades",
    icon: RiNumber5,
  },
];
export const teacherNavOptions = [
  { text: "Dashboard", href: "/teacher", icon: MdSpaceDashboard },
  {
    text: "Timetable",
    href: "/teacher/timetable",
    icon: BsFillCalendarEventFill,
  },
  {
    text: "Grades",
    href: "/teacher/grades",
    icon: RiNumber5,
  },
];
export const adminNavOptions = [
  { text: "Dashboard", href: "/admin", icon: MdSpaceDashboard },
  { text: "Teachers", href: "/admin/teachers/", icon: GiTeacher },
  { text: "Students", href: "/admin/students/", icon: FaUsers },
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
  {
    text: "Timetables",
    href: "/admin/timetable/",
    icon: BsFillCalendarEventFill,
  },
];
