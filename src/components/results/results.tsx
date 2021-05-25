import React, { useEffect } from "react";
import "./results.css";

// redux
import { useSelector } from "react-redux";
import { RootStore } from "../../store/store";

import { useLocation } from "react-router";

//custome hook for passing params
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Results: React.FC = () => {
  const query = useQuery();

  const multiSearchState = useSelector(
    (state: RootStore) => state.searchMultiCapabilityR
  );

  const searchValueState = useSelector(
    (state: RootStore) => state.searchValueFromInputHandlerR
  );

  return (
    <div className="results-page">
      <h1>{`results ${query.get("query")}`}</h1>
    </div>
  );
};

export default Results;
