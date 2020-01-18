import React from "react";
import MovieItem from "./MovieItem";
import PropTypes from "prop-types";
import MoviesHOC from "./MoviesHOC";

import { FavoriteFilmsHOC } from '../HOC/FavoriteFilmsHOC';

const MoviesList = ({ movies, favoriteFilms, toggleFavoriteFilm }) => (
  <div className="row">
    {movies.map(movie => (
      <div key={movie.id} className="col-6 mb-4">
        <MovieItem
          item={movie}
          favorite={Boolean(favoriteFilms[movie.id])}
          toggleFavoriteFilm={toggleFavoriteFilm}
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

export default FavoriteFilmsHOC(MoviesHOC(MoviesList));
