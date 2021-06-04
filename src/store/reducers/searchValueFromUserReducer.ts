import {
  searchValueFromInputHandlerType,
  SEARCH_VALUE_HANDLER,
} from "../actions/actionsTypes";

interface DefaultStateInt {
  userSearchValue: string;
}

const initialState = {
  userSearchValue: "",
};

const searchValueFromNavbarHandlerReducer = (
  state: DefaultStateInt = initialState,
  action: searchValueFromInputHandlerType
): DefaultStateInt => {
  switch (action.type) {
    case SEARCH_VALUE_HANDLER:
      return {
        userSearchValue: action.searchValue,
      };
    default:
      return state;
  }
};

export default searchValueFromNavbarHandlerReducer;
