//GENERAL CONFIG AND HOME PAGE REQUESTS ACTION TYPE

export const POST_API_MBD_CONFIGURATION_SUCCESS =
  "POST_API_MBD_CONFIGURATION_SUCCESS";
export const POST_API_MBD_LOADING = "POST_API_MBD_LOADING ";
export const POST_API_MBD_FAIL = "POST_API_MBD_FAIL";

// Using a Global Interfaces and Types that will work across all Async actions

export interface ApiConfigurationFail {
  type: typeof POST_API_MBD_FAIL;
  error: string;
}

export interface PostApiMbdLoading {
  type: typeof POST_API_MBD_LOADING;
}

export type requestFunction = (url: string) => void;

// GLOBAL CONFIGURATION REQUEST FOR DISPLAYING ITEMS

export type payloadResponse = {
  images: {
    base_url: string;
    secure_base_url: string;
    backdrop_sizes: string[];
    logo_sizes: string[];
    poster_sizes: string[];
    profile_sizes: string[];
    still_sizes: string[];
    change_keys: string[];
  };
};

export interface ApiConfigurationSuccess {
  type: typeof POST_API_MBD_CONFIGURATION_SUCCESS;
  payload: payloadResponse;
}

export type PostApiMbdConfigurationDispatchTypes =
  | ApiConfigurationSuccess
  | ApiConfigurationFail
  | PostApiMbdLoading;

// Movies Genres request Actions and Types for Reducer

export const POST_GENRES_MOVIES_FETCH_FROM_MBD_API_SUCCESS =
  "POST_GENRES_MOVIES_FETCH_FROM_MBD_API_SUCCESS";

type genre = {
  id: number;
  name: string;
};

export type genresApiResponse = {
  genres: genre[];
};

export interface ApiGenresRequestSuccess {
  type: typeof POST_GENRES_MOVIES_FETCH_FROM_MBD_API_SUCCESS;
  genres: genresApiResponse;
}

export type PostMoviesGenresFetchDispatchTypes =
  | ApiGenresRequestSuccess
  | ApiConfigurationFail
  | PostApiMbdLoading;

// Upcoming movies request Actions and Types for Reducer

export const REQUEST_UPCOMING_MOVIES_FETCH_FROM_MBD_API_SUCCESS =
  "REQUEST_UPCOMING_MOVIES_FETCH_FROM_MBD_API_SUCCESS";

type results = {
  poster_path: string;
  overview: string;
  genre_ids: number[];
  original_title: string;
  id: number;
  title: string;
  vote_average: number;
};

type requestUpcomingMoviesResults = {
  page: number;
  results: results[];
};

export type requestUpcomingMoviesResponse = {
  genres: requestUpcomingMoviesResults[];
};

export interface UpcomingMoviesRequestSuccess {
  type: typeof REQUEST_UPCOMING_MOVIES_FETCH_FROM_MBD_API_SUCCESS;
  upcomingMoviesResponse: requestUpcomingMoviesResponse;
}

export type UpcomingResquestMbdApiDispatchTypes =
  | UpcomingMoviesRequestSuccess
  | ApiConfigurationFail
  | PostApiMbdLoading;

// Popular movies request Actions and Types for Reducer

export const REQUEST_POPULAR_MOVIES_FETCH_FROM_MBD_API_SUCCESS =
  "REQUEST_POPULAR_MOVIES_FETCH_FROM_MBD_API_SUCCESS";

type popularMoviesResults = {
  poster_path: string;
  overview: string;
  genre_ids: number[];
  original_title: string;
  id: number;
  title: string;
  vote_average: number;
};

type requestPopularMoviesResults = {
  page: number;
  results: popularMoviesResults[];
};

export type requestPopularMoviesResponse = {
  genres: requestPopularMoviesResults[];
};

export interface PopularMoviesRequestSuccess {
  type: typeof REQUEST_POPULAR_MOVIES_FETCH_FROM_MBD_API_SUCCESS;
  popularMoviesResponse: requestPopularMoviesResponse;
}

