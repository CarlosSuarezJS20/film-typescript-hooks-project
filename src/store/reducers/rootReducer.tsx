import { combineReducers } from "redux";
import postApiMbdConfigurationReducer from "../reducers/postApiMbdConfigurationReducer";
import postMoviesGenresFetchReducer from "../reducers/postMoviesGenresFetchReducer";
import postTvshowsGenresFetchReducer from "../reducers/postTvshowsGenresFetchReducer";
import requestUpcomingMoviesR from "../reducers/requestUpcomingMoviesReducer";
import requestPopularMoviesR from "../reducers/requestPopularMoviesReducer";
import requestNowPlayingMoviesR from "../reducers/requestNowplayingMoviesReducer";
import requestTopratedMoviesR from "../reducers/requestTopratedMoviesReducer";

const rootReducer = combineReducers({
  postApiConfigurationReducer: postApiMbdConfigurationReducer,
  postMoviesGenresReducer: postMoviesGenresFetchReducer,
  postTvshowsGenresReducer: postTvshowsGenresFetchReducer,
  requestUpcomingMoviesReducer: requestUpcomingMoviesR,
  requestPopularMoviesReducer: requestPopularMoviesR,
  requestNowPlayingMoviesReducer: requestNowPlayingMoviesR,
  requestTopratedMoviesReducer: requestTopratedMoviesR,
});

export default rootReducer;
