import {
  onTheAirTvshowsResults,
  onTheAirTvshowsRequestTypes,
  REQUEST_ON_THE_AIR_TV_SHOWS_REQUEST_SUCCESS,
  REQUEST_ON_THE_AIR_TV_SHOWS_REQUEST_FAILED,
  REQUEST_ON_THE_AIR_TV_SHOWS_REQUEST_LOADING,
} from "../../actions/actionsTypes";

interface DefaultStateInt {
  onTheAirTvshowsResults?: onTheAirTvshowsResults;
  loading: boolean;
  error?: string;
}

const initialState = {
  loading: false,
};

const onTheAirTvshowsReducer = (
  state: DefaultStateInt = initialState,
  action: onTheAirTvshowsRequestTypes
): DefaultStateInt => {
  switch (action.type) {
    case REQUEST_ON_THE_AIR_TV_SHOWS_REQUEST_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case REQUEST_ON_THE_AIR_TV_SHOWS_REQUEST_LOADING:
      return {
        ...state,
        loading: true,
      };
    case REQUEST_ON_THE_AIR_TV_SHOWS_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        onTheAirTvshowsResults: action.onTheAirTvShowsResponse,
      };

    default:
      return state;
  }
};

export default onTheAirTvshowsReducer;
