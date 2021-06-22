import React from "react";
import "./footer.css";
import Logo from "../UI/logo/logo";

import TMDBLogo from "./images/TMDBLogo.svg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

const MainFooter = () => {
  return (
    <footer className="mainFooter">
      <section className="mainFooterTop">
        <header>
          <h2 className="header-title-footer">Living Room</h2>
          <p className="title-description-footer">
            Powered by React.js and Typescript
          </p>
        </header>

        <div className="item">
          <h3 className="footerTitle">my work:</h3>
          <p>
            <a
              className="mainproject"
              href="https://typescript-react-portfolio.web.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Portfolio page
            </a>
          </p>
        </div>

        <div className="item">
          <h3 className="footerTitle">phone number:</h3>
          <p>+44 79 038 30 468</p>
        </div>
        <p className="copyRights">
          Copyright &copy;2021
          <br /> Code and design by
          <a
            className="myPage"
            href="https://typescript-react-portfolio.web.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Carlos Suarez
          </a>
        </p>
      </section>

      <section className="bottomFooter">
        <Logo />

        <div className="sectionTwo">
          <a
            href="https://www.linkedin.com/in/carlos-suarez-a3659141/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon className="socialIcon" icon={faLinkedin} />
          </a>
          <a
            href="https://github.com/CarlosSuarezJS20"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon className="socialIcon" icon={faGithub} />
          </a>
          <a
            href="https://www.themoviedb.org/documentation/api"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className="mdb-logo" src={TMDBLogo} alt="TMDB Logo" />
          </a>
        </div>
      </section>
    </footer>
  );
};

export default MainFooter;
