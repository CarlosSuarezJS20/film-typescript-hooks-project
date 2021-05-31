import {
  getAllCastRequestResponse,
  getMovieCastRequestDispatchTypes,
  GET_MOVIE_CAST_SUCCESS,
  GET_REQUEST_FAIL,
  GET_REQUEST_LOADING,
} from "../../../actions/actionsSingleItems/singleMovieItemActions/singleMovieItemActionsTypes";

interface DefaultStateInt {
  movieCast?: getAllCastRequestResponse;
  loading: boolean;
  error?: string;
}

const initialState = {
  loading: false,
};

const getMovieDetailsReducer = (
  state: DefaultStateInt = initialState,
  action: getMovieCastRequestDispatchTypes
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
    case GET_MOVIE_CAST_SUCCESS:
      return {
        ...state,
        loading: false,
        movieCast: action.getAllCastResponse,
      };

    default:
      return state;
  }
};

export default getMovieDetailsReducer;
