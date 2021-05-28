import {
  REQUEST_LATEST_TV_SHOW_REQUEST_SUCCESS,
  REQUEST_LATEST_TV_SHOW_LOADING,
  REQUEST_LATEST_TV_SHOW_FAIL,
  latestTvshowRequestTypes,
  requestFunction,
} from "./actionsTypes";
import { Dispatch } from "redux";
import axios from "axios";

export const latestTvshowRequestReq: requestFunction =
  (url) => async (dispatch: Dispatch<latestTvshowRequestTypes>) => {
    try {
      dispatch({
        type: REQUEST_LATEST_TV_SHOW_LOADING,
      });
      const postApiResponse = await axios.get(url);
      dispatch({
        type: REQUEST_LATEST_TV_SHOW_REQUEST_SUCCESS,
        response: postApiResponse.data,
      });
    } catch (error) {
      dispatch({
        type: REQUEST_LATEST_TV_SHOW_FAIL,
        error: error,
      });
    }
  };
