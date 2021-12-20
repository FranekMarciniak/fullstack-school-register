import { ADD_GROUPS, RECIVE_COURSES, RECIVE_GROUPS } from "./../actions/types";
import {
  ADD_ERROR,
  RECIVE_TEACHERS,
  CLEAR_ERRORS,
  ADD_MESSAGE,
  DELETE_USER,
  CLEAR_MESSAGE,
} from "../actions/types";

const initialState = {
  errors: null,
  teachers: [] as any,
  groups: [],
  courses: [],
  message: null,
  // createdUser:},
};

const adminReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case RECIVE_TEACHERS:
      return { ...state, teachers: action.payload };
    case DELETE_USER:
      return {
        ...state,
        teachers: state.teachers.filter(
          (teacher: any) => teacher.id !== action.payload
        ),
      };
    case ADD_GROUPS:
      return { ...state, groups: [...state.groups, action.payload] };
    case RECIVE_GROUPS:
      return { ...state, groups: action.payload };
    case RECIVE_COURSES:
      return { ...state, courses: action.payload };
    case ADD_MESSAGE:
      return { ...state, message: action.payload };
    case CLEAR_MESSAGE:
      return { ...state, message: null };
    case ADD_ERROR:
      return {
        ...state,
        errors: action.payload,
      };
    case CLEAR_ERRORS: {
      return { ...state, errors: null };
    }

    default:
      return state;
  }
};
export default adminReducer;
