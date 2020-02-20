import React from "react";
import PropTypes from "prop-types";

import MovieItem from "./MovieItem";
import { MoviesHOC } from "../HOC/MoviesHOC";

import { FavoriteFilmsHOC } from "../HOC/FavoriteFilmsHOC";
import { WatchlistHOC } from "../HOC/WatchlistHOC";

const MoviesList = ({
  movies,
  favoriteFilms,
  watchlist,
  toggleFavorite,
  toggleWatchlist,
  ...props
}) => (
  <div className="row">
    {movies.map(movie => (
      <div key={movie.id} className="col-6 mb-4">
        <MovieItem
          item={movie}
          inWatchlist={Boolean(watchlist[movie.id])}
          favorite={Boolean(favoriteFilms[movie.id])}
          toggleFavorite={() => toggleFavorite(movie.id, props.user)}
          toggleWatchlist={() => toggleWatchlist(movie.id, props.user)}
        />
      </div>
    ))}
  </div>
);

MoviesList.defaultProps = {
  movies: []
};

MoviesList.propTypes = {
  movies: PropTypes.array.isRequired
};

export default WatchlistHOC(FavoriteFilmsHOC(MoviesHOC(MoviesList)));
