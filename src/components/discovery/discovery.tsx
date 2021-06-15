import React, { useEffect, useState } from "react";
import "./discovery.css";

import MainNavigation from "../mainNavigation/mainNavigation";
import AddToWishlist from "../addToWishList/addToWishList";
import Footer from "../footer/footer";

import { useHistory, NavLink } from "react-router-dom";

// Request action
import { getDiscoverRequest } from "../../store/actions/GetDiscoverRequest";

import { useSelector, useDispatch } from "react-redux";
import { RootStore } from "../../store/store";

const Discovery: React.FC = () => {
  // local state for search query set up
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [voteAverage, setVoteAverage] = useState<null | string>(null);
  const [withGenres, setWithGenres] = useState<null | string>(null);
  const [year, setYear] = useState<null | string>(null);
  const [page, setPage] = useState(1);
  const history = useHistory();
  const dispatch = useDispatch();

  // fetches necessary configurations for elements img size etc.
  const mDBConfigState = useSelector(
    (state: RootStore) => state.postApiConfigurationReducer
  );

  const getDiscoverRequestState = useSelector(
    (state: RootStore) => state.getDiscoverR
  );

  const moviesGenresState = useSelector(
    (state: RootStore) => state.postMoviesGenresReducer.genresResponseMbd
  );

  const tvGenresState = useSelector(
    (state: RootStore) =>
      state.postTvshowsGenresReducer.tvshowsGenresResponseMbd
  );

  useEffect(() => {
    dispatch(
      getDiscoverRequest(
        `https://api.themoviedb.org/3/discover/movie?api_key=${
          mDBConfigState.apiKey
        }&language=en-US&sort_by=${sortBy}&include_adult=false&include_video=false&page=${page}&${
          voteAverage ? `vote_average.gte=${voteAverage}&` : ""
        }${withGenres ? `with_genres=${withGenres}&` : ""}${
          year ? `year=${year}` : ""
        }`
      )
    );
  }, [page]);

  const addsGenre = (genreIds: number[]) => {
    const genresList = moviesGenresState?.genres;
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

  const onRequestHandler = () => {
    dispatch(
      getDiscoverRequest(
        `https://api.themoviedb.org/3/discover/movie?api_key=${
          mDBConfigState.apiKey
        }&language=en-US&sort_by=${sortBy}&include_adult=false&include_video=false&page=${page}&${
          voteAverage ? `vote_average.gte=${voteAverage}&` : ""
        }${withGenres ? `with_genres=${withGenres}&` : ""}${
          year ? `year=${year}` : ""
        }`
      )
    );
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
    <React.Fragment>
      <div className="discovery">
        <MainNavigation />
        <header className="form-section">
          <h1>Discover Movies</h1>
          <hr className="title-highlighter" />
          <form className="discover-form" method="GET" action="/">
            <div className="filters">
              <select
                className="filter-discover"
                name="sort_by"
                onChange={(e) => {
                  setSortBy(e.target.value);
                }}
              >
                <option value="popularity.desc">Popularity Descending</option>
                <option value="popularity.asc">Popularity Ascending</option>
                <option value="release_date.desc">
                  Release Date Descending
                </option>
                <option value="release_date.asc">Release Date Ascending</option>
                <option value="revenue.desc">Revenue Descending</option>
                <option value="revenue.asc">Revenue Ascending</option>
                <option value="vote_average.desc">
                  Vote Average Descending
                </option>
                <option value="vote_average.asc">Vote Average Ascending</option>
              </select>
              <input
                type="number"
                className="filter-discover"
                name="vote_average"
                placeholder="Vote Average"
                max="10"
                min="1"
                onChange={(e) => {
                  setVoteAverage(e.target.value);
                }}
              />
              <input
                className="filter-discover"
                type="text"
                name="with_genres"
                placeholder="Genres"
                onChange={(e) => {
                  setWithGenres(e.target.value);
                }}
              />
              <input
                className="filter-discover"
                type="number"
                name="year"
                placeholder="Year"
                onChange={(e) => {
                  setYear(e.target.value);
                }}
              />
            </div>
            <button
              className="discovery-search-btn"
              onClick={(e) => {
                e.preventDefault();
                onRequestHandler();
              }}
            >
              Search
            </button>
          </form>
        </header>
        <main className="results-holder">
          {getDiscoverRequestState.response?.results
            ? getDiscoverRequestState.response.results.map((result, index) => {
                if (!result.poster_path) {
                  return;
                }
                return (
                  // closeSearchInput function removed the search-input if on mobile version. if the user searches for another item
                  <div key={index} className="result-page-item">
                    <NavLink
                      to={{
                        pathname: `/details/movie/${result.title}`,
                        state: { itemId: result.id },
                      }}
                      className="results-result-link"
                    >
                      <div className="results-result-link">
                        <div className="img-holder-results-page">
                          <img
                            src={
                              result.poster_path
                                ? mDBConfigState.payload!.images
                                    .secure_base_url +
                                  mDBConfigState.payload!.images
                                    .poster_sizes[6] +
                                  result.poster_path
                                : ""
                            }
                            alt="poster"
                          />
                          <AddToWishlist location="results" />
                        </div>
                        <div className="results-page-result-details">
                          {result.title ? (
                            <h3 className="title" id="title">
                              {result.title}
                            </h3>
                          ) : result.title ? (
                            <h3 className="title" id="title">
                              {result.title}
                            </h3>
                          ) : (
                            <h3 className="title" id="title">
                              Title N/A
                            </h3>
                          )}
                          <h3>{`Release date: ${
                            result.release_date ? result.release_date : "N/A"
                          }`}</h3>
                          {result.genre_ids.length > 0 ? (
                            addsGenre(result.genre_ids)
                          ) : (
                            <p>No genres found</p>
                          )}
                          <p>{result.vote_average}</p>
                        </div>
                      </div>
                    </NavLink>
                  </div>
                );
              })
            : null}
        </main>
        <div className="discovery-pagination">
          <button
            disabled={page === 1}
            onClick={() => {
              paginationHandler("-");
            }}
          >
            Previous
          </button>
          <button
            disabled={page === getDiscoverRequestState.response?.total_pages}
            onClick={() => {
              paginationHandler("+");
            }}
          >
            Next
          </button>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Discovery;
