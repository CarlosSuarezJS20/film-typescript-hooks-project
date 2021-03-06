import { combineReducers } from "redux";
import postApiMbdConfigurationReducer from "../reducers/postApiMbdConfigurationReducer";

import postMoviesGenresFetchReducer from "./moviesReducers/postMoviesGenresFetchReducer";

import requestUpcomingMoviesR from "../reducers/moviesReducers/requestUpcomingMoviesReducer";
import requestPopularMoviesR from "../reducers/moviesReducers/requestPopularMoviesReducer";
import requestNowPlayingMoviesR from "../reducers/moviesReducers/requestNowplayingMoviesReducer";
import requestTopratedMoviesR from "../reducers/moviesReducers/requestTopratedMoviesReducer";
import requestLatestMovieR from "./moviesReducers/requestLatestMovieAddedReducer";

import postTvshowsGenresFetchReducer from "../reducers/tvShowsReducers/postTvshowsGenresFetchReducer";

import tvShowsAiringTodayFetchReducer from "../reducers/tvShowsReducers/resquestTvshowsAiringTodayReducer";
import topratedTvshowsFetchReducer from "../reducers/tvShowsReducers/requestTopratedTvShowsReducer";

import getMovieDetailsReducer from "./singleItemsReducer/moviesItemReducers/requestMovieDetailsReducer";
import getMovieCastReducer from "./singleItemsReducer/moviesItemReducers/requestMovieCastReducer";
import getMovieTrailerReducer from "./singleItemsReducer/moviesItemReducers/requestMovieTrailersReducer";

import getTvshowDetailsReducer from "./singleItemsReducer/tvshowsItemReducers/requestTvshowDetailsReducer";
import getTvshowCastReducer from "./singleItemsReducer/tvshowsItemReducers/requestTvshowCastReducer";
import getTvshowVideosReducer from "./singleItemsReducer/tvshowsItemReducers/requestTvshowVideosReducer";
import getActorDetailReducer from "./singleItemsReducer/actorDetailsReducers/actorsDetailsReqReducer";
import getActorCombinedCreditsReducer from "./singleItemsReducer/actorDetailsReducers/actorCombinedCreditsReducer";
import onTheAirTvShowsReducer from "./tvShowsReducers/requestOnAirTvShowsReducer";
import getPopularTvshowsReducer from "./tvShowsReducers/requestPopularTvshowsReducer";
import latestTvshowRequestReducer from "./tvShowsReducers/latestTvShowReducer";

// User Search Type Reducer: For displaying HOME PAGE dynamically
import userSearchTypeReducer from "../reducers/userSearchTypeReducer";
import searchCapabilityReducer from "../reducers/multiSearchQueryReducer";
import searchValueFromUserReducer from "../reducers/searchValueFromUserReducer";

import trendingThisweekReducer from "../reducers/trendingThisweekReducer";

import menuSectionReducer from "../reducers/menuSectionReducer";
import getDiscoverRequestReducer from "../reducers/getDiscoverRequestReducer";

// authentication

import authenticationLogicReducer from "../reducers/authenticationReducer/authenticationReducer";
import authenticationBannerHandlerReducer from "../reducers/authenticationReducer/authenticationBannerReducer";

// wishlist

import addNewItemToWishListReducer from "../reducers/wishlistReducer/addItemToWishlistReducer";
import itemsForUsersWishingListReducer from "../reducers/wishlistReducer/getItemsforWishlistReducer";
import updateItemFromWishlistReducer from "../reducers/wishlistReducer/updateItemFromWishlistReducer";
// for displaying pages that involved item details
import fetchItemIdHandlerReducer from "./fetchItemIdHandlerReducer";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootPersistConfig = {
  key: "root",
  storage: storage,
  blacklist: ["authenticationBannerHandlerR", "authenticationLogicR"],
};

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
  requestLatestMovieReducer: requestLatestMovieR,
  // TvShows HomePages Reducers
  requestOnTheAirShowsR: onTheAirTvShowsReducer,
  tvShowsAiringTFetchReducer: tvShowsAiringTodayFetchReducer,
  topratedTvSFetchReducer: topratedTvshowsFetchReducer,
  latestTvShowFetchReducer: latestTvshowRequestReducer,
  getPopularTvshowsReducer: getPopularTvshowsReducer,
  //singleItems reducers
  //movie reducers
  getMovieDetailsR: getMovieDetailsReducer,
  getMovieTrailerR: getMovieTrailerReducer,
  // tvshow reducers
  getTvshowDetailsR: getTvshowDetailsReducer,
  getTvshowVideosR: getTvshowVideosReducer,
  // actor Details Reducers/
  getMovieCastR: getMovieCastReducer,
  getTvshowCastR: getTvshowCastReducer,
  getActorDetailsR: getActorDetailReducer,
  getActorCombinedCreditsR: getActorCombinedCreditsReducer,
  //Trending This week
  trendingThisweekReducer: trendingThisweekReducer,
  // Search Multi reducer
  searchValueFromInputHandlerR: searchValueFromUserReducer,
  searchMultiCapabilityR: searchCapabilityReducer,
  // Menu Reducer
  menuSectionR: menuSectionReducer,
  // Discover
  getDiscoverR: getDiscoverRequestReducer,
  // Authentication
  authenticationBannerHandlerR: authenticationBannerHandlerReducer,
  authenticationLogicR: authenticationLogicReducer,
  // Wishlist
  addNewItemToWishListR: addNewItemToWishListReducer,
  getItemsWishListR: itemsForUsersWishingListReducer,
  updateItemFromWishlistR: updateItemFromWishlistReducer,
  fetchItemIdReducer: fetchItemIdHandlerReducer,
});

export default persistReducer(rootPersistConfig, rootReducer);
// export default rootReducer;
