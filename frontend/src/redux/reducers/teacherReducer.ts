import { IGrade, ITeacherGrade } from "../../types/teacher";
import {
  ADD_GRADE,
  DELETE_GRADE,
  EDIT_GRADE,
  RECIVE_COURSES,
  RECIVE_GRADES,
  RECIVE_TIMETABLE,
} from "../actions/teacherTypes";

const initialState = {
  errors: null,
  timetable: [],
  courses: [],
  grades: [],
};

const globalReducer = (state = initialState, action: any) => {
  console.log(state);
  switch (action.type) {
    case RECIVE_COURSES:
      return { ...state, courses: action.payload };
    case RECIVE_TIMETABLE:
      return { ...state, timetable: action.payload };
    case ADD_GRADE:
      return {
        ...state,
        grades: state.grades.map((teacherGradeObj: ITeacherGrade) =>
          teacherGradeObj.id === action.id
            ? {
                ...teacherGradeObj,
                grades: [...teacherGradeObj.grades, action.payload],
              }
            : teacherGradeObj
        ),
      };
    case EDIT_GRADE:
      return {
        ...state,
        grades: state.grades.map((teacherGradeObj: ITeacherGrade) =>
          teacherGradeObj.id === action.id
            ? {
                ...teacherGradeObj,
                grades: teacherGradeObj.grades.map((grade: IGrade) =>
                  grade.id === action.payload.id ? action.payload : grade
                ),
              }
            : teacherGradeObj
        ),
      };
    case DELETE_GRADE:
      return {
        ...state,
        grades: state.grades.map((teacherGradeObj: ITeacherGrade) =>
          teacherGradeObj.id === action.id
            ? {
                ...teacherGradeObj,
                grades: teacherGradeObj.grades.filter(
                  (grade: IGrade) => grade.id !== action.payload
                ),
              }
            : teacherGradeObj
        ),
      };
    case RECIVE_GRADES:
      return { ...state, grades: action.payload };
    default:
      return state;
  }
};
export default globalReducer;
