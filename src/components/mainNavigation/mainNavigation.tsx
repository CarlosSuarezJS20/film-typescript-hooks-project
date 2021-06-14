import React, { useEffect, useState } from "react";
import "./mainNavigation.css";

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

const NavigationBar: React.FC = () => {
  const [searchActive, setSearchActive] = useState(false);

  // State from Store:
  const dispatch = useDispatch();

  const configMbdApiState = useSelector(
    (state: RootStore) => state.postApiConfigurationReducer
  );

  const storeSearchValueState = useSelector(
    (state: RootStore) => state.searchValueFromInputHandlerR
  );

  const multiSearchFeatureState = useSelector(
    (state: RootStore) => state.searchMultiCapabilityR
  );

  // for UI changes and styling
  const searchActiveHandler = (): void => {
    if (!searchActive) {
      storesUserSearchValueHandler("");
    }

    setSearchActive((prev) => !prev);
  };

  const menuShowHandler = () => {
    dispatch(showMenuSectionHandler());
  };

  return (
    <nav className="nav-bar">
      <div className="icon-holder" onClick={menuShowHandler}>
        <FontAwesomeIcon icon={faBars} className="icon" />
      </div>
      <div className="logo-holder">
        <Logo />
      </div>
      <div className="form-holder">
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
              searchActive ? "search-input-holder show" : "search-input-holder"
            }
          >
            <SearchInput location="navigation" page={1} />
            <div
              className="close-input-icon-holder"
              onClick={searchActiveHandler}
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
                    ? "disable-link"
                    : "disable-link remove-disabled-link"
                }
              ></div>
              <NavLink
                to={`/results?query=${storeSearchValueState.userSearchValue}`}
              >
                <FontAwesomeIcon
                  icon={faSearch}
                  className="input-search-icon"
                />
              </NavLink>
            </div>
          </div>
          <div
            className={
              storeSearchValueState.userSearchValue.length > 0
                ? "instant-results-holder show-results"
                : "instant-results-holder"
            }
          >
            <div className="results-list">
              {multiSearchFeatureState.loading ? (
                <div className="results-loader">
                  <InformationLoader />
                </div>
              ) : multiSearchFeatureState.results?.results &&
                multiSearchFeatureState.results?.results.length > 0 ? (
                <InstantResultsList closeSearchInput={searchActiveHandler} />
              ) : (
                <div className="no-results-warning-holder">
                  <h3>No results found</h3>
                </div>
              )}
            </div>
            <div className="more-results-redirect">
              <NavLink
                to={`/results?query=${storeSearchValueState.userSearchValue}`}
                className="more-results-link"
              >
                {`See all results for "${storeSearchValueState.userSearchValue}"`}
              </NavLink>
            </div>
          </div>
        </div>
      </div>
      <div
        className="icon-holder hide-big-screen"
        onClick={searchActiveHandler}
      >
        <FontAwesomeIcon icon={faSearch} className="icon" />
      </div>
      <div className="sign-in-holder">
        <NavLink to="sign-in-page">sign in</NavLink>
      </div>
    </nav>
  );
};

export default NavigationBar;
