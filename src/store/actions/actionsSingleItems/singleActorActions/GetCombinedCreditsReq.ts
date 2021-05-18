import {
  GET_PEOPLE_COMBINED_CREDIT_REQ_SUCCESS,
  GET_PEOPLE_REQUEST_LOADING,
  GET_PEOPLE_REQUEST_FAIL,
  getPeopleCombinedCreditsRequestDispatchTypes,
  getPeopleDetailsFunction,
} from "./actorDetailsActionTypes";
import { Dispatch } from "redux";
import axios from "axios";

export const getActorCombinedCreditsResponse: getPeopleDetailsFunction =
  (url) =>
  async (dispatch: Dispatch<getPeopleCombinedCreditsRequestDispatchTypes>) => {
    try {
      dispatch({
        type: GET_PEOPLE_REQUEST_LOADING,
      });
      const postApiResponse = await axios.get(url);
      dispatch({
        type: GET_PEOPLE_COMBINED_CREDIT_REQ_SUCCESS,
        getPeopleCombinedCreditsResponse: postApiResponse.data,
      });
    } catch (error) {
      dispatch({
        type: GET_PEOPLE_REQUEST_FAIL,
        error: error,
      });
    }
  };
