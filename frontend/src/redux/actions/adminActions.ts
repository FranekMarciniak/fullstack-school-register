import axios from "axios";
import { Dispatch } from "redux";
import { ILoginForm } from "../../types/global";
import { ADD_ERROR, ADD_TEACHER, CLEAR_ERRORS, RECIVE_TEACHERS } from "./types";

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

export const createUserAction =
  (user: IUserToCreate, role: string) => async (dispatch: Dispatch) => {
    try {
      const res = await axios({
        method: "POST",
        data: {
          ...user,
          role,
        },
        withCredentials: true,
        url: "/api/users",
      });
      dispatch({ type: ADD_TEACHER, payload: res.data });
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
