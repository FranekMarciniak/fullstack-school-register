import { ICourse, IGroup, ITimetable } from "./global";
import { IGrade } from "./teacher";

export interface IStudentState {
  timetable: ITimetable;
  grades: IStudentGrade[];
}
export interface IStudentGrade extends ICourse {
  grades: IGrade[];
  group: IGroup;
}