export type popularMoviesResquestMbdApiDispatchTypes =
  | PopularMoviesRequestSuccess
  | ApiConfigurationFail
  | PostApiMbdLoading;

// NowPlaying movies request Actions and Types for Reducer

export const REQUEST_NOWPLAYING_MOVIES_FETCH_FROM_MBD_API_SUCCESS =
  "REQUEST_NOWPLAYING_MOVIES_FETCH_FROM_MBD_API_SUCCESS";

type nowPlayingMoviesResults = {
  poster_path: string;
  overview: string;
  genre_ids: number[];
  original_title: string;
  id: number;
  title: string;
  vote_average: number;
};

export type requestNowPlayingMoviesResponse = {
  page: number;
  results: nowPlayingMoviesResults[];
};

export interface NowPlayingMoviesRequestSuccess {
  type: typeof REQUEST_NOWPLAYING_MOVIES_FETCH_FROM_MBD_API_SUCCESS;
  nowPlayingMoviesResponse: requestNowPlayingMoviesResponse;
}

export type nowPlayingMoviesResquestMbdApiDispatchTypes =
  | NowPlayingMoviesRequestSuccess
  | ApiConfigurationFail
  | PostApiMbdLoading;

// TopRated movies request Actions and Types for Reducer

export const REQUEST_TOPRATED_MOVIES_FETCH_FROM_MBD_API_SUCCESS =
  "REQUEST_TOPRATED_MOVIES_FETCH_FROM_MBD_API_SUCCESS";

type topRatedMoviesResults = {
  poster_path: string;
  overview: string;
  genre_ids: number[];
  original_title: string;
  id: number;
  title: string;
  vote_average: number;
};

export type requestTopRatedMoviesResponse = {
  page: number;
  results: topRatedMoviesResults[];
};

export interface TopRatedMoviesRequestSuccess {
  type: typeof REQUEST_TOPRATED_MOVIES_FETCH_FROM_MBD_API_SUCCESS;
  topratedMoviesResponse: requestTopRatedMoviesResponse;
}

export type TopRatedMoviesResquestMbdApiDispatchTypes =
  | TopRatedMoviesRequestSuccess
  | ApiConfigurationFail
  | PostApiMbdLoading;

// ACTION TYPES FOR HOME PAGE TV SHOWS

// Tvshows Genres request Actions and Types for Reducer

export const POST_GENRES_TV_FETCH_FROM_MBD_API_SUCCESS =
  "POST_GENRES_TV_FETCH_FROM_MBD_API_SUCCESS";

type genreTv = {
  id: number;
  name: string;
};

export type genresTvApiResponse = {
  page: number;
  genres: genreTv[];
};

export interface ApiTvGenresRequestSuccess {
  type: typeof POST_GENRES_TV_FETCH_FROM_MBD_API_SUCCESS;
  tvGenres: genresTvApiResponse;
}

export type PostTvGenresFetchDispatchTypes =
  | ApiTvGenresRequestSuccess
  | ApiConfigurationFail
  | PostApiMbdLoading;

// TV shows Airing Tonight

export const REQUEST_TV_SHOWS_AIRING_TODAY_FETCH_FROM_MBD_API_SUCCESS =
  "REQUEST_TV_SHOWS_AIRING_TODAY_FETCH_FROM_MBD_API_SUCCESS";

type tvShowAiringTodayResponse = {
  poster_path: string | null;
  id: number;
  backdrop_path: string | null;
  total_results: number;
  total_pages: number;
  origin_country: string[];
  vote_avarega: number;
};

export type tvShowsAiringTodayApiResponse = {
  page: number;
  results: tvShowAiringTodayResponse[];
};

export interface TvShowsAiringTodayRequestSuccess {
  type: typeof REQUEST_TV_SHOWS_AIRING_TODAY_FETCH_FROM_MBD_API_SUCCESS;
  tvAiringTodayResponse: tvShowsAiringTodayApiResponse;
}

