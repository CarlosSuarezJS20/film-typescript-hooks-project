import {
  POST_API_MBD_CONFIGURATION_SUCCESS,
  POST_API_MBD_LOADING,
  POST_API_MBD_FAIL,
  PostApiMbdConfigurationDispatchTypes,
  requestFunction,
} from "./actionsTypes";
import { Dispatch } from "redux";
import axios from "axios";

export const postMDBConfigurationApi: requestFunction = (url) => async (
  dispatch: Dispatch<PostApiMbdConfigurationDispatchTypes>
) => {
  try {
    dispatch({
      type: POST_API_MBD_LOADING,
    });
    const postApiResponse = await axios.get(url);
    dispatch({
      type: POST_API_MBD_CONFIGURATION_SUCCESS,
      payload: postApiResponse.data,
    });
  } catch (error) {
    dispatch({
      type: POST_API_MBD_FAIL,
      error: error,
    });
  }
};
