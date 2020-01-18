import React from "react";
// import { API_URL, API_KEY_3 } from "../../api/api";
import { CallApi } from "../../api/api";

export default Component =>
  class MoviesHOC extends React.Component {
    constructor() {
      super();

      this.state = {
        movies: []
      };
    }

    // getMovies = () => {
    //   const {
    //     page,
    //     filters: { sort_by, year },
    //     genres,
    //     getAmountPages
    //   } = this.props;

    //   let genresStr = "";
    //   genres.forEach(({ id, checked }) => {
    //     if (checked) {
    //       if (genresStr.length) {
    //         genresStr = `${genresStr},${id}`;
    //       } else {
    //         genresStr = `${id}`;
    //       }
    //     }
    //   });

    //   const genresQuery = genresStr ? `&with_genres=${genresStr}` : "";
    //   const yearQuery = year ? `&primary_release_year=${year}` : "";
    //   const pageQuery = page ? `&page=${page}` : "";
    //   const sortQuery = sort_by ? `&sort_by=${sort_by}` : "";
    //   console.log(genresQuery);
    //   const link = `${API_URL}/discover/movie?api_key=${API_KEY_3}&language=ru-RU${sortQuery}${pageQuery}${yearQuery}${genresQuery}`;
    //   fetch(link)
    //     .then(response => {
    //       return response.json();
    //     })
    //     .then(data => {
    //       this.setState({
    //         movies: data.results
    //       });
    //       return data;
    //     })
    //     .then(data => {
    //       getAmountPages(data.total_pages);
    //     });
    // };

    getFavoriteMovies = () => {
      const queryStringParams = {
        language: "ru-RU"
      };
    };

    getMovies = () => {
      const {
        page,
        filters: { sort_by, year },
        genres,
        getAmountPages
      } = this.props;

      const queryStringParams = {
        language: "ru-RU",
        sort_by: sort_by,
        page: page,
        primary_release_year: year
      };

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

      if (genresStr.length > 0) {
        queryStringParams.with_genres = genresStr;
      }
      CallApi.get("/discover/movie", {
        params: queryStringParams
      })
        .then(data => {
          console.log(data);
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

      return <Component movies={movies} {...this.props} />;
    }
  };
