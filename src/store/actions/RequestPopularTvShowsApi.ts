import {
  REQUEST_POPULAR_TVSHOWS_FETCH_FROM_MBD_API_SUCCESS,
  REQUEST_POPULAR_TVSHOWS_FETCH_FROM_MBD_API_FAILED,
  REQUEST_POPULAR_TVSHOWS_FETCH_FROM_MBD_API_LOADING,
  popularTvShowFetchDispatchTypes,
  requestFunction,
} from "./actionsTypes";
import { Dispatch } from "redux";
import axios from "axios";

export const popularTvshowsFetchReq: requestFunction =
  (url) => async (dispatch: Dispatch<popularTvShowFetchDispatchTypes>) => {
    try {
      dispatch({
        type: REQUEST_POPULAR_TVSHOWS_FETCH_FROM_MBD_API_LOADING,
      });
      const postApiResponse = await axios.get(url);
      dispatch({
        type: REQUEST_POPULAR_TVSHOWS_FETCH_FROM_MBD_API_SUCCESS,
        results: postApiResponse.data,
      });
    } catch (error) {
      dispatch({
        type: REQUEST_POPULAR_TVSHOWS_FETCH_FROM_MBD_API_FAILED,
        error: error,
      });
    }
  };
