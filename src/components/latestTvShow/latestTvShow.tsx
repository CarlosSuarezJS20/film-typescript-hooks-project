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
  genres?: { id: number; name: string }[];
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

  const genresState = useSelector(
    (state: RootStore) => state.postTvshowsGenresReducer
  );

  const addGenres = (genres: { id: number; name: string }[]) => {
    let allocatedGenres = [];
    if (
      genresState.tvshowsGenresResponseMbd?.genres &&
      genres &&
      genres.length > 0
    ) {
      let genresId = genres.map((genre) => genre.id);
      allocatedGenres = genresState.tvshowsGenresResponseMbd.genres
        .filter((genres) => {
          return genresId.includes(genres.id);
        })
        .map((genre) => {
          return genre.name;
        });
      return allocatedGenres[0];
    }
    return "No genres found";
  };

  return (
    <React.Fragment>
      {item && (
        <div className="latest-show-main-area">
          <div className="latest-show-title-holder">
            <h2>Latest show</h2>
            <p>Here is our latest addition, check it out!</p>
          </div>
          <NavLink
            className="latest-show-holder"
            to={`/details/tv/${item.name}`}
          >
            {item.backdrop_path === null ? (
              <div className="not-image-latest-show-holder">
                <div className="no-image-found">
                  <p>No image found</p>
                  <FontAwesomeIcon icon={faSadCry} />
                </div>
                <div className="latest-show-description-with-noimage">
                  <h2>{item.name}</h2>
                  <p>Rating | {item.vote_average}</p>
                  <p>{addGenres(item.genres!)}</p>
                </div>
              </div>
            ) : (
              <div className="lastest-show-info">
                <img
                  src={`${
                    mDBConfigState.payload?.images &&
                    mDBConfigState.payload.images.secure_base_url
                  }${
                    mDBConfigState.payload?.images &&
                    mDBConfigState.payload.images.poster_sizes[4]
                  }${item.backdrop_path}`}
                />
                <div className="latest-show-description">
                  <h2>{item.name}</h2>
                  <p>Rating | {item.vote_average}</p>
                  <p>{addGenres(item.genres!)}</p>
                </div>
              </div>
            )}
          </NavLink>
        </div>
      )}
    </React.Fragment>
  );
};

export default LatestTvshowDisplayer;
