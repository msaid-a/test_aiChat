import { SET_LOADING } from "../action/type";

const initialState = {
  loding: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, data: action.payload };
    default:
      return state;
  }
}
