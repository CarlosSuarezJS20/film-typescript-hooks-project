import {
  FetchItemIdHandlerType,
  FETCH_ITEM_ID_HANDLER,
} from "../actions/actionsTypes";

interface DefaultStateInt {
  itemId: number | null;
}

const initialState = {
  itemId: null,
};

const fetchItemIdUserIsViewingHandlerReducer = (
  state: DefaultStateInt = initialState,
  action: FetchItemIdHandlerType
): DefaultStateInt => {
  switch (action.type) {
    case FETCH_ITEM_ID_HANDLER:
      return {
        itemId: action.itemId,
      };
    default:
      return state;
  }
};

export default fetchItemIdUserIsViewingHandlerReducer;
