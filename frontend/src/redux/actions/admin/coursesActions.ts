import axios from "axios";
import { Dispatch } from "redux";
import {
  ADD_ERROR,
  ADD_MESSAGE,
  CLEAR_ERRORS,
  CLEAR_MESSAGE,
  RECIVE_COURSES,
  DELETE_COURSE,
} from "../types";

export const getCoursesAction = () => async (dispatch: Dispatch) => {
  try {
    const res = await axios({
      method: "GET",
      withCredentials: true,
      url: "/api/courses/",
    });
    dispatch({ type: RECIVE_COURSES, payload: res.data });
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

export const addCourseAction =
  ({
    name,
    group_id,
    teacher_id,
  }: {
    name: string;
    group_id: number;
    teacher_id: number;
  }) =>
  async (dispatch: Dispatch) => {
    try {
      await axios({
        method: "POST",
        data: { name, group_id, teacher_id },
        withCredentials: true,
        url: "/api/courses/",
      });
      dispatch({ type: ADD_MESSAGE, payload: "Course created!" });
      setTimeout(() => dispatch({ type: CLEAR_MESSAGE }), 3000);

      const res = await axios({
        method: "GET",
        withCredentials: true,
        url: "/api/courses/",
      });
      dispatch({ type: RECIVE_COURSES, payload: res.data });
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

export const deleteCourseAction =
  (id: number) => async (dispatch: Dispatch) => {
    try {
      const res = await axios({
        method: "DELETE",
        withCredentials: true,
        url: `/api/courses/${id}`,
      });
      dispatch({ type: ADD_MESSAGE, payload: res.data.message });
      setTimeout(() => dispatch({ type: CLEAR_MESSAGE }), 3000);
      dispatch({ type: DELETE_COURSE, payload: id });
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
