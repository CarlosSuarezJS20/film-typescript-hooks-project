import {
  getPeopleCombinedCreditsRequestResponse,
  getPeopleCombinedCreditsRequestDispatchTypes,
  GET_PEOPLE_COMBINED_CREDIT_REQ_SUCCESS,
  GET_PEOPLE_REQUEST_FAIL,
  GET_PEOPLE_REQUEST_LOADING,
} from "../../../actions/actionsSingleItems/singleActorActions/actorDetailsActionTypes";

interface DefaultStateInt {
  combinedCredits?: getPeopleCombinedCreditsRequestResponse;
  loading: boolean;
  error?: string;
}

const initialState = {
  loading: false,
};

const getActorCombinedCreditsReducer = (
  state: DefaultStateInt = initialState,
  action: getPeopleCombinedCreditsRequestDispatchTypes
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
    case GET_PEOPLE_COMBINED_CREDIT_REQ_SUCCESS:
      return {
        ...state,
        loading: false,
        combinedCredits: action.getPeopleCombinedCreditsResponse,
      };

    default:
      return state;
  }
};

export default getActorCombinedCreditsReducer;
