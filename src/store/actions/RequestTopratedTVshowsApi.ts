import {
  REQUEST_TOPRATED_TVSHOWS_FETCH_FROM_MBD_API_SUCCESS,
  REQUEST_TOPRATED_TVSHOWS_FETCH_FROM_MBD_API_LOADING,
  REQUEST_TOPRATED_TVSHOWS_FETCH_FROM_MBD_API_FAILED,
  topratedTvShowsFetchDispatchTypes,
  requestFunction,
} from "./actionsTypes";
import { Dispatch } from "redux";
import axios from "axios";

export const topratedTvshowsFetchReq: requestFunction =
  (url) => async (dispatch: Dispatch<topratedTvShowsFetchDispatchTypes>) => {
    try {
      dispatch({
        type: REQUEST_TOPRATED_TVSHOWS_FETCH_FROM_MBD_API_LOADING,
      });
      const postApiResponse = await axios.get(url);
      dispatch({
        type: REQUEST_TOPRATED_TVSHOWS_FETCH_FROM_MBD_API_SUCCESS,
        topratedTvShowsResponse: postApiResponse.data,
      });
    } catch (error) {
      dispatch({
        type: REQUEST_TOPRATED_TVSHOWS_FETCH_FROM_MBD_API_FAILED,
        error: error,
      });
    }
  };
