import { GET_MOVIE, GET_MOVIE_DETAIL } from "../action/type";

const initialState = {
  data: [],
  detail: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_MOVIE:
      return { ...state, data: action.payload };
    case GET_MOVIE_DETAIL:
      return { ...state, detail: action.payload };
    default:
      return state;
  }
}
