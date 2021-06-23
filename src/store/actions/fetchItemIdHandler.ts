import {
  FETCH_ITEM_ID_HANDLER,
  FetchItemIdHandlerType,
  FetchItemIdHandlerFunction,
} from "./actionsTypes";
import { Dispatch } from "redux";

export const fetchItemIdUserIsViewingHandler: FetchItemIdHandlerFunction =
  (itemId) => (dispatch: Dispatch<FetchItemIdHandlerType>) => {
    dispatch({
      type: FETCH_ITEM_ID_HANDLER,
      itemId: itemId,
    });
  };
