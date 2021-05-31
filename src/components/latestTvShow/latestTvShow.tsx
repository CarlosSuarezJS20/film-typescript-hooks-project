import React from "react";
import "./latestTvShow.css";

// Slick library styling
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSadCry } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

import { useSelector } from "react-redux";
import { RootStore } from "../../store/store";

type resultFromServer = {
  poster_path: string | null;
  overview?: string;
  genre_ids: number[];
  id: number;
  title?: string;
  backdrop_path?: string | null;
  vote_average: number;
  name?: string;
};

interface PropsMaincarousel {
  item: resultFromServer;
}

const LatestTvshowDisplayer: React.FC<PropsMaincarousel> = ({ item }) => {
  const mDBConfigState = useSelector(
    (state: RootStore) => state.postApiConfigurationReducer
  );

  const typeOfSearchState = useSelector(
    (state: RootStore) => state.userSearchTypeR
  );

  return (
    <NavLink className="latest-show-holder" to={`/details/tv/${item.name}`}>
      {item.backdrop_path === null ? (
        <div className="no-image-found">
          <p>No image found</p>
          <FontAwesomeIcon icon={faSadCry} />
        </div>
      ) : (
        <img
          src={`${
            mDBConfigState.payload?.images &&
            mDBConfigState.payload.images.secure_base_url
          }${
            mDBConfigState.payload?.images &&
            mDBConfigState.payload.images.poster_sizes[4]
          }${item.backdrop_path}`}
        />
      )}
    </NavLink>
  );
};

export default LatestTvshowDisplayer;
