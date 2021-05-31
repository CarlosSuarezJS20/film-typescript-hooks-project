import {
  genresApiResponse,
  PostTvGenresFetchDispatchTypes,
  REQUEST_GENRES_TV_FETCH_FROM_MBD_API_SUCCESS,
  REQUEST_GENRES_TV_FETCH_FROM_MBD_API_LOADING,
  REQUEST_GENRES_TV_FETCH_FROM_MBD_API_FAILED,
} from "../../actions/actionsTypes";

interface DefaultStateInt {
  tvshowsGenresResponseMbd?: genresApiResponse;
  loading: boolean;
  error?: string;
}

const initialState = {
  loading: false,
};

const postTvShowsGenresReducer = (
  state: DefaultStateInt = initialState,
  action: PostTvGenresFetchDispatchTypes
): DefaultStateInt => {
  switch (action.type) {
    case REQUEST_GENRES_TV_FETCH_FROM_MBD_API_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case REQUEST_GENRES_TV_FETCH_FROM_MBD_API_LOADING:
      return {
        ...state,
        loading: true,
      };
    case REQUEST_GENRES_TV_FETCH_FROM_MBD_API_SUCCESS:
      return {
        ...state,
        loading: false,
        tvshowsGenresResponseMbd: action.tvGenres,
      };

    default:
      return state;
  }
};

export default postTvShowsGenresReducer;
