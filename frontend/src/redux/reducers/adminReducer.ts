import {
  ADD_ERROR,
  RECIVE_TEACHERS,
  CLEAR_ERRORS,
  ADD_TEACHER,
} from "../actions/types";

const initialState = {
  loading: false,
  errors: null,
  teachers: [],
  // createdUser:},
};

const adminReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case RECIVE_TEACHERS:
      return { ...state, teachers: action.payload };
    case ADD_TEACHER:
      return { ...state };
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
