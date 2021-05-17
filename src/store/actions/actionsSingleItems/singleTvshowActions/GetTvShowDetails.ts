import {
  GET_TVSHOW_DETAILS_SUCCESS,
  GET_REQUEST_LOADING,
  GET_REQUEST_FAIL,
  getTvshowDetailsRequestDispatchTypes,
  getRequestFunction,
} from "./singleTvShowsActionsType";
import { Dispatch } from "redux";
import axios from "axios";

export const getTvshowsDetailsResponse: getRequestFunction =
  (url) => async (dispatch: Dispatch<getTvshowDetailsRequestDispatchTypes>) => {
    try {
      dispatch({
        type: GET_REQUEST_LOADING,
      });
      const postApiResponse = await axios.get(url);
      dispatch({
        type: GET_TVSHOW_DETAILS_SUCCESS,
        getTvshowDetailsResponse: postApiResponse.data,
      });
    } catch (error) {
      dispatch({
        type: GET_REQUEST_FAIL,
        error: error,
      });
    }
  };
