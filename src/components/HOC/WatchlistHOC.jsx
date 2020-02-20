import React from "react";

import { CallApi } from "../../api/api.js";

export const WatchlistHOC = Component =>
  class HOC extends React.Component {
    constructor() {
      super();

      this.state = {
        isLoaded: false,
        watchlist: {}
      };
    }

    toggleWatchlistFilm = filmID => {
      const { watchlist } = this.state;
      this.setState({
        watchlist: {
          ...watchlist,
          [filmID]: !watchlist[filmID]
        }
      });
    };

    toggleWatchlist = (id, user) => {
      const { session_id } = this.props;
      const { watchlist } = this.state;
      CallApi.post(`/account/${user.id}/watchlist`, {
        params: {
          session_id: session_id
        },
        body: {
          media_type: "movie",
          media_id: id,
          watchlist: !watchlist[id]
        }
      });
      this.toggleWatchlistFilm(id);
    };

    watchlistFilmsCreateObj = filmsList => {
      const resultObj = {};
      filmsList.forEach(film => (resultObj[film.id] = true));
      return resultObj;
    };

    getData = () => {
      const { session_id, user } = this.props;
      CallApi.get(`/account/${user.id}/watchlist/movies`, {
        params: {
          session_id: session_id,
          language: "ru-RU",
          sort_by: "created_at.asc"
        }
      }).then(({ results }) => {
        const watchlist = this.watchlistFilmsCreateObj(results);
        this.setState({ watchlist });
      });
    };

    getWatchlist = () => {
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
      this.getWatchlist();
    }

    componentDidUpdate() {
      this.getWatchlist();
    }

    render() {
      const { watchlist } = this.state;

      return (
        <Component
          {...this.props}
          watchlist={watchlist}
          toggleWatchlist={this.toggleWatchlist}
        />
      );
    }
  };
