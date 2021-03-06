import {
  genresApiResponse,
  PostMoviesGenresFetchDispatchTypes,
  POST_GENRES_MOVIES_FETCH_FROM_MBD_API_SUCCESS,
  POST_GENRES_MOVIES_FETCH_FROM_MBD_API_FAILED,
  POST_GENRES_MOVIES_FETCH_FROM_MBD_API_LOADING,
} from "../../actions/actionsTypes";

interface DefaultStateInt {
  genresResponseMbd?: genresApiResponse;
  loading: boolean;
  error?: string;
}

const initialState = {
  loading: false,
};

const postMovieGenresReducer = (
  state: DefaultStateInt = initialState,
  action: PostMoviesGenresFetchDispatchTypes
): DefaultStateInt => {
  switch (action.type) {
    case POST_GENRES_MOVIES_FETCH_FROM_MBD_API_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case POST_GENRES_MOVIES_FETCH_FROM_MBD_API_LOADING:
      return {
        ...state,
        loading: true,
      };
    case POST_GENRES_MOVIES_FETCH_FROM_MBD_API_SUCCESS:
      return {
        ...state,
        loading: false,
        genresResponseMbd: action.genres,
      };

    default:
      return state;
  }
};

export default postMovieGenresReducer;
