import {
  REQUEST_POPULAR_MOVIES_FETCH_FROM_MBD_API_SUCCESS,
  REQUEST_POPULAR_MOVIES_FETCH_FROM_MBD_API_LOADING,
  REQUEST_POPULAR_MOVIES_FETCH_FROM_MBD_API_FAILED,
  popularMoviesResquestMbdApiDispatchTypes,
  requestFunction,
} from "./actionsTypes";
import { Dispatch } from "redux";
import axios from "axios";

export const popularMoviesFetchResponse: requestFunction =
  (url) =>
  async (dispatch: Dispatch<popularMoviesResquestMbdApiDispatchTypes>) => {
    try {
      dispatch({
        type: REQUEST_POPULAR_MOVIES_FETCH_FROM_MBD_API_LOADING,
      });
      const postApiResponse = await axios.get(url);
      dispatch({
        type: REQUEST_POPULAR_MOVIES_FETCH_FROM_MBD_API_SUCCESS,
        popularMoviesResponse: postApiResponse.data,
      });
    } catch (error) {
      dispatch({
        type: REQUEST_POPULAR_MOVIES_FETCH_FROM_MBD_API_FAILED,
        error: error,
      });
    }
  };
