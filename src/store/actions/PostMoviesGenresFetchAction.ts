import {
  POST_GENRES_MOVIES_FETCH_FROM_MBD_API_SUCCESS,
  POST_GENRES_MOVIES_FETCH_FROM_MBD_API_FAILED,
  POST_GENRES_MOVIES_FETCH_FROM_MBD_API_LOADING,
  PostMoviesGenresFetchDispatchTypes,
  requestFunction,
} from "./actionsTypes";
import { Dispatch } from "redux";
import axios from "axios";

export const postMoviesGenresFetchResponse: requestFunction =
  (url) => async (dispatch: Dispatch<PostMoviesGenresFetchDispatchTypes>) => {
    try {
      dispatch({
        type: POST_GENRES_MOVIES_FETCH_FROM_MBD_API_LOADING,
      });
      const postApiResponse = await axios.get(url);
      dispatch({
        type: POST_GENRES_MOVIES_FETCH_FROM_MBD_API_SUCCESS,
        genres: postApiResponse.data,
      });
    } catch (error) {
      dispatch({
        type: POST_GENRES_MOVIES_FETCH_FROM_MBD_API_FAILED,
        error: error,
      });
    }
  };
