import {
  ADD_ERROR,
  RECIVE_TEACHERS,
  CLEAR_ERRORS,
  // ADD_TEACHER,
  ADD_MESSAGE,
  CLEAR_MESSAGE,
} from "../actions/types";

const initialState = {
  errors: null,
  teachers: [],
  message: null,
  // createdUser:},
};

const adminReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case RECIVE_TEACHERS:
      return { ...state, teachers: action.payload };
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
