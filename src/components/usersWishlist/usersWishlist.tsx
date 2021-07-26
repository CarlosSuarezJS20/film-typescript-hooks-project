import React, { useEffect, useState } from "react";
import "./usersWishlist.scss";

import MainNavigation from "../mainNavigation/mainNavigation";
import Footer from "../footer/footer";

import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { storesUserSearchValueHandler } from "../../store/actions/searchValueFromNavbarHandler";
import { updateItemFfromUserWishlist } from "../../store/actions/actionsWishlist/updateItemFromWishlistRequest";
import { RootStore } from "../../store/store";
import axios from "axios";

// Types for the responses:

type movieResponse = {
  id: number;
  poster_path: string | null;
  backdrop_path: string | null;
  title: string;
  overview: string | null;
  vote_average: number;
  genres: { id: number; name: string }[];
  original_language: string;
  status: string;
  watched: boolean;
  release_date: string;
};

type tvShowsResponse = {
  id: number;
  poster_path: string | null;
  backdrop_path: string | null;
  title?: string;
  name?: string;
  overview: string | null;
  vote_average: number;
  genres: { id: number; name: string }[];
  original_language: string;
  status: string;
  watched: boolean;
  first_air_date: string;
};

const AddToWishlist: React.FC = () => {
  const [moviesInWishlist, setMoviesInWish] = useState<movieResponse[]>([]);
  const [tvshowsInWishlist, setTvshowsInWish] = useState<tvShowsResponse[]>([]);
  const dispatch = useDispatch();

  //  StoreSearchValue
  const configMDBState = useSelector(
    (state: RootStore) => state.postApiConfigurationReducer
  );

  const authenticationState = useSelector(
    (state: RootStore) => state.authenticationLogicR
  );

  //  StoreSearchValue
  const storeSearchValueHandlerState = useSelector(
    (state: RootStore) => state.searchValueFromInputHandlerR
  );

  //   wishlist state
  const wishlistItemsState = useSelector(
    (state: RootStore) => state.getItemsWishListR
  );

  useEffect(() => {
    // fetches the different items depending on the type. This is for displaying the details in the UI
    if (authenticationState.authToken) {
      wishlistItemsState.payload!.map((item) => {
        if (item.type === "movie") {
          axios
            .get(
              `https://api.themoviedb.org/3/movie/${item.id}?api_key=${configMDBState.apiKey}&language=en-US`
            )
            .then((res) => {
              const movie: movieResponse = {
                ...res.data,
                watched: item.watched,
              };
              setMoviesInWish((prev) => [...prev, movie]);
            })
            .catch((e) => {
              console.log(e);
            });
          return;
        }
        axios
          .get(
            `https://api.themoviedb.org/3/tv/${item.id}?api_key=${configMDBState.apiKey}&language=en-US`
          )
          .then((res) => {
            const tvshows: tvShowsResponse = {
              ...res.data,
              watched: item.watched,
            };
            setTvshowsInWish((prev) => [...prev, tvshows]);
          })
          .catch((e) => {
            console.log(e);
          });
      });
    }
  }, [authenticationState.authToken, configMDBState.apiKey, dispatch]);

  // closes the instant results div if user clicks outside the div. This is done in all the components
  const resetsUserSearchHandler = () => {
    if (storeSearchValueHandlerState.userSearchValue.length > 0) {
      dispatch(storesUserSearchValueHandler(""));
    }
  };

  const onWatchedMoviesFromWishListHandler = (
    itemId: number,
    isWatchingAgain?: boolean
  ) => {
    const updatedList = moviesInWishlist.map((item) => {
      if (item.id === itemId) {
        // prepares the item to be updated in the firebase database
        const itemToUpdate = wishlistItemsState.payload!.find(
          (item) => itemId === item.id
        );

        // allows user to undo if they click watched by mistake
        itemToUpdate!.watched = isWatchingAgain ? false : true;
        dispatch(
          updateItemFfromUserWishlist(
            `https://living-room-3a1ec-default-rtdb.europe-west1.firebasedatabase.app/items/${
              itemToUpdate!.itemId
            }.json?`,
            itemToUpdate!
          )
        );
        return { ...item, watched: isWatchingAgain ? false : true };
      }
      return item;
    });
    setMoviesInWish(updatedList);
  };

  const onWatchedTvshowFromWishListHandler = (
    itemId: number,
    isWatchingAgain?: boolean
  ) => {
    const updatedTvshowsList = tvshowsInWishlist.map((item) => {
      if (item.id === itemId) {
        // async to change the status
        // prepares the item to be updated in the firebase database
        const itemToUpdate = wishlistItemsState.payload!.find(
          (item) => itemId === item.id
        );

        // allows user to undo if they click watched by mistake
        itemToUpdate!.watched = isWatchingAgain ? false : true;
        dispatch(
          updateItemFfromUserWishlist(
            `https://living-room-3a1ec-default-rtdb.europe-west1.firebasedatabase.app/items/${
              itemToUpdate!.itemId
            }.json?`,
            itemToUpdate!
          )
        );
        return { ...item, watched: isWatchingAgain ? false : true };
      }
      return item;
    });
    setTvshowsInWish(updatedTvshowsList);
  };

  return !authenticationState.authToken ? (
    <Redirect to="/home" />
  ) : (
    <div onClick={resetsUserSearchHandler}>
      <MainNavigation />
      <main className="wishlist">
        <div className="wishlist__wishlist-title">
          <h2>Your living room list</h2>
          <hr />
        </div>
        <div className="wishlist__lists">
          {moviesInWishlist.length >= 0 || tvshowsInWishlist.length >= 0 ? (
            <React.Fragment>
              <div className="list-holder-main">
                <div className="list-holder-main__list-title">
                  <h2>Your movies</h2>
                </div>
                <div
                  className={
                    moviesInWishlist.length > 0
                      ? "list-holder-main__list"
                      : "list-holder-main__list-no-items"
                  }
                >
                  {moviesInWishlist.length > 0 ? (
                    moviesInWishlist.map((item, idx) => (
                      <div
                        key={`${idx}-movie`}
                        className="wishlist-item-holder"
                      >
                        {item.watched && (
                          <div className="wishlist-item-holder__watched-message">
                            <h2>watched!</h2>
                            <button
                              onClick={() => {
                                onWatchedMoviesFromWishListHandler(
                                  item.id,
                                  true
                                );
                              }}
                            >
                              watch again
                            </button>
                          </div>
                        )}
                        <NavLink
                          key={idx}
                          to={{
                            pathname: `/details/movie/${item.title}`,
                            state: { itemId: item.id },
                          }}
                        >
                          <img
                            src={
                              item.poster_path
                                ? configMDBState.payload!.images
                                    .secure_base_url +
                                  configMDBState.payload!.images
                                    .poster_sizes[6] +
                                  item.poster_path
                                : ""
                            }
                            alt="poster"
                          />
                        </NavLink>
                        <div className="wishlist-item-details">
                          {item.title ? (
                            <h3 className="title" id="title">
                              {item.title}
                            </h3>
                          ) : (
                            <h3 className="title" id="title">
                              Title N/A
                            </h3>
                          )}
                          <h3>{`${
                            item.release_date ? item.release_date : "N/A"
                          }`}</h3>
                          <p>{item.vote_average}</p>
                          {!item.watched && (
                            <button
                              className="watch-again-btn"
                              onClick={() => {
                                onWatchedMoviesFromWishListHandler(item.id);
                              }}
                            >
                              watched it?
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="no-items-message">
                      No items in your watch list
                    </p>
                  )}
                </div>
              </div>
              <div className="list-holder-main">
                <div className="list-holder-main__list-title">
                  <h2>Your Tv shows</h2>
                </div>
                <div
                  className={
                    tvshowsInWishlist.length > 0
                      ? "list-holder-main__list"
                      : "list-holder-main__list-no-items"
                  }
                >
                  {tvshowsInWishlist.length > 0 ? (
                    tvshowsInWishlist.map((item, idx) => (
                      <div key={`${idx}-tv`} className="wishlist-item-holder">
                        {item.watched && (
                          <div className="wishlist-item-holder__watched-message">
                            <h2>watched!</h2>
                            <button
                              onClick={() => {
                                onWatchedTvshowFromWishListHandler(
                                  item.id,
                                  true
                                );
                              }}
                            >
                              watch again
                            </button>
                          </div>
                        )}

                        <NavLink
                          key={idx}
                          to={{
                            pathname: `/details/tv/${item.name}`,
                            state: { itemId: item.id },
                          }}
                        >
                          <img
                            src={
                              item.poster_path
                                ? configMDBState.payload!.images
                                    .secure_base_url +
                                  configMDBState.payload!.images
                                    .poster_sizes[6] +
                                  item.poster_path
                                : ""
                            }
                            alt="poster"
                          />
                        </NavLink>
                        <div className="wishlist-item-details">
                          {item.name ? (
                            <h3 className="title" id="title">
                              {item.name}
                            </h3>
                          ) : (
                            <h3 className="title" id="title">
                              Title N/A
                            </h3>
                          )}
                          <h3>{`${
                            item.first_air_date ? item.first_air_date : "N/A"
                          }`}</h3>
                          <p>{item.vote_average}</p>
                          {!item.watched && (
                            <button
                              onClick={() => {
                                onWatchedTvshowFromWishListHandler(item.id);
                              }}
                            >
                              watched it?
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="no-items-message">
                      No items in your watch list
                    </p>
                  )}
                </div>
              </div>
            </React.Fragment>
          ) : (
            <div>there arent</div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AddToWishlist;
