import React from "react";
import "./addToWishList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faPlus } from "@fortawesome/free-solid-svg-icons";

interface AddToWishlistProps {
  location: string;
}

const AddToWishlist: React.FC<AddToWishlistProps> = ({ location }) => {
  return (
    <div
      className={
        location === "details-page"
          ? "watch-later-details-page"
          : "watch-later-icon"
      }
    >
      <FontAwesomeIcon icon={faPlus} className="watch-later-plus" />
      {location === "details-page" && (
        <span className="add-to-wishlist">Add to wishlist</span>
      )}
    </div>
  );
};

export default AddToWishlist;
