import axios from "axios";
import { Dispatch } from "redux";
import { ILoginForm } from "../../types/global";
import {
  SET_USER,
  ADD_ERROR,
  CLEAR_ERRORS,
  CLEAR_USER,
  RECIVE_TEACHERS,
  RECIVE_USERS,
} from "./types";

export const getTeachersAction = () => async (dispatch: Dispatch) => {
  try {
    const res = await axios({
      method: "GET",
      withCredentials: true,
      url: "/api/users",
    });
    console.log(res);
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
// export const checkUserAction = () => async (dispatch: Dispatch) => {
//   try {
//     const res = await axios({
//       method: "GET",
//       withCredentials: true,
//       url: "/api/sessions",
//     });
//     dispatch({ type: SET_USER, payload: res.data });
//   } catch (err: any) {
//     if (err.response) {
//       const error = err.response.data.message.message;
//       dispatch({ type: ADD_ERROR, payload: error });
//       setTimeout(() => dispatch({ type: CLEAR_ERRORS }), 3000);
//     } else {
//       console.log(err);
//     }
//   }
// };
// export const logoutAction = () => async (dispatch: Dispatch) => {
//   axios({
//     method: "DELETE",
//     withCredentials: true,
//     url: "/api/sessions",
//   })
//     .then(() => dispatch({ type: CLEAR_USER }))
//     .catch((error: any) =>
//       dispatch({
//         type: ADD_ERROR,
//         message: error.response.data.message.message,
//       })
//     );
// };
