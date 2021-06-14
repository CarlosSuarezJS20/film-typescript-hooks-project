import React, { useEffect, useState } from "react";
import "./searchInput.css";

import { useSelector, useDispatch } from "react-redux";
import { RootStore } from "../../../store/store";

// actions
import { searchMultiFindFetchResponse } from "../../../store/actions/SearchMultiRequestAction";
import { storesUserSearchValueHandler } from "../../../store/actions/searchValueFromNavbarHandler";

// Helper function to debounce search input. Allows request after user stops typing
const debounceInput = (fn: (...args: any) => void, delay: number) => {
  let timerId: any;
  return (...args: any[]) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => fn(...args), delay);
  };
};

interface SearchInputProps {
  location: string;
  page: number;
}

const SearchInput: React.FC<SearchInputProps> = ({ location, page }) => {
  // State from Store:
  const dispatch = useDispatch();

  const configMbdApiState = useSelector(
    (state: RootStore) => state.postApiConfigurationReducer
  );

  const storeSearchValueState = useSelector(
    (state: RootStore) => state.searchValueFromInputHandlerR
  );

  useEffect(() => {
    if (storeSearchValueState.userSearchValue.length === 0) {
      return;
    }

    if (storeSearchValueState.userSearchValue.length >= 3) {
      dispatch(
        searchMultiFindFetchResponse(
          `https://api.themoviedb.org/3/search/multi?api_key=${configMbdApiState.apiKey}&language=en-US&query=${storeSearchValueState.userSearchValue}&page=${page}&include_adult=false`
        )
      );
    }
  }, [storeSearchValueState.userSearchValue, page]);

  const onChangeValueHanlder = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    dispatch(storesUserSearchValueHandler(e.target.value));
  };

  return (
    <input
      className={
        location === "results-page" ? "results-page-input" : "nav-bar-input"
      }
      type="text"
      onBlur={(e) => {
        e.target.value = "";
      }}
      placeholder="Search Living Room"
      onChange={debounceInput(onChangeValueHanlder, 1000)}
    />
  );
};

export default SearchInput;
