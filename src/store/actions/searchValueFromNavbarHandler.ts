import {
  SEARCH_VALUE_HANDLER,
  searchValueFromInputHandlerType,
  searchTypeHandlerFunction,
} from "./actionsTypes";
import { Dispatch } from "redux";

export const storesUserSearchValueHandler: searchTypeHandlerFunction =
  (userTypeOfSearch) =>
  (dispatch: Dispatch<searchValueFromInputHandlerType>) => {
    dispatch({
      type: SEARCH_VALUE_HANDLER,
      searchValue: userTypeOfSearch,
    });
  };
