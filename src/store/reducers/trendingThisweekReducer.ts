import {
  trendingThisweekResults,
  trendingThisweekRequestTypes,
  REQUEST_TRENDING_THIS_WEEK_REQUEST_SUCCESS,
  REQUEST_TRENDING_THIS_WEEK_LOADING,
  REQUEST_TRENDING_THIS_WEEK_FAILED,
} from "../actions/actionsTypes";

interface DefaultStateInt {
  trendingThisweekResponseMbd?: trendingThisweekResults;
  loading: boolean;
  error?: string;
}

const initialState = {
  loading: false,
};

const tvShowsAiringTodayReducer = (
  state: DefaultStateInt = initialState,
  action: trendingThisweekRequestTypes
): DefaultStateInt => {
  switch (action.type) {
    case REQUEST_TRENDING_THIS_WEEK_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case REQUEST_TRENDING_THIS_WEEK_LOADING:
      return {
        ...state,
        loading: true,
      };
    case REQUEST_TRENDING_THIS_WEEK_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        trendingThisweekResponseMbd: action.response,
      };

    default:
      return state;
  }
};

export default tvShowsAiringTodayReducer;
