import {
  tvShowsAiringTodayApiResponse,
  tvShowsAiringTodayFetchDispatchTypes,
  REQUEST_TV_SHOWS_AIRING_TODAY_FETCH_FROM_MBD_API_SUCCESS,
  REQUEST_TV_SHOWS_AIRING_TODAY_FETCH_FROM_MBD_API_LOADING,
  REQUEST_TV_SHOWS_AIRING_TODAY_FETCH_FROM_MBD_API_FAILED,
} from "../../actions/actionsTypes";

interface DefaultStateInt {
  tvShowsAiringTodayResponseMbd?: tvShowsAiringTodayApiResponse;
  loading: boolean;
  error?: string;
}

const initialState = {
  loading: false,
};

const tvShowsAiringTodayReducer = (
  state: DefaultStateInt = initialState,
  action: tvShowsAiringTodayFetchDispatchTypes
): DefaultStateInt => {
  switch (action.type) {
    case REQUEST_TV_SHOWS_AIRING_TODAY_FETCH_FROM_MBD_API_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case REQUEST_TV_SHOWS_AIRING_TODAY_FETCH_FROM_MBD_API_LOADING:
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

export default tvShowsAiringTodayReducer;
