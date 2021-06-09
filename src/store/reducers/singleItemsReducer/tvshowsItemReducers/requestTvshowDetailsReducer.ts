import {
  getTvshowDetailsRequestResponse,
  getTvshowDetailsRequestDispatchTypes,
  GET_TVSHOW_DETAILS_SUCCESS,
  GET_REQUEST_FAIL,
  GET_REQUEST_LOADING,
} from "../../../actions/actionsSingleItems/singleTvshowActions/singleTvShowsActionsType";

interface DefaultStateInt {
  tvshowDetails?: getTvshowDetailsRequestResponse;
  loading: boolean;
  error?: string;
}

const initialState = {
  loading: false,
};

const getTvshowVideosReducer = (
  state: DefaultStateInt = initialState,
  action: getTvshowDetailsRequestDispatchTypes
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
    case GET_TVSHOW_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        tvshowDetails: action.getTvshowDetailsResponse,
      };

    default:
      return state;
  }
};

export default getTvshowVideosReducer;
