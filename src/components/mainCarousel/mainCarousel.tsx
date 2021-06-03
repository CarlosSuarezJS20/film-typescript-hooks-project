import React from "react";
import "./mainCarousel.css";

// Slick library styling
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Slick, { Settings } from "react-slick";

import { NavLink } from "react-router-dom";

import {
  faChevronLeft,
  faChevronRight,
  faPlus,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

import { useSelector } from "react-redux";
import { RootStore } from "../../store/store";

// btn Helper Components for Carousel Btns

interface PropsBtn {
  onClick?: () => void;
}

export const NexBtn: React.FC<PropsBtn> = (props) => {
  return (
    <div className="next-btn-main-carousel" onClick={props.onClick}>
      <FontAwesomeIcon icon={faChevronRight} />
    </div>
  );
};

export const PrevBtn: React.FC<PropsBtn> = (props) => {
  return (
    <div className="prev-btn-main-carousel" onClick={props.onClick}>
      <FontAwesomeIcon icon={faChevronLeft} />
    </div>
  );
};

// MAIN COMPONENT MAIN CAROUSEL

type resultsFromServer = {
  poster_path: string | null;
  overview?: string;
  genre_ids?: number[];
  id: number;
  title?: string;
  backdrop_path?: string | null;
  vote_average: number;
  name?: string;
};

interface PropsMaincarousel {
  items: resultsFromServer[];
}

const MainCarousel: React.FC<PropsMaincarousel> = ({ items }) => {
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

  // initializes first carousel
  const slickSettings: Settings = {
    lazyLoad: "ondemand",
    accessibility: false,
    autoplay: false,
    speed: 1000,
    slidesToShow: 5,
    slidesToScroll: 1,
    infinite: true,
    nextArrow: <NexBtn />,
    prevArrow: <PrevBtn />,
    responsive: [
      {
        breakpoint: 780,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  const genresFunction = (genresIds: number[]) => {
    let allocatedGenres = [];
    let genresListFromServer =
      typeOfSearchState.userSearchType === "movies"
        ? genresMoviesState.genresResponseMbd!.genres
        : genresTvshowsState.tvshowsGenresResponseMbd!.genres;

    if (genresIds.length > 0) {
      allocatedGenres = genresListFromServer
        .filter((genres) => {
          return genresIds.includes(genres.id);
        })
        .map((genre) => {
          return genre.name;
        });
      return allocatedGenres[0];
    }
    return "N/A";
  };

  return (
    <div className="home-page-carousel-holder">
      <Slick className="main-carousel" {...slickSettings}>
        {items &&
          items.map((item, index) => {
            // request images
            return (
              <div key={index} className="item-holder">
                <div className="item-image-container">
                  <NavLink
                    to={
                      typeOfSearchState.userSearchType === "tv-shows"
                        ? `/details/tv/${item.name}`
                        : `/details/movie/${item.title}`
                    }
                  >
                    <img
                      className="item-img-main-carousel"
                      src={`${
                        mDBConfigState.payload?.images &&
                        mDBConfigState.payload.images.secure_base_url
                      }${
                        mDBConfigState.payload?.images &&
                        mDBConfigState.payload.images.poster_sizes[4]
                      }${item.poster_path}`}
                    />
                  </NavLink>
                  <div className="watch-later-icon">
                    <FontAwesomeIcon
                      icon={faPlus}
                      className="watch-later-plus"
                    />
                  </div>
                </div>
                <div className="item-description-slide">
                  <div className="item-rating">
                    <FontAwesomeIcon icon={faStar} className="star" />
                    <p>{item.vote_average}</p>
                  </div>
                  <NavLink
                    to={
                      typeOfSearchState.userSearchType === "tv-shows"
                        ? `/details/tv/${item.name}`
                        : `/details/movie/${item.title}`
                    }
                  >
                    <h2 className="item-title-main-carousel">
                      {typeOfSearchState.userSearchType === "tv-shows"
                        ? item.name
                        : item.title}
                    </h2>
                  </NavLink>
                  <div className="genres-holder">
                    <p>{`${genresFunction(item.genre_ids!)}`}</p>
                  </div>
                </div>
              </div>
            );
          })}
      </Slick>
    </div>
  );
};

export default MainCarousel;
