import React from "react";
import "./latestItem.css";

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

const LatestItemDisplayer: React.FC<PropsMaincarousel> = ({ item }) => {
  const mDBConfigState = useSelector(
    (state: RootStore) => state.postApiConfigurationReducer
  );

  const genresTvshowsState = useSelector(
    (state: RootStore) => state.postTvshowsGenresReducer
  );

  const genresMoviesState = useSelector(
    (state: RootStore) => state.postMoviesGenresReducer
  );

  const typeOfSearchState = useSelector(
    (state: RootStore) => state.userSearchTypeR
  );

  const addGenres = (genres: { id: number; name: string }[]) => {
    let allocatedGenres = [];
    let genresListFromServer =
      typeOfSearchState.userSearchType === "movies"
        ? genresMoviesState.genresResponseMbd!.genres
        : genresTvshowsState.tvshowsGenresResponseMbd!.genres;

    if (genres.length > 0) {
      let genresId = genres.map((genre) => genre.id);
      allocatedGenres = genresListFromServer
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
        <div className="latest-item-main-area">
          <div className="latest-item-title-holder">
            <h2>
              {`Latest ${
                typeOfSearchState.userSearchType === "tv-shows"
                  ? "Show"
                  : "Movie"
              }`}
            </h2>
            <p>Here is our latest addition, check it out!</p>
          </div>
          <NavLink
            className="latest-item-holder"
            to={{
              pathname:
                typeOfSearchState.userSearchType === "tv-shows"
                  ? `/details/tv/${item.name}`
                  : `/details/movie/${item.title}`,
              state: { itemId: item.id },
            }}
          >
            {item.backdrop_path === null ? (
              <div className="not-image-latest-item-holder">
                <div className="no-image-found">
                  <p>No image found</p>
                  <FontAwesomeIcon icon={faSadCry} className="cry-face" />
                </div>
                <div className="latest-item-description-with-noimage">
                  <h2>
                    {typeOfSearchState.userSearchType === "tv-shows"
                      ? `${item.name}`
                      : `${item.title}`}
                  </h2>
                  <p>Rating | {item.vote_average}</p>
                  <p>{addGenres(item.genres!)}</p>
                </div>
              </div>
            ) : (
              <div className="lastest-item-info">
                <img
                  src={`${
                    mDBConfigState.payload?.images &&
                    mDBConfigState.payload.images.secure_base_url
                  }${
                    mDBConfigState.payload?.images &&
                    mDBConfigState.payload.images.poster_sizes[4]
                  }${item.backdrop_path}`}
                />
                <div className="latest-item-description">
                  <h2>
                    {typeOfSearchState.userSearchType === "tv-shows"
                      ? `${item.name}`
                      : `${item.title}`}
                  </h2>
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

export default LatestItemDisplayer;
