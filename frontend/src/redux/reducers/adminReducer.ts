import {
  ADD_CLASSROOM,
  ADD_DAY,
  ADD_ERROR,
  ADD_GROUPS,
  ADD_HOUR,
  ADD_LESSON,
  ADD_MESSAGE,
  CLEAR_ERRORS,
  CLEAR_MESSAGE,
  CLEAR_STUDENTS,
  CLEAR_TIMETABLE,
  DELETE_CLASSROOM,
  DELETE_COURSE,
  DELETE_DAY,
  DELETE_GROUP,
  DELETE_HOUR,
  DELETE_LESSON,
  DELETE_USER,
  RECIVE_CLASSROOMS,
  RECIVE_COURSES,
  RECIVE_DAYS,
  RECIVE_GROUPS,
  RECIVE_HOURS,
  RECIVE_LESSONS,
  RECIVE_STUDENTS,
  RECIVE_TEACHERS,
  RECIVE_TIMETABLE,
} from "../actions/adminTypes";
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
  students: [],
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
    case RECIVE_STUDENTS:
      return { ...state, students: action.payload };
    case ADD_MESSAGE:
      return { ...state, message: action.payload };
    case CLEAR_TIMETABLE:
      return { ...state, timetable: {} };
    case CLEAR_STUDENTS:
      return { ...state, students: [] };
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
