import {
  REQUEST_NOWPLAYING_MOVIES_FETCH_FROM_MBD_API_SUCCESS,
  POST_API_MBD_LOADING,
  POST_API_MBD_FAIL,
  nowPlayingMoviesResquestMbdApiDispatchTypes,
  requestFunction,
} from "./actionsTypes";
import { Dispatch } from "redux";
import axios from "axios";

export const nowplayingMoviesFetchResponse: requestFunction =
  (url) =>
  async (dispatch: Dispatch<nowPlayingMoviesResquestMbdApiDispatchTypes>) => {
    try {
      dispatch({
        type: POST_API_MBD_LOADING,
      });
      const postApiResponse = await axios.get(url);
      dispatch({
        type: REQUEST_NOWPLAYING_MOVIES_FETCH_FROM_MBD_API_SUCCESS,
        nowPlayingMoviesResponse: postApiResponse.data,
      });
    } catch (error) {
      dispatch({
        type: POST_API_MBD_FAIL,
        error: error,
      });
    }
  };
