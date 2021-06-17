import {
  POST_AUTHENTICATION_STARTS,
  POST_AUTHENTICATION_SUCCESS,
  POST_AUTHENTICATION_FAILED,
  PostAuthenticationDispatchTypes,
  POST_AUTHENTICATION_LOGOUT,
} from "../../actions/actionsAuthentication/AuthenticationActionTypes";

interface DefaultStateInt {
  authToken: string | null;
  userId: string | null;
  loadingRequest: boolean;
  errorAuthentication: string | null;
}

const initialState = {
  authToken: null,
  loadingRequest: false,
  userId: null,
  errorAuthentication: null,
};

const getDiscoverRequestReducer = (
  state: DefaultStateInt = initialState,
  action: PostAuthenticationDispatchTypes
): DefaultStateInt => {
  switch (action.type) {
    case POST_AUTHENTICATION_FAILED:
      return {
        ...state,
        loadingRequest: false,
        errorAuthentication: action.error,
      };
    case POST_AUTHENTICATION_STARTS:
      return {
        ...state,
        loadingRequest: true,
      };
    case POST_AUTHENTICATION_SUCCESS:
      return {
        ...state,
        loadingRequest: false,
        authToken: action.payload.idToken,
        userId: action.payload.localId,
      };

    case POST_AUTHENTICATION_LOGOUT:
      return {
        ...state,
        loadingRequest: false,
        authToken: null,
        userId: null,
      };
    default:
      return state;
  }
};

export default getDiscoverRequestReducer;
