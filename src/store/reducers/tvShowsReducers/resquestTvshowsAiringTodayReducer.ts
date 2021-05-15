import {
  tvShowsAiringTodayApiResponse,
  tvShowsAiringTodayFetchDispatchTypes,
  REQUEST_TV_SHOWS_AIRING_TODAY_FETCH_FROM_MBD_API_SUCCESS,
  POST_API_MBD_FAIL,
  POST_API_MBD_LOADING,
} from "../../actions/actionsTypes";

interface DefaultStateInt {
  tvShowsAiringTodayResponseMbd?: tvShowsAiringTodayApiResponse;
  loading: boolean;
  error?: string;
}

const initialState = {
  loading: false,
};

const postMovieGenresReducer = (
  state: DefaultStateInt = initialState,
  action: tvShowsAiringTodayFetchDispatchTypes
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
    case REQUEST_TV_SHOWS_AIRING_TODAY_FETCH_FROM_MBD_API_SUCCESS:
      return {
        ...state,
        loading: false,
        tvShowsAiringTodayResponseMbd: action.tvAiringTodayResponse,
      };

    default:
      return state;
  }
};

export default postMovieGenresReducer;
