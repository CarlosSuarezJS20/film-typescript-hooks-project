import {
  POST_AUTHENTICATION_LOGOUT,
  PostAuthenticationDispatchTypes,
} from "./AuthenticationActionTypes";

import { Dispatch } from "redux";

export const logoutRequestHandler =
  () => (dispatch: Dispatch<PostAuthenticationDispatchTypes>) => {
    dispatch({ type: POST_AUTHENTICATION_LOGOUT });
  };
