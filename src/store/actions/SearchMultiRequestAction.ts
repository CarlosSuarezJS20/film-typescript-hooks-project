import {
  SearchResponsesDispatchTypes,
  SEARCH_REQUEST_RESPONSE_ACTION_SUCCESS,
  SEARCH_REQUEST_RESPONSE_ACTION_FAILED,
  SEARCH_REQUEST_RESPONSE_ACTION_LOADING,
  requestFunction,
} from "./actionsTypes";
import { Dispatch } from "redux";
import axios from "axios";

export const searchMultiFindFetchResponse: requestFunction =
  (url) => async (dispatch: Dispatch<SearchResponsesDispatchTypes>) => {
    try {
      dispatch({
        type: SEARCH_REQUEST_RESPONSE_ACTION_LOADING,
      });
      const postApiResponse = await axios.get(url);
      dispatch({
        type: SEARCH_REQUEST_RESPONSE_ACTION_SUCCESS,
        searchResults: postApiResponse.data,
      });
    } catch (error) {
      dispatch({
        type: SEARCH_REQUEST_RESPONSE_ACTION_FAILED,
        error: error,
      });
    }
  };
