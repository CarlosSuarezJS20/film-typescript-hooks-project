import {
  ADD_ITEM_TO_USER_WISHLIST_SUCCESS,
  ADD_ITEM_TO_USER_WISHLIST_LOADING,
  ADD_ITEM_TO_USER_WISHLIST_FAILED,
  GET_ITEMS_FOR_USER_WISHLIST_LOADING,
  GET_ITEMS_FOR_USER_WISHLIST_SUCCESS,
  GET_ITEMS_FOR_USER_WISHLIST_FAILED,
  AddItemToUserWishlistTypes,
  GetItemsForUserWishlistTypes,
} from "../../actions/actionsWishlist/WishlistActionsTypes";
import {} from "../../actions/actionsWishlist/requestItemsForUsersWishlist";
import { Dispatch } from "redux";

import axios from "axios";

type item = {
  id: number;
  itemOwnerId: string;
  watched: boolean;
};

export const postAddItemToUserWishlist: (
  url: string,
  item: item,
  userId: string
) => void =
  (url, item, userId) =>
  async (
    dispatch: Dispatch<
      AddItemToUserWishlistTypes | GetItemsForUserWishlistTypes
    >
  ) => {
    try {
      dispatch({
        type: ADD_ITEM_TO_USER_WISHLIST_LOADING,
      });
      const postApiResponse = await axios.post(url, item);
      dispatch({
        type: ADD_ITEM_TO_USER_WISHLIST_SUCCESS,
      });
      dispatch({
        type: GET_ITEMS_FOR_USER_WISHLIST_LOADING,
      });
      // This allows to refresh the getWishList to render the updated list
      const getWishListResponse = await axios.get(
        `https://living-room-3a1ec-default-rtdb.europe-west1.firebasedatabase.app/items.json?orderBy="itemOwnerId"&equalTo="${userId}"`
      );
      const itemsInWishlist = [];
      for (let item in getWishListResponse.data) {
        itemsInWishlist.push({
          ...getWishListResponse.data[item],
          itemId: item,
        });
      }
      dispatch({
        type: GET_ITEMS_FOR_USER_WISHLIST_SUCCESS,
        payload: itemsInWishlist,
      });
    } catch (error) {
      dispatch({
        type: ADD_ITEM_TO_USER_WISHLIST_FAILED,
        error: error,
      });
      dispatch({
        type: GET_ITEMS_FOR_USER_WISHLIST_FAILED,
        error: error,
      });
    }
  };
