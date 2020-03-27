import React, { Component } from "react";

import { Route, Switch, NavLink } from "react-router-dom";
// import styles from "./MovieTab.module.css";
import { CallApi } from "../../../../api/api";

// import {
//   TabContent,
//   TabPane,
//   Nav,
//   NavItem,
//   Card,
//   Button,
//   CardTitle,
//   CardText,
//   Row,
//   Col
// } from "reactstrap";

import { MovieDetail } from "./Tabs/MovieDetail";
import { MovieVideo } from "./Tabs/MovieVideo";
import { MovieCredits } from "./Tabs/MovieCredits";

export class MovieTab extends Component {
  state = {
    activeTab: "detail",
    cast: []
  };

  getVideo = () => {
    const { id } = this.props;
    CallApi.get(`/movie/${id}/videos`, {
      params: {
        language: "ru-RU"
      }
    }).then(({ results }) => {
      this.setState({
        videoId: results[0].key
      });
    });
  };

  getCast = () => {
    const { id } = this.props;
    CallApi.get(`/movie/${id}/credits`, {
      params: {
        language: "ru-RU"
      }
    })
      .then(({ cast }) => {
        console.log(cast);
        const newData = [];
        cast.forEach(item => {
          if (item.profile_path === null) return;
          const obj = {
            marginLeft: 0,
            scaletwidth: 120,
            thumbnailHeight: 180,
            thumbnailWidth: 120,
            width: 119
          };

          obj.src = `https://image.tmdb.org/t/p/w500${item.profile_path}`;
          obj.thumbnail = `https://image.tmdb.org/t/p/w500${item.profile_path}`;
          obj.caption = `${item.name} (${item.character})`;
          newData.push(obj);
        });
        return newData;
      })
      .then(data => {
        this.setState({
          cast: data
        });
      });
  };

  componentDidMount() {
    this.getVideo();
    this.getCast();
  }

  render() {
    const { videoId, cast } = this.state;
    const { id, movie } = this.props;
    return (
      <div>
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <NavLink
              activeClassName="nav-link active"
              className="nav-link"
              exact
              to={`/movie/${id}/detail`}
            >
              Детали
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              activeClassName="nav-link active"
              className="nav-link"
              exact
              to={`/movie/${id}/videos`}
            >
              Видео
            </NavLink>
          </li>
          <NavLink
            activeClassName="nav-link active"
            className="nav-link"
            exact
            to={`/movie/${id}/credits`}
          >
            Актеры
          </NavLink>
        </ul>
        <Switch>
          <Route
            exact
            path="/movie/:id/detail"
            render={props => <MovieDetail movie={movie} {...props} />}
          />
          <Route
            exact
            path="/movie/:id/videos"
            render={props => <MovieVideo videoId={videoId} {...props} />}
          />
          <Route
            exact
            path="/movie/:id/credits"
            render={props => <MovieCredits cast={cast} {...props} />}
          />
        </Switch>
      </div>
    );
  }
}
