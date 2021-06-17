import {
  setAuthenticationBannerTypes,
  SET_AUTHENTICATION_BANNER_HANDLER,
} from "../../actions/actionsAuthentication/AuthenticationBannerTypes";

interface DefaultStateInt {
  showBanner: boolean;
}

const initialState = {
  showBanner: false,
};

const authenticationBannerHandlerReducer = (
  state: DefaultStateInt = initialState,
  action: setAuthenticationBannerTypes
): DefaultStateInt => {
  switch (action.type) {
    case SET_AUTHENTICATION_BANNER_HANDLER:
      return {
        showBanner: !state.showBanner,
      };
    default:
      return state;
  }
};

export default authenticationBannerHandlerReducer;
