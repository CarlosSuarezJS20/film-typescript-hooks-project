import {
  getDetailsRequestResponse,
  getDetailsRequestDispatchTypes,
  GET_MOVIE_DETAILS_SUCCESS,
  GET_REQUEST_FAIL,
  GET_REQUEST_LOADING,
} from "../../../actions/actionsSingleItems/singleMovieItemActions/singleMovieItemActionsTypes";

interface DefaultStateInt {
  movieDetails?: getDetailsRequestResponse;
  loading: boolean;
  error?: string;
}

const initialState = {
  loading: false,
};

const getMovieDetailsReducer = (
  state: DefaultStateInt = initialState,
  action: getDetailsRequestDispatchTypes
): DefaultStateInt => {
  switch (action.type) {
    case GET_REQUEST_FAIL:
      return {
        ...state,
        loading: false,
      };
    case GET_REQUEST_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_MOVIE_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        movieDetails: action.getMovieDetailsResponse,
      };

    default:
      return state;
  }
};

export default getMovieDetailsReducer;
