import { RECIVE_GRADES, RECIVE_TIMETABLE } from "../actions/studentTypes";

const initialState = {
  errors: null,
  timetable: [],
  grades: [],
};

const studentReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case RECIVE_TIMETABLE:
      return { ...state, timetable: action.payload };
    case RECIVE_GRADES:
      return { ...state, grades: action.payload };
    default:
      return state;
  }
};
export default studentReducer;
