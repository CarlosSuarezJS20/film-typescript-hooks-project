export const POST_API_MBD_CONFIGURATION_SUCCESS =
  "POST_API_MBD_CONFIGURATION_SUCCESS";
export const POST_API_MBD_LOADING = "POST_API_MBD_LOADING ";
export const POST_API_MBD_FAIL = "POST_API_MBD_FAIL";

export type payloadResponse = {
  image: {
    base_url: string;
    secure_base_url: string;
    backdrop_sizes: string[];
    logo_sizes: string[];
    poster_sizes: string[];
    profile_sizes: string[];
    still_sizes: string[];
    change_keys: string[];
  };
};

export interface ApiConfigurationSuccess {
  type: typeof POST_API_MBD_CONFIGURATION_SUCCESS;
  payload: payloadResponse;
}

export interface ApiConfigurationFail {
  type: typeof POST_API_MBD_FAIL;
  error: string;
}

export interface PostApiMbdLoading {
  type: typeof POST_API_MBD_LOADING;
}

export type requestFunction = (url: string) => void;

export type PostApiMbdConfigurationDispatchTypes =
  | ApiConfigurationSuccess
  | ApiConfigurationFail
  | PostApiMbdLoading;
