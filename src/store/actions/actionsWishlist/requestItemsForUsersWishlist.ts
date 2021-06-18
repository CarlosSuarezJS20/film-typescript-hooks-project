import {
  GET_ITEMS_FOR_USER_WISHLIST_SUCCESS,
  GET_ITEMS_FOR_USER_WISHLIST_LOADING,
  GET_ITEMS_FOR_USER_WISHLIST_FAILED,
  GetItemsForUserWishlistTypes,
} from "../../actions/actionsWishlist/WishlistActionsTypes";
import { Dispatch } from "redux";
import axios from "axios";

export const getItemsForUserWishlist: (url: string) => void =
  (url) => async (dispatch: Dispatch<GetItemsForUserWishlistTypes>) => {
    try {
      dispatch({
        type: GET_ITEMS_FOR_USER_WISHLIST_LOADING,
      });
      const postApiResponse = await axios.get(url);
      const itemsInWishlist = [];
      for (let item in postApiResponse.data) {
        itemsInWishlist.push({
          ...postApiResponse.data[item],
          itemId: item,
        });
      }
      dispatch({
        type: GET_ITEMS_FOR_USER_WISHLIST_SUCCESS,
        payload: itemsInWishlist,
      });
    } catch (error) {
      dispatch({
        type: GET_ITEMS_FOR_USER_WISHLIST_FAILED,
        error: error,
      });
    }
  };