export type tvShowsAiringTodayFetchDispatchTypes =
  | TvShowsAiringTodayRequestSuccess
  | ApiConfigurationFail
  | PostApiMbdLoading;

// Toprated TVshows Request actions

export const REQUEST_TOPRATED_TVSHOWS_FETCH_FROM_MBD_API_SUCCESS =
  "REQUEST_TOPRATED_TVSHOWS_FETCH_FROM_MBD_API_SUCCESS";

type topRatedTvShowResponse = {
  poster_path: string | null;
  id: number;
  backdrop_path: string | null;
  total_results: number;
  total_pages: number;
  origin_country: string[];
  vote_avarega: number;
};

export type topratedTvshowsApiResponse = {
  page: number;
  topTvshowsResponse: topRatedTvShowResponse[];
};

export interface TopratedTvshowRequestSuccess {
  type: typeof REQUEST_TOPRATED_TVSHOWS_FETCH_FROM_MBD_API_SUCCESS;
  topratedTvShowsResponse: topratedTvshowsApiResponse;
}

export type topratedTvShowsFetchDispatchTypes =
  | TopratedTvshowRequestSuccess
  | ApiConfigurationFail
  | PostApiMbdLoading;

// Popular Request actions

export const REQUEST_POPULAR_TVSHOWS_FETCH_FROM_MBD_API_SUCCESS =
  "REQUEST_POPULAR_TVSHOWS_FETCH_FROM_MBD_API_SUCCESS";

type popularTvShowResponse = {
  poster_path: string | null;
  id: number;
  backdrop_path: string | null;
  total_results: number;
  total_pages: number;
  origin_country: string[];
  vote_avarega: number;
};

export type popularTvShowApiResponse = {
  page: number;
  popularTvResponse: popularTvShowResponse[];
};

export interface popularTvShowRequestSuccess {
  type: typeof REQUEST_POPULAR_TVSHOWS_FETCH_FROM_MBD_API_SUCCESS;
  popularTvShowsResponse: popularTvShowApiResponse;
}

export type popularTvShowFetchDispatchTypes =
  | popularTvShowRequestSuccess
  | ApiConfigurationFail
  | PostApiMbdLoading;

// Handles the type or search to generate content for HOME page

export const SET_SEARCH_TYPE_WELCOME_PAGE = "SET_SEARCH_TYPE_WELCOME_PAGE";

export interface typeOfSearch {
  type: typeof SET_SEARCH_TYPE_WELCOME_PAGE;
  searchType: string;
}

export type searchTypeHandlerFunction = (searchType: string) => void;

export type userSearchType = typeOfSearch;

// SEACH VALUE FROM NAV INPUT HANDLER

export const SEARCH_VALUE_HANDLER = "SET_SEARCH_VALUE_HANDLER";

export interface searchValueHandler {
  type: typeof SEARCH_VALUE_HANDLER;
  searchValue: string;
}

export type searchValueFromInputHandlerFunction = (searchType: string) => void;

export type searchValueFromInputHandlerType = searchValueHandler;

//SEARCH REQUEST FOR MULTI SEARCH on NavBar Search filed

export const SEARCH_REQUEST_RESPONSE_ACTION = "SEARCH_REQUEST_RESPONSE_ACTION";

export type searchResponse = {
  poster_path: string;
  backdrop_path: string | null;
  media_type: string;
  adult: boolean;
  overview: string;
  genre_ids: number[];
  release_date: string;
  id: number;
  title: string;
  name: string;
  first_air_date: string;
  vote_average: number;
};

export type searchResponses = {
  page: number;
  results: searchResponse[];
};

export interface SearchResponsesSuccess {
  type: typeof SEARCH_REQUEST_RESPONSE_ACTION;
  searchResults: searchResponses;
}

export type SearchResponsesDispatchTypes =
  | SearchResponsesSuccess
  | ApiConfigurationFail
  | PostApiMbdLoading;
