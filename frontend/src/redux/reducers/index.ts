import { combineReducers } from "redux";
import globalReducer from "./globalReducer";
const combineReducersFunc = combineReducers({
  global: globalReducer,
});
export default combineReducersFunc;
