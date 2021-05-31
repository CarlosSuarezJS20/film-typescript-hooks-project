import {
  searchResponses,
  SearchResponsesDispatchTypes,
  SEARCH_REQUEST_RESPONSE_ACTION_SUCCESS,
  SEARCH_REQUEST_RESPONSE_ACTION_FAILED,
  SEARCH_REQUEST_RESPONSE_ACTION_LOADING,
} from "../actions/actionsTypes";

interface DefaultStateInt {
  loading: boolean;
  results?: searchResponses;
  error?: string;
}

const initialState = {
  loading: false,
};

const multiSearchResultsReducer = (
  state: DefaultStateInt = initialState,
  action: SearchResponsesDispatchTypes
): DefaultStateInt => {
  switch (action.type) {
    case SEARCH_REQUEST_RESPONSE_ACTION_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case SEARCH_REQUEST_RESPONSE_ACTION_LOADING:
      return {
        ...state,
        loading: true,
      };
    case SEARCH_REQUEST_RESPONSE_ACTION_SUCCESS:
      return {
        ...state,
        loading: false,
        results: action.searchResults,
      };
    default:
      return state;
  }
};

export default multiSearchResultsReducer;
