import React, { useEffect } from "react";
import "./home.css";
import { useSelector, useDispatch } from "react-redux";
import { upcomingMoviesFetchResponse } from "../../store/actions/RequestUpcomingMoviesApi";
import { popularMoviesFetchResponse } from "../../store/actions/RequestPopularMoviesApi";
import { nowplayingMoviesFetchResponse } from "../../store/actions/RequestNowPlayingMovies";
import { topratedMoviesFetchResponse } from "../../store/actions/RequestTopratedMoviesApi";

import { RootStore } from "../../store/store";

const Home = () => {
  const dispatch = useDispatch();

  // fetches necessary configurations for elements img size etc.
  const configMbdApiState = useSelector(
    (state: RootStore) => state.postApiConfigurationReducer
  );

  useEffect(() => {
    dispatch(
      upcomingMoviesFetchResponse(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${configMbdApiState.apiKey}`
      )
    );
    dispatch(
      popularMoviesFetchResponse(
        `https://api.themoviedb.org/3/movie/popular?api_key=${configMbdApiState.apiKey}`
      )
    );
    dispatch(
      nowplayingMoviesFetchResponse(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${configMbdApiState.apiKey}`
      )
    );
    dispatch(
      topratedMoviesFetchResponse(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${configMbdApiState.apiKey}`
      )
    );
  }, []);

  return <div className="App"></div>;
};

export default Home;
