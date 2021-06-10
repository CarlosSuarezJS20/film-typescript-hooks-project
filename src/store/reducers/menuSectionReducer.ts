import {
  setMenuSectionShowHanlderTypes,
  SET_MENU_SECTION_SHOW_HANDLER,
} from "../actions/actionsMenuSection/menuSectionActionTypes";

interface DefaultStateInt {
  show: boolean;
}

const initialState = {
  show: false,
};

const menuSectionShowReducer = (
  state: DefaultStateInt = initialState,
  action: setMenuSectionShowHanlderTypes
): DefaultStateInt => {
  switch (action.type) {
    case SET_MENU_SECTION_SHOW_HANDLER:
      return {
        show: !state.show,
      };
    default:
      return state;
  }
};

export default menuSectionShowReducer;
