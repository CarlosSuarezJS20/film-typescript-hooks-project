import React from "react";
import "./backdropHelper.css";

import { useSelector, useDispatch } from "react-redux";
import { showMenuSectionHandler } from "../../../store/actions/actionsMenuSection/menuSectionShowHandler";
import { authenticationBannerHandler } from "../../../store/actions/actionsAuthentication/authenticationBannerHandler";

import { RootStore } from "../../../store/store";

const BackDrop: React.FC = () => {
  const dispatch = useDispatch();
  const menuSectionState = useSelector(
    (state: RootStore) => state.menuSectionR
  );

  const autheticationBannerState = useSelector(
    (state: RootStore) => state.authenticationBannerHandlerR
  );

  const onMenuSectionHandler = () => {
    dispatch(showMenuSectionHandler());
  };

  const onAutheticationBannerHandler = () => {
    dispatch(authenticationBannerHandler());
  };

  return (
    <div
      className={
        menuSectionState.show || autheticationBannerState.showBanner
          ? "backdrop show-backdrop"
          : "backdrop"
      }
      onClick={() => {
        //  this allows the if statement to action the correct function depending on what backdrop is showing
        if (menuSectionState.show) {
          onMenuSectionHandler();
        } else {
          onAutheticationBannerHandler();
        }
      }}
    ></div>
  );
};

export default BackDrop;
