import axios from "axios";
import { Dispatch } from "redux";
import {
  ADD_ERROR,
  ADD_GRADE,
  ADD_MESSAGE,
  CLEAR_ERRORS,
  CLEAR_MESSAGE,
  DELETE_GRADE,
  EDIT_GRADE,
  RECIVE_GRADES,
} from "../teacherTypes";
export const getGradesAction = (id: number) => async (dispatch: Dispatch) => {
  try {
    const res = await axios({
      method: "GET",
      withCredentials: true,
      url: `/api/grades/course_id=${id}`,
    });
    dispatch({ type: RECIVE_GRADES, payload: res.data });
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
export const addGradeAction =
  ({ value, weight, description, student_id, course_id }: any) =>
  async (dispatch: Dispatch) => {
    try {
      const res = await axios({
        method: "POST",
        data: { value, weight, description, student_id, course_id },
        withCredentials: true,
        url: "/api/grades/",
      });

      dispatch({
        type: ADD_GRADE,
        payload: res.data.data,
        id: student_id,
      });
      dispatch({ type: ADD_MESSAGE, payload: "Grade created!" });
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
export const editGradeAction =
  ({ value, weight, description, student_id, course_id, grade_id }: any) =>
  async (dispatch: Dispatch) => {
    try {
      const res = await axios({
        method: "PUT",
        data: {
          value,
          weight,
          description,
          student_id,
          course_id,
          id: grade_id,
        },
        withCredentials: true,
        url: `/api/grades/grade_id=${grade_id}`,
      });

      dispatch({
        type: EDIT_GRADE,
        payload: res.data.data,
        id: student_id,
      });
      dispatch({ type: ADD_MESSAGE, payload: "Grade updated!" });
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
export const deleteGradeAction =
  (id: number, student_id: number) => async (dispatch: Dispatch) => {
    try {
      const res = await axios({
        method: "DELETE",
        withCredentials: true,
        url: `/api/grades/grade_id=${id}`,
      });
      console.log(res);
      dispatch({ type: ADD_MESSAGE, payload: res.data.message });
      setTimeout(() => dispatch({ type: CLEAR_MESSAGE }), 3000);
      dispatch({ type: DELETE_GRADE, payload: id, id: student_id });
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
