import { SET_SECTION } from "../actions/types";

const initialState = {
  section: null,
  loading: false,
  error: null,
};

const globalReducer = (state: any, action: any) => {
  switch (action.type) {
    case SET_SECTION:
      console.log(state);
      return { ...initialState, section: action.section };
    default:
      return initialState;
  }
};
export default globalReducer;
