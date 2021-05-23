import React, { useEffect } from "react";
import "./home.css";

import NavigationBar from "../mainNavigation/mainNavigation";

import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
// Movies Requests
import { upcomingMoviesFetchResponse } from "../../store/actions/RequestUpcomingMoviesApi";
import { popularMoviesFetchResponse } from "../../store/actions/RequestPopularMoviesApi";
import { nowplayingMoviesFetchResponse } from "../../store/actions/RequestNowPlayingMovies";
import { topratedMoviesFetchResponse } from "../../store/actions/RequestTopratedMoviesApi";
// Tv Requests
import { tvshowsAiringTodayFetchReq } from "../../store/actions/RequestTvshowsAiringTodayApi";
import { topratedTvshowsFetchReq } from "../../store/actions/RequestTopratedTVshowsApi";

import { RootStore } from "../../store/store";

const Home = () => {
  const dispatch = useDispatch();

  // fetches necessary configurations for elements img size etc.
  const configMbdApiState = useSelector(
    (state: RootStore) => state.postApiConfigurationReducer
  );

  const userTypeOfSearchState = useSelector(
    (state: RootStore) => state.userSearchTypeR
  );

  // states for Movies Requests
  const upcomingMoviesReqState = useSelector(
    (state: RootStore) => state.requestUpcomingMoviesReducer
  );

  const popularMoviesReqState = useSelector(
    (state: RootStore) => state.requestPopularMoviesReducer
  );

  const nowPlayingReqState = useSelector(
    (state: RootStore) => state.requestNowPlayingMoviesReducer
  );

  const topRatedReqState = useSelector(
    (state: RootStore) => state.requestTopratedMoviesReducer
  );

  // states for TvShows Requests

  const tvShowsAiringTodayRequestState = useSelector(
    (state: RootStore) => state.tvShowsAiringTFetchReducer
  );

  const topRatedTvshowsRequestState = useSelector(
    (state: RootStore) => state.topratedTvSFetchReducer
  );

  useEffect(() => {
    // Movie Requests
    switch (userTypeOfSearchState.userSearchType) {
      case "movies":
        dispatch(
          upcomingMoviesFetchResponse(
            `https://api.themoviedb.org/3/movie/upcoming?api_key=${configMbdApiState.apiKey}&language=en-US&page=1`
          )
        );
        dispatch(
          popularMoviesFetchResponse(
            `https://api.themoviedb.org/3/movie/popular?api_key=${configMbdApiState.apiKey}&language=en-US&page=1`
          )
        );
        dispatch(
          nowplayingMoviesFetchResponse(
            `https://api.themoviedb.org/3/movie/now_playing?api_key=${configMbdApiState.apiKey}&language=en-US&page=1`
          )
        );
        dispatch(
          topratedMoviesFetchResponse(
            `https://api.themoviedb.org/3/movie/top_rated?api_key=${configMbdApiState.apiKey}&language=en-US&page=1`
          )
        );
        break;
      case "tv-shows":
        dispatch(
          tvshowsAiringTodayFetchReq(
            `https://api.themoviedb.org/3/tv/airing_today?api_key=${configMbdApiState.apiKey}&language=en-US&page=1`
          )
        );
        dispatch(
          topratedTvshowsFetchReq(
            `https://api.themoviedb.org/3/tv/top_rated?api_key=${configMbdApiState.apiKey}&language=en-US&page=1`
          )
        );
        break;
    }
  }, [userTypeOfSearchState.userSearchType]);

  return (
    <div className="home-container" onClick={() => {}}>
      <NavigationBar />
    </div>
  );
};

export default Home;
