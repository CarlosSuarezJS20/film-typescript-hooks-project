export const GET_TVSHOW_DETAILS_SUCCESS = "GET_TVSHOW_DETAILS_SUCCESS";
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

// GET TV SHOWS DETAILS RESPONSE TYPES

export type getTvshowDetailsRequestResponse = {
  id: number;
  poster_path: string | null;
  backdrop_path: string | null;
  title?: string;
  name?: string;
  overview: string | null;
  vote_average: number;
  genres: { id: number; name: string }[];
  original_language: string;
  status: string;
};

export interface getTvshowDetailsRequestSuccess {
  type: typeof GET_TVSHOW_DETAILS_SUCCESS;
  getTvshowDetailsResponse: getTvshowDetailsRequestResponse;
}

export type getTvshowDetailsRequestDispatchTypes =
  | getTvshowDetailsRequestSuccess
  | GetRequestFail
  | GetRequestLoading;

// GET TV SHOWS CAST RESPONSE TYPES

export const GET_TVSHOW_CAST_SUCCESS = "GET_TVSHOW_CAST_SUCCESS";

type actor = {
  id: number;
  name: string;
  profile_path: string | null;
  popularity: number;
  character: string;
  credit_id: string;
};

export type getTvshowCastRequestResponse = {
  id: number;
  cast: actor[];
};

export interface getTvshowCastRequestSuccess {
  type: typeof GET_TVSHOW_CAST_SUCCESS;
  getTvshowCastResponse: getTvshowCastRequestResponse;
}

export type getTvshowCastDispatchTypes =
  | getTvshowCastRequestSuccess
  | GetRequestFail
  | GetRequestLoading;

// GET_TVSHOW_VIDEOS REQUEST TYPES

export const GET_TVSHOWS_VIDEOS_SUCCESS = "GET_TVSHOWS_VIDEOS_SUCCESS";

type video = {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  site: string;
  size: number;
  type: string;
};

export type getTvshowsVideosRequestResponse = {
  id: number;
  results: video[];
};

export interface GetTvshowsVideosRequestSuccess {
  type: typeof GET_TVSHOWS_VIDEOS_SUCCESS;
  getTvshowsVideosResponse: getTvshowsVideosRequestResponse;
}

export type getTvshowsVideosRequestDispatchTypes =
  | GetTvshowsVideosRequestSuccess
  | GetRequestFail
  | GetRequestLoading;
