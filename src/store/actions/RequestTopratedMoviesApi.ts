import {
  REQUEST_TOPRATED_MOVIES_FETCH_FROM_MBD_API_SUCCESS,
  POST_API_MBD_LOADING,
  POST_API_MBD_FAIL,
  TopRatedMoviesResquestMbdApiDispatchTypes,
  requestFunction,
} from "./actionsTypes";
import { Dispatch } from "redux";
import axios from "axios";

export const topratedMoviesFetchResponse: requestFunction =
  (url) =>
  async (dispatch: Dispatch<TopRatedMoviesResquestMbdApiDispatchTypes>) => {
    try {
      dispatch({
        type: POST_API_MBD_LOADING,
      });
      const postApiResponse = await axios.get(url);
      dispatch({
        type: REQUEST_TOPRATED_MOVIES_FETCH_FROM_MBD_API_SUCCESS,
        topratedMoviesResponse: postApiResponse.data,
      });
    } catch (error) {
      dispatch({
        type: POST_API_MBD_FAIL,
        error: error,
      });
    }
  };
