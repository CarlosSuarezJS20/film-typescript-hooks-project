import React, { useEffect, useState } from "react";
import "./instantResultsList.css";

import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import { RootStore } from "../../store/store";

interface PropsIntantR {
  closeSearchInput: () => void;
}

const InstantResultsList: React.FC<PropsIntantR> = ({ closeSearchInput }) => {
  // State from Store:

  const configMbdApiState = useSelector(
    (state: RootStore) => state.postApiConfigurationReducer
  );

  const multiResultsState = useSelector(
    (state: RootStore) => state.searchMultiCapabilityR
  );

  const moviesGenresState = useSelector(
    (state: RootStore) => state.postMoviesGenresReducer.genresResponseMbd
  );

  const tvGenresState = useSelector(
    (state: RootStore) =>
      state.postTvshowsGenresReducer.tvshowsGenresResponseMbd
  );

  // adds the genres to the result dynamically. We need to combine two responses
  const addsGenresList = (mediaType: string, genreIds: number[]) => {
    const genresList =
      mediaType === "tv" ? tvGenresState?.genres : moviesGenresState?.genres;
    if (genresList && genreIds.length > 0) {
      const genres = genresList
        .filter((genres) => {
          return genreIds.includes(genres.id);
        })
        .map((genre) => {
          return genre.name;
        });
      return <p>{genres.toString()}</p>;
    }
  };

  return (
    <ul className="results-list">
      {multiResultsState.results
        ? multiResultsState.results.results.map((result, index) => {
            if (!result.poster_path) {
              return;
            }
            return (
              // closeSearchInput function removed the search-input if on mobile version. if the user searches for another item
              <li key={index} className="result" onClick={closeSearchInput}>
                <NavLink
                  to={{
                    pathname: `${
                      result.media_type === "tv"
                        ? `/details/tv/${result.name}`
                        : `/details/movie/${result.title}`
                    }`,
                    state: { itemId: result.id },
                  }}
                  className="result-link"
                >
                  <div className="result-link">
                    <div className="img-holder">
                      <img
                        src={
                          result.poster_path
                            ? configMbdApiState.payload!.images
                                .secure_base_url +
                              configMbdApiState.payload!.images
                                .poster_sizes[6] +
                              result.poster_path
                            : ""
                        }
                        alt="poster"
                      />
                    </div>
                    <div className="result-details">
                      {result.title ? (
                        <h3 className="title" id="title">
                          {result.title}
                        </h3>
                      ) : result.name ? (
                        <h3 className="title" id="title">
                          {result.name}
                        </h3>
                      ) : (
                        <h3 className="title" id="title">
                          Title N/A
                        </h3>
                      )}
                      <h3>{`Release date: ${
                        result.release_date
                          ? result.release_date
                          : result.first_air_date
                          ? result.first_air_date
                          : "N/A"
                      }`}</h3>
                      {result.genre_ids.length > 0 ? (
                        addsGenresList(result.media_type, result.genre_ids)
                      ) : (
                        <p>No genres found</p>
                      )}
                      <h3 className="media-type">{result.media_type}</h3>
                    </div>
                  </div>
                </NavLink>
              </li>
            );
          })
        : null}
    </ul>
  );
};

export default InstantResultsList;
