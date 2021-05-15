import {
  popularTvShowApiResponse,
  popularTvShowFetchDispatchTypes,
  REQUEST_POPULAR_TVSHOWS_FETCH_FROM_MBD_API_SUCCESS,
  POST_API_MBD_FAIL,
  POST_API_MBD_LOADING,
} from "../../actions/actionsTypes";

interface DefaultStateInt {
  popularTvShowResponseMbd?: popularTvShowApiResponse;
  loading: boolean;
  error?: string;
}

const initialState = {
  loading: false,
};

const postMovieGenresReducer = (
  state: DefaultStateInt = initialState,
  action: popularTvShowFetchDispatchTypes
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
    case REQUEST_POPULAR_TVSHOWS_FETCH_FROM_MBD_API_SUCCESS:
      return {
        ...state,
        loading: false,
        popularTvShowResponseMbd: action.popularTvShowsResponse,
      };

    default:
      return state;
  }
};

export default postMovieGenresReducer;
