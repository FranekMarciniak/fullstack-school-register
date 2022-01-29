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
        grades: state.grades.map((grade: any) =>
          grade.id === action.id
            ? { ...grade, grades: [...grade.grades, action.payload] }
            : grade
        ),
      };
    case EDIT_GRADE:
      return {
        ...state,
        grades: state.grades.map((grade: any) =>
          grade.id === action.id
            ? {
                ...grade,
                grades: grade.grades.map((grade: any) =>
                  grade.id === action.payload.id ? action.payload : grade
                ),
              }
            : grade
        ),
      };
    case DELETE_GRADE:
      return {
        ...state,
        grades: state.grades.map((grade: any) =>
          grade.id === action.id
            ? {
                ...grade,
                grades: grade.grades.filter(
                  (grade: any) => grade.id !== action.payload
                ),
              }
            : grade
        ),
      };
    case RECIVE_GRADES:
      return { ...state, grades: action.payload };
    default:
      return state;
  }
};
export default globalReducer;
