import {
  GET_PEOPLE_DETAILS_REQ_SUCCESS,
  GET_PEOPLE_REQUEST_LOADING,
  GET_PEOPLE_REQUEST_FAIL,
  getPeopleDetailsRequestDispatchTypes,
  getPeopleDetailsFunction,
} from "./actorDetailsActionTypes";
import { Dispatch } from "redux";
import axios from "axios";

export const getActorDetailsResponse: getPeopleDetailsFunction =
  (url) => async (dispatch: Dispatch<getPeopleDetailsRequestDispatchTypes>) => {
    try {
      dispatch({
        type: GET_PEOPLE_REQUEST_LOADING,
      });
      const postApiResponse = await axios.get(url);
      dispatch({
        type: GET_PEOPLE_DETAILS_REQ_SUCCESS,
        getActorDetailsResponse: postApiResponse.data,
      });
    } catch (error) {
      dispatch({
        type: GET_PEOPLE_REQUEST_FAIL,
        error: error,
      });
    }
  };
