import {
  GET_MOVIE_DETAILS_SUCCESS,
  GET_REQUEST_LOADING,
  GET_REQUEST_FAIL,
  getDetailsRequestDispatchTypes,
  getRequestFunction,
} from "./singleMovieItemActionsTypes";
import { Dispatch } from "redux";
import axios from "axios";

export const getMovieDetailsResponse: getRequestFunction =
  (url) => async (dispatch: Dispatch<getDetailsRequestDispatchTypes>) => {
    try {
      dispatch({
        type: GET_REQUEST_LOADING,
      });
      const postApiResponse = await axios.get(url);
      dispatch({
        type: GET_MOVIE_DETAILS_SUCCESS,
        getMovieDetailsResponse: postApiResponse.data,
      });
    } catch (error) {
      dispatch({
        type: GET_REQUEST_FAIL,
        error: error,
      });
    }
  };
