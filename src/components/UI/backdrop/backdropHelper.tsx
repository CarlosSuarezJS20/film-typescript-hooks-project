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

  return (
    <div
      className={
        menuSectionState.show || autheticationBannerState.showBanner
          ? "backdrop show-backdrop"
          : "backdrop"
      }
      onClick={onMenuSectionHandler}
    ></div>
  );
};

export default BackDrop;
