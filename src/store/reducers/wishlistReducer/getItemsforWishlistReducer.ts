import {
  GET_ITEMS_FOR_USER_WISHLIST_SUCCESS,
  GET_ITEMS_FOR_USER_WISHLIST_LOADING,
  GET_ITEMS_FOR_USER_WISHLIST_FAILED,
  responseWishlist,
  GetItemsForUserWishlistTypes,
} from "../../actions/actionsWishlist/WishlistActionsTypes";

interface DefaultStateInt {
  payload?: responseWishlist;
  loading: boolean;
  error?: string;
}

const initialState = {
  loading: false,
  userId: null,
};

const addToWishListReducer = (
  state: DefaultStateInt = initialState,
  action: GetItemsForUserWishlistTypes
): DefaultStateInt => {
  switch (action.type) {
    case GET_ITEMS_FOR_USER_WISHLIST_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case GET_ITEMS_FOR_USER_WISHLIST_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_ITEMS_FOR_USER_WISHLIST_SUCCESS:
      return {
        ...state,
        payload: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default addToWishListReducer;
