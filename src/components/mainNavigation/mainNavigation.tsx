import React, { useEffect, useState } from "react";
import "./mainNavigation.css";

import InstantResultsList from "../instantResultsList/instantResultsList";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";

import Logo from "../UI/logo/logo";

import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { searchMultiFindFetchResponse } from "../../store/actions/SearchMultiRequestAction";
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
  const [searchTerm, setSearchTerm] = useState("");
  // opens div when user is starting a new search

  // State from Store:
  const dispatch = useDispatch();

  const configMbdApiState = useSelector(
    (state: RootStore) => state.postApiConfigurationReducer
  );

  //Exect
  const handleRequest = () => {
    dispatch(
      searchMultiFindFetchResponse(
        `https://api.themoviedb.org/3/search/multi?api_key=${configMbdApiState.apiKey}&language=en-US&query=${searchTerm}&page=1&include_adult=false`
      )
    );
  };

  useEffect(() => {
    if (searchTerm.length === 0) {
      return;
    }
    handleRequest();
  }, [searchTerm]);

  // for UI changes and styling
  const searchActiveHandler = (): void => {
    if (searchActive) {
      setSearchTerm("");
    }

    setSearchActive((prev) => !prev);
  };

  const onChangeValueHanlder = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
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
              searchTerm.length > 3 ? "3px solid rgb(196, 10, 10)" : "none",
          }}
        >
          <div
            className={
              searchActive ? "search-input-holder show" : "search-input-holder"
            }
          >
            <input
              placeholder="Search Living Room"
              defaultValue={searchTerm}
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
              <NavLink to="search-results">
                <FontAwesomeIcon
                  icon={faSearch}
                  className="input-search-icon"
                />
              </NavLink>
            </div>
          </div>
          <div
            className={
              searchTerm.length > 3
                ? "instant-results-holder show-results"
                : "instant-results-holder"
            }
          >
            <div className="results-list">
              <InstantResultsList />
            </div>
            <div className="more-results-redirect">
              <NavLink to="results-page" className="more-results-link">
                {`See all results for "${searchTerm}"`}
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
