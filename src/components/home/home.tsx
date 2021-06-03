import React, { useEffect } from "react";
import "./home.css";

import NavigationBar from "../mainNavigation/mainNavigation";
import HomeHeader from "../homeHeader/homeHeader";
import SignUpSection from "../signUpSection/signUpSection";
import MainCarousel from "../mainCarousel/mainCarousel";
import LatestItemDisplayer from "../latestItem/latestItem";
import Footer from "../footer/footer";

import { useSelector, useDispatch } from "react-redux";

// Movies Requests
import { upcomingMoviesFetchResponse } from "../../store/actions/RequestUpcomingMoviesApi";
import { popularMoviesFetchResponse } from "../../store/actions/RequestPopularMoviesApi";
import { nowplayingMoviesFetchResponse } from "../../store/actions/RequestNowPlayingMovies";
import { topratedMoviesFetchResponse } from "../../store/actions/RequestTopratedMoviesApi";
import { latestMovieRequestReq } from "../../store/actions/RequestLatestMovie";
// Tv Requests
import { tvshowsAiringTodayFetchReq } from "../../store/actions/RequestTvshowsAiringTodayApi";
import { topratedTvshowsFetchReq } from "../../store/actions/RequestTopratedTVshowsApi";
import { onTheAirTvshowsRequestReq } from "../../store/actions/RequestOntheairTvShowsRequest";
import { latestTvshowRequestReq } from "../../store/actions/RequestLatestTvshowRequest";
import { popularTvshowsFetchReq } from "../../store/actions/RequestPopularTvShowsApi";
//

// Trending Request
import { trendingThisweekFetchResponse } from "../../store/actions/TrendingItemsThisweekRequest";

import { storesUserSearchValueHandler } from "../../store/actions/searchValueFromNavbarHandler";

import { RootStore } from "../../store/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

import { NavLink } from "react-router-dom";

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

  const latestMovieReqState = useSelector(
    (state: RootStore) => state.requestLatestMovieReducer
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

  // trending This week

  const trendingRequestReqState = useSelector(
    (state: RootStore) => state.trendingThisweekReducer
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
        dispatch(
          latestMovieRequestReq(
            `https://api.themoviedb.org/3/movie/latest?api_key=${configMbdApiState.apiKey}&language=en-US&page=1`
          )
        );
        dispatch(
          trendingThisweekFetchResponse(
            `https://api.themoviedb.org/3/trending/movie/week?api_key=${configMbdApiState.apiKey}&language=en-US&page=1`
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
        dispatch(
          trendingThisweekFetchResponse(
            `https://api.themoviedb.org/3/trending/tv/week?api_key=${configMbdApiState.apiKey}&language=en-US&page=1`
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
      <div className="watchlist-display-section">
        <NavLink className="title-container" to="/watchlist">
          <h2>Here is what is on your watchlist</h2>
          <span id="arrow">
            <FontAwesomeIcon
              icon={faChevronRight}
              className="arrow-watchlist"
            />
          </span>
        </NavLink>
        <SignUpSection />
      </div>
      {userTypeOfSearchState.userSearchType === "tv-shows" && (
        <React.Fragment>
          <div className="tv-shows-carousels-holder">
            <div>
              <div className="main-carousel-title">
                <h2>On the air tonight</h2>
                <p> The perfect next show to watch tonight</p>
              </div>
              <MainCarousel
                items={
                  ontheAirTvShowsReqState.onTheAirTvshowsResults! &&
                  ontheAirTvShowsReqState.onTheAirTvshowsResults!.results
                }
              />
            </div>
            <LatestItemDisplayer
              item={
                latesttvShowReqState.latestTvShowResult! &&
                latesttvShowReqState.latestTvShowResult
              }
            />
            <div>
              <div className="main-carousel-title">
                <h2>Popular shows</h2>
                <p>Selected by our visitors. Get inspired!</p>
              </div>
              <MainCarousel
                items={
                  popularTvShowsReqState.results! &&
                  popularTvShowsReqState.results!.results
                }
              />
            </div>
          </div>
        </React.Fragment>
      )}
      {userTypeOfSearchState.userSearchType === "movies" && (
        <div className="movies-carousels-holder">
          <div>
            <div className="main-carousel-title">
              <h2>Popular movies</h2>
              <p>Selected by our visitors. Get inspired!</p>
            </div>
            <MainCarousel
              items={
                popularMoviesReqState.popularMoviesResponseMbd! &&
                popularMoviesReqState.popularMoviesResponseMbd!.results
              }
            />
          </div>
          <LatestItemDisplayer
            item={
              latestMovieReqState.latestMovieResult! &&
              latestMovieReqState.latestMovieResult
            }
          />
          <div>
            <div className="main-carousel-title">
              <h2>Top rated!</h2>
              <p>What are we watching tonight?</p>
            </div>
            <MainCarousel
              items={
                topRatedReqState.topratedMoviesResponse! &&
                topRatedReqState.topratedMoviesResponse!.results
              }
            />
          </div>
        </div>
      )}
      <div>
        <div className="main-carousel-title">
          <h2>What is trending this week?</h2>
          <p>A weekly list of what is trending in Living Room </p>
        </div>
        <MainCarousel
          items={
            trendingRequestReqState.trendingThisweekResponseMbd! &&
            trendingRequestReqState.trendingThisweekResponseMbd!.results
          }
        />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
