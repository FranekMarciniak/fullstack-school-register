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
  groups: { name: string; id: number }[];
  courses: any[];
  lessons: any[];
  hours: any[];
  classrooms: any[];
  students: any[];
  days: any[];
  errors?: string;
  timetable: any;
  message?: string;
  teachers: IFetchedUser[] | [];
}
export interface ILoginForm {
  username: string;
  password: string;
}
