export const SET_AUTHENTICATION_BANNER_HANDLER =
  "SET_AUTHENTICATION_BANNER_HANDLER";

export interface setAuthenticationBannerHanlder {
  type: typeof SET_AUTHENTICATION_BANNER_HANDLER;
}

export type setAuthenticationBannerFunction = () => void;

export type setAuthenticationBannerTypes = setAuthenticationBannerHanlder;
