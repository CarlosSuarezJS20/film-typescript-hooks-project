import {
  GET_MOVIE_CAST_SUCCESS,
  GET_REQUEST_LOADING,
  GET_REQUEST_FAIL,
  getMovieCastRequestDispatchTypes,
  getRequestFunction,
} from "./singleMovieItemActionsTypes";
import { Dispatch } from "redux";
import axios from "axios";

export const getMovieCastResponse: getRequestFunction =
  (url) => async (dispatch: Dispatch<getMovieCastRequestDispatchTypes>) => {
    try {
      dispatch({
        type: GET_REQUEST_LOADING,
      });
      const postApiResponse = await axios.get(url);
      dispatch({
        type: GET_MOVIE_CAST_SUCCESS,
        getAllCastResponse: postApiResponse.data,
      });
    } catch (error) {
      dispatch({
        type: GET_REQUEST_FAIL,
        error: error,
      });
    }
  };
