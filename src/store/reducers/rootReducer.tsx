import { combineReducers } from "redux";
import postApiMbdConfigurationReducer from "../reducers/postApiMbdConfigurationReducer";
import postMoviesGenresFetchReducer from "../reducers/postMoviesGenresFetchReducer";
import postTvshowsGenresFetchReducer from "../reducers/postTvshowsGenresFetchReducer";

const rootReducer = combineReducers({
  postApiConfigurationReducer: postApiMbdConfigurationReducer,
  postMoviesGenresReducer: postMoviesGenresFetchReducer,
  postTvshowsGenresReducer: postTvshowsGenresFetchReducer,
});

export default rootReducer;
