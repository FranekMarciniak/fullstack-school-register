import axios from "axios";
import { Dispatch } from "redux";
import {
  ADD_ERROR,
  ADD_MESSAGE,
  CLEAR_ERRORS,
  CLEAR_MESSAGE,
  RECIVE_DAYS,
  ADD_DAY,
} from "../types";
export const getDaysAction = () => async (dispatch: Dispatch) => {
  try {
    const res = await axios({
      method: "GET",
      withCredentials: true,
      url: "/api/days/",
    });
    dispatch({ type: RECIVE_DAYS, payload: res.data });
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
export const addDayAction =
  ({ dayNumber, name }: { dayNumber: number; name: string }) =>
  async (dispatch: Dispatch) => {
    try {
      const res = await axios({
        method: "POST",
        data: { name, dayNumber },
        withCredentials: true,
        url: "/api/days/",
      });
      dispatch({
        type: ADD_DAY,
        payload: {
          name: res.data.data.name,
          id: res.data.data.id,
          dayNumber: res.data.data.dayNumber,
        },
      });
      dispatch({ type: ADD_MESSAGE, payload: "Day created!" });
      setTimeout(() => dispatch({ type: CLEAR_MESSAGE }), 3000);
    } catch (err: any) {
      if (err.response) {
        const error = err.response.data.message;
        dispatch({ type: ADD_ERROR, payload: error });
        setTimeout(() => dispatch({ type: CLEAR_ERRORS }), 3000);
      } else {
        console.log(err);
      }
    }
  };
