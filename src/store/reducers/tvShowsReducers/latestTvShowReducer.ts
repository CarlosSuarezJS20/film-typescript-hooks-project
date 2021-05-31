import {
  latestTvshowRequestResult,
  latestTvshowRequestTypes,
  REQUEST_LATEST_TV_SHOW_REQUEST_SUCCESS,
  REQUEST_LATEST_TV_SHOW_FAIL,
  REQUEST_LATEST_TV_SHOW_LOADING,
} from "../../actions/actionsTypes";

interface DefaultStateInt {
  latestTvShowResult?: latestTvshowRequestResult;
  loading: boolean;
  error?: string;
}

const initialState = {
  loading: false,
};

const latestTvshowRequestReducer = (
  state: DefaultStateInt = initialState,
  action: latestTvshowRequestTypes
): DefaultStateInt => {
  switch (action.type) {
    case REQUEST_LATEST_TV_SHOW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case REQUEST_LATEST_TV_SHOW_LOADING:
      return {
        ...state,
        loading: true,
      };
    case REQUEST_LATEST_TV_SHOW_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        latestTvShowResult: action.response,
      };

    default:
      return state;
  }
};

export default latestTvshowRequestReducer;
