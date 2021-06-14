import React from "react";
import "./menuSection.css";

import Backdrop from "../UI/backdrop/backdropHelper";

import { NavLink } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import { showMenuSectionHandler } from "../../store/actions/actionsMenuSection/menuSectionShowHandler";
import { fetchUserTypeOfSearchHandler } from "../../store/actions/SetUserSearchTypeAction";

import { useSelector, useDispatch } from "react-redux";
import { RootStore } from "../../store/store";

const MenuSection: React.FC = () => {
  const dispatch = useDispatch();
  const menuSectionState = useSelector(
    (state: RootStore) => state.menuSectionR
  );

  const typeOfSearchState = useSelector(
    (state: RootStore) => state.userSearchTypeR
  );

  const menuSectionHandler = () => {
    dispatch(showMenuSectionHandler());
  };

  // handles the switch of type of search
  const switchTypeOfSearchHandler = (newTypeOfSearch: string) => {
    dispatch(fetchUserTypeOfSearchHandler(newTypeOfSearch));
  };

  return (
    <div className="menu-holder">
      <Backdrop />
      <div
        className={
          menuSectionState.show ? "menu-section show-menu" : "menu-section"
        }
      >
        <div className="close-btn-section">
          <div className="times-btn-holder" onClick={menuSectionHandler}>
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>
        <ul className="list-of-links">
          <li onClick={menuSectionHandler}>
            <NavLink className="menu-link" to="/home">
              home
            </NavLink>
          </li>
          <li onClick={menuSectionHandler}>
            <NavLink className="menu-link" to="/home">
              Search All
            </NavLink>
          </li>
          {typeOfSearchState.userSearchType === "movies" ? (
            <li
              onClick={() => {
                menuSectionHandler();
                switchTypeOfSearchHandler("tv-shows");
              }}
            >
              <NavLink className="menu-link" to="/home">
                Tv-shows
              </NavLink>
            </li>
          ) : (
            <li
              onClick={() => {
                menuSectionHandler();
                switchTypeOfSearchHandler("movies");
              }}
            >
              <NavLink className="menu-link" to="/home">
                Movies
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default MenuSection;
