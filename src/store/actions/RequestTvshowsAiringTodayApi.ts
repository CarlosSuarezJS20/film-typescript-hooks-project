import {
  REQUEST_TV_SHOWS_AIRING_TODAY_FETCH_FROM_MBD_API_SUCCESS,
  REQUEST_TV_SHOWS_AIRING_TODAY_FETCH_FROM_MBD_API_LOADING,
  REQUEST_TV_SHOWS_AIRING_TODAY_FETCH_FROM_MBD_API_FAILED,
  tvShowsAiringTodayFetchDispatchTypes,
  requestFunction,
} from "./actionsTypes";
import { Dispatch } from "redux";
import axios from "axios";

export const tvshowsAiringTodayFetchReq: requestFunction =
  (url) => async (dispatch: Dispatch<tvShowsAiringTodayFetchDispatchTypes>) => {
    try {
      dispatch({
        type: REQUEST_TV_SHOWS_AIRING_TODAY_FETCH_FROM_MBD_API_LOADING,
      });
      const postApiResponse = await axios.get(url);
      dispatch({
        type: REQUEST_TV_SHOWS_AIRING_TODAY_FETCH_FROM_MBD_API_SUCCESS,
        tvAiringTodayResponse: postApiResponse.data,
      });
    } catch (error) {
      dispatch({
        type: REQUEST_TV_SHOWS_AIRING_TODAY_FETCH_FROM_MBD_API_FAILED,
        error: error,
      });
    }
  };
