import React, { useEffect, useState } from "react";
import "./homeHeader.css";

import { FistCarouse, SecondCarousel } from "./homeHeaderCarousels";

import InformationLoader from "../UI/informationLoader/informationLoader";

// redux
import { useSelector } from "react-redux";
import { RootStore } from "../../store/store";

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
            <FistCarouse
              items={itemsFistCarousel}
              genresFunction={addsGenresList}
            />
          </div>
          <div className="second-carousel-holder">
            <div className="second-carousel-title">
              <h2>
                {typeSearchState.userSearchType === "tv-shows"
                  ? "Top rated shows"
                  : "Up next"}
              </h2>
            </div>
            <SecondCarousel
              items={itemsSecondCarousel}
              genresFunction={addsGenresList}
            />
          </div>
        </div>
      )}
    </header>
  );
};

export default HomeHeader;
