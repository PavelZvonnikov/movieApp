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

  getMovies = (filters, page, genres) => {
    const { sort_by, year } = filters;
    const { getAmountPages } = this.props;
    const link = `${API_URL}/discover/movie?api_key=${API_KEY_3}&language=ru-RU&sort_by=${sort_by}&page=${page}&primary_release_year=${year}`;
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
    // const {
    //   filters: { sort_by }
    // } = this.props;
    // const link = `${API_URL}/discover/movie?api_key=${API_KEY_3}&language=ru-RU&sort_by=${sort_by}`;
    // fetch(link)
    //   .then(response => {
    //     return response.json();
    //   })
    //   .then(data => {
    //     this.setState({
    //       movies: data.results
    //     });
    //   });
    this.getMovies(this.props.filters, this.props.page);
  }
  // componentWillReceiveProps(nextProps) {
  //   console.log("props", this.props, "nextProps", nextProps);
  //   if (nextProps.filters.sort_by !== this.props.filters.sort_by) {
  //     // const {
  //     //   filters: { sort_by }
  //     // } = nextProps;
  //     // const link = `${API_URL}/discover/movie?api_key=${API_KEY_3}&language=ru-RU&sort_by=${sort_by}`;
  //     // fetch(link)
  //     //   .then(response => {
  //     //     return response.json();
  //     //   })
  //     //   .then(data => {
  //     //     this.setState({
  //     //       movies: data.results
  //     //     });
  //     //   });
  //     this.getMovies(nextProps);
  //   }
  // }

  componentDidUpdate(prevProps) {
    console.log("componentDidUpdate", prevProps.page, this.props.page);
    if (this.props.filters.sort_by !== prevProps.filters.sort_by) {
      this.props.onChangePage(1);
      this.getMovies(this.props.filters, 1);
    }

    if (this.props.page !== prevProps.page) {
      this.getMovies(this.props.filters, this.props.page);
    }

    if (this.props.filters.year !== prevProps.filters.year) {
      this.props.onChangePage(1);
      this.getMovies(this.props.filters, 1);
    }

    // if (this.props.genresList !== prevProps.filters.genresList) {
    //   this.props.onChangeGenres();
    //   this.props.onChangePage(1);
    //   this.getMovies(this.props.filters, 1, this.props.queryGenres);
    // }
  }

  render() {
    const { movies } = this.state;
    return (
      <div className="row">
        {movies.map(movie => {
          return (
            <div key={movie.id} className="col-6 mb-4">
              <MovieItem item={movie} />
            </div>
          );
        })}
      </div>
    );
  }
}
