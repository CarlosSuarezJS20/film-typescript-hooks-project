import React from "react";
import "./logo.css";

import { NavLink } from "react-router-dom";

const Logo: React.FC = () => {
  return (
    <NavLink className="logo" to="/home">
      <div className="living">L</div>
      <div className="room">R</div>
    </NavLink>
  );
};

export default Logo;
