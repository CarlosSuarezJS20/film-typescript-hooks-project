import React, { useEffect, useState } from "react";
import "./homeHeader.css";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import InformationLoader from "../UI/informationLoader/informationLoader";

// redux
import { useSelector } from "react-redux";
import { RootStore } from "../../store/store";

import Slick, { Settings } from "react-slick";

import { NavLink } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";

// buttons helper components for the header carousels

interface PropsBtn {
  onClick?: () => void;
}

const NexBtn: React.FC<PropsBtn> = (props) => {
  return (
    <div className="next-btn" onClick={props.onClick}>
      <FontAwesomeIcon icon={faChevronRight} />
    </div>
  );
};
const PrevBtn: React.FC<PropsBtn> = (props) => {
  return (
    <div className="prev-btn" onClick={props.onClick}>
      <FontAwesomeIcon icon={faChevronLeft} />
    </div>
  );
};

//  Second carousel btm components helpers

const SecondCarouselUpBtn: React.FC<PropsBtn> = (props) => {
  return (
    <div className="second-carousel-up-btn" onClick={props.onClick}>
      <FontAwesomeIcon icon={faChevronUp} />
    </div>
  );
};

const SecondCarouselNextBtn: React.FC<PropsBtn> = (props) => {
  return (
    <div className="second-carousel-next-btn" onClick={props.onClick}>
      <FontAwesomeIcon icon={faChevronRight} />
    </div>
  );
};

// header component starts and

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

const HomeHeader: React.FC = () => {
  const [itemsFistCarousel, setitemsFistCarousel] = useState<
    resultsFromServer[]
  >([]);
  const [itemsSecondCarousel, setitemsSecondCarousel] = useState<
    resultsFromServer[]
  >([]);
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

  //items:
  const moviesNowPlayingState = useSelector(
    (state: RootStore) => state.requestNowPlayingMoviesReducer
  );
  const airingNowTvShowsPlayingState = useSelector(
    (state: RootStore) => state.tvShowsAiringTFetchReducer
  );

  const upcomingMoviesState = useSelector(
    (state: RootStore) => state.requestUpcomingMoviesReducer
  );

  const topRatedTvShowsState = useSelector(
    (state: RootStore) => state.topratedTvSFetchReducer
  );

  useEffect(() => {
    //   creating variables depending on the type of research:
    if (
      moviesNowPlayingState.nowPlayingMoviesResponse &&
      upcomingMoviesState.upcomingMoviesResponseMbd &&
      typeSearchState.userSearchType === "movies"
    ) {
      setitemsFistCarousel(
        moviesNowPlayingState.nowPlayingMoviesResponse!.results
      );
      setitemsSecondCarousel(
        upcomingMoviesState.upcomingMoviesResponseMbd!.results
      );
      setGenres(genresMoviesState.genresResponseMbd!.genres);
    }
    if (
      airingNowTvShowsPlayingState.tvShowsAiringTodayResponseMbd &&
      topRatedTvShowsState.topratedTvshowsResponseMbd &&
      typeSearchState.userSearchType === "tv-shows"
    ) {
      setitemsFistCarousel(
        airingNowTvShowsPlayingState.tvShowsAiringTodayResponseMbd!.results
      );
      setitemsSecondCarousel(
        topRatedTvShowsState.topratedTvshowsResponseMbd!.results
      );
      setGenres(genresTvShowsState.tvshowsGenresResponseMbd!.genres);
    }
  }, [
    moviesNowPlayingState,
    airingNowTvShowsPlayingState,
    upcomingMoviesState,
    topRatedTvShowsState,
  ]);

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
      return allocatedGenres[0];
    }
  };

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
    nextArrow: <SecondCarouselUpBtn />,
    prevArrow: <SecondCarouselNextBtn />,
  };

  return (
    <header className="header-container">
      {/* presents a loader while fetching the times */}
      {moviesNowPlayingState.loading &&
      airingNowTvShowsPlayingState.loading &&
      upcomingMoviesState.loading &&
      topRatedTvShowsState.loading ? (
        <div className="loader-holder-header">
          <InformationLoader />
        </div>
      ) : (
        <div className="carousels-container">
          <div className="first-carousel">
            <div className="carousel-title">
              <h2>
                {typeSearchState.userSearchType === "tv-shows"
                  ? "Show airing now!"
                  : "Now playing!"}
              </h2>
            </div>
            <Slick className="carousel" {...slickSettings}>
              {itemsFistCarousel.map((item, index) => {
                if (index > 3 && index < 10) {
                  // request images
                  return (
                    <NavLink
                      key={index}
                      to={
                        typeSearchState.userSearchType === "tv-shows"
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
                              {typeSearchState.userSearchType === "tv-shows"
                                ? item.name
                                : item.title}
                            </h2>
                            <p>{`${addsGenresList(item.genre_ids)} | ${
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
          </div>
          <div className="second-carousel-holder">
            <div className="second-carousel-title">
              <h2>
                {typeSearchState.userSearchType === "tv-shows"
                  ? "Top rated shows"
                  : "Up next"}
              </h2>
            </div>
            <Slick className="second-carousel" {...slickSettingsSecondCarousel}>
              {itemsSecondCarousel.map((item, index) => {
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
                          <p>{`${addsGenresList(item.genre_ids)} | ${
                            item.vote_average
                          } Rating`}</p>
                        </div>
                      </div>
                    </NavLink>
                  );
                }
              })}
            </Slick>
          </div>
        </div>
      )}
    </header>
  );
};

export default HomeHeader;
