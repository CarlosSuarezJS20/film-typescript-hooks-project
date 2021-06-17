import React from "react";
import "./signUpSection.css";

import { useDispatch } from "react-redux";

// authentication:
import { authenticationBannerHandler } from "../../store/actions/actionsAuthentication/authenticationBannerHandler";

const SignUp: React.FC = () => {
  const dispatch = useDispatch();
  return (
    <div className="sign-up-area">
      <h2>Sign in to access your watchlist</h2>
      <p>Save shows and movies to keep track of what you want to watch.</p>
      <button
        className="sign-up-btn"
        onClick={() => {
          dispatch(authenticationBannerHandler());
        }}
      >
        Sign Up
      </button>
    </div>
  );
};

export default SignUp;
