import {
  trendingThisweekRequestTypes,
  REQUEST_TRENDING_THIS_WEEK_REQUEST_SUCCESS,
  REQUEST_TRENDING_THIS_WEEK_LOADING,
  REQUEST_TRENDING_THIS_WEEK_FAILED,
  requestFunction,
} from "./actionsTypes";
import { Dispatch } from "redux";
import axios from "axios";

export const trendingThisweekFetchResponse: requestFunction =
  (url) => async (dispatch: Dispatch<trendingThisweekRequestTypes>) => {
    try {
      dispatch({
        type: REQUEST_TRENDING_THIS_WEEK_LOADING,
      });
      const postApiResponse = await axios.get(url);
      dispatch({
        type: REQUEST_TRENDING_THIS_WEEK_REQUEST_SUCCESS,
        response: postApiResponse.data,
      });
    } catch (error) {
      dispatch({
        type: REQUEST_TRENDING_THIS_WEEK_FAILED,
        error: error,
      });
    }
  };
