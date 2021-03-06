import React, { useEffect, useState } from "react";
import "./movieItemDetails.scss";
import { useSelector, useDispatch } from "react-redux";

import MainNavigation from "../mainNavigation/mainNavigation";
import PeopleCarousel from "../PeopleCarousel/peopleCarousel";
import AddToWishlist from "../addToWishList/addToWishList";

import Footer from "../footer/footer";

import { getMovieDetailsResponse } from "../../store/actions/actionsSingleItems/singleMovieItemActions/GetRequestMoviesDetails";
import { getMovieCastResponse } from "../../store/actions/actionsSingleItems/singleMovieItemActions/GetMovieCast";
import { getMovieTrailersResponse } from "../../store/actions/actionsSingleItems/singleMovieItemActions/GetMovieTrailers";
import { storesUserSearchValueHandler } from "../../store/actions/searchValueFromNavbarHandler";
import { fetchItemIdUserIsViewingHandler } from "../../store/actions/fetchItemIdHandler";

import { useHistory, useLocation } from "react-router-dom";

import { RootStore } from "../../store/store";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faLinkedin,
  faInstagram,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import {
  faChevronCircleLeft,
  faShareAlt,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

// error handeling:
import withErrorHanler from "../UI/withErrorHandler/withErrorHandler";

interface MovieDetailsProps {
  itemId: number;
}

const MovieDetails: React.FC = () => {
  // to show sharing icons:
  const [sharing, setSharing] = useState(false);
  // state for the items Id.
  const { state } = useLocation<MovieDetailsProps>();
  const dispatch = useDispatch();
  const history = useHistory();

  // fetches necessary configurations for elements img size etc.
  const mDBConfigState = useSelector(
    (state: RootStore) => state.postApiConfigurationReducer
  );

  // Info Movie Request States

  const getMoviesDetailsState = useSelector(
    (state: RootStore) => state.getMovieDetailsR
  );

  const getMovieCastState = useSelector(
    (state: RootStore) => state.getMovieCastR
  );

  const getTrailerState = useSelector(
    (state: RootStore) => state.getMovieTrailerR
  );

  // sharing icons handler
  const onSharingHandler = () => {
    setSharing((prev) => !prev);
  };

  useEffect(() => {
    // stores and makes the item id globably available:
    dispatch(fetchItemIdUserIsViewingHandler(null, state.itemId));

    dispatch(
      getMovieDetailsResponse(
        `https://api.themoviedb.org/3/movie/${state.itemId}?api_key=${mDBConfigState.apiKey}&language=en-US`
      )
    );
    dispatch(
      getMovieCastResponse(
        `https://api.themoviedb.org/3/movie/${state.itemId}/credits?api_key=${mDBConfigState.apiKey}&language=en-US`
      )
    );
    dispatch(
      getMovieTrailersResponse(
        `https://api.themoviedb.org/3/movie/${state.itemId}/videos?api_key=${mDBConfigState.apiKey}&language=en-US`
      )
    );
    // cleans the search input if user search for a new movie
    dispatch(storesUserSearchValueHandler(""));
  }, [state.itemId, mDBConfigState.apiKey]);

  const gobackToProjectsPage = () => {
    history.goBack();
  };

  return (
    <div
      className="movie-main-container"
      onClick={() => {
        dispatch(storesUserSearchValueHandler(""));
      }}
    >
      <MainNavigation />
      {getMoviesDetailsState.movieDetails! && (
        <React.Fragment>
          <div className="movie-main-container__item-hero-section">
            <div className="share-and-nav-icons">
              <FontAwesomeIcon
                icon={faChevronCircleLeft}
                className="share-and-nav-icons__back-page-icon"
                onClick={() => {
                  if (sharing) {
                    onSharingHandler();
                  }
                  gobackToProjectsPage();
                }}
              />
              <FontAwesomeIcon
                icon={faShareAlt}
                className="share-and-nav-icons__share-icon"
                onClick={onSharingHandler}
              />
            </div>
            <div
              className={
                sharing
                  ? "sharing-icons-holder show-icons"
                  : "sharing-icons-holder"
              }
            >
              <FontAwesomeIcon
                icon={faFacebook}
                className={
                  sharing
                    ? "sharing-icons-holder__facebook sharing-icons-holder__display-icons "
                    : "sharing-icons-holder__facebook"
                }
              />

              <FontAwesomeIcon
                icon={faInstagram}
                className={
                  sharing
                    ? "sharing-icons-holder__instagram sharing-icons-holder__display-icons "
                    : "sharing-icons-holder__instagram"
                }
              />

              <FontAwesomeIcon
                icon={faLinkedin}
                className={
                  sharing
                    ? "sharing-icons-holder__linkedin sharing-icons-holder__display-icons "
                    : "sharing-icons-holder__linkedin"
                }
              />
              <FontAwesomeIcon
                icon={faGithub}
                className={
                  sharing
                    ? "sharing-icons-holder__github sharing-icons-holder__display-icons "
                    : "sharing-icons-holder__github"
                }
              />
            </div>
            <div className="gradient"></div>
            {getMoviesDetailsState.movieDetails.backdrop_path! &&
            getMoviesDetailsState.movieDetails.backdrop_path!.length > 0 ? (
              <img
                className="single-item-image"
                src={`${
                  mDBConfigState.payload?.images &&
                  mDBConfigState.payload.images.secure_base_url
                }${
                  mDBConfigState.payload?.images &&
                  mDBConfigState.payload.images.poster_sizes[6]
                }${getMoviesDetailsState.movieDetails!.backdrop_path}`}
                alt="movie-img"
              />
            ) : (
              <div className="no-poster-available">
                <h2>Not poster available</h2>
              </div>
            )}
            <div className="single-item-details">
              <img
                className="single-item-details__image"
                src={`${
                  mDBConfigState.payload?.images &&
                  mDBConfigState.payload.images.secure_base_url
                }${
                  mDBConfigState.payload?.images &&
                  mDBConfigState.payload.images.poster_sizes[4]
                }${getMoviesDetailsState.movieDetails!.poster_path}`}
                alt="i"
              />
              <div className="single-item-details__description">
                <div className="single-item-title">
                  <h2>{getMoviesDetailsState.movieDetails!.title}</h2>
                  <div className="single-item-rating">
                    <p>{getMoviesDetailsState.movieDetails!.vote_average}</p>
                    <FontAwesomeIcon
                      icon={faStar}
                      className="single-item-rating__star"
                    />
                  </div>
                  <p>
                    {
                      getMoviesDetailsState.movieDetails!.genres.map(
                        (genre) => {
                          return genre.name;
                        }
                      )[0]
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="movie-main-container__single-item-overview">
            <div className="plot-title">
              <h2> Plot Summary</h2>
              <AddToWishlist
                location="details-page"
                itemId={getMoviesDetailsState.movieDetails!.id}
                type={"movie"}
              />
            </div>
            <div className="plot-summary">
              <p>{getMoviesDetailsState.movieDetails!.overview}</p>
            </div>
          </div>
          <div className="movie-main-container__cast-carousel-holder">
            <div className="cast-title-holder">
              <h2>Cast</h2>
            </div>
            {getMovieCastState.movieCast?.cast &&
            getMovieCastState.movieCast!.cast.length > 0 ? (
              <PeopleCarousel items={getMovieCastState.movieCast!.cast} />
            ) : (
              <div className="no-poster-available">
                <h2>Cast not available</h2>
              </div>
            )}
          </div>
        </React.Fragment>
      )}
      {getTrailerState.movieTrailers?.results &&
        getTrailerState.movieTrailers!.results.length > 0 && (
          <div className="trailers-holder">
            <div className="videos-holder">
              {getTrailerState.movieTrailers!.results.map((movie, index) => {
                if (index >= 0 && index < 2) {
                  return (
                    <iframe
                      key={movie.key}
                      title="1"
                      src={`https://www.youtube-nocookie.com/embed/${movie.key}`}
                    ></iframe>
                  );
                }
              })}
            </div>
          </div>
        )}
      <Footer />
    </div>
  );
};

export default withErrorHanler(MovieDetails);
