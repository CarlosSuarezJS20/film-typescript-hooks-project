import React, { useEffect } from "react";
import "./home.css";

import NavigationBar from "../mainNavigation/mainNavigation";
import HomeHeader from "../homeHeader/homeHeader";
import MainCarousel from "../mainCarousel/mainCarousel";
import LatestTvshowDisplayer from "../latestTvShow/latestTvShow";

import { useSelector, useDispatch } from "react-redux";

// Movies Requests
import { upcomingMoviesFetchResponse } from "../../store/actions/RequestUpcomingMoviesApi";
import { popularMoviesFetchResponse } from "../../store/actions/RequestPopularMoviesApi";
import { nowplayingMoviesFetchResponse } from "../../store/actions/RequestNowPlayingMovies";
import { topratedMoviesFetchResponse } from "../../store/actions/RequestTopratedMoviesApi";
// Tv Requests
import { tvshowsAiringTodayFetchReq } from "../../store/actions/RequestTvshowsAiringTodayApi";
import { topratedTvshowsFetchReq } from "../../store/actions/RequestTopratedTVshowsApi";
import { onTheAirTvshowsRequestReq } from "../../store/actions/RequestOntheairTvShowsRequest";
import { latestTvshowRequestReq } from "../../store/actions/RequestLatestTvshowRequest";
import { popularTvshowsFetchReq } from "../../store/actions/RequestPopularTvShowsApi";
//
import { storesUserSearchValueHandler } from "../../store/actions/searchValueFromNavbarHandler";

import { RootStore } from "../../store/store";

const Home: React.FC = () => {
  const dispatch = useDispatch();

  // fetches necessary configurations for elements img size etc.
  const configMbdApiState = useSelector(
    (state: RootStore) => state.postApiConfigurationReducer
  );

  const userTypeOfSearchState = useSelector(
    (state: RootStore) => state.userSearchTypeR
  );

  const storeSearchValueHandlerState = useSelector(
    (state: RootStore) => state.searchValueFromInputHandlerR
  );

  // movies
  const popularMoviesReqState = useSelector(
    (state: RootStore) => state.requestPopularMoviesReducer
  );

  const topRatedReqState = useSelector(
    (state: RootStore) => state.requestTopratedMoviesReducer
  );

  //tvshows
  const ontheAirTvShowsReqState = useSelector(
    (state: RootStore) => state.requestOnTheAirShowsR
  );

  const popularTvShowsReqState = useSelector(
    (state: RootStore) => state.getPopularTvshowsReducer
  );

  const latesttvShowReqState = useSelector(
    (state: RootStore) => state.latestTvShowFetchReducer
  );

  useEffect(() => {
    // Movie Requests
    switch (userTypeOfSearchState.userSearchType) {
      case "movies":
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
        break;
      case "tv-shows":
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
        dispatch(
          onTheAirTvshowsRequestReq(
            `https://api.themoviedb.org/3/tv/on_the_air?api_key=${configMbdApiState.apiKey}&language=en-US&page=1`
          )
        );
        dispatch(
          latestTvshowRequestReq(
            `https://api.themoviedb.org/3/tv/latest?api_key=${configMbdApiState.apiKey}&language=en-US&page=1`
          )
        );
        dispatch(
          popularTvshowsFetchReq(
            `https://api.themoviedb.org/3/tv/popular?api_key=${configMbdApiState.apiKey}&language=en-US&page=1`
          )
        );
        break;
    }
  }, [userTypeOfSearchState.userSearchType]);

  // if user clicks outside the instant results div, it removes the div from the UI
  const resetsUserSearchHandler = () => {
    if (storeSearchValueHandlerState.userSearchValue.length > 0) {
      dispatch(storesUserSearchValueHandler(""));
    }
  };

  return (
    <div className="home-container" onClick={resetsUserSearchHandler}>
      <NavigationBar />
      <HomeHeader />
      {userTypeOfSearchState.userSearchType === "tv-shows" && (
        <React.Fragment>
          <LatestTvshowDisplayer
            item={
              latesttvShowReqState.latestTvShowResult! &&
              latesttvShowReqState.latestTvShowResult
            }
          />
          <div className="tv-shows-carousels-holder">
            <MainCarousel
              items={
                ontheAirTvShowsReqState.onTheAirTvshowsResults! &&
                ontheAirTvShowsReqState.onTheAirTvshowsResults!.results
              }
            />
            <MainCarousel
              items={
                popularTvShowsReqState.popularTvShowResponseMbd! &&
                ontheAirTvShowsReqState.onTheAirTvshowsResults!.results
              }
            />
          </div>
        </React.Fragment>
      )}
      {userTypeOfSearchState.userSearchType === "movies" && (
        <div className="movies-carousels-holder">
          <MainCarousel
            items={
              popularMoviesReqState.popularMoviesResponseMbd! &&
              popularMoviesReqState.popularMoviesResponseMbd!.results
            }
          />
          <MainCarousel
            items={
              topRatedReqState.topratedMoviesResponse! &&
              topRatedReqState.topratedMoviesResponse!.results
            }
          />
        </div>
      )}
    </div>
  );
};

export default Home;
