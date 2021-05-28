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
import getActorDetailReducer from "./singleItemsReducer/actorDetailsReducers/actorsDetailsReqReducer";
import getActorCombinedCreditsReducer from "./singleItemsReducer/actorDetailsReducers/actorCombinedCreditsReducer";
import onTheAirTvShowsReducer from "./tvShowsReducers/requestOnAirTvShowsReducer";
import latestTvshowRequestReducer from "./tvShowsReducers/latestTvShowReducer";

// User Search Type Reducer: For displaying HOME PAGE dynamically
import userSearchTypeReducer from "../../store/reducers/userSearchTypeReducer";
import searchCapabilityReducer from "../../store/reducers/multiSearchQueryReducer";
import searchValueFromUserReducer from "../../store/reducers/searchValueFromUser";

const rootReducer = combineReducers({
  //user search type:
  userSearchTypeR: userSearchTypeReducer,
  //HOME page content
  postApiConfigurationReducer: postApiMbdConfigurationReducer,
  postMoviesGenresReducer: postMoviesGenresFetchReducer,
  postTvshowsGenresReducer: postTvshowsGenresFetchReducer,
  // movies for home page
  requestUpcomingMoviesReducer: requestUpcomingMoviesR,
  requestPopularMoviesReducer: requestPopularMoviesR,
  requestNowPlayingMoviesReducer: requestNowPlayingMoviesR,
  requestTopratedMoviesReducer: requestTopratedMoviesR,
  //tv shows:
  tvShowsAiringTFetchReducer: tvShowsAiringTodayFetchReducer,
  topratedTvSFetchReducer: topratedTvshowsFetchReducer,
  latestTvShowFetchReducer: latestTvshowRequestReducer,
  //singleItems reducers
  //movie reducers
  getMovieDetailsR: getMovieDetailsReducer,
  getMovieTrailerR: getMovieTrailerReducer,
  // tvshow reducers
  getTvshowDetailsR: getTvshowDetailsReducer,
  getTvshowVideosR: getTvshowVideosReducer,
  getOnTheAirShowsR: onTheAirTvShowsReducer,
  // actor Details Reducers
  getMovieCastR: getMovieCastReducer,
  getTvshowCastR: getTvshowCastReducer,
  getActorDetailsR: getActorDetailReducer,
  getActorCombinedCreditsR: getActorCombinedCreditsReducer,
  // Search Multi reducer
  searchValueFromInputHandlerR: searchValueFromUserReducer,
  searchMultiCapabilityR: searchCapabilityReducer,
});

export default rootReducer;
