import {
  topratedTvshowsApiResponse,
  topratedTvShowsFetchDispatchTypes,
  REQUEST_TOPRATED_TVSHOWS_FETCH_FROM_MBD_API_SUCCESS,
  REQUEST_TOPRATED_TVSHOWS_FETCH_FROM_MBD_API_LOADING,
  REQUEST_TOPRATED_TVSHOWS_FETCH_FROM_MBD_API_FAILED,
} from "../../actions/actionsTypes";

interface DefaultStateInt {
  topratedTvshowsResponseMbd?: topratedTvshowsApiResponse;
  loading: boolean;
  error?: string;
}

const initialState = {
  loading: false,
};

const topRatedTvShowsResponseReducer = (
  state: DefaultStateInt = initialState,
  action: topratedTvShowsFetchDispatchTypes
): DefaultStateInt => {
  switch (action.type) {
    case REQUEST_TOPRATED_TVSHOWS_FETCH_FROM_MBD_API_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case REQUEST_TOPRATED_TVSHOWS_FETCH_FROM_MBD_API_LOADING:
      return {
        ...state,
        loading: true,
      };
    case REQUEST_TOPRATED_TVSHOWS_FETCH_FROM_MBD_API_SUCCESS:
      return {
        ...state,
        loading: false,
        topratedTvshowsResponseMbd: action.topratedTvShowsResponse,
      };

    default:
      return state;
  }
};

export default topRatedTvShowsResponseReducer;
