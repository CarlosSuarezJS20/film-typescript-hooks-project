import React, { useEffect } from "react";
import "./tvshowDetails.css";
import { useSelector, useDispatch } from "react-redux";

import { NavLink } from "react-router-dom";

import { getTvshowsDetailsResponse } from "../../store/actions/actionsSingleItems/singleTvshowActions/GetTvShowDetails";
import { getTvshowsCastResponse } from "../../store/actions/actionsSingleItems/singleTvshowActions/GetTvShowCast";
import { getTvshowsVideosResponse } from "../../store/actions/actionsSingleItems/singleTvshowActions/GetTvShowVideos";

import { RootStore } from "../../store/store";

interface TvShowDetailsProps {
  id: number;
}

const TvShowDetails: React.FC<TvShowDetailsProps> = (props) => {
  const dispatch = useDispatch();

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

  const getTvshowState = useSelector(
    (state: RootStore) => state.getTvshowVideosR
  );

  //   test tvshow 100

  useEffect(() => {
    dispatch(
      getTvshowsDetailsResponse(
        `https://api.themoviedb.org/3/tv/100?api_key=${configMbdApiState.apiKey}&language=en-US`
      )
    );
    dispatch(
      getTvshowsCastResponse(
        `https://api.themoviedb.org/3/tv/100/credits?api_key=${configMbdApiState.apiKey}&language=en-US`
      )
    );
    dispatch(
      getTvshowsVideosResponse(
        `https://api.themoviedb.org/3/tv/100/videos?api_key=${configMbdApiState.apiKey}&language=en-US`
      )
    );
  }, []);

  return (
    <div>
      <h1>Tv SHOW</h1>
    </div>
  );
};

export default TvShowDetails;
