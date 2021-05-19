import {
  SET_SEARCH_TYPE_WELCOME_PAGE,
  userSearchType,
  searchTypeHandlerFunction,
} from "./actionsTypes";
import { Dispatch } from "redux";

export const fetchUserTypeOfSearchHandler: searchTypeHandlerFunction =
  (userTypeOfSearch) => (dispatch: Dispatch<userSearchType>) => {
    dispatch({
      type: SET_SEARCH_TYPE_WELCOME_PAGE,
      searchType: userTypeOfSearch,
    });
  };
