import axios from "axios";
import { Dispatch } from "redux";
import {
  ADD_ERROR,
  ADD_MESSAGE,
  CLEAR_ERRORS,
  CLEAR_MESSAGE,
  RECIVE_TEACHERS,
  DELETE_USER,
  RECIVE_STUDENTS,
  CLEAR_STUDENTS,
} from "../adminTypes";

interface IUserToCreate {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  group?: string;
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
export const getStudentsAction =
  (group: number) => async (dispatch: Dispatch) => {
    try {
      const res = await axios({
        method: "GET",
        withCredentials: true,
        url: `/api/users/students/${group}`,
      });
      dispatch({ type: RECIVE_STUDENTS, payload: res.data });
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
  (user: IUserToCreate, role: string, group?: number) =>
  async (dispatch: Dispatch) => {
    try {
      const resPostTeacher = await axios({
        method: "POST",
        data: {
          ...user,
          role,
          group: group ? group : null,
        },
        withCredentials: true,
        url: "/api/users",
      });

      dispatch({ type: ADD_MESSAGE, payload: resPostTeacher.data.message });
      setTimeout(() => dispatch({ type: CLEAR_MESSAGE }), 3000);
      const resUsers = await axios({
        method: "GET",
        withCredentials: true,
        //if there is group it will query students else it will query for teachers
        url: group ? `/api/users/students/${group}` : "/api/users/teachers",
      });
      dispatch({
        //if there is group it will query students else it will query for teachers
        type: group ? RECIVE_STUDENTS : RECIVE_TEACHERS,
        payload: resUsers.data,
      });
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

export const clearStudents = () => async (dispatch: Dispatch) => {
  dispatch({ type: CLEAR_STUDENTS });
};
