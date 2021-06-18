import React, { useEffect } from "react";
import "./addToWishList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { RootStore } from "../../store/store";
import { useSelector, useDispatch } from "react-redux";
import { authenticationBannerHandler } from "../../store/actions/actionsAuthentication/authenticationBannerHandler";
import { postAddItemToUserWishlist } from "../../store/actions/actionsWishlist/addItemToWishList";
import { getItemsForUserWishlist } from "../../store/actions/actionsWishlist/requestItemsForUsersWishlist";

interface AddToWishlistProps {
  location: string;
  itemId: number;
}

const AddToWishlist: React.FC<AddToWishlistProps> = ({ location, itemId }) => {
  const dispatch = useDispatch();
  // authetication logic
  const autheticationLogicState = useSelector(
    (state: RootStore) => state.authenticationLogicR
  );

  const itemsWishlistState = useSelector(
    (state: RootStore) => state.getItemsWishListR
  );

  const itemToWishlistHandler = () => {
    const wishListItem = {
      id: itemId,
      itemOwnerId: autheticationLogicState.userId!,
      watched: false,
    };

    dispatch(
      postAddItemToUserWishlist(
        "https://living-room-3a1ec-default-rtdb.europe-west1.firebasedatabase.app/items.json",
        wishListItem
      )
    );
  };

  return (
    <React.Fragment>
      <div
        className={
          location === "details-page"
            ? "watch-later-details-page"
            : "watch-later-icon"
        }
        onClick={() => {
          autheticationLogicState.authToken
            ? itemToWishlistHandler()
            : dispatch(authenticationBannerHandler());
        }}
      >
        <FontAwesomeIcon icon={faPlus} className="watch-later-plus" />
        {location === "details-page" && (
          <span className="add-to-wishlist">Add to wishlist</span>
        )}
      </div>
    </React.Fragment>
  );
};

export default AddToWishlist;
