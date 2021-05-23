import React, { useEffect, useState } from "react";
import "./instantResultsList.css";

import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import { RootStore } from "../../store/store";
import { getConfigFileParsingDiagnostics } from "typescript";

const InstantResultsList: React.FC = () => {
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
              <li key={index} className="result">
                <NavLink
                  to={`/details/movie/:movie-title`}
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
                                .poster_sizes[3] +
                              result.poster_path
                            : ""
                        }
                        alt="poster"
                      />
                    </div>
                    <div className="result-details">
                      {result.title ? (
                        <h3 className="title">{result.title}</h3>
                      ) : (
                        <h3 className="title">Title N/A</h3>
                      )}
                      <h3>{`Release date: ${
                        result.release_date ? result.release_date : "N/A"
                      }`}</h3>
                      {result.genre_ids.length > 0 ? (
                        addsGenresList(result.media_type, result.genre_ids)
                      ) : (
                        <p>No genres found</p>
                      )}
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
