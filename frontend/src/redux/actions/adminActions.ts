import { Dispatch } from "redux";
import { ADD_ERROR, CLEAR_ERRORS } from "./types";

export const addErrorAction =
  (message: string) => async (dispatch: Dispatch) => {
    dispatch({ type: ADD_ERROR, payload: message });
    setTimeout(() => dispatch({ type: CLEAR_ERRORS }), 3000);
  };
