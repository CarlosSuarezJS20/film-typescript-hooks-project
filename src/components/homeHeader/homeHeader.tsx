import React, { useEffect, useState } from "react";
import "./homeHeader.css";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// redux
import { useSelector } from "react-redux";
import { RootStore } from "../../store/store";

import Slick, { Settings } from "react-slick";

import { NavLink } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

// buttons helper components for the header carousels

interface PropsNextBtn {
  onClick?: () => void;
}

const NexBtn: React.FC<PropsNextBtn> = (props) => {
  return (
    <div className="next-btn" onClick={props.onClick}>
      <FontAwesomeIcon icon={faChevronRight} />
    </div>
  );
};

interface PropsPrevBtn {
  onClick?: () => void;
}

const PrevBtn: React.FC<PropsPrevBtn> = (props) => {
  return (
    <div className="prev-btn" onClick={props.onClick}>
      <FontAwesomeIcon icon={faChevronLeft} />
    </div>
  );
};

// header component starts

const HomeHeader: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const [genres, setGenres] = useState<any[]>([]);

  const mDBConfigState = useSelector(
    (state: RootStore) => state.postApiConfigurationReducer
  );

  const typeSearchState = useSelector(
    (state: RootStore) => state.userSearchTypeR
  );

  // genres
  const genresMoviesState = useSelector(
    (state: RootStore) => state.postMoviesGenresReducer
  );

  const genresTvShowsState = useSelector(
    (state: RootStore) => state.postTvshowsGenresReducer
  );

  //items
  const moviesNowPlayingState = useSelector(
    (state: RootStore) => state.requestNowPlayingMoviesReducer
  );
  const airingNowTvShowsPlayingState = useSelector(
    (state: RootStore) => state.tvShowsAiringTFetchReducer
  );

  useEffect(() => {
    //   creating variables depending on the type of research:
    if (
      moviesNowPlayingState.nowPlayingMoviesResponse &&
      typeSearchState.userSearchType === "movies"
    ) {
      setItems(moviesNowPlayingState.nowPlayingMoviesResponse!.results);
      setGenres(genresMoviesState.genresResponseMbd!.genres);
    }
    if (
      airingNowTvShowsPlayingState.tvShowsAiringTodayResponseMbd &&
      typeSearchState.userSearchType === "tv-shows"
    ) {
      setItems(
        airingNowTvShowsPlayingState.tvShowsAiringTodayResponseMbd!.results
      );
      setGenres(genresTvShowsState.tvshowsGenresResponseMbd!.genres);
    }
  }, [moviesNowPlayingState, airingNowTvShowsPlayingState]);

  const addsGenresList = (genreIds: number[]) => {
    let allocatedGenres = [];

    if (genres && genreIds.length > 0) {
      allocatedGenres = genres
        .filter((genres) => {
          return genreIds.includes(genres.id);
        })
        .map((genre) => {
          return genre.name;
        });
      return allocatedGenres;
    }
  };

  const slickSettings: Settings = {
    lazyLoad: "ondemand",
    accessibility: false,
    draggable: false,
    autoplay: true,
    autoplaySpeed: 6000,
    speed: 2500,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    nextArrow: <NexBtn />,
    prevArrow: <PrevBtn />,
  };

  return (
    <header className="header-container">
      <div className="carousels-container">
        <div className="carousel-top-shown">
          <div className="carousel-title">
            <h2>
              {typeSearchState.userSearchType === "tv-shows"
                ? "Show airing now!"
                : "Now playing!"}
            </h2>
          </div>
          <Slick className="carousel" {...slickSettings}>
            {items.map((item, index) => {
              if (index > 3 && index < 10) {
                // request images
                return (
                  <NavLink
                    key={index}
                    to={
                      item.media_type === "tv"
                        ? `/details/tv/${item.name}`
                        : `/details/movie/${item.title}`
                    }
                  >
                    <div className="image-and-description-holder">
                      <img
                        className="item-img"
                        src={`${
                          mDBConfigState.payload?.images &&
                          mDBConfigState.payload.images.secure_base_url
                        }${
                          mDBConfigState.payload?.images &&
                          mDBConfigState.payload.images.poster_sizes[4]
                        }${item.backdrop_path}`}
                      />
                      <div className="item-description">
                        <div className="poster">
                          <img
                            src={`${
                              mDBConfigState.payload?.images &&
                              mDBConfigState.payload.images.secure_base_url
                            }${
                              mDBConfigState.payload?.images &&
                              mDBConfigState.payload.images.poster_sizes[4]
                            }${item.poster_path}`}
                          />
                        </div>
                        <div>text</div>
                      </div>
                    </div>
                  </NavLink>
                );
              }
            })}
          </Slick>
        </div>
        <div className="carousel-people"></div>
      </div>
    </header>
  );
};

export default HomeHeader;
