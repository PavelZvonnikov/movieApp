import React from "react";

import { CallApi } from "../../api/api.js";

export const FavoriteFilmsHOC = Component =>
  class HOC extends React.Component {
    constructor() {
      super();

      this.state = {
        isLoaded: false,
        favoriteFilms: {}
      };
    }

    toggleFavoriteFilm = filmID => {
      // const { favoriteFilms } = this.state;
      this.setState(prevState => ({
        favoriteFilms: {
          ...prevState.favoriteFilms,
          [filmID]: !prevState.favoriteFilms[filmID]
        }
      }));
    };

    toggleFavorite = (id, user) => {
      const { session_id } = this.props;
      const { favoriteFilms } = this.state;

      CallApi.post(`/account/${user.id}/favorite`, {
        params: {
          session_id: session_id
        },
        body: {
          media_type: "movie",
          media_id: id,
          favorite: !favoriteFilms[id]
        }
      });
      this.toggleFavoriteFilm(id);
    };

    favoriteFilmsCreateObj = filmsList => {
      const resultObj = {};
      filmsList.forEach(film => (resultObj[film.id] = true));
      return resultObj;
    };

    getData = () => {
      const { session_id, user } = this.props;
      CallApi.get(`/account/${user.id}/favorite/movies`, {
        params: {
          session_id: session_id,
          language: "ru-RU",
          sort_by: "created_at.asc"
        }
      }).then(({ results }) => {
        const favoriteFilms = this.favoriteFilmsCreateObj(results);
        this.setState({ favoriteFilms });
      });
    };

    getFavoriteFilms = () => {
      const { isLoaded } = this.state;
      const { user } = this.props;
      if (!isLoaded && user && user.id) {
        this.getData();
        this.setState({
          isLoaded: true
        });
      }
    };

    componentDidMount() {
      this.getFavoriteFilms();
    }

    componentDidUpdate() {
      this.getFavoriteFilms();
    }

    render() {
      const { favoriteFilms } = this.state;
      return (
        <Component
          {...this.props}
          favoriteFilms={favoriteFilms}
          toggleFavorite={this.toggleFavorite}
        />
      );
    }
  };
