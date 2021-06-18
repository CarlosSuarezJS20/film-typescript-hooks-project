import React, { useEffect, useState } from "react";
import "./results.css";

import AddToWishlist from "../addToWishList/addToWishList";
import Footer from "../footer/footer";

// Router
import { NavLink, useHistory } from "react-router-dom";

// redux
import { useSelector, useDispatch } from "react-redux";
import { RootStore } from "../../store/store";

import { searchMultiFindFetchResponse } from "../../store/actions//SearchMultiRequestAction";

import { useLocation } from "react-router";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

//custome hook for passing params
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Results: React.FC = () => {
  // pagination local state handler
  const [page, setPage] = useState(1);
  const query = useQuery();
  const dispatch = useDispatch();
  const history = useHistory();

  const configMbdApiState = useSelector(
    (state: RootStore) => state.postApiConfigurationReducer
  );

  const moviesGenresState = useSelector(
    (state: RootStore) => state.postMoviesGenresReducer.genresResponseMbd
  );

  const tvGenresState = useSelector(
    (state: RootStore) =>
      state.postTvshowsGenresReducer.tvshowsGenresResponseMbd
  );

  const multiSearchState = useSelector(
    (state: RootStore) => state.searchMultiCapabilityR
  );

  useEffect(() => {
    // deals with the first query from user. So pagination can work during the initial render
    dispatch(
      searchMultiFindFetchResponse(
        `https://api.themoviedb.org/3/search/multi?api_key=${
          configMbdApiState.apiKey
        }&language=en-US&query=${query.get(
          "query"
        )}&page=${page}&include_adult=false`
      )
    );
  }, [query.get("query"), page]);

  // adds the genres to the result dynamically. We need to combine two responses
  const addsGenre = (mediaType: string, genreIds: number[]) => {
    const genresList =
      mediaType === "tv" ? tvGenresState?.genres : moviesGenresState?.genres;
    if (genresList && genreIds.length > 0) {
      const genres = genresList
        .filter((genres) => {
          return genreIds.includes(genres.id);
        })
        .map((genre) => {
          return genre.name;
        })[0];
      return <p>{genres.toString()}</p>;
    }
  };

  const gobackToPreviousPage = () => {
    history.goBack();
  };

  // deals with pagination
  const paginationHandler = (transition: string) => {
    if (page === 1 && transition === "-") {
      setPage(1);
    } else if (transition === "+") {
      setPage((prev) => prev + 1);
    } else {
      setPage((prev) => prev - 1);
    }
  };

  return (
    <div className="results-page">
      <header className="search-query-title">
        <div className="results-back-page-section">
          <p onClick={gobackToPreviousPage}>
            <span>
              <FontAwesomeIcon icon={faChevronLeft} />
            </span>
            back
          </p>
        </div>
        <h2>
          {/* Displays the results depending on new search or existing search */}
          <span>
            {multiSearchState.results && multiSearchState.results.total_results}
          </span>{" "}
          results for "<span>{query.get("query")}"</span>
        </h2>

        <hr className="search-query-title-highlight" />
      </header>
      <main className="results-holder">
        {multiSearchState.results?.results
          ? multiSearchState.results.results.map((result, index) => {
              if (!result.poster_path) {
                return;
              }

              return (
                // closeSearchInput function removed the search-input if on mobile version. if the user searches for another item
                <div key={index} className="result-page-item">
                  <NavLink
                    to={{
                      pathname: `${
                        result.media_type === "tv"
                          ? `/details/tv/${result.name}`
                          : `/details/movie/${result.title}`
                      }`,
                      state: { itemId: result.id },
                    }}
                    className="results-result-link"
                  >
                    <div className="results-result-link">
                      <div className="img-holder-results-page">
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
                        <AddToWishlist location="results" itemId={result.id} />
                      </div>
                      <div className="results-page-result-details">
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
                          addsGenre(result.media_type, result.genre_ids)
                        ) : (
                          <p>No genres found</p>
                        )}
                        <p>{result.vote_average}</p>
                        <h3 className="media-type">{result.media_type}</h3>
                      </div>
                    </div>
                  </NavLink>
                </div>
              );
            })
          : null}
      </main>
      {multiSearchState.results && multiSearchState.results!.total_pages > 1 && (
        <div className="pagination-btns-holder">
          <button
            disabled={page === 1}
            onClick={() => {
              paginationHandler("-");
            }}
          >
            previous
          </button>
          <button
            disabled={page === multiSearchState.results?.total_pages}
            onClick={() => {
              paginationHandler("+");
            }}
          >
            next
          </button>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Results;
