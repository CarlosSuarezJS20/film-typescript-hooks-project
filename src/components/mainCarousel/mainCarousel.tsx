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
} from "@fortawesome/free-solid-svg-icons";

import { useSelector } from "react-redux";
import { RootStore } from "../../store/store";

// btn Helper Components for Carousel Btns

interface PropsBtn {
  onClick?: () => void;
}

export const NexBtn: React.FC<PropsBtn> = (props) => {
  return (
    <div className="next-btn" onClick={props.onClick}>
      <FontAwesomeIcon icon={faChevronRight} />
    </div>
  );
};

export const PrevBtn: React.FC<PropsBtn> = (props) => {
  return (
    <div className="prev-btn" onClick={props.onClick}>
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
  console.log(items);
  const mDBConfigState = useSelector(
    (state: RootStore) => state.postApiConfigurationReducer
  );
  const genresState = useSelector(
    (state: RootStore) => state.postTvshowsGenresReducer
  );
  const typeOfSearchState = useSelector(
    (state: RootStore) => state.userSearchTypeR
  );

  // initializes first carousel
  const slickSettings: Settings = {
    lazyLoad: "ondemand",
    accessibility: false,
    draggable: true,
    autoplay: false,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: true,
    nextArrow: <NexBtn />,
    prevArrow: <PrevBtn />,
  };

  const genresFunction = (genresIds: number[]) => {
    let allocatedGenres = [];

    if (genresState.tvshowsGenresResponseMbd!.genres && genresIds.length > 0) {
      allocatedGenres = genresState
        .tvshowsGenresResponseMbd!.genres.filter((genres) => {
          return genresIds.includes(genres.id);
        })
        .map((genre) => {
          return genre.name;
        });
      return allocatedGenres[0];
    }
  };

  return (
    <div className="home-page-carousel-holder">
      <Slick {...slickSettings}>
        {items &&
          items.map((item, index) => {
            // request images
            return (
              <NavLink
                key={index}
                to={
                  typeOfSearchState.userSearchType === "tv-shows"
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
                    <div className="description">
                      <h2>
                        {typeOfSearchState.userSearchType === "tv-shows"
                          ? item.name
                          : item.title}
                      </h2>
                      <p>{`${genresFunction(item.genre_ids!)} | ${
                        item.vote_average
                      } Rating`}</p>
                    </div>
                  </div>
                </div>
              </NavLink>
            );
          })}
      </Slick>
    </div>
  );
};

export default MainCarousel;
