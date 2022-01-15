import axios from "axios";
import { Dispatch } from "redux";
import {
  ADD_ERROR,
  ADD_GROUPS,
  ADD_MESSAGE,
  CLEAR_ERRORS,
  CLEAR_MESSAGE,
  RECIVE_GROUPS,
} from "../types";

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
