import {
  genresApiResponse,
  PostTvGenresFetchDispatchTypes,
  POST_GENRES_TV_FETCH_FROM_MBD_API_SUCCESS,
  POST_API_MBD_FAIL,
  POST_API_MBD_LOADING,
} from "../actions/actionsTypes";

interface DefaultStateInt {
  tvshowsGenresResponseMbd?: genresApiResponse;
  loading: boolean;
  error?: string;
}

const initialState = {
  loading: false,
};

const postMovieGenresReducer = (
  state: DefaultStateInt = initialState,
  action: PostTvGenresFetchDispatchTypes
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
    case POST_GENRES_TV_FETCH_FROM_MBD_API_SUCCESS:
      return {
        ...state,
        loading: false,
        tvshowsGenresResponseMbd: action.tvGenres,
      };

    default:
      return state;
  }
};

export default postMovieGenresReducer;
