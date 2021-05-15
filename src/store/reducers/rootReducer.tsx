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
const rootReducer = combineReducers({
  postApiConfigurationReducer: postApiMbdConfigurationReducer,
  postMoviesGenresReducer: postMoviesGenresFetchReducer,
  postTvshowsGenresReducer: postTvshowsGenresFetchReducer,
  requestUpcomingMoviesReducer: requestUpcomingMoviesR,
  requestPopularMoviesReducer: requestPopularMoviesR,
  requestNowPlayingMoviesReducer: requestNowPlayingMoviesR,
  requestTopratedMoviesReducer: requestTopratedMoviesR,
  //
  tvShowsAiringTFetchReducer: tvShowsAiringTodayFetchReducer,
  topratedTvSFetchReducer: topratedTvshowsFetchReducer,
});

export default rootReducer;
