import React, { Component } from "react";
import MoviesList from "./MoviesList";
import { API_URL, API_KEY_3 } from "../../api/api";

export class MoviesContainer extends Component {
  constructor() {
    super();

    this.state = {
      movies: []
    };
  }

  getMovies = () => {
    const {
      page,
      filters: { sort_by, year },
      genres,
      getAmountPages
    } = this.props;

    let genresStr = "";
    genres.forEach(({ id, checked }) => {
      if (checked) {
        if (genresStr.length) {
          genresStr = `${genresStr},${id}`;
        } else {
          genresStr = `${id}`;
        }
      }
    });

    const genresQuery = genresStr ? `&with_genres=${genresStr}` : "";
    const yearQuery = year ? `&primary_release_year=${year}` : "";
    const pageQuery = page ? `&page=${page}` : "";
    const sortQuery = sort_by ? `&sort_by=${sort_by}` : "";

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
      this.props.filters.year !== prevProps.filters.year ||
      this.props.page !== prevProps.page ||
      this.props.filters.sort_by !== prevProps.filters.sort_by ||
      this.props.genres !== prevProps.genres
    ) {
      this.getMovies();
    }
  }

  render() {
    const { movies } = this.state;
    return <MoviesList movies={movies} />;
  }
}
