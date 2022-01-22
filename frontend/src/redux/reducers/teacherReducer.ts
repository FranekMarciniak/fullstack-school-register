import {} from "../actions/adminTypes";

const initialState = {
  errors: null,
};

const globalReducer = (state = initialState, action: any) => {
  switch (action.type) {
    default:
      return state;
  }
};
export default globalReducer;
