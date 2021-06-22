import {
  UPDATE_REQUEST_WISHLIST_ITEM_SUCCESS,
  UPDATE_REQUEST_WISHLIST_ITEM_LOADING,
  UPDATE_REQUEST_WISHLIST_ITEM_FAILED,
  updateRequestItemFromWishListTypes,
  response,
} from "../../actions/actionsWishlist/WishlistActionsTypes";
import { Dispatch } from "redux";
import axios from "axios";

export const updateItemFfromUserWishlist: (
  url: string,
  item: response
) => void =
  (url, item) =>
  async (dispatch: Dispatch<updateRequestItemFromWishListTypes>) => {
    try {
      dispatch({
        type: UPDATE_REQUEST_WISHLIST_ITEM_LOADING,
      });
      const putApiResponse = await axios.put(url, item);
      dispatch({
        type: UPDATE_REQUEST_WISHLIST_ITEM_SUCCESS,
        payload: putApiResponse.data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_REQUEST_WISHLIST_ITEM_FAILED,
        error: error,
      });
    }
  };
