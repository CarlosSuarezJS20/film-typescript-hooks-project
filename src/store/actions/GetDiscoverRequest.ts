import {
  GET_DISCOVER_REQUEST_SUCCESS,
  GET_DISCOVER_REQUEST_LOADING,
  GET_DISCOVER_REQUEST_FAILED,
  getDiscoverRequestTypes,
  requestFunction,
} from "./actionsTypes";
import { Dispatch } from "redux";
import axios from "axios";

export const getDiscoverRequest: requestFunction =
  (url) => async (dispatch: Dispatch<getDiscoverRequestTypes>) => {
    try {
      dispatch({
        type: GET_DISCOVER_REQUEST_LOADING,
      });
      const postApiResponse = await axios.get(url);
      dispatch({
        type: GET_DISCOVER_REQUEST_SUCCESS,
        response: postApiResponse.data,
      });
    } catch (error) {
      dispatch({
        type: GET_DISCOVER_REQUEST_FAILED,
        error: error,
      });
    }
  };
