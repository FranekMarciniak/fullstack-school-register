import { IAdminState } from "../../types/global";
import {
  RECIVE_USERS,
  CLEAR_USERS,
  ADD_ERROR,
  RECIVE_TEACHERS,
  CLEAR_ERRORS,
} from "../actions/types";

const initialState = {
  loading: false,
  errors: null,
  teachers: [],
};

const adminReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case RECIVE_TEACHERS:
      return { ...state, teachers: action.payload };
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
