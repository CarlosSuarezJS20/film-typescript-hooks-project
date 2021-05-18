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
  biography: string;
  birthday: string | null;
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

export type getPeopleCombinedCreditsRequestResponse = {};

export interface GetPeopleCombinedCreditsRequestSuccess {
  type: typeof GET_PEOPLE_COMBINED_CREDIT_REQ_SUCCESS;
  getPeopleCombinedCreditsResponse: getPeopleCombinedCreditsRequestResponse;
}

export type getPeopleCombinedCreditsRequestDispatchTypes =
  | GetPeopleCombinedCreditsRequestSuccess
  | GetPeopleDetailsRequestFail
  | GetPeopleDetailsLoading;
