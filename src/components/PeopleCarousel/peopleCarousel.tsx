import React from "react";
import "./peopleCarousel.css";

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
    <div className="next-btn-people-carousel" onClick={props.onClick}>
      <FontAwesomeIcon icon={faChevronRight} />
    </div>
  );
};

export const PrevBtn: React.FC<PropsBtn> = (props) => {
  return (
    <div className="prev-btn-people-carousel" onClick={props.onClick}>
      <FontAwesomeIcon icon={faChevronLeft} />
    </div>
  );
};

// MAIN COMPONENT MAIN CAROUSEL

type resultsFromServer = {
  id: number;
  profile_path: string | null;
  name: string;
  character?: string;
  credit_id: string;
  popularity: number;
  job?: string;
};

interface PropsMaincarousel {
  items: resultsFromServer[];
}

const PeopleCarousel: React.FC<PropsMaincarousel> = ({ items }) => {
  const mDBConfigState = useSelector(
    (state: RootStore) => state.postApiConfigurationReducer
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
          slidesToShow: 3,
        },
      },
    ],
  };

  return (
    <div className="people-carousel-holder">
      <Slick className="main-carousel" {...slickSettings}>
        {items &&
          items.map((item, index) => {
            if (item.profile_path === null) {
              return;
            }
            return (
              <div key={index} className="slide-holder">
                <div className="slide" key={index}>
                  <NavLink
                    to={{
                      pathname: `/details/actor/${item.name}`,
                      state: { actorId: item.id },
                    }}
                  >
                    <img
                      id="people-img"
                      className="people-item-img-carousel"
                      src={`${
                        mDBConfigState.payload?.images &&
                        mDBConfigState.payload.images.secure_base_url
                      }${
                        mDBConfigState.payload?.images &&
                        mDBConfigState.payload.images.poster_sizes[4]
                      }${item.profile_path}`}
                    />
                  </NavLink>
                </div>
                <div className="people-details">
                  <h2 id="people-name">{item.name}</h2>
                  <p>{item.character ? item.character : item.job}</p>
                </div>
              </div>
            );
          })}
      </Slick>
    </div>
  );
};

export default PeopleCarousel;
