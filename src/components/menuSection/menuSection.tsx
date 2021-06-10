import React from "react";
import "./menuSection.css";

import Backdrop from "../UI/backdrop/backdropHelper";

import { NavLink } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import { showMenuSectionHandler } from "../../store/actions/actionsMenuSection/menuSectionShowHandler";

import { useSelector, useDispatch } from "react-redux";
import { RootStore } from "../../store/store";

const MenuSection: React.FC = () => {
  const dispatch = useDispatch();
  const menuSectionState = useSelector(
    (state: RootStore) => state.menuSectionR
  );

  const menuSectionHandler = () => {
    dispatch(showMenuSectionHandler());
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
              Search
            </NavLink>
          </li>
          <li onClick={menuSectionHandler}>
            <NavLink className="menu-link" to="/home">
              Movies
            </NavLink>
          </li>
          <li onClick={menuSectionHandler}>
            <NavLink className="menu-link" to="/home">
              Tv-shows
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MenuSection;
