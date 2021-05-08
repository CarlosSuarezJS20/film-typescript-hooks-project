import React, { useEffect } from "react";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { postMDBConfigurationApi } from "./store/actions/PostApiMbdConfigAction";
import { RootStore } from "./store/store";

function App() {
  const dispatch = useDispatch();
  const configMbdApiState = useSelector(
    (state: RootStore) => state.postApiConfigurationReducer
  );
  useEffect(() => {
    dispatch(
      postMDBConfigurationApi(
        `https://api.themoviedb.org/3/configuration?api_key=${configMbdApiState.apiKey}`
      )
    );
  }, []);

  return <div className="App"></div>;
}

export default App;
