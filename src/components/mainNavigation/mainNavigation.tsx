import React, { useEffect, useState, useRef } from "react";
import "./mainNavigation.css";

import InstantResultsList from "../instantResultsList/instantResultsList";
import InformationLoader from "../UI/informationLoader/informationLoader";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";

import Logo from "../UI/logo/logo";

import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// actions
import { searchMultiFindFetchResponse } from "../../store/actions/SearchMultiRequestAction";
import { storesUserSearchValueHandler } from "../../store/actions/searchValueFromNavbarHandler";

import { RootStore } from "../../store/store";

// Helper function to debounce search input. Allows request after user stops typing
const debounceInput = (fn: (...args: any) => void, delay: number) => {
  let timerId: any;
  return (...args: any[]) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => fn(...args), delay);
  };
};

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

  useEffect(() => {
    if (storeSearchValueState.userSearchValue.length === 0) {
      return;
    }

    if (storeSearchValueState.userSearchValue.length >= 3) {
      dispatch(
        searchMultiFindFetchResponse(
          `https://api.themoviedb.org/3/search/multi?api_key=${configMbdApiState.apiKey}&language=en-US&query=${storeSearchValueState.userSearchValue}&page=1&include_adult=false`
        )
      );
    }
  }, [storeSearchValueState.userSearchValue]);

  // for UI changes and styling
  const searchActiveHandler = (): void => {
    if (!searchActive) {
      storesUserSearchValueHandler("");
    }

    setSearchActive((prev) => !prev);
  };

  const onChangeValueHanlder = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    dispatch(storesUserSearchValueHandler(e.target.value));
  };

  return (
    <nav className="nav-bar">
      <div className="icon-holder">
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
            <input
              type="text"
              onBlur={(e) => {
                e.target.value = "";
              }}
              placeholder="Search Living Room"
              onChange={debounceInput(onChangeValueHanlder, 1000)}
            />
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
