import React from "react";
import Cookies from "universal-cookie";
import { BrowserRouter, Route } from "react-router-dom";

import { Header } from "./Header/Header";
import { CallApi } from "../api/api.js";
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import MoviePage from "./pages/MoviePage/MoviePage";

const cookies = new Cookies();

export const AppContext = React.createContext();
export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      user: null,
      session_id: null
    };
  }

  onLogOut = () => {
    cookies.remove("session_id");
    this.setState({
      user: null,
      session_id: null
    });
  };

  updateUser = user => {
    this.setState({
      user
    });
  };

  updateSessionID = id => {
    cookies.set("session_id", id, { path: "/", maxAge: 2592000 });
    this.setState({
      session_id: id
    });
  };

  componentDidMount() {
    const session_id = cookies.get("session_id");
    if (session_id) {
      this.updateSessionID(session_id);
      CallApi.get("/account", {
        params: {
          session_id: session_id
        }
      }).then(user => {
        this.updateUser(user);
      });
    }
  }

  render() {
    const { user, session_id } = this.state;

    return (
      <BrowserRouter>
        <AppContext.Provider
          value={{
            user: user,
            onLogOut: this.onLogOut,
            updateUser: this.updateUser,
            updateSessionID: this.updateSessionID,
            onChangeFilters: this.onChangeFilters,
            session_id: session_id
          }}
        >
          <div className="app-wrapper">
            <Header user={user} />
            <Route
              exact
              path="/"
              render={props => (
                <MoviesPage user={user} session_id={session_id} {...props} />
              )}
            />
            <Route
              path="/movie/:id"
              render={props => (
                <MoviePage user={user} session_id={session_id} {...props} />
              )}
            />
          </div>
        </AppContext.Provider>
      </BrowserRouter>
    );
  }
}
