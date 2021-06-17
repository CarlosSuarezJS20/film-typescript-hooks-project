import {
  SET_AUTHENTICATION_BANNER_HANDLER,
  setAuthenticationBannerTypes,
  setAuthenticationBannerFunction,
} from "./AuthenticationBannerTypes";
import { Dispatch } from "redux";

export const authenticationBannerHandler: setAuthenticationBannerFunction =
  () => (dispatch: Dispatch<setAuthenticationBannerTypes>) => {
    dispatch({
      type: SET_AUTHENTICATION_BANNER_HANDLER,
    });
  };
