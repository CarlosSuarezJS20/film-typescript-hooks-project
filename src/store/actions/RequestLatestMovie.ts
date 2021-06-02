import {
  REQUEST_LATEST_MOVIE_REQUEST_SUCCESS,
  REQUEST_LATEST_MOVIE_LOADING,
  REQUEST_LATEST_MOVIE_SHOW_FAIL,
  latestMovieRequestTypes,
  requestFunction,
} from "./actionsTypes";
import { Dispatch } from "redux";
import axios from "axios";

export const latestMovieRequestReq: requestFunction =
  (url) => async (dispatch: Dispatch<latestMovieRequestTypes>) => {
    try {
      dispatch({
        type: REQUEST_LATEST_MOVIE_LOADING,
      });
      const postApiResponse = await axios.get(url);
      dispatch({
        type: REQUEST_LATEST_MOVIE_REQUEST_SUCCESS,
        response: postApiResponse.data,
      });
    } catch (error) {
      dispatch({
        type: REQUEST_LATEST_MOVIE_SHOW_FAIL,
        error: error,
      });
    }
  };
