export const ADD_ITEM_TO_USER_WISHLIST_SUCCESS =
  "ADD_ITEM_TO_USER_WISHLIST_SUCCESS";
export const ADD_ITEM_TO_USER_WISHLIST_LOADING =
  "ADD_ITEM_TO_USER_WISHLIST_LOADING";
export const ADD_ITEM_TO_USER_WISHLIST_FAILED =
  "ADD_ITEM_TO_USER_WISHLIST_FAILED";

export interface AddItemToUserWishlistLoading {
  type: typeof ADD_ITEM_TO_USER_WISHLIST_LOADING;
}

export interface AddItemToUserWishlistFailed {
  type: typeof ADD_ITEM_TO_USER_WISHLIST_FAILED;
  error: string;
}

export interface AddItemToUserWishlistSuccess {
  type: typeof ADD_ITEM_TO_USER_WISHLIST_SUCCESS;
}

export type AddItemToUserWishlistTypes =
  | AddItemToUserWishlistLoading
  | AddItemToUserWishlistFailed
  | AddItemToUserWishlistSuccess;

export const GET_ITEMS_FOR_USER_WISHLIST_SUCCESS =
  "GET_ITEMS_FOR_USER_WISHLIST_SUCCESS";
export const GET_ITEMS_FOR_USER_WISHLIST_LOADING =
  "GET_ITEMS_FOR_USER_WISHLIST_LOADING";
export const GET_ITEMS_FOR_USER_WISHLIST_FAILED =
  "GET_ITEMS_FOR_USER_WISHLIST_FAILED";

export interface GetItemsForUserWishlistLoading {
  type: typeof GET_ITEMS_FOR_USER_WISHLIST_LOADING;
}

export interface GetItemsForUserWishlistFailed {
  type: typeof GET_ITEMS_FOR_USER_WISHLIST_FAILED;
  error: string;
}

export type response = {
  id: number;
  itemOwnerId: string;
  watched: boolean;
  itemId: string;
};

export type responseWishlist = response[];

export interface GetItemsForUserWishlistSuccess {
  type: typeof GET_ITEMS_FOR_USER_WISHLIST_SUCCESS;
  payload: responseWishlist;
}

export type GetItemsForUserWishlistTypes =
  | GetItemsForUserWishlistLoading
  | GetItemsForUserWishlistFailed
  | GetItemsForUserWishlistSuccess;
