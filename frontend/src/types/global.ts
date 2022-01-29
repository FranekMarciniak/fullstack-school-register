export interface IUser {
  id: number | null;
  username: string;
  password: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  role: string;
  createdAt: string;
  updatedAt: string;
  group_id: number;
}
export interface IGlobalState {
  errors: string;
  user: IUser;
}
export interface IFetchedUser {
  username: string;
  id?: number;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}
export interface IAdminState {
  teachers: IFetchedUser[];
  groups: IGroup[];
  courses: ICourse[];
  lessons: ILesson[];
  hours: IHour[];
  classrooms: IClassroom[];
  students: IFetchedUser[];
  days: IDay[];
  errors?: string;
  timetable: ITimetable;
  message?: string;
}
export interface ITimetable {
  [key: string]: ILesson[];
}

export interface IGroup {
  id: number;
  name: string;
}
export interface IHour {
  id: number;
  intervalName: string;
  periodNumber: number;
}
export interface IDay {
  id: number;
  name: string;
  dayNumber: number;
}
export interface IClassroom {
  id: number;
  name: string;
}
export interface ICourse {
  id: number;
  name: string;
  teacher_id: number;
  group_id: number;
}
export interface ILesson {
  id: number;
  hour_id: number;
  day_id: number;
  course_id: number;
  course: ICourseInLesson;
  hour: IHour;
  day: IDay;
  classroom: IClassroom;
}
export interface ICourseInLesson extends ICourse {
  group: IGroup;
  teacher: IFetchedUser;
}
export interface ILoginForm {
  username: string;
  password: string;
}
