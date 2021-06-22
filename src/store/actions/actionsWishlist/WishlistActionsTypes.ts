// POST REQUEST TO ADD NEW ITEMS TO LIST

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

// GET ITEMS FROM SERVER

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
  type: string;
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

// GET REQUEST TO UPDATE THE ITEM

export const UPDATE_REQUEST_WISHLIST_ITEM_SUCCESS =
  "UPDATE_REQUEST_WISHLIST_ITEM_SUCCESS";
export const UPDATE_REQUEST_WISHLIST_ITEM_FAILED =
  "UPDATE_REQUEST_WISHLIST_ITEM_FAILED";
export const UPDATE_REQUEST_WISHLIST_ITEM_LOADING =
  "UPDATE_REQUEST_WISHLIST_ITEM_LOADING";

export interface updateRequestItemFromWishlistLoading {
  type: typeof UPDATE_REQUEST_WISHLIST_ITEM_LOADING;
}

export interface updateRequestItemFromWishlistFailed {
  type: typeof UPDATE_REQUEST_WISHLIST_ITEM_FAILED;
  error: string;
}

export interface updateRequestItemFromWishlistSuccess {
  type: typeof UPDATE_REQUEST_WISHLIST_ITEM_SUCCESS;
  payload: any;
}

export type updateRequestItemFromWishListTypes =
  | updateRequestItemFromWishlistLoading
  | updateRequestItemFromWishlistFailed
  | updateRequestItemFromWishlistSuccess;
