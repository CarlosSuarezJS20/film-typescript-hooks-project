export const GET_PEOPLE_DETAILS_REQ_SUCCESS = "GET_PEOPLE_DETAILS_REQ_SUCCESS";
export const GET_PEOPLE_REQUEST_LOADING = "GET_PEOPLE_REQUEST_LOADING";
export const GET_PEOPLE_REQUEST_FAIL = "GET_PEOPLE_REQUEST_FAIL";

// Using a Global Interfaces and Types that will work across all Async actions

export interface GetPeopleDetailsRequestFail {
  type: typeof GET_PEOPLE_REQUEST_FAIL;
  error: string;
}

export interface GetPeopleDetailsLoading {
  type: typeof GET_PEOPLE_REQUEST_LOADING;
}

export type getPeopleDetailsFunction = (url: string) => void;

// GET ACTOR DETAILS

export type getPeopleDetailsRequestResponse = {
  id: number;
  name: string;
  biography: string;
  birthday: string | null;
  place_of_birth: string;
  profile_path: string | null;
};

export interface GetPeopleDetailsRequestSuccess {
  type: typeof GET_PEOPLE_DETAILS_REQ_SUCCESS;
  getActorDetailsResponse: getPeopleDetailsRequestResponse;
}

export type getPeopleDetailsRequestDispatchTypes =
  | GetPeopleDetailsRequestSuccess
  | GetPeopleDetailsRequestFail
  | GetPeopleDetailsLoading;

// GET ACTOR COMBINED CREDITS

export const GET_PEOPLE_COMBINED_CREDIT_REQ_SUCCESS =
  "GET_PEOPLE_COMBINED_CREDIT_REQ_SUCCESS";

type creditDetails = {
  backdrop_path: string;
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  media_type: string;
};

export type getPeopleCombinedCreditsRequestResponse = {
  cast: creditDetails[];
};

export interface GetPeopleCombinedCreditsRequestSuccess {
  type: typeof GET_PEOPLE_COMBINED_CREDIT_REQ_SUCCESS;
  getPeopleCombinedCreditsResponse: getPeopleCombinedCreditsRequestResponse;
}

export type getPeopleCombinedCreditsRequestDispatchTypes =
  | GetPeopleCombinedCreditsRequestSuccess
  | GetPeopleDetailsRequestFail
  | GetPeopleDetailsLoading;
