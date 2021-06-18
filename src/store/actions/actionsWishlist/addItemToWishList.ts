import {
  ADD_ITEM_TO_USER_WISHLIST_SUCCESS,
  ADD_ITEM_TO_USER_WISHLIST_LOADING,
  ADD_ITEM_TO_USER_WISHLIST_FAILED,
  AddItemToUserWishlistTypes,
} from "../../actions/actionsWishlist/WishlistActionsTypes";
import { Dispatch } from "redux";
import axios from "axios";

type item = {
  id: number;
  itemOwnerId: string;
  watched: boolean;
};

export const postAddItemToUserWishlist: (url: string, item: item) => void =
  (url, item) => async (dispatch: Dispatch<AddItemToUserWishlistTypes>) => {
    try {
      dispatch({
        type: ADD_ITEM_TO_USER_WISHLIST_LOADING,
      });
      const postApiResponse = await axios.post(url, item);
      dispatch({
        type: ADD_ITEM_TO_USER_WISHLIST_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: ADD_ITEM_TO_USER_WISHLIST_FAILED,
        error: error,
      });
    }
  };
