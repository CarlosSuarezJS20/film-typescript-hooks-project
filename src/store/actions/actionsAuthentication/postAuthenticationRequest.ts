import {
  POST_AUTHENTICATION_STARTS,
  POST_AUTHENTICATION_SUCCESS,
  POST_AUTHENTICATION_FAILED,
  PostAuthenticationDispatchTypes,
} from "./AuthenticationActionTypes";

import { Dispatch } from "redux";
import axios from "axios";

type details = {
  email: string;
  password: string;
  returnSecureToken: boolean;
};

export const postAuthenticationRequest: (
  url: string,
  details: details
) => void =
  (url, details) =>
  async (dispatch: Dispatch<PostAuthenticationDispatchTypes>) => {
    try {
      dispatch({ type: POST_AUTHENTICATION_STARTS });
      const postAuthenticationResponse = await axios.post(url, details);
      dispatch({
        type: POST_AUTHENTICATION_SUCCESS,
        payload: postAuthenticationResponse.data,
      });
      window.scrollTo(0, 0);
    } catch (error) {
      dispatch({
        type: POST_AUTHENTICATION_FAILED,
        error: "Check passwords and user name and try again",
      });
    }
  };
