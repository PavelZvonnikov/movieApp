import React from "react";
import { Star } from "../Icons/Star";
import { BookMark } from "../Icons/BookMark";
import { CallApi } from "../../api/api";
import AppContextHOC from "../HOC/AppContextHOC";

class MovieItem extends React.Component {
  state = {
    favorite: false,
    watchlist: false
  };

  toggleFavorite = () => {
    // const { user, session_id, item } = this.props;
    // const { favorite } = this.state;
    this.setState(
      prevState => ({
        favorite: !prevState.favorite
      }),
      () => {
        const { user, session_id, item } = this.props;
        const { favorite } = this.state;
        CallApi.post(`/account/${user.id}/favorite`, {
          params: {
            session_id: session_id
          },
          body: {
            media_type: "movie",
            media_id: item.id,
            favorite: favorite
          }
        }).then(data => {
          console.log(data);
        });
      }
    );
  };

  toggleWatchlist = () => {
    this.setState(
      prevState => ({
        watchlist: !prevState.watchlist
      }),
      () => {
        const { user, session_id, item } = this.props;
        const { watchlist } = this.state;
        CallApi.post(`/account/${user.id}/watchlist`, {
          params: {
            session_id: session_id
          },
          body: {
            media_type: "movie",
            media_id: item.id,
            watchlist: watchlist
          }
        }).then(data => {
          console.log(data);
        });
      }
    );
  };

  render() {
    const { item } = this.props;
    const { favorite, watchlist } = this.state;
    return (
      <div className="card" style={{ width: "100%" }}>
        <img
          className="card-img-top card-img--height"
          src={`https://image.tmdb.org/t/p/w500${item.backdrop_path ||
            item.poster_path}`}
          alt=""
        />
        <div className="card-body">
          <h6 className="card-title">{item.title}</h6>
          <div className="card-text mb-1">Рейтинг: {item.vote_average}</div>
          <button
            type="button"
            className="custom-button"
            onClick={this.toggleFavorite}
          >
            <Star favorite={favorite} />
          </button>
          <button
            type="button"
            className="custom-button"
            onClick={this.toggleWatchlist}
          >
            <BookMark watchlist={watchlist} />
          </button>
        </div>
      </div>
    );
  }
}

export default AppContextHOC(MovieItem);
