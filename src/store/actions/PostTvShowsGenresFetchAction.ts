import {
  REQUEST_GENRES_TV_FETCH_FROM_MBD_API_SUCCESS,
  REQUEST_GENRES_TV_FETCH_FROM_MBD_API_LOADING,
  REQUEST_GENRES_TV_FETCH_FROM_MBD_API_FAILED,
  PostTvGenresFetchDispatchTypes,
  requestFunction,
} from "./actionsTypes";
import { Dispatch } from "redux";
import axios from "axios";

export const postTvshowsGenresFetchResponse: requestFunction =
  (url) => async (dispatch: Dispatch<PostTvGenresFetchDispatchTypes>) => {
    try {
      dispatch({
        type: REQUEST_GENRES_TV_FETCH_FROM_MBD_API_LOADING,
      });
      const postApiResponse = await axios.get(url);
      dispatch({
        type: REQUEST_GENRES_TV_FETCH_FROM_MBD_API_SUCCESS,
        tvGenres: postApiResponse.data,
      });
    } catch (error) {
      dispatch({
        type: REQUEST_GENRES_TV_FETCH_FROM_MBD_API_FAILED,
        error: error,
      });
    }
  };
