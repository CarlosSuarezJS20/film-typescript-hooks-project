import React, { useEffect } from "react";
import "./actorDetails.css";

import Navbar from "../mainNavigation/mainNavigation";
import Footer from "../footer/footer";

import { useSelector, useDispatch } from "react-redux";

import { useHistory, useLocation } from "react-router-dom";

import { NavLink } from "react-router-dom";

import { RootStore } from "../../store/store";

import { getActorDetailsResponse } from "../../store/actions/actionsSingleItems/singleActorActions/GetActorDetails";
import { getActorCombinedCreditsResponse } from "../../store/actions/actionsSingleItems/singleActorActions/GetCombinedCreditsReq";
import { storesUserSearchValueHandler } from "../../store/actions/searchValueFromNavbarHandler";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

import withErrorHandler from "../UI/withErrorHandler/withErrorHandler";

interface ActorMainDetailsProps {
  actorId: number;
}

const ActorMainDetails: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { state } = useLocation<ActorMainDetailsProps>();

  // fetches necessary configurations for elements img size etc.
  const configMbdApiState = useSelector(
    (state: RootStore) => state.postApiConfigurationReducer
  );

  const actorDetailReqState = useSelector(
    (state: RootStore) => state.getActorDetailsR
  );

  const actorCombinedCreditsReqState = useSelector(
    (state: RootStore) => state.getActorCombinedCreditsR
  );

  useEffect(() => {
    dispatch(
      getActorDetailsResponse(
        `https://api.themoviedb.org/3/person/${state.actorId}?api_key=${configMbdApiState.apiKey}&language=en-US`
      )
    );
    dispatch(
      getActorCombinedCreditsResponse(
        `https://api.themoviedb.org/3/person/${state.actorId}/combined_credits?api_key=${configMbdApiState.apiKey}&language=en-US`
      )
    );
  }, [state.actorId, configMbdApiState.apiKey, dispatch]);

  const gobackToPreviousPage = () => {
    history.goBack();
  };

  return (
    <div
      className="actor-page"
      onClick={() => {
        dispatch(storesUserSearchValueHandler(""));
      }}
    >
      <Navbar />
      <div className="back-page-section">
        <div>
          <p onClick={gobackToPreviousPage}>
            <span>
              <FontAwesomeIcon icon={faChevronLeft} />
            </span>
            back
          </p>
        </div>
      </div>
      <div className="actor-details-main">
        {actorDetailReqState.actorDetails &&
          actorCombinedCreditsReqState.combinedCredits && (
            <header className="actor-header">
              <div className="details-holder">
                <div className="actor-details-holder">
                  <img
                    src={`${
                      configMbdApiState.payload?.images &&
                      configMbdApiState.payload.images.secure_base_url
                    }${
                      configMbdApiState.payload?.images &&
                      configMbdApiState.payload.images.poster_sizes[4]
                    }${actorDetailReqState.actorDetails.profile_path}`}
                    alt="actor-img"
                  />
                  <div className="name-holder">
                    <h2>{actorDetailReqState.actorDetails.name}</h2>
                  </div>
                </div>
                <div className="actor-latest-movie-holder">
                  {actorCombinedCreditsReqState.combinedCredits.cast.map(
                    (credit, index) => {
                      if (index === 0) {
                        return (
                          <img
                            key={`${index}-${credit.id}`}
                            src={`${
                              configMbdApiState.payload?.images &&
                              configMbdApiState.payload.images.secure_base_url
                            }${
                              configMbdApiState.payload?.images &&
                              configMbdApiState.payload.images.poster_sizes[4]
                            }${credit.backdrop_path}`}
                            alt="actor-img"
                          />
                        );
                      }
                    }
                  )}
                </div>
              </div>
              <div className="bio-section">
                <p>{actorDetailReqState.actorDetails.biography}</p>
                <p className="actor-birth-details">
                  Born:
                  <span className="date-and-place">{`${actorDetailReqState.actorDetails.birthday} in ${actorDetailReqState.actorDetails.place_of_birth}`}</span>
                </p>
              </div>
            </header>
          )}
        {actorCombinedCreditsReqState.combinedCredits && (
          <div className="credits-list">
            {actorCombinedCreditsReqState.combinedCredits.cast.map(
              (credit, index) => {
                if (
                  credit.poster_path === null ||
                  credit.title === "" ||
                  credit.release_date === ""
                ) {
                  return;
                } else {
                  return (
                    <NavLink
                      key={`${index}`}
                      to={{
                        pathname:
                          credit.media_type === "movie"
                            ? `/details/movie/${credit.title}`
                            : `/details/tv/${credit.title}`,
                        state: { itemId: credit.id },
                      }}
                    >
                      <div className="credit-item">
                        <div className="credit-image">
                          <img
                            src={`${
                              configMbdApiState.payload?.images &&
                              configMbdApiState.payload.images.secure_base_url
                            }${
                              configMbdApiState.payload?.images &&
                              configMbdApiState.payload.images.poster_sizes[4]
                            }${credit.poster_path}`}
                            alt="credit-img"
                          />
                        </div>
                        <div>
                          <h3>{credit.title}</h3>
                        </div>
                        <div>
                          <p>{credit.release_date}</p>
                        </div>
                      </div>
                    </NavLink>
                  );
                }
              }
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default withErrorHandler(ActorMainDetails);
