import React, { useEffect } from "react";
import "./actorDetails.css";
import { useSelector, useDispatch } from "react-redux";

import { NavLink } from "react-router-dom";

import { RootStore } from "../../store/store";

import { getActorDetailsResponse } from "../../store/actions/actionsSingleItems/singleActorActions/GetActorDetails";
import { getActorCombinedCreditsResponse } from "../../store/actions/actionsSingleItems/singleActorActions/GetCombinedCreditsReq";

interface ActorMainDetailsProps {
  actorId: number;
}

const ActorMainDetails: React.FC<ActorMainDetailsProps> = (props) => {
  const dispatch = useDispatch();

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
        `https://api.themoviedb.org/3/person/59410?api_key=${configMbdApiState.apiKey}&language=en-US`
      )
    );
    dispatch(
      getActorCombinedCreditsResponse(
        `https://api.themoviedb.org/3/person/59410/combined_credits?api_key=${configMbdApiState.apiKey}&language=en-US`
      )
    );
  }, []);

  return <div></div>;
};

export default ActorMainDetails;
