import axios from "axios";
import { Dispatch } from "redux";
import {
  ADD_ERROR,
  ADD_MESSAGE,
  ADD_LESSON,
  CLEAR_ERRORS,
  CLEAR_MESSAGE,
  RECIVE_LESSONS,
  DELETE_LESSON,
} from "../adminTypes";

export interface ILessonToCreate {
  day_id: number;
  course_id: number;
  hour_id: number;
  classroom_id: number;
}

export const addLessonAction =
  ({ day_id, course_id, hour_id, classroom_id }: ILessonToCreate) =>
  async (dispatch: Dispatch) => {
    try {
      await axios({
        method: "POST",
        data: { day_id, course_id, hour_id, classroom_id },
        withCredentials: true,
        url: "/api/lessons/",
      });
      dispatch({
        type: ADD_LESSON,
      });
      const res = await axios({
        method: "GET",
        withCredentials: true,
        url: "/api/lessons/",
      });
      dispatch({ type: RECIVE_LESSONS, payload: res.data });
      dispatch({ type: ADD_MESSAGE, payload: "Lesson created!" });
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

export const getLessonsAction = () => async (dispatch: Dispatch) => {
  try {
    const res = await axios({
      method: "GET",
      withCredentials: true,
      url: "/api/lessons/",
    });
    dispatch({ type: RECIVE_LESSONS, payload: res.data });
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

export const deleteLessonAction =
  (id: number) => async (dispatch: Dispatch) => {
    try {
      const res = await axios({
        method: "DELETE",
        withCredentials: true,
        url: `/api/lessons/${id}`,
      });
      dispatch({ type: ADD_MESSAGE, payload: res.data.message });
      setTimeout(() => dispatch({ type: CLEAR_MESSAGE }), 3000);
      dispatch({ type: DELETE_LESSON, payload: id });
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
