import {
  getDiscoverRequestResponse,
  getDiscoverRequestTypes,
  GET_DISCOVER_REQUEST_SUCCESS,
  GET_DISCOVER_REQUEST_FAILED,
  GET_DISCOVER_REQUEST_LOADING,
} from "../actions/actionsTypes";

interface DefaultStateInt {
  loading: boolean;
  response?: getDiscoverRequestResponse;
  error?: string;
}

const initialState = {
  loading: false,
};

const getDiscoverRequestReducer = (
  state: DefaultStateInt = initialState,
  action: getDiscoverRequestTypes
): DefaultStateInt => {
  switch (action.type) {
    case GET_DISCOVER_REQUEST_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case GET_DISCOVER_REQUEST_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_DISCOVER_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        response: action.response,
      };
    default:
      return state;
  }
};

export default getDiscoverRequestReducer;
