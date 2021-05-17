import {
  POST_GENRES_MOVIES_FETCH_FROM_MBD_API_SUCCESS,
  POST_API_MBD_LOADING,
  POST_API_MBD_FAIL,
  PostMoviesGenresFetchDispatchTypes,
  requestFunction,
} from "./actionsTypes";
import { Dispatch } from "redux";
import axios from "axios";

export const postMoviesGenresFetchResponse: requestFunction =
  (url) => async (dispatch: Dispatch<PostMoviesGenresFetchDispatchTypes>) => {
    try {
      dispatch({
        type: POST_API_MBD_LOADING,
      });
      const postApiResponse = await axios.get(url);
      dispatch({
        type: POST_GENRES_MOVIES_FETCH_FROM_MBD_API_SUCCESS,
        genres: postApiResponse.data,
      });
    } catch (error) {
      dispatch({
        type: POST_API_MBD_FAIL,
        error: error,
      });
    }
  };
