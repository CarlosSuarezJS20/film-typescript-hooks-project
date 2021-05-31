import React from "react";

import "./index.css";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Slick, { Settings } from "react-slick";

import { NavLink } from "react-router-dom";

import {
  faChevronLeft,
  faChevronRight,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";

// redux
import { useSelector } from "react-redux";
import { RootStore } from "../../../store/store";

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

//  Second carousel btm components helpers

export const SecondCarouselUpBtn: React.FC<PropsBtn> = (props) => {
  return (
    <div className="second-carousel-up-btn" onClick={props.onClick}>
      <FontAwesomeIcon icon={faChevronUp} />
    </div>
  );
};

export const SecondCarouselNextBtn: React.FC<PropsBtn> = (props) => {
  return (
    <div className="second-carousel-next-btn" onClick={props.onClick}>
      <FontAwesomeIcon icon={faChevronRight} />
    </div>
  );
};

type resultsFromServer = {
  poster_path: string | null;
  overview?: string;
  genre_ids: number[];
  id: number;
  title?: string;
  backdrop_path: string | null;
  vote_average: number;
  name?: string;
};

interface FirstCarouselProps {
  items: resultsFromServer[];
  genresFunction: (genresIds: number[]) => void;
}

// Main carousel

export const FistCarouse: React.FC<FirstCarouselProps> = ({
  items,
  genresFunction,
}) => {
  const mDBConfigState = useSelector(
    (state: RootStore) => state.postApiConfigurationReducer
  );

  const typeOfSearchState = useSelector(
    (state: RootStore) => state.userSearchTypeR
  );

  // initializes first carousel
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
    <Slick className="carousel" {...slickSettings}>
      {items.map((item, index) => {
        if (index > 3 && index < 10) {
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
                    <p>{`${genresFunction(item.genre_ids)} | ${
                      item.vote_average
                    } Rating`}</p>
                  </div>
                </div>
              </div>
            </NavLink>
          );
        }
      })}
    </Slick>
  );
};

// Vertical and Horizotal Carousel

export const SecondCarousel: React.FC<FirstCarouselProps> = ({
  items,
  genresFunction,
}) => {
  const slickSettingsSecondCarousel: Settings = {
    lazyLoad: "ondemand",
    vertical: true,
    accessibility: false,
    slidesToShow: 2,
    responsive: [
      {
        breakpoint: 990,
        settings: {
          vertical: false,
          slidesToShow: 3,
        },
      },
    ],
    draggable: false,
    autoplay: true,
    autoplaySpeed: 6000,
    speed: 1000,
    slidesToScroll: 3,
    infinite: true,
    nextArrow: <SecondCarouselNextBtn />,
    prevArrow: <SecondCarouselUpBtn />,
  };

  const mDBConfigState = useSelector(
    (state: RootStore) => state.postApiConfigurationReducer
  );

  const typeSearchState = useSelector(
    (state: RootStore) => state.userSearchTypeR
  );

  return (
    <Slick className="second-carousel" {...slickSettingsSecondCarousel}>
      {items.map((item, index) => {
        if (index > 3 && index < 10) {
          // request images
          return (
            <NavLink
              className="carousel-two-slide"
              key={index}
              to={
                typeSearchState.userSearchType === "tv-shows"
                  ? `/details/tv/${item.name}`
                  : `/details/movie/${item.title}`
              }
            >
              <div className="select"></div>

              <div className="carousel-two-slide">
                <div className="carousel-two-image-holder">
                  <img
                    className="carousel-two-img"
                    id="image-second-carousel"
                    src={`${
                      mDBConfigState.payload?.images &&
                      mDBConfigState.payload.images.secure_base_url
                    }${
                      mDBConfigState.payload?.images &&
                      mDBConfigState.payload.images.poster_sizes[4]
                    }${item.poster_path}`}
                  />
                </div>
                <div className="carousel-two-description-holder">
                  <h2>
                    {typeSearchState.userSearchType === "tv-shows"
                      ? item.name
                      : item.title}
                  </h2>
                  <p>{`${genresFunction(item.genre_ids)} | ${
                    item.vote_average
                  } Rating`}</p>
                </div>
              </div>
            </NavLink>
          );
        }
      })}
    </Slick>
  );
};
