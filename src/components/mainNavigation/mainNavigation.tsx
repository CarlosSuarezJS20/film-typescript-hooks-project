import React, { useState } from "react";
import "./mainNavigation.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";

import Logo from "../UI/logo/logo";

import { NavLink } from "react-router-dom";

const NavigationBar: React.FC = () => {
  const [searchActive, setSearchActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const searchActiveHandler = (): void => {
    if (searchActive) {
      setSearchTerm("");
    }

    setSearchActive((prev) => !prev);
  };

  const onChangeValueHanlder = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchTerm(e.currentTarget.value);
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
        <form
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
              placeholder="Search In Living Room"
              value={searchTerm}
              onChange={(e) => {
                onChangeValueHanlder(e);
              }}
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
            <div className="results-list"></div>
            <div className="more-results-redirect">
              <NavLink to="results-page" className="more-results-link">
                {`See all results for "${searchTerm}"`}
              </NavLink>
            </div>
          </div>
        </form>
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
