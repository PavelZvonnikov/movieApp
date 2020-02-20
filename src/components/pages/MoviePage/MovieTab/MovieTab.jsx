import React, { Component } from "react";

import { Route, Switch, NavLink } from "react-router-dom";
import styles from "./MovieTab.module.css";

import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col
} from "reactstrap";

import { MovieDetail } from "./Tabs/MovieDetail";
import { MovieVideo } from "./Tabs/MovieVideo";
import { MovieCredits } from "./Tabs/MovieCredits";

export class MovieTab extends Component {
  state = {
    activeTab: "detail"
  };

  setActiveTab = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  };

  render() {
    const { activeTab } = this.state;
    const { id, movie } = this.props;
    return (
      <div>
        <ul className="nav nav-tabs mb-5">
          <li className="nav-item">
            <NavLink
              className={
                activeTab === "detail" ? "nav-link active" : "nav-link"
              }
              to={`/movie/${id}/detail`}
              onClick={() => {
                this.setActiveTab("detail");
              }}
            >
              Детали
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={
                activeTab === "videos" ? "nav-link active" : "nav-link"
              }
              to={`/movie/${id}/videos`}
              onClick={() => {
                this.setActiveTab("videos");
              }}
            >
              Видео
            </NavLink>
          </li>
          <NavLink
            className={activeTab === "credits" ? "nav-link active" : "nav-link"}
            to={`/movie/${id}/credits`}
            onClick={() => {
              this.setActiveTab("credits");
            }}
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
          <Route exact path="/movie/:id/videos">
            <MovieVideo />
          </Route>
          <Route exact path="/movie/:id/credits">
            <MovieCredits />
          </Route>
        </Switch>
      </div>
    );
  }
}
