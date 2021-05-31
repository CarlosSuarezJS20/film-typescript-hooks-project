import {
  REQUEST_ON_THE_AIR_TV_SHOWS_REQUEST_SUCCESS,
  REQUEST_ON_THE_AIR_TV_SHOWS_REQUEST_LOADING,
  REQUEST_ON_THE_AIR_TV_SHOWS_REQUEST_FAILED,
  onTheAirTvshowsRequestTypes,
  requestFunction,
} from "./actionsTypes";
import { Dispatch } from "redux";
import axios from "axios";

export const requestOnTheairTvshowsFetchResponse: requestFunction =
  (url) => async (dispatch: Dispatch<onTheAirTvshowsRequestTypes>) => {
    try {
      dispatch({
        type: REQUEST_ON_THE_AIR_TV_SHOWS_REQUEST_LOADING,
      });
      const postApiResponse = await axios.get(url);
      dispatch({
        type: REQUEST_ON_THE_AIR_TV_SHOWS_REQUEST_SUCCESS,
        onTheAirTvShowsResponse: postApiResponse.data,
      });
    } catch (error) {
      dispatch({
        type: REQUEST_ON_THE_AIR_TV_SHOWS_REQUEST_FAILED,
        error: error,
      });
    }
  };
