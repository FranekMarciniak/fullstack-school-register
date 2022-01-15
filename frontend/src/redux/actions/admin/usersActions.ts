import axios from "axios";
import { Dispatch } from "redux";
import {
  ADD_ERROR,
  ADD_MESSAGE,
  CLEAR_ERRORS,
  CLEAR_MESSAGE,
  RECIVE_TEACHERS,
  DELETE_USER,
} from "../types";

interface IUserToCreate {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
}

export const getTeachersAction = () => async (dispatch: Dispatch) => {
  try {
    const res = await axios({
      method: "GET",
      withCredentials: true,
      url: "/api/users/teachers",
    });
    dispatch({ type: RECIVE_TEACHERS, payload: res.data });
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

export const createUserAction =
  (user: IUserToCreate, role: string) => async (dispatch: Dispatch) => {
    try {
      const resPostTeacher = await axios({
        method: "POST",
        data: {
          ...user,
          role,
        },
        withCredentials: true,
        url: "/api/users",
      });

      dispatch({ type: ADD_MESSAGE, payload: resPostTeacher.data.message });
      setTimeout(() => dispatch({ type: CLEAR_MESSAGE }), 3000);

      const resUsers = await axios({
        method: "GET",
        withCredentials: true,
        url: "/api/users/teachers",
      });
      dispatch({ type: RECIVE_TEACHERS, payload: resUsers.data });
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

export const deleteUserAction = (id: number) => async (dispatch: Dispatch) => {
  try {
    const res = await axios({
      method: "DELETE",
      withCredentials: true,
      url: `/api/users/${id}`,
    });
    dispatch({ type: ADD_MESSAGE, payload: res.data.message });
    setTimeout(() => dispatch({ type: CLEAR_MESSAGE }), 3000);
    dispatch({ type: DELETE_USER, payload: id });
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
