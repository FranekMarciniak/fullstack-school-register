import axios from "axios";
import { Dispatch } from "redux";
import {
  ADD_ERROR,
  ADD_MESSAGE,
  CLEAR_ERRORS,
  CLEAR_MESSAGE,
  RECIVE_CLASSROOMS,
  ADD_CLASSROOM,
} from "../types";

export const getClassroomsAction = () => async (dispatch: Dispatch) => {
  try {
    const res = await axios({
      method: "GET",
      withCredentials: true,
      url: "/api/classrooms/",
    });
    dispatch({ type: RECIVE_CLASSROOMS, payload: res.data });
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

export const addClassroomAction =
  (name: string) => async (dispatch: Dispatch) => {
    try {
      const res = await axios({
        method: "POST",
        data: { name },
        withCredentials: true,
        url: "/api/classrooms/",
      });
      dispatch({
        type: ADD_CLASSROOM,
        payload: {
          id: res.data.data.id,
          name: res.data.data.name,
        },
      });
      dispatch({ type: ADD_MESSAGE, payload: "Classroom created!" });
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
