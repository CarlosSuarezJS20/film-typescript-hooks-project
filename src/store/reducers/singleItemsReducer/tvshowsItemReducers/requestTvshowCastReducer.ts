import {
  getTvshowCastRequestResponse,
  getTvshowCastDispatchTypes,
  GET_TVSHOW_CAST_SUCCESS,
  GET_REQUEST_FAIL,
  GET_REQUEST_LOADING,
} from "../../../actions/actionsSingleItems/singleTvshowActions/singleTvShowsActionsType";

interface DefaultStateInt {
  tvshowCastResponse?: getTvshowCastRequestResponse;
  loading: boolean;
  error?: string;
}

const initialState = {
  loading: false,
};

const getTvshowCastReducer = (
  state: DefaultStateInt = initialState,
  action: getTvshowCastDispatchTypes
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
    case GET_TVSHOW_CAST_SUCCESS:
      return {
        ...state,
        loading: false,
        tvshowCastResponse: action.getTvshowCastResponse,
      };

    default:
      return state;
  }
};

export default getTvshowCastReducer;
