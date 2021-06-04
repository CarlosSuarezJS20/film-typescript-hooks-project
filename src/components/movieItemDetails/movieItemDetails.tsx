import React, { useEffect } from "react";
import "./movieItemDetails.css";
import { useSelector, useDispatch } from "react-redux";

import MainNavigation from "../mainNavigation/mainNavigation";
import PeopleCarousel from "../PeopleCarousel/peopleCarousel";
import Footer from "../footer/footer";

import { NavLink } from "react-router-dom";

import { getMovieDetailsResponse } from "../../store/actions/actionsSingleItems/singleMovieItemActions/GetRequestMoviesDetails";
import { getMovieCastResponse } from "../../store/actions/actionsSingleItems/singleMovieItemActions/GetMovieCast";
import { getMovieTrailersResponse } from "../../store/actions/actionsSingleItems/singleMovieItemActions/GetMovieTrailers";

import { useHistory, useLocation } from "react-router-dom";

import { RootStore } from "../../store/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

interface MovieDetails {
  itemId: number;
}

const MovieDetails: React.FC = () => {
  // state for the items Id.
  const { state } = useLocation<MovieDetails>();
  const dispatch = useDispatch();

  // fetches necessary configurations for elements img size etc.
  const mDBConfigState = useSelector(
    (state: RootStore) => state.postApiConfigurationReducer
  );

  // For genres Function
  const genresMoviesState = useSelector(
    (state: RootStore) => state.postMoviesGenresReducer
  );
  const typeOfSearchState = useSelector(
    (state: RootStore) => state.userSearchTypeR
  );

  // Info Movie Request States

  const getMoviesDetailsState = useSelector(
    (state: RootStore) => state.getMovieDetailsR
  );

  const getMovieCastState = useSelector(
    (state: RootStore) => state.getMovieCastR
  );

  const getMovieTrailersState = useSelector(
    (state: RootStore) => state.getMovieTrailerR
  );

  useEffect(() => {
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
  }, [state.itemId]);

  return (
    <div className="movie-main-container">
      <MainNavigation />
      {getMoviesDetailsState.movieDetails! && (
        <React.Fragment>
          <div className="item-hero-section">
            <div className="gradient"></div>
            {}
            <img
              className="single-item-image"
              src={`${
                mDBConfigState.payload?.images &&
                mDBConfigState.payload.images.secure_base_url
              }${
                mDBConfigState.payload?.images &&
                mDBConfigState.payload.images.poster_sizes[6]
              }${getMoviesDetailsState.movieDetails!.backdrop_path}`}
            />
            <div className="back-and-share-container"></div>
            <div className="single-item-details">
              <img
                className="single-item-details-image"
                src={`${
                  mDBConfigState.payload?.images &&
                  mDBConfigState.payload.images.secure_base_url
                }${
                  mDBConfigState.payload?.images &&
                  mDBConfigState.payload.images.poster_sizes[4]
                }${getMoviesDetailsState.movieDetails!.poster_path}`}
              />
              <div className="single-item-description">
                <div className="single-item-title">
                  <h2>{getMoviesDetailsState.movieDetails!.title}</h2>
                  <div className="single-item-rating">
                    <p>{getMoviesDetailsState.movieDetails!.vote_average}</p>
                    <FontAwesomeIcon
                      icon={faStar}
                      className="single-star-rating"
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
          <div className="single-item-overview">
            <div className="plot-title">
              <h2> Plot Summary</h2>
            </div>
            <div className="plot-summary">
              <p>{getMoviesDetailsState.movieDetails!.overview}</p>
            </div>
          </div>
        </React.Fragment>
      )}
      <div className="cast-carousel-holder">
        <div className="cast-title-holder">
          <h2>Cast</h2>
        </div>
        {getMovieCastState.movieCast!.cast.length > 1 && (
          <PeopleCarousel items={getMovieCastState.movieCast!.cast} />
        )}
      </div>

      <Footer />
    </div>
  );
};

export default MovieDetails;
