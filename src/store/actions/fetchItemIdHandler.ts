import {
  FETCH_ITEM_ID_HANDLER,
  FetchItemIdHandlerType,
  FetchItemIdHandlerFunction,
} from "./actionsTypes";
import { Dispatch } from "redux";

export const fetchItemIdUserIsViewingHandler: FetchItemIdHandlerFunction =
  (actorId, itemId) => (dispatch: Dispatch<FetchItemIdHandlerType>) => {
    dispatch({
      type: FETCH_ITEM_ID_HANDLER,
      actorId: actorId,
      itemId: itemId,
    });
  };
