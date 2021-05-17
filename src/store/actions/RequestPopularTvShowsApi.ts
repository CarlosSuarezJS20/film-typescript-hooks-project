import {
  REQUEST_POPULAR_TVSHOWS_FETCH_FROM_MBD_API_SUCCESS,
  POST_API_MBD_LOADING,
  POST_API_MBD_FAIL,
  popularTvShowFetchDispatchTypes,
  requestFunction,
} from "./actionsTypes";
import { Dispatch } from "redux";
import axios from "axios";

export const popularTvshowsFetchReq: requestFunction =
  (url) => async (dispatch: Dispatch<popularTvShowFetchDispatchTypes>) => {
    try {
      dispatch({
        type: POST_API_MBD_LOADING,
      });
      const postApiResponse = await axios.get(url);
      dispatch({
        type: REQUEST_POPULAR_TVSHOWS_FETCH_FROM_MBD_API_SUCCESS,
        popularTvShowsResponse: postApiResponse.data,
      });
    } catch (error) {
      dispatch({
        type: POST_API_MBD_FAIL,
        error: error,
      });
    }
  };
