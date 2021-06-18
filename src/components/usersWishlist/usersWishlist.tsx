import React, { useEffect } from "react";
import "./usersWishlist.css";

import { useDispatch, useSelector } from "react-redux";

import { getItemsForUserWishlist } from "../../store/actions/actionsWishlist/requestItemsForUsersWishlist";
import { RootStore } from "../../store/store";

const AddToWishlist: React.FC = () => {
  const dispatch = useDispatch();
  // authetication logic
  const authenticationState = useSelector(
    (state: RootStore) => state.authenticationLogicR
  );

  //   wishlist state
  const wishlistItemsState = useSelector(
    (state: RootStore) => state.getItemsWishListR
  );

  useEffect(() => {
    dispatch(
      getItemsForUserWishlist(
        `https://living-room-3a1ec-default-rtdb.europe-west1.firebasedatabase.app/items.json?orderBy="itemOwnerId"&equalTo="${authenticationState.userId}"`
      )
    );
  }, [authenticationState.userId]);

  return <div></div>;
};

export default AddToWishlist;
