export const POST_AUTHENTICATION_SUCCESS = "POST_AUTHENTICATION_SUCCESS";

export const POST_AUTHENTICATION_FAILED = "POST_AUTHENTICATION_FAILED";

export const POST_AUTHENTICATION_STARTS = "POST_AUTHENTICATION_LOGIN_STARTS";

export const POST_AUTHENTICATION_LOGOUT = "AUTHENTICATION_LOGOUT";

export interface PostAuthenticationStarts {
  type: typeof POST_AUTHENTICATION_STARTS;
}

export type authenticationResponse = {
  idToken: string;
  localId: string;
};

export interface PostAuthenticationSuccess {
  type: typeof POST_AUTHENTICATION_SUCCESS;
  payload: authenticationResponse;
}

export interface PostAuthenticationFailed {
  type: typeof POST_AUTHENTICATION_FAILED;
  error: string;
}

export interface PostAuthenticationLogout {
  type: typeof POST_AUTHENTICATION_LOGOUT;
}

export type PostAuthenticationDispatchTypes =
  | PostAuthenticationStarts
  | PostAuthenticationSuccess
  | PostAuthenticationFailed
  | PostAuthenticationLogout;
