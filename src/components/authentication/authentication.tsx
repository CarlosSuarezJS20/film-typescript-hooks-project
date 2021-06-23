import React, { useEffect, useState } from "react";
import "./authentication.css";

import Backdrop from "../UI/backdrop/backdropHelper";
import InformationLoader from "../UI/informationLoader/informationLoader";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import { useSelector, useDispatch } from "react-redux";
import { RootStore } from "../../store/store";

import { authenticationBannerHandler } from "../../store/actions/actionsAuthentication/authenticationBannerHandler";
import { postAuthenticationRequest } from "../../store/actions/actionsAuthentication/postAuthenticationRequest";

import withErrorHandler from "../UI/withErrorHandler/withErrorHandler";
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
  const [passwordsMatch, setPasswordsMatch] = useState(true);
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
  }, [autheticationLogicState.authToken, dispatch]);

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
      email: email.trim(),
      password: password.trim(),
      returnSecureToken: true,
    };
    let urlRequest = userRegistering
      ? "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBbBZw2BGsEBfl1-qxCBZFkC669UFyUKS0"
      : "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBbBZw2BGsEBfl1-qxCBZFkC669UFyUKS0";
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
                // resets the inputs to empty if the user moves between sign in and sign up
                setEmail("");
                setConfirmPassword("");
                setPassword("");
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
              {!passwordsMatch && userRegistering
                ? "Password does not match"
                : ""}
            </p>
          </div>
          {autheticationLogicState.loadingRequest ? (
            <div className="infomation-loader-auth">
              <InformationLoader />
            </div>
          ) : (
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
                  valueValidityHandler(password, { minLength: 7 })
                    ? "valid"
                    : ""
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
                    setPasswordsMatch(false);
                    return;
                  }
                  submitRegisteringHandler();
                }}
              >
                {userRegistering ? "Create Account" : "Log in"}
              </button>
            </form>
          )}

          <div className="options">
            <p>or</p>
            <hr />
            <p
              className="options-message"
              onClick={() => {
                setUserRegistering((prev) => !prev);
                // resets the inputs to empty if the user moves between sign in and sign up
                setEmail("");
                setConfirmPassword("");
                setPassword("");
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

export default withErrorHandler(Authentication);
