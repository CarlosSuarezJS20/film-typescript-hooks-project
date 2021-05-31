import {
  REQUEST_NOWPLAYING_MOVIES_FETCH_FROM_MBD_API_SUCCESS,
  REQUEST_NOWPLAYING_MOVIES_FETCH_FROM_MBD_API_FAILED,
  REQUEST_NOWPLAYING_MOVIES_FETCH_FROM_MBD_API_LOADING,
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
        type: REQUEST_NOWPLAYING_MOVIES_FETCH_FROM_MBD_API_LOADING,
      });
      const postApiResponse = await axios.get(url);
      dispatch({
        type: REQUEST_NOWPLAYING_MOVIES_FETCH_FROM_MBD_API_SUCCESS,
        nowPlayingMoviesResponse: postApiResponse.data,
      });
    } catch (error) {
      dispatch({
        type: REQUEST_NOWPLAYING_MOVIES_FETCH_FROM_MBD_API_FAILED,
        error: error,
      });
    }
  };
