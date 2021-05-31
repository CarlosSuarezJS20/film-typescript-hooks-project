import {
  payloadResponse,
  PostApiMbdConfigurationDispatchTypes,
  POST_API_MBD_CONFIGURATION_SUCCESS,
  POST_API_MBD_FAIL,
  POST_API_MBD_LOADING,
} from "../actions/actionsTypes";

interface DefaultStateInt {
  apiKey: string;
  loading: boolean;
  payload?: payloadResponse;
  error?: string;
}

const initialState = {
  apiKey: "9b9221859c78b5e38bd4c83e4834e0fe",
  loading: false,
};

const postMDBConfigReducer = (
  state: DefaultStateInt = initialState,
  action: PostApiMbdConfigurationDispatchTypes
): DefaultStateInt => {
  switch (action.type) {
    case POST_API_MBD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case POST_API_MBD_LOADING:
      return {
        ...state,
        loading: true,
      };
    case POST_API_MBD_CONFIGURATION_SUCCESS:
      return {
        ...state,
        loading: false,
        payload: action.payload,
      };
    default:
      return state;
  }
};

export default postMDBConfigReducer;
