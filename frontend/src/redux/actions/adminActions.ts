import { Dispatch } from "redux";
import { ADD_ERROR, CLEAR_ERRORS } from "./adminTypes";
export interface ILessonToCreate {
  day_id: number;
  course_id: number;
  hour_id: number;
  classroom_id: number;
}
export const addErrorAction =
  (message: string) => async (dispatch: Dispatch) => {
    dispatch({ type: ADD_ERROR, payload: message });
    setTimeout(() => dispatch({ type: CLEAR_ERRORS }), 3000);
  };
