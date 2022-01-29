import axios from "axios";
import { Dispatch } from "redux";
import { ADD_ERROR, CLEAR_ERRORS, RECIVE_TIMETABLE } from "../studentTypes";

export const getTimetableAction =
  (group_id: number) => async (dispatch: Dispatch) => {
    try {
      const res = await axios({
        method: "GET",
        withCredentials: true,
        url: `/api/lessons/days/group/${group_id}`,
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
