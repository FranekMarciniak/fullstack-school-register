import { combineReducers } from "redux";
import admin from "./adminReducer";
import global from "./globalReducer";
import teacher from "./teacherReducer";
const combineReducersFunc = combineReducers({
  global,
  admin,
  teacher,
});
export default combineReducersFunc;
