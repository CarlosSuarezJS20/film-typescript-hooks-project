import React, { useEffect, useState } from "react";
import "./authentication.css";

import Backdrop from "../UI/backdrop/backdropHelper";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import { useSelector, useDispatch } from "react-redux";
import { RootStore } from "../../store/store";

import { authenticationBannerHandler } from "../../store/actions/actionsAuthentication/authenticationBannerHandler";
import { postAuthenticationRequest } from "../../store/actions/actionsAuthentication/postAuthenticationRequest";
// Validation Function:
const valueValidityHandler = (
  value: string,
  rules: { isEmail?: boolean; minLength?: number }
) => {
  let isValid = true;
  if (rules.minLength) {
    isValid = value.length >= rules.minLength;
  }

  if (rules.isEmail) {
    const pattern =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = pattern.test(value);
  }
  return isValid;
};

const Authentication: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userRegistering, setUserRegistering] = useState(false);

  // For Handling the banner
  const dispatch = useDispatch();

  const autheticationBannerHandlerState = useSelector(
    (state: RootStore) => state.authenticationBannerHandlerR
  );

  const autheticationLogicState = useSelector(
    (state: RootStore) => state.authenticationLogicR
  );

  useEffect(() => {
    // closes the authentication banner if the user logs in successfully
    if (autheticationLogicState.authToken) {
      dispatch(authenticationBannerHandler());
      setUserRegistering(false);
    }
  }, [autheticationLogicState.authToken]);

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    if (type === "email") {
      setEmail(e.target.value);
    } else if (type === "password") {
      setPassword(e.target.value);
    } else {
      setConfirmPassword(e.target.value);
    }
  };

  const submitRegisteringHandler = () => {
    const details = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    let urlRequest = userRegistering
      ? "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBbBZw2BGsEBfl1-qxCBZFkC669UFyUKS0"
      : "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAsm2AajbLjNnGdo4cb7pVXXfaxVkt-GKs";
    dispatch(postAuthenticationRequest(urlRequest, details));
  };

  return (
    <React.Fragment>
      <Backdrop />
      <div
        className={
          autheticationBannerHandlerState.showBanner
            ? "authentication-modal show-auth-banner"
            : "authentication-modal"
        }
      >
        <div className="authentication">
          <div className="cancel-authentication">
            <FontAwesomeIcon
              icon={faTimes}
              className="close-authentication"
              onClick={() => {
                dispatch(authenticationBannerHandler());
                setUserRegistering(false);
              }}
            />
          </div>
          <div className="auth-title">
            <h2>living room</h2>
            <p className="match-password-error">
              {autheticationLogicState.errorAuthentication &&
                `${autheticationLogicState.errorAuthentication
                  .replace(/_/g, " ")
                  .toLowerCase()}`}
            </p>
            <p className="match-password-error">
              {password !== confirmPassword && userRegistering
                ? "Password does not match"
                : ""}
            </p>
          </div>
          <form>
            <input
              className={
                valueValidityHandler(email, { isEmail: true }) ? "valid" : ""
              }
              type="email"
              value={email}
              placeholder="Enter your email"
              required={true}
              onChange={(e) => {
                onChangeHandler(e, "email");
              }}
            />
            <input
              className={
                valueValidityHandler(password, { minLength: 7 }) ? "valid" : ""
              }
              type="password"
              value={password}
              placeholder="Enter Password"
              required={true}
              minLength={7}
              onChange={(e) => {
                onChangeHandler(e, "password");
              }}
            />
            {userRegistering && (
              <input
                type="password"
                value={confirmPassword}
                placeholder="Confirm Password"
                onChange={(e) => {
                  onChangeHandler(e, "confirm-password");
                }}
              />
            )}
            <button
              onClick={(e) => {
                e.preventDefault();
                if (password !== confirmPassword && userRegistering) {
                  return;
                }
                submitRegisteringHandler();
              }}
            >
              {userRegistering ? "Create Account" : "Log in"}
            </button>
          </form>
          <div className="options">
            <p>or</p>
            <hr />
            <p
              className="options-message"
              onClick={() => {
                setUserRegistering((prev) => !prev);
              }}
            >
              {userRegistering
                ? "Back to Log in"
                : "Not a member? Register here"}
            </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Authentication;
