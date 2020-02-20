import React from "react";
import { Link } from "react-router-dom";
import { Star } from "../Icons/Star";
import { BookMark } from "../Icons/BookMark";
import { ToggleList } from "../toggleList/ToggleList";
import { AppContextHOC } from "../HOC/AppContextHOC";

class MovieItem extends React.Component {
  render() {
    const {
      item,
      favorite,
      inWatchlist,
      session_id,
      toggleFavorite,
      toggleWatchlist
    } = this.props;
    return (
      <div className="card" style={{ width: "100%" }}>
        <img
          className="card-img-top card-img--height"
          src={`https://image.tmdb.org/t/p/w500${item.backdrop_path ||
            item.poster_path}`}
          alt=""
        />
        <div className="card-body">
          <Link className="card-title" to={`/movie/${item.id}/detail`}>
            {item.title}
          </Link>
          <div className="card-text mb-1">Рейтинг: {item.vote_average}</div>
          {session_id && (
            <div className="button-wrapper">
              <ToggleList handleClick={toggleFavorite}>
                <Star favorite={favorite} />
              </ToggleList>
              <ToggleList handleClick={toggleWatchlist}>
                <BookMark watchlist={inWatchlist} />
              </ToggleList>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default AppContextHOC(MovieItem);
