import React, { useEffect } from "react";
import "./home.css";
import { useSelector, useDispatch } from "react-redux";
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

  useEffect(() => {
    // Movie Requests
    console.log("Home Mounthed");
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
    // TV Requests
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
  }, []);

  return <div className="App"></div>;
};

export default Home;
