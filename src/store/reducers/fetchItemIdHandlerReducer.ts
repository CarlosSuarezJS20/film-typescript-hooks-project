import {
  FetchItemIdHandlerType,
  FETCH_ITEM_ID_HANDLER,
} from "../actions/actionsTypes";

interface DefaultStateInt {
  itemId?: number | null;
  actorId?: number | null;
}

const initialState = {};

const fetchItemIdUserIsViewingHandlerReducer = (
  state: DefaultStateInt = initialState,
  action: FetchItemIdHandlerType
): DefaultStateInt => {
  switch (action.type) {
    case FETCH_ITEM_ID_HANDLER:
      return {
        itemId: action.itemId,
        actorId: action.actorId,
      };
    default:
      return state;
  }
};

export default fetchItemIdUserIsViewingHandlerReducer;
