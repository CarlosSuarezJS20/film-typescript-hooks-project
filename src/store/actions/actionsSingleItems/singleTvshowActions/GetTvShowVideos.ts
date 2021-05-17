import {
  GET_TVSHOWS_VIDEOS_SUCCESS,
  GET_REQUEST_LOADING,
  GET_REQUEST_FAIL,
  getTvshowsVideosRequestDispatchTypes,
  getRequestFunction,
} from "./singleTvShowsActionsType";
import { Dispatch } from "redux";
import axios from "axios";

export const getTvshowsVideosResponse: getRequestFunction =
  (url) => async (dispatch: Dispatch<getTvshowsVideosRequestDispatchTypes>) => {
    try {
      dispatch({
        type: GET_REQUEST_LOADING,
      });
      const postApiResponse = await axios.get(url);
      dispatch({
        type: GET_TVSHOWS_VIDEOS_SUCCESS,
        getTvshowsVideosResponse: postApiResponse.data,
      });
    } catch (error) {
      dispatch({
        type: GET_REQUEST_FAIL,
        error: error,
      });
    }
  };
