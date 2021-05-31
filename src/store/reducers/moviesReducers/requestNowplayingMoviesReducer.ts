import {
  requestNowPlayingMoviesResponse,
  nowPlayingMoviesResquestMbdApiDispatchTypes,
  REQUEST_NOWPLAYING_MOVIES_FETCH_FROM_MBD_API_SUCCESS,
  REQUEST_NOWPLAYING_MOVIES_FETCH_FROM_MBD_API_FAILED,
  REQUEST_NOWPLAYING_MOVIES_FETCH_FROM_MBD_API_LOADING,
} from "../../actions/actionsTypes";

interface DefaultStateInt {
  nowPlayingMoviesResponse?: requestNowPlayingMoviesResponse;
  loading: boolean;
  error?: string;
}

const initialState = {
  loading: false,
};

const postMovieGenresReducer = (
  state: DefaultStateInt = initialState,
  action: nowPlayingMoviesResquestMbdApiDispatchTypes
): DefaultStateInt => {
  switch (action.type) {
    case REQUEST_NOWPLAYING_MOVIES_FETCH_FROM_MBD_API_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case REQUEST_NOWPLAYING_MOVIES_FETCH_FROM_MBD_API_LOADING:
      return {
        ...state,
        loading: true,
      };
    case REQUEST_NOWPLAYING_MOVIES_FETCH_FROM_MBD_API_SUCCESS:
      return {
        ...state,
        loading: false,
        nowPlayingMoviesResponse: action.nowPlayingMoviesResponse,
      };

    default:
      return state;
  }
};

export default postMovieGenresReducer;
