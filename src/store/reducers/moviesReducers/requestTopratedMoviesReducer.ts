import {
  requestTopRatedMoviesResponse,
  TopRatedMoviesResquestMbdApiDispatchTypes,
  REQUEST_TOPRATED_MOVIES_FETCH_FROM_MBD_API_SUCCESS,
  REQUEST_TOPRATED_MOVIES_FETCH_FROM_MBD_API_LOADING,
  REQUEST_TOPRATED_MOVIES_FETCH_FROM_MBD_API_FAILED,
} from "../../actions/actionsTypes";

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
    case REQUEST_TOPRATED_MOVIES_FETCH_FROM_MBD_API_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case REQUEST_TOPRATED_MOVIES_FETCH_FROM_MBD_API_LOADING:
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
