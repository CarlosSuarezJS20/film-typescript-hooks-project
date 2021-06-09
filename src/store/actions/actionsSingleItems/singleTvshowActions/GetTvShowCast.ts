import {
  GET_TVSHOW_CAST_SUCCESS,
  GET_REQUEST_LOADING,
  GET_REQUEST_FAIL,
  getTvshowCastDispatchTypes,
  getRequestFunction,
} from "./singleTvShowsActionsType";
import { Dispatch } from "redux";
import axios from "axios";

export const getTvshowsCastResponse: getRequestFunction =
  (url) => async (dispatch: Dispatch<getTvshowCastDispatchTypes>) => {
    try {
      dispatch({
        type: GET_REQUEST_LOADING,
      });
      const postApiResponse = await axios.get(url);
      dispatch({
        type: GET_TVSHOW_CAST_SUCCESS,
        getTvshowCastResponse: postApiResponse.data,
      });
    } catch (error) {
      dispatch({
        type: GET_REQUEST_FAIL,
        error: error,
      });
    }
  };
