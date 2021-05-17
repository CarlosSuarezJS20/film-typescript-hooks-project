import {
  requestUpcomingMoviesResponse,
  UpcomingResquestMbdApiDispatchTypes,
  REQUEST_UPCOMING_MOVIES_FETCH_FROM_MBD_API_SUCCESS,
  POST_API_MBD_FAIL,
  POST_API_MBD_LOADING,
} from "../../actions/actionsTypes";

interface DefaultStateInt {
  upcomingMoviesResponseMbd?: requestUpcomingMoviesResponse;
  loading: boolean;
  error?: string;
}

const initialState = {
  loading: false,
};

const postMovieGenresReducer = (
  state: DefaultStateInt = initialState,
  action: UpcomingResquestMbdApiDispatchTypes
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
    case REQUEST_UPCOMING_MOVIES_FETCH_FROM_MBD_API_SUCCESS:
      return {
        ...state,
        loading: false,
        upcomingMoviesResponseMbd: action.upcomingMoviesResponse,
      };

    default:
      return state;
  }
};

export default postMovieGenresReducer;
