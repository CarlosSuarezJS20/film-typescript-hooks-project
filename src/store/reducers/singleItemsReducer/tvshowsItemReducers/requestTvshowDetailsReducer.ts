import {
  getTvshowsVideosRequestResponse,
  getTvshowsVideosRequestDispatchTypes,
  GET_TVSHOWS_VIDEOS_SUCCESS,
  GET_REQUEST_FAIL,
  GET_REQUEST_LOADING,
} from "../../../actions/actionsSingleItems/singleTvshowActions/singleTvShowsActionsType";

interface DefaultStateInt {
  tvshowVideos?: getTvshowsVideosRequestResponse;
  loading: boolean;
  error?: string;
}

const initialState = {
  loading: false,
};

const getTvshowVideosReducer = (
  state: DefaultStateInt = initialState,
  action: getTvshowsVideosRequestDispatchTypes
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
    case GET_TVSHOWS_VIDEOS_SUCCESS:
      return {
        ...state,
        loading: false,
        tvshowVideos: action.getTvshowsVideosResponse,
      };

    default:
      return state;
  }
};

export default getTvshowVideosReducer;
