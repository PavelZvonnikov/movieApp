import React from "react";
import { AppContext } from "../App";

export const AppContextHOC = Component =>
  class AppContextHOC extends React.Component {
    render() {
      return (
        <AppContext.Consumer>
          {context => <Component {...this.props} {...context} />}
        </AppContext.Consumer>
      );
    }
  };
