import axios from "axios";
import { Dispatch } from "redux";
import { ILoginForm } from "../../types/global";
import { SET_USER, ADD_ERROR, CLEAR_ERRORS, CLEAR_USER } from "./types";

export const loginAction = (user: ILoginForm) => async (dispatch: Dispatch) => {
  try {
    const res = await axios({
      method: "POST",
      data: {
        ...user,
      },
      withCredentials: true,
      url: "http://localhost:4000/api/sessions",
    });
    dispatch({ type: SET_USER, payload: res.data });
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
export const checkUserAction = () => async (dispatch: Dispatch) => {
  try {
    const res = await axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:4000/api/sessions",
    });
    dispatch({ type: SET_USER, payload: res.data });
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
export const logoutAction = () => async (dispatch: Dispatch) => {
  axios({
    method: "DELETE",
    withCredentials: true,
    url: "http://localhost:4000/api/sessions",
  })
    .then(() => dispatch({ type: CLEAR_USER }))
    .catch((error: any) =>
      dispatch({
        type: ADD_ERROR,
        message: error.response.data.message.message,
      })
    );
};
