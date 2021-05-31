import {
  getMovieTrailersRequestResponse,
  getMovieTrailersRequestDispatchTypes,
  GET_MOVIE_DETAILS_SUCCESS,
  GET_REQUEST_FAIL,
  GET_REQUEST_LOADING,
  GET_MOVIE_TRAILERS_SUCCESS,
} from "../../../actions/actionsSingleItems/singleMovieItemActions/singleMovieItemActionsTypes";

interface DefaultStateInt {
  movieTrailers?: getMovieTrailersRequestResponse;
  loading: boolean;
  error?: string;
}

const initialState = {
  loading: false,
};

const getMovieTrailersReducer = (
  state: DefaultStateInt = initialState,
  action: getMovieTrailersRequestDispatchTypes
): DefaultStateInt => {
  switch (action.type) {
    case GET_REQUEST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case GET_REQUEST_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_MOVIE_TRAILERS_SUCCESS:
      return {
        ...state,
        loading: false,
        movieTrailers: action.getMoviesResponse,
      };

    default:
      return state;
  }
};

export default getMovieTrailersReducer;
