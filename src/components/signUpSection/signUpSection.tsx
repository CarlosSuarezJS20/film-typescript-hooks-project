import React from "react";
import "./signUpSection.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootStore } from "../../store/store";

const SignUp: React.FC = () => {
  return (
    <div className="sign-up-area">
      <h2>Sign in to access your watchlist</h2>
      <p>Save shows and movies to keep track of what you want to watch.</p>
      <button className="sign-up-btn">Sign Up</button>
    </div>
  );
};

export default SignUp;
