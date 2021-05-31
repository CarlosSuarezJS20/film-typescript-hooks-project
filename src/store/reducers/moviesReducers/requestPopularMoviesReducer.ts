import {
  requestPopularMoviesResults,
  popularMoviesResquestMbdApiDispatchTypes,
  REQUEST_POPULAR_MOVIES_FETCH_FROM_MBD_API_SUCCESS,
  REQUEST_POPULAR_MOVIES_FETCH_FROM_MBD_API_LOADING,
  REQUEST_POPULAR_MOVIES_FETCH_FROM_MBD_API_FAILED,
} from "../../actions/actionsTypes";

interface DefaultStateInt {
  popularMoviesResponseMbd?: requestPopularMoviesResults;
  loading: boolean;
  error?: string;
}

const initialState = {
  loading: false,
};

const postMovieGenresReducer = (
  state: DefaultStateInt = initialState,
  action: popularMoviesResquestMbdApiDispatchTypes
): DefaultStateInt => {
  switch (action.type) {
    case REQUEST_POPULAR_MOVIES_FETCH_FROM_MBD_API_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case REQUEST_POPULAR_MOVIES_FETCH_FROM_MBD_API_LOADING:
      return {
        ...state,
        loading: true,
      };
    case REQUEST_POPULAR_MOVIES_FETCH_FROM_MBD_API_SUCCESS:
      return {
        ...state,
        loading: false,
        popularMoviesResponseMbd: action.popularMoviesResponse,
      };

    default:
      return state;
  }
};

export default postMovieGenresReducer;
