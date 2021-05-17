import React, { useEffect } from "react";
import "./movieItemDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { getMovieDetailsResponse } from "../../store/actions/actionsSingleItems/singleMovieItemActions/GetRequestMoviesDetails";
import { getMovieCastResponse } from "../../store/actions/actionsSingleItems/singleMovieItemActions/GetMovieCast";
import { getMovieTrailersResponse } from "../../store/actions/actionsSingleItems/singleMovieItemActions/GetMovieTrailers";

import { RootStore } from "../../store/store";

interface MovieDetails {
  id: number;
}

const MovieDetails: React.FC<MovieDetails> = (props) => {
  const dispatch = useDispatch();

  // fetches necessary configurations for elements img size etc.
  const configMbdApiState = useSelector(
    (state: RootStore) => state.postApiConfigurationReducer
  );

  useEffect(() => {
    console.log("movieDetailsMounthed");
    dispatch(
      getMovieDetailsResponse(
        `https://api.themoviedb.org/3/movie/460465?api_key=${configMbdApiState.apiKey}&language=en-US`
      )
    );
    // test movie id: 460465
    dispatch(
      getMovieCastResponse(
        `https://api.themoviedb.org/3/movie/460465/credits?api_key=${configMbdApiState.apiKey}&language=en-US`
      )
    );
    dispatch(
      getMovieTrailersResponse(
        `https://api.themoviedb.org/3/movie/460465/videos?api_key=${configMbdApiState.apiKey}&language=en-US`
      )
    );
  }, []);

  return <div></div>;
};

export default MovieDetails;
