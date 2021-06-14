import React, { useEffect, useState } from "react";
import "./tvshowDetails.css";
import { useSelector, useDispatch } from "react-redux";

// components
import MainNavigation from "../mainNavigation/mainNavigation";
import PeopleCarousel from "../PeopleCarousel/peopleCarousel";

import Footer from "../footer/footer";

import { useHistory, useLocation } from "react-router-dom";

import { getTvshowsDetailsResponse } from "../../store/actions/actionsSingleItems/singleTvshowActions/GetTvShowDetails";
import { getTvshowsCastResponse } from "../../store/actions/actionsSingleItems/singleTvshowActions/GetTvShowCast";
import { getTvshowsVideosResponse } from "../../store/actions/actionsSingleItems/singleTvshowActions/GetTvShowVideos";
import { storesUserSearchValueHandler } from "../../store/actions/searchValueFromNavbarHandler";

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
  }, [state.itemId]);

  // displays sharing icons upon users requests
  const onSharingHandler = () => {
    setSharing((prev) => !prev);
  };

  const gobackToProjectsPage = () => {
    history.goBack();
  };

  return (
    <div
      className="movie-main-container"
      // helps to clean the search input and close the results div
      onClick={() => {
        dispatch(storesUserSearchValueHandler(""));
      }}
    >
      <MainNavigation />
      {getTvshowDetailsState.tvshowDetails && (
        <React.Fragment>
          <div className="item-hero-section">
            <div className="share-and-nav-icons">
              <FontAwesomeIcon
                icon={faChevronCircleLeft}
                className="back-page-icon"
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
                className="share-icon"
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
                className={sharing ? "facebook display-icons " : "facebook"}
              />

              <FontAwesomeIcon
                icon={faInstagram}
                className={sharing ? "instagram display-icons " : "instagram"}
              />

              <FontAwesomeIcon
                icon={faLinkedin}
                className={sharing ? "linkedin display-icons " : "linkedin"}
              />
              <FontAwesomeIcon
                icon={faGithub}
                className={sharing ? "github display-icons " : "github"}
              />
            </div>
            <div className="gradient"></div>
            {getTvshowDetailsState.tvshowDetails.backdrop_path! === null ? (
              <div className="no-poster-available">
                <h2>Not poster available</h2>
              </div>
            ) : (
              <img
                className="single-item-image"
                src={`${
                  configMbdApiState.payload?.images &&
                  configMbdApiState.payload.images.secure_base_url
                }${
                  configMbdApiState.payload?.images &&
                  configMbdApiState.payload.images.poster_sizes[6]
                }${getTvshowDetailsState.tvshowDetails!.backdrop_path}`}
              />
            )}
            <div className="back-and-share-container"></div>
            <div className="single-item-details">
              <img
                className="single-item-details-image"
                src={`${
                  configMbdApiState.payload?.images &&
                  configMbdApiState.payload.images.secure_base_url
                }${
                  configMbdApiState.payload?.images &&
                  configMbdApiState.payload.images.poster_sizes[4]
                }${getTvshowDetailsState.tvshowDetails!.poster_path}`}
              />
              <div className="single-item-description">
                <div className="single-item-title">
                  <h2>{getTvshowDetailsState.tvshowDetails!.title}</h2>
                  <div className="single-item-rating">
                    <p>{getTvshowDetailsState.tvshowDetails!.vote_average}</p>
                    <FontAwesomeIcon
                      icon={faStar}
                      className="single-star-rating"
                    />
                  </div>
                  <p>
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
          <div className="single-item-overview">
            <div className="plot-title">
              <h2> Plot Summary</h2>
            </div>
            <div className="plot-summary">
              <p>{getTvshowDetailsState.tvshowDetails!.overview}</p>
            </div>
          </div>
          <div className="cast-carousel-holder">
            <div className="cast-title-holder">
              <h2>Cast</h2>
            </div>
            {getTvshowCastState.tvshowCastResponse?.cast &&
            getTvshowCastState.tvshowCastResponse!.cast.length > 0 ? (
              <PeopleCarousel
                items={getTvshowCastState.tvshowCastResponse!.cast}
              />
            ) : (
              <div className="no-poster-available">
                <h2>Cast not available</h2>
              </div>
            )}
          </div>
        </React.Fragment>
      )}
      {getTvshowVideosState.tvShowsVideosResponse?.results &&
        getTvshowVideosState.tvShowsVideosResponse!.results.length > 0 && (
          <div className="trailers-holder">
            <div className="videos-holder">
              {getTvshowVideosState.tvShowsVideosResponse!.results.map(
                (tvShow, index) => {
                  if (index >= 0 && index < 2) {
                    return (
                      <iframe
                        key={tvShow.key}
                        title="1"
                        src={`https://www.youtube.com/embed/${tvShow.key}`}
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

export default TvShowDetails;
