import { combineReducers } from "redux";
import admin from "./adminReducer";
import global from "./globalReducer";
const combineReducersFunc = combineReducers({
  global,
  admin,
});
export default combineReducersFunc;
