import React from "react";

import TrailString from "../../components/UI/TrailTitle/trailTitle";
import SqueezeString from "../../components/UI/squeezeSpringTitle/squeezeSpringTitle";

import "./welcomePage.css";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

import { RootStore } from "../../store/store";
import { $CombinedState } from "redux";

const appName = ["P", "O", "P", " ", "C", "O", "R", "N"];
const appNameII = ["W", "A", "T", "C", "H"];

const movies = ["M", "O", "V", "I", "E", "S"];
const tvShows = ["T", "V", "-", "S", "H", "O", "W", "S"];

const WelcomePage = () => {
  return (
    <div className="welcomePageHero">
      <div className="welcome-text-holder">
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
      <div className="links">
        <div>
          <NavLink to="/" className="movies-link">
            <TrailString key="movies" open>
              {movies.map((word, index) => (
                <SqueezeString key={`movies${index}`}>{word}</SqueezeString>
              ))}
            </TrailString>
          </NavLink>
        </div>
        <div>
          <NavLink to="/" className="tv-shows-link">
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
