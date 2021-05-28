import {
  requestPopularMoviesResults,
  popularMoviesResquestMbdApiDispatchTypes,
  REQUEST_POPULAR_MOVIES_FETCH_FROM_MBD_API_SUCCESS,
  POST_API_MBD_FAIL,
  POST_API_MBD_LOADING,
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
