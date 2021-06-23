import React, { useEffect } from "react";
import "./App.css";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import WelcomePage from "./components/welcomePage/welcomePage";
import Home from "./components/home/home";
import SingleMovieDetails from "./components/movieItemDetails/movieItemDetails";
import ActorDetails from "./components/actorDetails/actorDetails";
import ResultsPage from "./components/results/results";
import ScrollToTop from "./components/UI/scrollToTop/scrollToTop";
import MenuSection from "./components/menuSection/menuSection";
import Discovery from "./components/discovery/discovery";
import Authentication from "./components/authentication/authentication";
import UsersWishlist from "./components/usersWishlist/usersWishlist";

import { useSelector, useDispatch } from "react-redux";

import { postMDBConfigurationApi } from "./store/actions/PostApiMbdConfigAction";

import { postMoviesGenresFetchResponse } from "./store/actions/PostMoviesGenresFetchAction";
import { postTvshowsGenresFetchResponse } from "./store/actions/PostTvShowsGenresFetchAction";
import { RootStore } from "./store/store";
import TvShowDetails from "./components/tvshowDetails/tvshowDetails";


const App: React.FC = () => {
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
  }, [configMbdApiState.apiKey, dispatch]);

  // if user clicks outside the instant results div, it removes the div from the UI

  return (
    <BrowserRouter>
      {/* Locates the scroll to where the user is intending to go. New page up to the top, goes back to where the user began searching */}
      <ScrollToTop>
        <MenuSection />
        <Authentication />
        <Switch>
          <Route path="/" exact component={WelcomePage} />
          <Route path="/home" component={Home} />
          <Route path="/details/movie/:title" component={SingleMovieDetails} />
          <Route path="/details/tv/:title" component={TvShowDetails} />
          <Route path="/details/actor/:name" component={ActorDetails} />
          <Route path="/results" component={ResultsPage} />
          <Route path="/discover" component={Discovery} />
          <Route path="/wishlist/:userId" component={UsersWishlist} />
        </Switch>
      </ScrollToTop>
    </BrowserRouter>
  );
};

export default App;
