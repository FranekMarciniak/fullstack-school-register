import axios from "axios";
import { Dispatch } from "redux";
import {
  ADD_ERROR,
  ADD_MESSAGE,
  ADD_LESSON,
  CLEAR_ERRORS,
  CLEAR_MESSAGE,
  RECIVE_COURSES,
  RECIVE_LESSONS,
  DELETE_COURSE,
  DELETE_LESSON,
  RECIVE_HOURS,
  RECIVE_DAYS,
  RECIVE_CLASSROOMS,
  ADD_DAY,
  ADD_CLASSROOM,
  ADD_HOUR,
  RECIVE_TIMETABLE,
  CLEAR_TIMETABLE,
} from "./types";

export interface ILessonToCreate {
  day_id: number;
  course_id: number;
  hour_id: number;
  classroom_id: number;
}

export const addErrorAction =
  (message: string) => async (dispatch: Dispatch) => {
    dispatch({ type: ADD_ERROR, payload: message });
    setTimeout(() => dispatch({ type: CLEAR_ERRORS }), 3000);
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

export const getTimetableAction =
  (group?: number) => async (dispatch: Dispatch) => {
    const url = group
      ? `/api/lessons/days/group/${group}`
      : "/api/lessons/days";
    try {
      const res = await axios({
        method: "GET",
        withCredentials: true,
        url,
      });
      dispatch({ type: RECIVE_TIMETABLE, payload: res.data });
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

export const clearTimetableAction = () => (dispatch: Dispatch) => {
  dispatch({ type: CLEAR_TIMETABLE });
};
