import {
  REQUEST_TV_SHOWS_AIRING_TODAY_FETCH_FROM_MBD_API_SUCCESS,
  POST_API_MBD_LOADING,
  POST_API_MBD_FAIL,
  tvShowsAiringTodayFetchDispatchTypes,
  requestFunction,
} from "../actions/actionsTypes";
import { Dispatch } from "redux";
import axios from "axios";

export const tvshowsAiringTodayFetchReq: requestFunction =
  (url) => async (dispatch: Dispatch<tvShowsAiringTodayFetchDispatchTypes>) => {
    try {
      dispatch({
        type: POST_API_MBD_LOADING,
      });
      const postApiResponse = await axios.get(url);
      dispatch({
        type: REQUEST_TV_SHOWS_AIRING_TODAY_FETCH_FROM_MBD_API_SUCCESS,
        tvAiringTodayResponse: postApiResponse.data,
      });
    } catch (error) {
      dispatch({
        type: POST_API_MBD_FAIL,
        error: error,
      });
    }
  };
