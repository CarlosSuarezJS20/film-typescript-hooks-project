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

interface PropsNextBtn {
  onClick?: () => void;
}

const NexBtn: React.FC<PropsNextBtn> = (props) => {
  return <div onClick={props.onClick}>next Btn</div>;
};

interface PropsPrevBtn {
  onClick?: () => void;
}

const PrevBtn: React.FC<PropsPrevBtn> = (props) => {
  return <div onClick={props.onClick}>prev Btn</div>;
};

const HomeHeader: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const [genres, setGenres] = useState<any[]>([]);
  const MDBConfigState = useSelector(
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

  const handleBeforeChange = () => {
    console.log("%c handleBeforeChange", "color: blue");
  };

  const handleAfterChange = () => {
    console.log("%c handleAfterChange", "color: red");
  };

  const slickSettings: Settings = {
    lazyLoad: "ondemand",
    accessibility: false,
    draggable: false,
    autoplay: true,
    autoplaySpeed: 5000,
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
        <div className="swiper-container carousel-movies">
          <Slick {...slickSettings}>
            <div style={{ height: "100vh", width: "100vw", background: "red" }}>
              Slide 1
            </div>
            <div style={{ height: "100%", width: "100%", background: "red" }}>
              Slide 2
            </div>
            <div style={{ height: "100%", width: "100%", background: "red" }}>
              Slide 3
            </div>
            <div style={{ height: "100%", width: "100%", background: "red" }}>
              Slide 4
            </div>
            <div style={{ height: "100%", width: "100%", background: "red" }}>
              Slide 5
            </div>
            <div style={{ height: "100%", width: "100%", background: "red" }}>
              Slide 6
            </div>
          </Slick>
        </div>
        <div className="home-swiper-container carousel-people"></div>
      </div>
    </header>
  );
};

export default HomeHeader;
