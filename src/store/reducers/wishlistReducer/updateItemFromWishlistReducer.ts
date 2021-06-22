import {
  UPDATE_REQUEST_WISHLIST_ITEM_SUCCESS,
  UPDATE_REQUEST_WISHLIST_ITEM_LOADING,
  UPDATE_REQUEST_WISHLIST_ITEM_FAILED,
  updateRequestItemFromWishListTypes,
} from "../../actions/actionsWishlist/WishlistActionsTypes";

interface DefaultStateInt {
  payload?: any;
  loading: boolean;
  error?: string;
}

const initialState = {
  loading: false,
};

const updateItemFfromUserWishlist = (
  state: DefaultStateInt = initialState,
  action: updateRequestItemFromWishListTypes
): DefaultStateInt => {
  switch (action.type) {
    case UPDATE_REQUEST_WISHLIST_ITEM_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case UPDATE_REQUEST_WISHLIST_ITEM_LOADING:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_REQUEST_WISHLIST_ITEM_SUCCESS:
      return {
        ...state,
        payload: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default updateItemFfromUserWishlist;
