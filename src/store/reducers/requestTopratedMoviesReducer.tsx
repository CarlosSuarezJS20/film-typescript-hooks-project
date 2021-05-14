import {
  requestTopRatedMoviesResponse,
  TopRatedMoviesResquestMbdApiDispatchTypes,
  REQUEST_TOPRATED_MOVIES_FETCH_FROM_MBD_API_SUCCESS,
  POST_API_MBD_FAIL,
  POST_API_MBD_LOADING,
} from "../actions/actionsTypes";

interface DefaultStateInt {
  topratedMoviesResponse?: requestTopRatedMoviesResponse;
  loading: boolean;
  error?: string;
}

const initialState = {
  loading: false,
};

const postMovieGenresReducer = (
  state: DefaultStateInt = initialState,
  action: TopRatedMoviesResquestMbdApiDispatchTypes
): DefaultStateInt => {
  switch (action.type) {
    case POST_API_MBD_FAIL:
      return {
        ...state,
        loading: false,
      };
    case POST_API_MBD_LOADING:
      return {
        ...state,
        loading: true,
      };
    case REQUEST_TOPRATED_MOVIES_FETCH_FROM_MBD_API_SUCCESS:
      return {
        ...state,
        loading: false,
        topratedMoviesResponse: action.topratedMoviesResponse,
      };

    default:
      return state;
  }
};

export default postMovieGenresReducer;
