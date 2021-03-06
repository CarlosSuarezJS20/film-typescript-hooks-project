import React, { useEffect, useState } from "react";
import "./tvshowDetails.scss";
import { useSelector, useDispatch } from "react-redux";

// components
import MainNavigation from "../mainNavigation/mainNavigation";
import PeopleCarousel from "../PeopleCarousel/peopleCarousel";
import AddToWishlist from "../addToWishList/addToWishList";

import Footer from "../footer/footer";

import { useHistory, useLocation } from "react-router-dom";

import { getTvshowsDetailsResponse } from "../../store/actions/actionsSingleItems/singleTvshowActions/GetTvShowDetails";
import { getTvshowsCastResponse } from "../../store/actions/actionsSingleItems/singleTvshowActions/GetTvShowCast";
import { getTvshowsVideosResponse } from "../../store/actions/actionsSingleItems/singleTvshowActions/GetTvShowVideos";
import { storesUserSearchValueHandler } from "../../store/actions/searchValueFromNavbarHandler";

import { fetchItemIdUserIsViewingHandler } from "../../store/actions/fetchItemIdHandler";

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

import withErrorHandler from "../UI/withErrorHandler/withErrorHandler";

interface TvShowDetailsProps {
  itemId: number;
}

const TvShowDetails: React.FC = (props) => {
  const [sharing, setSharing] = useState(false);

  const dispatch = useDispatch();
  const { state } = useLocation<TvShowDetailsProps>();
  const history = useHistory();

  // fetches necessary configurations for elements img size etc.
  const configMbdApiState = useSelector(
    (state: RootStore) => state.postApiConfigurationReducer
  );

  const getTvshowDetailsState = useSelector(
    (state: RootStore) => state.getTvshowDetailsR
  );

  const getTvshowCastState = useSelector(
    (state: RootStore) => state.getTvshowCastR
  );

  const getTvshowVideosState = useSelector(
    (state: RootStore) => state.getTvshowVideosR
  );

  //   test tvshow 100

  useEffect(() => {
    dispatch(
      getTvshowsDetailsResponse(
        `https://api.themoviedb.org/3/tv/${state.itemId}?api_key=${configMbdApiState.apiKey}&language=en-US`
      )
    );
    dispatch(
      getTvshowsCastResponse(
        `https://api.themoviedb.org/3/tv/${state.itemId}/credits?api_key=${configMbdApiState.apiKey}&language=en-US`
      )
    );
    dispatch(
      getTvshowsVideosResponse(
        `https://api.themoviedb.org/3/tv/${state.itemId}/videos?api_key=${configMbdApiState.apiKey}&language=en-US`
      )
    );

    dispatch(fetchItemIdUserIsViewingHandler(null, state.itemId));
  }, [state.itemId, dispatch, configMbdApiState.apiKey]);

  // displays sharing icons upon users requests
  const onSharingHandler = () => {
    setSharing((prev) => !prev);
  };

  const gobackToProjectsPage = () => {
    history.goBack();
  };

  return (
    <div
      className="tv-show-main-container"
      // helps to clean the search input and close the results div
      onClick={() => {
        dispatch(storesUserSearchValueHandler(""));
      }}
    >
      <MainNavigation />
      {getTvshowDetailsState.tvshowDetails && (
        <React.Fragment>
          <div className="tv-show-main-container__tv-show-hero-section">
            <div className="tv-show-share-and-nav-icons">
              <FontAwesomeIcon
                icon={faChevronCircleLeft}
                className="tv-show-share-and-nav-icons__tv-show-back-page-icon"
                onClick={() => {
                  // closes the sharing icon holders if user leaves the page and the sharing icon container is open
                  if (sharing) {
                    onSharingHandler();
                  }
                  gobackToProjectsPage();
                }}
              />
              <FontAwesomeIcon
                icon={faShareAlt}
                className="tv-show-share-and-nav-icons__tv-show-share-icon"
                onClick={onSharingHandler}
              />
            </div>
            <div
              className={
                sharing
                  ? "tv-show-sharing-icons-holder tv-shows-show-icons"
                  : "tv-show-sharing-icons-holder"
              }
            >
              <FontAwesomeIcon
                icon={faFacebook}
                className={
                  sharing
                    ? "tv-show-sharing-icons-holder__tv-show-facebook tv-show-sharing-icons-holder__tv-show-display-icons "
                    : "tv-show-sharing-icons-holder__tv-show-facebook"
                }
              />

              <FontAwesomeIcon
                icon={faInstagram}
                className={
                  sharing
                    ? "tv-show-sharing-icons-holder__tv-show-instagram tv-show-sharing-icons-holder__tv-show-display-icons "
                    : "tv-show-sharing-icons-holder__tv-show-instagram"
                }
              />

              <FontAwesomeIcon
                icon={faLinkedin}
                className={
                  sharing
                    ? "tv-show-sharing-icons-holder__tv-show-linkedin tv-show-sharing-icons-holder__tv-show-display-icons "
                    : "tv-show-sharing-icons-holder__tv-show-linkedin"
                }
              />
              <FontAwesomeIcon
                icon={faGithub}
                className={
                  sharing
                    ? "tv-show-sharing-icons-holder__tv-show-github tv-show-sharing-icons-holder__tv-show-display-icons "
                    : "tv-show-sharing-icons-holder__tv-show-github"
                }
              />
            </div>
            <div className="tv-show-gradient"></div>

            {getTvshowDetailsState.tvshowDetails.backdrop_path! === null ? (
              <div className="tv-show-no-poster-available">
                <h2>Not poster available</h2>
              </div>
            ) : (
              <img
                className="tv-show-single-item-image"
                src={`${
                  configMbdApiState.payload?.images &&
                  configMbdApiState.payload.images.secure_base_url
                }${
                  configMbdApiState.payload?.images &&
                  configMbdApiState.payload.images.poster_sizes[6]
                }${getTvshowDetailsState.tvshowDetails!.backdrop_path}`}
                alt="tv-show-img"
              />
            )}
            <div className="tv-show-single-item-details">
              <img
                className="tv-show-single-item-details__tv-show-single-item-details-image"
                src={`${
                  configMbdApiState.payload?.images &&
                  configMbdApiState.payload.images.secure_base_url
                }${
                  configMbdApiState.payload?.images &&
                  configMbdApiState.payload.images.poster_sizes[4]
                }${getTvshowDetailsState.tvshowDetails!.poster_path}`}
                alt="tv-show-img"
              />
              <div className="tv-show-single-item-details__tv-show-single-item-description">
                <div className="tv-show-single-item-title">
                  <h2>{getTvshowDetailsState.tvshowDetails!.name}</h2>
                  <div className="tv-show-single-item-title__tv-show-single-item-rating">
                    <p className="details">
                      {getTvshowDetailsState.tvshowDetails!.vote_average}
                    </p>
                    <FontAwesomeIcon
                      icon={faStar}
                      className="tv-show-single-star-rating"
                    />
                  </div>
                  <p className="tv-show-single-item-title__genrer">
                    {
                      getTvshowDetailsState.tvshowDetails!.genres.map(
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
          <div className="tv-show-main-container__tv-show-single-item-overview">
            <div className="tv-show-plot-title">
              <h2> Plot Summary</h2>
              <AddToWishlist
                location="details-page"
                itemId={getTvshowDetailsState.tvshowDetails!.id}
                type={"tv-show"}
              />
            </div>
            <div className="tv-show-plot-summary">
              <p>{getTvshowDetailsState.tvshowDetails!.overview}</p>
            </div>
          </div>
          <div className="tv-show-main-container__tv-show-cast-carousel-holder">
            <div className="tv-show-cast-title-holder">
              <h2>Cast</h2>
            </div>
            {getTvshowCastState.tvshowCastResponse?.cast &&
            getTvshowCastState.tvshowCastResponse!.cast.length > 0 ? (
              <PeopleCarousel
                items={getTvshowCastState.tvshowCastResponse!.cast}
              />
            ) : (
              <div className="tv-show-no-poster-available">
                <h2>Cast not available</h2>
              </div>
            )}
          </div>
        </React.Fragment>
      )}
      {getTvshowVideosState.tvShowsVideosResponse?.results &&
        getTvshowVideosState.tvShowsVideosResponse!.results.length > 0 && (
          <div className="tv-show-main-container__tv-show-trailers-holder">
            <div className="tv-show-videos-holder">
              {getTvshowVideosState.tvShowsVideosResponse!.results.map(
                (tvShow, index) => {
                  if (index >= 0 && index < 2) {
                    return (
                      <iframe
                        key={tvShow.key}
                        title="1"
                        src={`https://www.youtube-nocookie.com/embed/${tvShow.key}`}
                      ></iframe>
                    );
                  }
                }
              )}
            </div>
          </div>
        )}
      <Footer />
    </div>
  );
};

export default withErrorHandler(TvShowDetails);
