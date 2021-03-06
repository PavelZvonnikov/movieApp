import React from "react";

import { Filters } from "../../Filters/Filters";
import MoviesList from "../../Movies/MoviesList";
import { yearsList } from "../../../data/yearsList.js";
import { CallApi } from "../../../api/api.js";

export default class MoviesPage extends React.Component {
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
      genres: []
    };
  }

  onChangeFilters = e => {
    const newFilters = {
      ...this.state.filters,
      [e.target.name]: e.target.value
    };
    this.setState({
      filters: newFilters,
      page: 1
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
      },
      page: 1
    });
  };

  clearFilters = () => {
    this.setState(prevState => {
      return {
        filters: {
          sort_by: "popularity.desc",
          year: 0
        },
        page: 1,
        genres: prevState.genres.map(genres => ({ ...genres, checked: false }))
      };
    });
  };

  getGenres = () => {
    CallApi.get("/genre/movie/list", {
      params: {
        language: "ru-RU"
      }
    }).then(({ genres }) => {
      console.log("genres", genres);
      this.setState({
        genres: genres.map(genres => ({ ...genres, checked: false }))
      });
    });
  };

  onChangeGenres = ({ target: { id } }) => {
    const { genres } = this.state;

    const newGenresList = genres.map(genre =>
      genre.id === Number(id)
        ? {
            ...genre,
            checked: !genre.checked
          }
        : {
            ...genre
          }
    );

    this.setState({
      genres: newGenresList,
      page: 1
    });
  };

  componentDidMount() {
    this.getGenres();
  }

  render() {
    const { filters, page, yearsList, amountFilms, genres } = this.state;
    const { user, session_id } = this.props;

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
              genres={genres}
              page={page}
              onChangePage={this.onChangePage}
              getAmountPages={this.getAmountPages}
              onChangeGenres={this.onChangeGenres}
              session_id={session_id}
              user={user}
            />
          </div>
        </div>
      </div>
    );
  }
}
