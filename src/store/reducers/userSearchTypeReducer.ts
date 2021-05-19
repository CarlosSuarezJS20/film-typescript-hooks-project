import {
  userSearchType,
  SET_SEARCH_TYPE_WELCOME_PAGE,
} from "../actions/actionsTypes";

interface DefaultStateInt {
  userSearchType: string;
}

const initialState = {
  userSearchType: "",
};

const userTypeOfSearcReducer = (
  state: DefaultStateInt = initialState,
  action: userSearchType
): DefaultStateInt => {
  switch (action.type) {
    case SET_SEARCH_TYPE_WELCOME_PAGE:
      return {
        userSearchType: action.searchType,
      };
    default:
      return state;
  }
};

export default userTypeOfSearcReducer;
