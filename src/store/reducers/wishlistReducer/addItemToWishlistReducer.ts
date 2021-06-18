import {
  ADD_ITEM_TO_USER_WISHLIST_SUCCESS,
  ADD_ITEM_TO_USER_WISHLIST_LOADING,
  ADD_ITEM_TO_USER_WISHLIST_FAILED,
  AddItemToUserWishlistTypes,
} from "../../actions/actionsWishlist/WishlistActionsTypes";
interface DefaultStateInt {
  loading: boolean;
  error?: string;
}

const initialState = {
  loading: false,
  userId: null,
};

const addToWishListReducer = (
  state: DefaultStateInt = initialState,
  action: AddItemToUserWishlistTypes
): DefaultStateInt => {
  switch (action.type) {
    case ADD_ITEM_TO_USER_WISHLIST_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case ADD_ITEM_TO_USER_WISHLIST_LOADING:
      return {
        ...state,
        loading: true,
      };
    case ADD_ITEM_TO_USER_WISHLIST_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default addToWishListReducer;
