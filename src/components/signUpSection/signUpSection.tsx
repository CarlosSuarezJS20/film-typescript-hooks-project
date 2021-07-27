import React from "react";
import "./signUpSection.scss";

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
        className="sign-up-area__sign-up-btn"
        onClick={() => {
          dispatch(authenticationBannerHandler());
        }}
      >
        Sign In
      </button>
    </div>
  );
};

export default SignUp;
