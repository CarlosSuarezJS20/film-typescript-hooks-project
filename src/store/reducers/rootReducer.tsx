import { combineReducers } from "redux";
import postApiMbdConfigurationReducer from "../reducers/postApiMbdConfigurationReducer";

const rootReducer = combineReducers({
  postApiConfigurationReducer: postApiMbdConfigurationReducer,
});

export default rootReducer;
