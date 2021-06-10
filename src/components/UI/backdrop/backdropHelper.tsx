import React from "react";
import "./backdropHelper.css";

import { useSelector, useDispatch } from "react-redux";
import { showMenuSectionHandler } from "../../../store/actions/actionsMenuSection/menuSectionShowHandler";
import { RootStore } from "../../../store/store";

const BackDrop: React.FC = () => {
  const dispatch = useDispatch();
  const menuSectionState = useSelector(
    (state: RootStore) => state.menuSectionR
  );

  const onMenuSectionHandler = () => {
    dispatch(showMenuSectionHandler());
  };

  return (
    <div
      className={menuSectionState.show ? "backdrop show-backdrop" : "backdrop"}
      onClick={onMenuSectionHandler}
    ></div>
  );
};

export default BackDrop;
