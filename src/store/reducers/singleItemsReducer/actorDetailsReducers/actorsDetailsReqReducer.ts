import {
  getPeopleDetailsRequestResponse,
  getPeopleDetailsRequestDispatchTypes,
  GET_PEOPLE_DETAILS_REQ_SUCCESS,
  GET_PEOPLE_REQUEST_FAIL,
  GET_PEOPLE_REQUEST_LOADING,
} from "../../../actions/actionsSingleItems/singleActorActions/actorDetailsActionTypes";

interface DefaultStateInt {
  actorDetails?: getPeopleDetailsRequestResponse;
  loading: boolean;
  error?: string;
}

const initialState = {
  loading: false,
};

const getActorDetailsReducer = (
  state: DefaultStateInt = initialState,
  action: getPeopleDetailsRequestDispatchTypes
): DefaultStateInt => {
  switch (action.type) {
    case GET_PEOPLE_REQUEST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case GET_PEOPLE_REQUEST_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_PEOPLE_DETAILS_REQ_SUCCESS:
      return {
        ...state,
        loading: false,
        actorDetails: action.getActorDetailsResponse,
      };

    default:
      return state;
  }
};

export default getActorDetailsReducer;
