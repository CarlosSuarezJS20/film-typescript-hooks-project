import {
  SearchResponsesDispatchTypes,
  SEARCH_REQUEST_RESPONSE_ACTION,
  POST_API_MBD_FAIL,
  POST_API_MBD_LOADING,
  requestFunction,
} from "./actionsTypes";
import { Dispatch } from "redux";
import axios from "axios";

export const searchMultiFindFetchResponse: requestFunction =
  (url) => async (dispatch: Dispatch<SearchResponsesDispatchTypes>) => {
    try {
      dispatch({
        type: POST_API_MBD_LOADING,
      });
      const postApiResponse = await axios.get(url);
      dispatch({
        type: SEARCH_REQUEST_RESPONSE_ACTION,
        searchResults: postApiResponse.data,
      });
    } catch (error) {
      dispatch({
        type: POST_API_MBD_FAIL,
        error: error,
      });
    }
  };
