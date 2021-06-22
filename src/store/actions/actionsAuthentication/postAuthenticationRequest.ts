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

export const postAuthenticationRequest =
  (url: string, details: details) =>
  async (dispatch: Dispatch<PostAuthenticationDispatchTypes>) => {
    dispatch({ type: POST_AUTHENTICATION_STARTS });
    axios
      .post(url, details)
      .then((res) => {
        dispatch({
          type: POST_AUTHENTICATION_SUCCESS,
          payload: res.data,
        });
        // if users logs in it scrolls to top
        window.scrollTo(0, 0);
      })
      .catch((error) => {
        console.log(error.response.data.error.message);
        dispatch({
          type: POST_AUTHENTICATION_FAILED,
          error: error.response.data.error.message,
        });
      });
  };
