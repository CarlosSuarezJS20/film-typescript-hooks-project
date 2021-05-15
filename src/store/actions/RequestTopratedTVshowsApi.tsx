import {
  REQUEST_TOPRATED_TVSHOWS_FETCH_FROM_MBD_API_SUCCESS,
  POST_API_MBD_LOADING,
  POST_API_MBD_FAIL,
  topratedTvShowsFetchDispatchTypes,
  requestFunction,
} from "../actions/actionsTypes";
import { Dispatch } from "redux";
import axios from "axios";

export const topratedTvshowsFetchReq: requestFunction =
  (url) => async (dispatch: Dispatch<topratedTvShowsFetchDispatchTypes>) => {
    try {
      dispatch({
        type: POST_API_MBD_LOADING,
      });
      const postApiResponse = await axios.get(url);
      dispatch({
        type: REQUEST_TOPRATED_TVSHOWS_FETCH_FROM_MBD_API_SUCCESS,
        topratedTvShowsResponse: postApiResponse.data,
      });
    } catch (error) {
      dispatch({
        type: POST_API_MBD_FAIL,
        error: error,
      });
    }
  };
