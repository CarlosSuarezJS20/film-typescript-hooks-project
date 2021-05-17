import React, { useEffect } from "react";
import "./tvshowDetails.css";
import { useSelector, useDispatch } from "react-redux";

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

  //   test tvshow 100

  useEffect(() => {
    console.log("TSDetails Mounth");
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

  return <div></div>;
};

export default TvShowDetails;
