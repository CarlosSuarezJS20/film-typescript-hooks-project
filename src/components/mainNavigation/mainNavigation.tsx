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
        <FontAwesomeIcon icon={faBars} className="icon-style" />
      </div>
      <div className="logo-holder">
        <Logo />
      </div>
      <div className="search-box-form-holder">
        <div className={searchActive ? "search-form open" : "search-form"}>
          <input
            placeholder="Seach in Living Room"
            value={searchTerm}
            onChange={(e) => {
              onChangeValueHanlder(e);
            }}
          />
          <div className="icon-style">
            <div className="icon-holder-times" onClick={searchActiveHandler}>
              <FontAwesomeIcon icon={faTimes} className="icon-style" />
            </div>
            <div className="icon-holder">
              <NavLink to="/search-results" className="search-button">
                <FontAwesomeIcon icon={faSearch} className="icon-style" />
              </NavLink>
            </div>
          </div>
        </div>
        <div
          className={
            searchTerm.length > 3
              ? "search-instant-results show"
              : "search-instant-results"
          }
        >
          <div className="results-holder"></div>
          <div className="more-results-holder">
            <NavLink
              to="/search-results"
              className="more-results"
            >{`See more results for "${searchTerm}"`}</NavLink>
          </div>
        </div>
      </div>
      <div>
        <NavLink to="/sign-in">Sign in</NavLink>
      </div>
    </nav>
  );
};

export default NavigationBar;
