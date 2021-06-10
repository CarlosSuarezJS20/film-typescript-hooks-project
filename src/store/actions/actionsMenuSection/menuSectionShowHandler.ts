import {
  SET_MENU_SECTION_SHOW_HANDLER,
  setMenuSectionShowHanlderTypes,
  setMenuSectionShowHanlderFunction,
} from "../actionsMenuSection/menuSectionActionTypes";
import { Dispatch } from "redux";

export const showMenuSectionHandler: setMenuSectionShowHanlderFunction =
  () => (dispatch: Dispatch<setMenuSectionShowHanlderTypes>) => {
    dispatch({
      type: SET_MENU_SECTION_SHOW_HANDLER,
    });
  };
