import {
  ADD_CLASSROOM,
  ADD_DAY,
  ADD_GROUPS,
  ADD_HOUR,
  CLEAR_TIMETABLE,
  DELETE_CLASSROOM,
  DELETE_DAY,
  DELETE_GROUP,
  DELETE_HOUR,
  DELETE_LESSON,
  RECIVE_COURSES,
  RECIVE_DAYS,
  RECIVE_GROUPS,
  RECIVE_TIMETABLE,
} from "./../actions/types";
import {
  ADD_ERROR,
  RECIVE_TEACHERS,
  CLEAR_ERRORS,
  ADD_MESSAGE,
  DELETE_USER,
  CLEAR_MESSAGE,
  DELETE_COURSE,
  ADD_LESSON,
  RECIVE_LESSONS,
  RECIVE_HOURS,
  RECIVE_CLASSROOMS,
} from "../actions/types";

const initialState = {
  errors: null,
  teachers: [],
  lessons: [],
  groups: [],
  courses: [],
  hours: [],
  days: [],
  classrooms: [],
  timetable: {},
  message: null,
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
    case DELETE_COURSE:
      return {
        ...state,
        courses: state.courses.filter(
          (course: any) => course.id !== action.payload
        ),
      };
    case DELETE_LESSON:
      return {
        ...state,
        lessons: state.lessons.filter(
          (lesson: any) => lesson.id !== action.payload
        ),
      };
    case DELETE_GROUP:
      return {
        ...state,
        groups: state.groups.filter(
          (group: any) => group.id !== action.payload
        ),
      };
    case DELETE_CLASSROOM:
      return {
        ...state,
        classrooms: state.classrooms.filter(
          (classroom: any) => classroom.id !== action.payload
        ),
      };
    case DELETE_DAY:
      return {
        ...state,
        days: state.days.filter((day: any) => day.id !== action.payload),
      };
    case DELETE_HOUR:
      return {
        ...state,
        hours: state.hours.filter((hour: any) => hour.id !== action.payload),
      };
    case ADD_GROUPS:
      return { ...state, groups: [...state.groups, action.payload] };
    case ADD_DAY:
      return { ...state, days: [...state.days, action.payload] };
    case ADD_CLASSROOM:
      return { ...state, classrooms: [...state.classrooms, action.payload] };
    case ADD_HOUR:
      return { ...state, hours: [...state.hours, action.payload] };
    case ADD_LESSON:
      return { ...state };
    case RECIVE_LESSONS:
      return { ...state, lessons: [...action.payload] };
    case RECIVE_GROUPS:
      return { ...state, groups: action.payload };
    case RECIVE_COURSES:
      return { ...state, courses: action.payload };
    case RECIVE_HOURS:
      return { ...state, hours: action.payload };
    case RECIVE_DAYS:
      return { ...state, days: action.payload };
    case RECIVE_CLASSROOMS:
      return { ...state, classrooms: action.payload };
    case RECIVE_TIMETABLE:
      return { ...state, timetable: action.payload };
    case ADD_MESSAGE:
      return { ...state, message: action.payload };
    case CLEAR_TIMETABLE:
      return { ...state, timetable: {} };
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
