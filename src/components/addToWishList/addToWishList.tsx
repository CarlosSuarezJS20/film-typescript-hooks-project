import React, { useEffect, useState } from "react";
import "./addToWishList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faPlus, faHeart } from "@fortawesome/free-solid-svg-icons";

import { RootStore } from "../../store/store";
import { useSelector, useDispatch } from "react-redux";
import { authenticationBannerHandler } from "../../store/actions/actionsAuthentication/authenticationBannerHandler";
import { postAddItemToUserWishlist } from "../../store/actions/actionsWishlist/addItemToWishList";
import { getItemsForUserWishlist } from "../../store/actions/actionsWishlist/requestItemsForUsersWishlist";
import { NavLink } from "react-router-dom";

interface AddToWishlistProps {
  location: string;
  type: string;
  itemId: number;
}

const AddToWishlist: React.FC<AddToWishlistProps> = ({
  location,
  itemId,
  type,
}) => {
  // onList helps to show that the item has been added to the list and it is used for re rendering the component
  const [onList, setOnList] = useState(false);
  const dispatch = useDispatch();
  // authetication logic
  const autheticationLogicState = useSelector(
    (state: RootStore) => state.authenticationLogicR
  );

  const itemsWishlistState = useSelector(
    (state: RootStore) => state.getItemsWishListR
  );

  useEffect(() => {
    if (autheticationLogicState.userId) {
      dispatch(
        getItemsForUserWishlist(
          `https://living-room-3a1ec-default-rtdb.europe-west1.firebasedatabase.app/items.json?orderBy="itemOwnerId"&equalTo="${autheticationLogicState.userId}"`
        )
      );
      setOnList(false);
    }
  }, [autheticationLogicState.userId, dispatch]);

  const itemToWishlistHandler = () => {
    const wishListItem = {
      id: itemId,
      itemOwnerId: autheticationLogicState.userId!,
      type: type,
      watched: false,
    };
    setOnList(true);
    dispatch(
      postAddItemToUserWishlist(
        "https://living-room-3a1ec-default-rtdb.europe-west1.firebasedatabase.app/items.json",
        wishListItem,
        autheticationLogicState.userId!
      )
    );
  };

  return (
    <React.Fragment>
      {/* The authentication check removes the items that are on list for the user. Shows added items only if logged in */}
      {(autheticationLogicState.userId &&
        itemsWishlistState.payload &&
        itemsWishlistState.payload!.map((item) => item.id).includes(itemId)) ||
      onList ? (
        <div
          key={itemId}
          className={
            location === "details-page" ? "watch-later-details-page" : "on-list"
          }
        >
          {/* styles differently depending on where on the page the component is rendered */}
          {location !== "details-page" && (
            <NavLink
              className="on-list-link"
              to={`/wishlist/${autheticationLogicState.userId}`}
            >
              <FontAwesomeIcon icon={faHeart} className="watch-later-plus" />
              <span>on list</span>
            </NavLink>
          )}
          {location === "details-page" && (
            <NavLink
              to={`/wishlist/${autheticationLogicState.userId}`}
              className="add-to-wishlist"
            >
              <FontAwesomeIcon icon={faHeart} className="watch-later-plus" /> On
              list
            </NavLink>
          )}
        </div>
      ) : (
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
      )}
    </React.Fragment>
  );
};

export default AddToWishlist;
