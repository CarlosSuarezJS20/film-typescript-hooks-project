import { combineReducers } from "redux";
import postApiMbdConfigurationReducer from "../reducers/postApiMbdConfigurationReducer";

import postMoviesGenresFetchReducer from "./moviesReducers/postMoviesGenresFetchReducer";

import requestUpcomingMoviesR from "../../store/reducers/moviesReducers/requestUpcomingMoviesReducer";
import requestPopularMoviesR from "../../store/reducers/moviesReducers/requestPopularMoviesReducer";
import requestNowPlayingMoviesR from "../../store/reducers/moviesReducers/requestNowplayingMoviesReducer";
import requestTopratedMoviesR from "../../store/reducers/moviesReducers/requestTopratedMoviesReducer";

import postTvshowsGenresFetchReducer from "../../store/reducers/tvShowsReducers/postTvshowsGenresFetchReducer";

import tvShowsAiringTodayFetchReducer from "../../store/reducers/tvShowsReducers/resquestTvshowsAiringTodayReducer";
import topratedTvshowsFetchReducer from "../../store/reducers/tvShowsReducers/requestTopratedTvShowsReducer";

import getMovieDetailsReducer from "./singleItemsReducer/moviesItemReducers/requestMovieDetailsReducer";
import getMovieCastReducer from "./singleItemsReducer/moviesItemReducers/requestMovieCastReducer";
import getMovieTrailerReducer from "./singleItemsReducer/moviesItemReducers/requestMovieTrailersReducer";

import getTvshowDetailsReducer from "./singleItemsReducer/tvshowsItemReducers/requestTvshowDetailsReducer";
import getTvshowCastReducer from "./singleItemsReducer/tvshowsItemReducers/requestTvshowCastReducer";
import getTvshowVideosReducer from "./singleItemsReducer/tvshowsItemReducers/requestTvshowDetailsReducer";

const rootReducer = combineReducers({
  postApiConfigurationReducer: postApiMbdConfigurationReducer,
  postMoviesGenresReducer: postMoviesGenresFetchReducer,
  postTvshowsGenresReducer: postTvshowsGenresFetchReducer,
  requestUpcomingMoviesReducer: requestUpcomingMoviesR,
  requestPopularMoviesReducer: requestPopularMoviesR,
  requestNowPlayingMoviesReducer: requestNowPlayingMoviesR,
  requestTopratedMoviesReducer: requestTopratedMoviesR,
  //tv shows:
  tvShowsAiringTFetchReducer: tvShowsAiringTodayFetchReducer,
  topratedTvSFetchReducer: topratedTvshowsFetchReducer,
  //singleItems reducers
  //movie reducers
  getMovieDetailsR: getMovieDetailsReducer,
  getMovieCastR: getMovieCastReducer,
  getMovieTrailerR: getMovieTrailerReducer,
  // tvshow reducers
  getTvshowDetailsR: getTvshowDetailsReducer,
  getTvshowCastR: getTvshowCastReducer,
  getTvshowVideosR: getTvshowVideosReducer,
});

export default rootReducer;
