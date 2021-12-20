import axios from "axios";
import { Dispatch } from "redux";
import {
  ADD_ERROR,
  ADD_GROUPS,
  ADD_MESSAGE,
  CLEAR_ERRORS,
  CLEAR_MESSAGE,
  RECIVE_COURSES,
  RECIVE_GROUPS,
  RECIVE_TEACHERS,
  DELETE_USER,
} from "./types";

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

export const addErrorAction =
  (message: string) => async (dispatch: Dispatch) => {
    dispatch({ type: ADD_ERROR, payload: message });
    setTimeout(() => dispatch({ type: CLEAR_ERRORS }), 3000);
  };

export const addGroupAction = (name: string) => async (dispatch: Dispatch) => {
  try {
    const res = await axios({
      method: "POST",
      data: { name },
      withCredentials: true,
      url: "/api/groups/",
    });
    dispatch({
      type: ADD_GROUPS,
      payload: { name: res.data.data.name, id: res.data.data.id },
    });
    dispatch({ type: ADD_MESSAGE, payload: "Group created!" });
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

export const getGroupsAction = () => async (dispatch: Dispatch) => {
  try {
    const res = await axios({
      method: "GET",
      withCredentials: true,
      url: "/api/groups/",
    });
    dispatch({ type: RECIVE_GROUPS, payload: res.data });
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
