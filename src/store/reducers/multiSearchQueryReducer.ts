import {
  searchResponses,
  SearchResponsesDispatchTypes,
  SEARCH_REQUEST_RESPONSE_ACTION,
  POST_API_MBD_FAIL,
  POST_API_MBD_LOADING,
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
    case SEARCH_REQUEST_RESPONSE_ACTION:
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
