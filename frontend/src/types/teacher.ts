import { ICourse, IFetchedUser, IGroup, ITimetable } from "./global";

export interface ITeacherState {
  courses: ITeacherCourse[];
  grades: ITeacherGrade[];
  timetable: ITimetable;
}
export interface ITeacherCourse extends ICourse {
  group: IGroup;
}

export interface IGrade {
  id: number;
  value: number;
  weight: number;
  description?: string | null;
  student_id: number;
  course_id: number;
  course: ICourseInGrade;
}

export interface ICourseInGrade extends ICourse {
  group: IGroup;
}
export interface ITeacherGrade extends IFetchedUser {
  grades: IGrade[];
  group: IGroup;
}
