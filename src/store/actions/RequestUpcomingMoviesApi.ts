import {
  REQUEST_UPCOMING_MOVIES_FETCH_FROM_MBD_API_SUCCESS,
  POST_API_MBD_LOADING,
  POST_API_MBD_FAIL,
  UpcomingResquestMbdApiDispatchTypes,
  requestFunction,
} from "./actionsTypes";
import { Dispatch } from "redux";
import axios from "axios";

export const upcomingMoviesFetchResponse: requestFunction =
  (url) => async (dispatch: Dispatch<UpcomingResquestMbdApiDispatchTypes>) => {
    try {
      dispatch({
        type: POST_API_MBD_LOADING,
      });
      const postApiResponse = await axios.get(url);
      dispatch({
        type: REQUEST_UPCOMING_MOVIES_FETCH_FROM_MBD_API_SUCCESS,
        upcomingMoviesResponse: postApiResponse.data,
      });
    } catch (error) {
      dispatch({
        type: POST_API_MBD_FAIL,
        error: error,
      });
    }
  };
