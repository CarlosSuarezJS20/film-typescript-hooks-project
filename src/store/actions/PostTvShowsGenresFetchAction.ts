import {
  POST_GENRES_TV_FETCH_FROM_MBD_API_SUCCESS,
  POST_API_MBD_LOADING,
  POST_API_MBD_FAIL,
  PostTvGenresFetchDispatchTypes,
  requestFunction,
} from "./actionsTypes";
import { Dispatch } from "redux";
import axios from "axios";

export const postTvshowsGenresFetchResponse: requestFunction =
  (url) => async (dispatch: Dispatch<PostTvGenresFetchDispatchTypes>) => {
    try {
      dispatch({
        type: POST_API_MBD_LOADING,
      });
      const postApiResponse = await axios.get(url);
      dispatch({
        type: POST_GENRES_TV_FETCH_FROM_MBD_API_SUCCESS,
        tvGenres: postApiResponse.data,
      });
    } catch (error) {
      dispatch({
        type: POST_API_MBD_FAIL,
        error: error,
      });
    }
  };
