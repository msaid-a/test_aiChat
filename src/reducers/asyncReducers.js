import { SET_LOADING, SET_LOADING_MODAL } from "../action/type";

const initialState = {
  loading: false,
  loadingModal: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: action.payload };
    case SET_LOADING_MODAL:
      return { ...state, loadingModal: action.payload };
    default:
      return state;
  }
}
