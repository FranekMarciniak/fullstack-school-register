import axios from "axios";
import { Dispatch } from "redux";
import {
  ADD_ERROR,
  CLEAR_ERRORS,
  RECIVE_TIMETABLE,
  CLEAR_TIMETABLE,
} from "../types";

export const getTimetableAction =
  (group?: number) => async (dispatch: Dispatch) => {
    const url = group
      ? `/api/lessons/days/group/${group}`
      : "/api/lessons/days";
    try {
      const res = await axios({
        method: "GET",
        withCredentials: true,
        url,
      });
      dispatch({ type: RECIVE_TIMETABLE, payload: res.data });
    } catch (err: any) {
      if (err.response) {
        const error = err.response.data.message.message;
        dispatch({ type: ADD_ERROR, payload: error });
        setTimeout(() => dispatch({ type: CLEAR_ERRORS }), 3000);
      } else {
        console.log(err);
      }
    }
  };

export const clearTimetableAction = () => (dispatch: Dispatch) => {
  dispatch({ type: CLEAR_TIMETABLE });
};
