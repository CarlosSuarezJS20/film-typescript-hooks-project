import {
  popularTvShowApiResponse,
  popularTvShowFetchDispatchTypes,
  REQUEST_POPULAR_TVSHOWS_FETCH_FROM_MBD_API_SUCCESS,
  REQUEST_POPULAR_TVSHOWS_FETCH_FROM_MBD_API_FAILED,
  REQUEST_POPULAR_TVSHOWS_FETCH_FROM_MBD_API_LOADING,
} from "../../actions/actionsTypes";

interface DefaultStateInt {
  popularTvShowResponseMbd?: popularTvShowApiResponse;
  loading: boolean;
  error?: string;
}

const initialState = {
  loading: false,
};

const postPopularTvShowsReducer = (
  state: DefaultStateInt = initialState,
  action: popularTvShowFetchDispatchTypes
): DefaultStateInt => {
  switch (action.type) {
    case REQUEST_POPULAR_TVSHOWS_FETCH_FROM_MBD_API_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case REQUEST_POPULAR_TVSHOWS_FETCH_FROM_MBD_API_LOADING:
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

export default postPopularTvShowsReducer;
