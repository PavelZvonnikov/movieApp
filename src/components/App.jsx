import React from "react";

import Filters from "./Filters/Filters";
import MoviesList from "./Movies/MoviesList";

import { API_URL, API_KEY_3 } from "../api/api.js";
import { yearsList } from "../data/yearsList.js";

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      filters: {
        sort_by: "popularity.desc",
        year: 0
      },
      page: 1,
      yearsList: yearsList,
      amountFilms: 0,
      genres: [],
      genresList: {},
      queryGenres: ""
    };
  }

  onChangeFilters = e => {
    const newFilters = {
      ...this.state.filters,
      [e.target.name]: e.target.value
    };
    this.setState({
      filters: newFilters
    });
  };

  onChangePage = page => {
    this.setState({
      page: page
    });
  };

  getAmountPages = value => {
    this.setState({
      amountFilms: value
    });
  };

  clearFilters = () => {
    this.setState({
      filters: {
        sort_by: "popularity.desc",
        year: 0
      }
    });
  };

  getGenres = () => {
    const link = `${API_URL}/genre/movie/list?api_key=${API_KEY_3}&language=ru-RU`;
    fetch(link)
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data);
        this.setState({
          genres: data.genres
        });
      });
  };

  onChangeGenres = e => {
    this.setState({
      genresList: {
        ...this.state.genresList,
        [e.target.id]: e.target.checked
      }
    });
  };

  componentDidMount() {
    this.getGenres();
  }

  getQueryGenres = () => {
    const obj = this.state.genresList;
    const arr = Object.keys(obj);
    const result = arr.filter(key => obj[key]).join(",");
    this.setState({
      queryGenres: result
    });
  };

  render() {
    const { filters, page, yearsList, amountFilms, genres } = this.state;
    return (
      <div className="container">
        <div className="row mt-4">
          <div className="col-4">
            <div className="card" style={{ width: "100%" }}>
              <div className="card-body">
                <h3>Фильтры:</h3>
                <Filters
                  page={page}
                  filters={filters}
                  onChangeFilters={this.onChangeFilters}
                  onChangePage={this.onChangePage}
                  yearsList={yearsList}
                  amountFilms={amountFilms}
                  clearFilters={this.clearFilters}
                  genres={genres}
                  onChangeGenres={this.onChangeGenres}
                />
              </div>
            </div>
          </div>
          <div className="col-8">
            <MoviesList
              filters={filters}
              page={page}
              onChangePage={this.onChangePage}
              getAmountPages={this.getAmountPages}
              onChangeGenres={this.onChangeGenres}
            />
          </div>
        </div>
      </div>
    );
  }
}
