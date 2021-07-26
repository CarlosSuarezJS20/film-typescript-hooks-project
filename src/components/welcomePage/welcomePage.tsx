import React from "react";

import TrailString from "../../components/UI/TrailTitle/trailTitle";
import SqueezeString from "../../components/UI/squeezeSpringTitle/squeezeSpringTitle";

import "./welcomePage.scss";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

import { fetchUserTypeOfSearchHandler } from "../../store/actions/SetUserSearchTypeAction";

const appName = ["L", "I", "V", "I", "N", "G"];
const appNameII = ["R", "O", "O", "M"];

const movies = ["M", "O", "V", "I", "E", "S"];
const tvShows = ["T", "V", "-", "S", "H", "O", "W", "S"];

const WelcomePage = () => {
  const dispatch = useDispatch();

  const typeOfSearchHandler = (typeOfSearch: string) => {
    dispatch(fetchUserTypeOfSearchHandler(typeOfSearch));
  };

  return (
    <div className="welcomePageHero">
      <div className="welcomePageHero__welcome-text-holder">
        <TrailString key="welcome-banner" open>
          {appName.map((word, index) => (
            <SqueezeString key={index}>{word}</SqueezeString>
          ))}
          &nbsp;&nbsp;
          {appNameII.map((word, index) => (
            <SqueezeString key={`banner${index}`}>{word}</SqueezeString>
          ))}
        </TrailString>
      </div>
      <div className="welcomePageHero__links">
        <div
          onClick={() => {
            typeOfSearchHandler("movies");
          }}
        >
          <NavLink to="/home" className="movies-link">
            <TrailString key="movies" open>
              {movies.map((word, index) => (
                <SqueezeString key={`movies${index}`}>{word}</SqueezeString>
              ))}
            </TrailString>
          </NavLink>
        </div>
        <div
          onClick={() => {
            typeOfSearchHandler("tv-shows");
          }}
        >
          <NavLink to="/home" className="tv-shows-link">
            <TrailString key="tv-show" open>
              {tvShows.map((word, index) => (
                <SqueezeString key={`tv${index}`}>{word}</SqueezeString>
              ))}
            </TrailString>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
