import axios from "axios";
import { Dispatch } from "redux";
import { ADD_ERROR, CLEAR_ERRORS, RECIVE_COURSES } from "../teacherTypes";
export const getCoursesAction = () => async (dispatch: Dispatch) => {
  try {
    const res = await axios({
      method: "GET",
      withCredentials: true,
      url: "/api/courses/teacher",
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
