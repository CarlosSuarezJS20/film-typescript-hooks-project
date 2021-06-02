import {
  latestMovieRequestResult,
  latestMovieRequestTypes,
  REQUEST_LATEST_MOVIE_REQUEST_SUCCESS,
  REQUEST_LATEST_MOVIE_LOADING,
  REQUEST_LATEST_MOVIE_SHOW_FAIL,
} from "../../actions/actionsTypes";

interface DefaultStateInt {
  latestMovieResult?: latestMovieRequestResult;
  loading: boolean;
  error?: string;
}

const initialState = {
  loading: false,
};

const latestMovieRequestReducer = (
  state: DefaultStateInt = initialState,
  action: latestMovieRequestTypes
): DefaultStateInt => {
  switch (action.type) {
    case REQUEST_LATEST_MOVIE_SHOW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case REQUEST_LATEST_MOVIE_LOADING:
      return {
        ...state,
        loading: true,
      };
    case REQUEST_LATEST_MOVIE_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        latestMovieResult: action.response,
      };

    default:
      return state;
  }
};

export default latestMovieRequestReducer;
