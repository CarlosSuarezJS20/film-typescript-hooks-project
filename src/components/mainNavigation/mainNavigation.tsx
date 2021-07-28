import React, { useState } from "react";
import "./mainNavigation.scss";

import InstantResultsList from "../instantResultsList/instantResultsList";
import InformationLoader from "../UI/informationLoader/informationLoader";
import SearchInput from "../UI/searchInput/searchInput";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";

import Logo from "../UI/logo/logo";

import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// actions
import { storesUserSearchValueHandler } from "../../store/actions/searchValueFromNavbarHandler";
import { showMenuSectionHandler } from "../../store/actions/actionsMenuSection/menuSectionShowHandler";

import { RootStore } from "../../store/store";

// Authentication
import { authenticationBannerHandler } from "../../store/actions/actionsAuthentication/authenticationBannerHandler";
import { logoutRequestHandler } from "../../store/actions/actionsAuthentication/authenticationLogoutHandler";

const NavigationBar: React.FC = () => {
  const [searchActive, setSearchActive] = useState(false);

  // State from Store:
  const dispatch = useDispatch();

  const storeSearchValueState = useSelector(
    (state: RootStore) => state.searchValueFromInputHandlerR
  );

  const multiSearchFeatureState = useSelector(
    (state: RootStore) => state.searchMultiCapabilityR
  );

  const autheticationState = useSelector(
    (state: RootStore) => state.authenticationLogicR
  );

  // for UI changes and styling for small screen input div.
  const searchActiveOpen = (): void => {
    if (!searchActive) {
      storesUserSearchValueHandler("");
    }
    setSearchActive(true);
  };

  const searchActiveClose = (): void => {
    if (!searchActive) {
      storesUserSearchValueHandler("");
    }
    setSearchActive(false);
  };

  // Menu control
  const menuShowHandler = () => {
    dispatch(showMenuSectionHandler());
  };

  return (
    <nav className="nav-bar">
      <div className="nav-bar__icon-holder" onClick={menuShowHandler}>
        <FontAwesomeIcon icon={faBars} className="icon" />
      </div>
      <div className="nav-bar__logo-holder">
        <Logo />
      </div>
      <div className="nav-bar__form-holder">
        <div
          className="form"
          style={{
            border:
              storeSearchValueState.userSearchValue.length > 3
                ? "3px solid rgb(196, 10, 10)"
                : "none",
          }}
        >
          <div
            className={
              searchActive
                ? "form__search-input-holder form__show"
                : "form__search-input-holder"
            }
          >
            <SearchInput location="navigation" page={1} />
            <div
              className="close-input-icon-holder"
              onClick={searchActiveClose}
            >
              <FontAwesomeIcon
                icon={faTimes}
                className="icon close-input-btn"
              />
            </div>
            <div className="form-search-icon">
              <div
                className={
                  storeSearchValueState.userSearchValue.length === 0
                    ? "form-search-icon__disable-link"
                    : "form-search-icon__disable-link form-search-icon__remove-disabled-link"
                }
              ></div>
              <NavLink
                to={`/results?query=${storeSearchValueState.userSearchValue}`}
              >
                <FontAwesomeIcon
                  icon={faSearch}
                  className="form-search-icon__input-search-icon"
                />
              </NavLink>
            </div>
          </div>
          <div
            className={
              storeSearchValueState.userSearchValue.length > 0
                ? "form__instant-results-holder form__show-results"
                : "form__instant-results-holder"
            }
          >
            <div className="results-list-holder">
              {multiSearchFeatureState.loading ? (
                <div className="results-list-holder__results-loader">
                  <InformationLoader />
                </div>
              ) : multiSearchFeatureState.results?.results &&
                multiSearchFeatureState.results?.results.length > 0 ? (
                <InstantResultsList closeSearchInput={searchActiveClose} />
              ) : (
                <div className="results-list-holder__no-results-warning-holder">
                  <h3>No results found</h3>
                </div>
              )}
            </div>
            <div className="more-results-redirect">
              <NavLink
                to={`/results?query=${storeSearchValueState.userSearchValue}`}
                className="more-results-redirect__more-results-link"
              >
                {`See all results for "${storeSearchValueState.userSearchValue}"`}
              </NavLink>
            </div>
          </div>
        </div>
      </div>
      <div
        className="navbar__icon-holder hide-big-screen"
        onClick={searchActiveOpen}
      >
        <FontAwesomeIcon icon={faSearch} className="icon" />
      </div>
      <div
        className="nav-bar__sign-in-holder"
        onClick={() => {
          // removes token and userId
          if (autheticationState.authToken) {
            dispatch(logoutRequestHandler());
            return;
          }
          dispatch(authenticationBannerHandler());
        }}
      >
        <p>{autheticationState.authToken ? "sign out" : "sign in"}</p>
      </div>
    </nav>
  );
};

export default NavigationBar;
