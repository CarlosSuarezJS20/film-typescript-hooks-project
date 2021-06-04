export const GET_MOVIE_DETAILS_SUCCESS = "GET_MOVIE_DETAILS_SUCCESS";
export const GET_REQUEST_LOADING = "GET_REQUEST_LOADING ";
export const GET_REQUEST_FAIL = "GET_REQUEST_FAIL";

// Using a Global Interfaces and Types that will work across all Async actions

export interface GetRequestFail {
  type: typeof GET_REQUEST_FAIL;
  error: string;
}

export interface GetRequestLoading {
  type: typeof GET_REQUEST_LOADING;
}

export type getRequestFunction = (url: string) => void;

// GET MOVIES DETAILS

export type getDetailsRequestResponse = {
  id: number;
  poster_path: string | null;
  backdrop_path: string | null;
  title: string;
  overview: string | null;
  vote_average: number;
  genres: { id: number; name: string }[];
  original_language: string;
  status: string;
};

export interface GetMovieDetailsRequestSuccess {
  type: typeof GET_MOVIE_DETAILS_SUCCESS;
  getMovieDetailsResponse: getDetailsRequestResponse;
}

export type getDetailsRequestDispatchTypes =
  | GetMovieDetailsRequestSuccess
  | GetRequestFail
  | GetRequestLoading;

// GETMOVIE CAST REQUEST TYPES

export const GET_MOVIE_CAST_SUCCESS = "GET_MOVIE_CAST_SUCCESS";

type details = {
  id: number;
  name: string;
  profile_path: string | null;
  popularity: number;
  character?: string;
  credit_id: string;
  job?: string;
};

export type getAllCastRequestResponse = {
  id: number;
  cast: details[];
  crew: details[];
};

export interface GetMovieCastRequestSuccess {
  type: typeof GET_MOVIE_CAST_SUCCESS;
  getAllCastResponse: getAllCastRequestResponse;
}

export type getMovieCastRequestDispatchTypes =
  | GetMovieCastRequestSuccess
  | GetRequestFail
  | GetRequestLoading;

// GET_MOVIE_TRAILERS REQUEST TYPES

export const GET_MOVIE_TRAILERS_SUCCESS = "GET_MOVIE_TRAILERS_SUCCESS";

type videos = {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  site: string;
  size: number;
  type: string;
};

export type getMovieTrailersRequestResponse = {
  id: number;
  cast: videos[];
};

export interface GetMovieTrailersRequestSuccess {
  type: typeof GET_MOVIE_TRAILERS_SUCCESS;
  getMoviesResponse: getMovieTrailersRequestResponse;
}

export type getMovieTrailersRequestDispatchTypes =
  | GetMovieTrailersRequestSuccess
  | GetRequestFail
  | GetRequestLoading;
