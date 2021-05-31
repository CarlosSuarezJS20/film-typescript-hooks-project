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
  genre_ids: number[];
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
  if (items) {
    console.log(items);
  }
  return <div></div>;
};

export default MainCarousel;
