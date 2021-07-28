import React from "react";
import "./menuSection.scss";

import Backdrop from "../UI/backdrop/backdropHelper";

import { NavLink, useLocation } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import { showMenuSectionHandler } from "../../store/actions/actionsMenuSection/menuSectionShowHandler";
import { fetchUserTypeOfSearchHandler } from "../../store/actions/SetUserSearchTypeAction";

import { useSelector, useDispatch } from "react-redux";
import { RootStore } from "../../store/store";

import { useAlert } from "react-alert";

const MenuSection: React.FC = () => {
  const location = useLocation();
  const alert = useAlert();
  const dispatch = useDispatch();
  const menuSectionState = useSelector(
    (state: RootStore) => state.menuSectionR
  );

  const typeOfSearchState = useSelector(
    (state: RootStore) => state.userSearchTypeR
  );

  const authenticationState = useSelector(
    (state: RootStore) => state.authenticationLogicR
  );

  // consumes the itemId stored
  const itemIdStoredState = useSelector(
    (state: RootStore) => state.fetchItemIdReducer
  );

  const menuSectionHandler = () => {
    dispatch(showMenuSectionHandler());
  };

  // handles the switch of type of search
  const switchTypeOfSearchHandler = (newTypeOfSearch: string) => {
    dispatch(fetchUserTypeOfSearchHandler(newTypeOfSearch));
  };

  return (
    <React.Fragment>
      <Backdrop />
      <div
        className={
          menuSectionState.show ? "menu-section show-menu" : "menu-section"
        }
      >
        <div className="menu-section__close-btn-section">
          <div className="times-btn-holder" onClick={menuSectionHandler}>
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>
        <ul className="menu-section__list-of-links">
          <li onClick={menuSectionHandler}>
            <NavLink className="menu-link" to="/home">
              home
            </NavLink>
          </li>
          <li onClick={menuSectionHandler}>
            <NavLink className="menu-link" to="/discover">
              discover
            </NavLink>
          </li>
          <li
            onClick={() => {
              menuSectionHandler();
              if (!authenticationState.authToken) {
                alert.show("You must sign in to access your list");
              }
            }}
          >
            <NavLink
              className="menu-link"
              to={{
                pathname: `${
                  !authenticationState.authToken
                    ? location.pathname
                    : `/wishlist/${authenticationState.userId}`
                }`,
                state: {
                  itemId: itemIdStoredState.itemId,
                  actorId: itemIdStoredState.actorId,
                },
              }}
            >
              Wishlist
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
    </React.Fragment>
  );
};

export default MenuSection;
