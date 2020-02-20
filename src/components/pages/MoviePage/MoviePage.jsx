import React from "react";
import { CallApi } from "../../../api/api";
import { Star } from "../../Icons/Star";
import { BookMark } from "../../Icons/BookMark";
import { ToggleList } from "../../toggleList/ToggleList";
import { MovieTab } from "./MovieTab/MovieTab";
import { FavoriteFilmsHOC } from "../../HOC/FavoriteFilmsHOC";
import { WatchlistHOC } from "../../HOC/WatchlistHOC";
import { AppContextHOC } from "../../HOC/AppContextHOC";

class MoviePage extends React.Component {
  state = {
    movie: {}
  };

  // toggleFavorite = () => {
  //   const { toggleFavoriteFilm, user, session_id, favoriteFilms } = this.props;
  //   const { movie } = this.state;

  //   CallApi.post(`/account/${user.id}/favorite`, {
  //     params: {
  //       session_id: session_id
  //     },
  //     body: {
  //       media_type: "movie",
  //       media_id: movie.id,
  //       favorite: !favoriteFilms[movie.id]
  //     }
  //   });
  //   toggleFavoriteFilm(movie.id);
  // };

  // toggleWatchlist = () => {
  //   const { toggleWatchlistFilm, user, session_id, watchlist } = this.props;
  //   const { movie } = this.state;
  //   CallApi.post(`/account/${user.id}/watchlist`, {
  //     params: {
  //       session_id: session_id
  //     },
  //     body: {
  //       media_type: "movie",
  //       media_id: movie.id,
  //       watchlist: !watchlist[movie.id]
  //     }
  //   });
  //   toggleWatchlistFilm(movie.id);
  // };

  componentDidMount() {
    CallApi.get(`/movie/${this.props.match.params.id}`, {
      params: {
        language: "ru-RU"
      }
    }).then(data => {
      const year = data.release_date.slice(0, 4);
      this.setState({
        movie: {
          ...data,
          year: year
        }
      });
    });
  }
  render() {
    const { movie } = this.state;
    const {
      favoriteFilms,
      watchlist,
      session_id,
      toggleFavorite,
      toggleWatchlist,
      user
    } = this.props;
    return (
      <div className="container">
        <div className="row mt-4">
          <div className="col-4">
            <div className="poster">
              <img
                className="card-img-top card-img--height"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt=""
              />
            </div>
          </div>
          <div className="col-6">
            <div className="description">
              <div className="row align-items-center justify-content-between description__header">
                <h6 className="col-8 description__name">{movie.title}</h6>
                <div className="col-2 description__lists">
                  {session_id && (
                    <div className="button-wrapper">
                      <ToggleList
                        handleClick={() => toggleFavorite(movie.id, user)}
                      >
                        <Star favorite={Boolean(favoriteFilms[movie.id])} />
                      </ToggleList>
                      <ToggleList
                        handleClick={() => toggleWatchlist(movie.id, user)}
                      >
                        <BookMark watchlist={Boolean(watchlist[movie.id])} />
                      </ToggleList>
                    </div>
                  )}
                </div>
              </div>
              <p className="description__year">год: {movie.year}</p>
              <p className="description__slogan">слоган: "{movie.tagline}"</p>
              <p className="description__overview">{movie.overview}</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <MovieTab id={this.props.match.params.id} movie={movie} />
          </div>
        </div>
      </div>
    );
  }
}

export default AppContextHOC(WatchlistHOC(FavoriteFilmsHOC(MoviePage)));
