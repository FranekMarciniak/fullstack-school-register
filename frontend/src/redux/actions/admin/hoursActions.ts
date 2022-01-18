import axios from "axios";
import { Dispatch } from "redux";
import {
  ADD_ERROR,
  ADD_MESSAGE,
  CLEAR_ERRORS,
  CLEAR_MESSAGE,
  RECIVE_HOURS,
  ADD_HOUR,
} from "../types";

export const getHoursAction = () => async (dispatch: Dispatch) => {
  try {
    const res = await axios({
      method: "GET",
      withCredentials: true,
      url: "/api/hours/",
    });
    dispatch({ type: RECIVE_HOURS, payload: res.data });
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
export const addHourAction =
  ({
    periodNumber,
    intervalName,
  }: {
    periodNumber: number;
    intervalName: string;
  }) =>
  async (dispatch: Dispatch) => {
    try {
      const res = await axios({
        method: "POST",
        data: { periodNumber, intervalName },
        withCredentials: true,
        url: "/api/hours/",
      });
      dispatch({
        type: ADD_HOUR,
        payload: {
          intervalName: res.data.data.intervalName,
          id: res.data.data.id,
          periodNumber: res.data.data.periodNumber,
        },
      });
      dispatch({ type: ADD_MESSAGE, payload: "Hour created!" });
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
