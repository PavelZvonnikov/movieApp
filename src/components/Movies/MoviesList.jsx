import React, { Component } from "react";
import MovieItem from "./MovieItem";
import { API_URL, API_KEY_3 } from "../../api/api";

export default class MovieList extends Component {
  constructor() {
    super();

    this.state = {
      movies: []
    };
  }

  getMovies = () => {
    const { page, filters, genres, getAmountPages } = this.props;
    const { sort_by, year } = filters;

    let genresStr = ''
    genres.forEach(({ id, checked }) => {
      if (checked) {
        if (genresStr.length) {
          genresStr = `${genresStr},${id}`;
        } else {
          genresStr = `${id}`;
        }
      }
    });

    const genresQuery = genresStr ? `&with_genres=${genresStr}` : '';
    const yearQuery = year ? `&primary_release_year=${year}` : '';
    const pageQuery = page ? `&page=${page}` : '';
    const sortQuery = sort_by ? `&sort_by=${sort_by}` : '';

    const link = `${API_URL}/discover/movie?api_key=${API_KEY_3}&language=ru-RU${sortQuery}${pageQuery}${yearQuery}${genresQuery}`;
    fetch(link)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({
          movies: data.results
        });
        return data;
      })
      .then(data => {
        getAmountPages(data.total_pages);
      });
  };

  componentDidMount() {
    this.getMovies();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.filters.year !== prevProps.filters.year
      || this.props.page !== prevProps.page
      || this.props.filters.sort_by !== prevProps.filters.sort_by
      || this.props.genres !== prevProps.genres
    ) {
      this.getMovies();
    }
  }

  render() {
    const { movies } = this.state;
    return (
      <div className="row">
        {movies.map(movie => (
          <div key={movie.id} className="col-6 mb-4">
            <MovieItem item={movie} />
          </div>
        ))}
      </div>
    );
  }
}
