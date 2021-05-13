import React, { useEffect } from "react";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { postMDBConfigurationApi } from "./store/actions/PostApiMbdConfigAction";
import { postMoviesGenresFetchResponse } from "./store/actions/PostMoviesGenresFetchAction";
import { postTvshowsGenresFetchResponse } from "./store/actions/PostTvShowsGenresFetchAction";
import { RootStore } from "./store/store";

function App() {
  const dispatch = useDispatch();

  // fetches necessary configurations for elements img size etc.
  const configMbdApiState = useSelector(
    (state: RootStore) => state.postApiConfigurationReducer
  );

  useEffect(() => {
    dispatch(
      postMDBConfigurationApi(
        `https://api.themoviedb.org/3/configuration?api_key=${configMbdApiState.apiKey}`
      )
    );
    dispatch(
      postMoviesGenresFetchResponse(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${configMbdApiState.apiKey}`
      )
    );
    dispatch(
      postTvshowsGenresFetchResponse(
        `https://api.themoviedb.org/3/genre/tv/list?api_key=${configMbdApiState.apiKey}`
      )
    );
  }, []);

  return <div className="App"></div>;
}

export default App;
