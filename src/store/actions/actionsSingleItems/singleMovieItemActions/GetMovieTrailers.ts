import {
  GET_MOVIE_TRAILERS_SUCCESS,
  GET_REQUEST_LOADING,
  GET_REQUEST_FAIL,
  getMovieTrailersRequestDispatchTypes,
  getRequestFunction,
} from "./singleMovieItemActionsTypes";
import { Dispatch } from "redux";
import axios from "axios";

export const getMovieTrailersResponse: getRequestFunction =
  (url) => async (dispatch: Dispatch<getMovieTrailersRequestDispatchTypes>) => {
    try {
      dispatch({
        type: GET_REQUEST_LOADING,
      });
      const postApiResponse = await axios.get(url);
      dispatch({
        type: GET_MOVIE_TRAILERS_SUCCESS,
        getMoviesResponse: postApiResponse.data,
      });
    } catch (error) {
      dispatch({
        type: GET_REQUEST_FAIL,
        error: error,
      });
    }
  };
