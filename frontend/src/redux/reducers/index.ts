import { combineReducers } from "redux";
import student from "./studentReducer";
import admin from "./adminReducer";
import global from "./globalReducer";
import teacher from "./teacherReducer";
const combineReducersFunc = combineReducers({
  global,
  admin,
  teacher,
  student,
});
export default combineReducersFunc;
