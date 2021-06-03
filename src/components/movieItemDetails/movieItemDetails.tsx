import React, { useEffect } from "react";
import "./movieItemDetails.css";
import { useSelector, useDispatch } from "react-redux";

import MainNavigation from "../mainNavigation/mainNavigation";

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
    // test movie id: 460465
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
      <div className="item-hero-section">
        <div className="gradient"></div>
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
                <FontAwesomeIcon icon={faStar} className="single-star-rating" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
