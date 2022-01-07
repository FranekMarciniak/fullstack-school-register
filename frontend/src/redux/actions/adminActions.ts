import axios from "axios";
import { Dispatch } from "redux";
import {
  ADD_ERROR,
  ADD_GROUPS,
  ADD_MESSAGE,
  ADD_LESSON,
  CLEAR_ERRORS,
  CLEAR_MESSAGE,
  RECIVE_COURSES,
  RECIVE_GROUPS,
  RECIVE_TEACHERS,
  RECIVE_LESSONS,
  DELETE_USER,
  DELETE_COURSE,
  DELETE_LESSON,
  RECIVE_HOURS,
  RECIVE_DAYS,
  RECIVE_CLASSROOMS,
  ADD_DAY,
  ADD_CLASSROOM,
  ADD_HOUR,
} from "./types";

interface IUserToCreate {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
}
export interface ILessonToCreate {
  day_id: number;
  course_id: number;
  hour_id: number;
  classroom_id: number;
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
export const getDaysAction = () => async (dispatch: Dispatch) => {
  try {
    const res = await axios({
      method: "GET",
      withCredentials: true,
      url: "/api/days/",
    });
    dispatch({ type: RECIVE_DAYS, payload: res.data });
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

export const addDayAction =
  ({ dayNumber, name }: { dayNumber: number; name: string }) =>
  async (dispatch: Dispatch) => {
    try {
      const res = await axios({
        method: "POST",
        data: { name, dayNumber },
        withCredentials: true,
        url: "/api/days/",
      });
      dispatch({
        type: ADD_DAY,
        payload: {
          name: res.data.data.name,
          id: res.data.data.id,
          dayNumber: res.data.data.dayNumber,
        },
      });
      dispatch({ type: ADD_MESSAGE, payload: "Day created!" });
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
