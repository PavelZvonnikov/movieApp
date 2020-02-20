import React from "react";

import { CallApi } from "../../api/api.js";

export const UserMenuHOC = Component =>
  class HOC extends React.Component {
    constructor() {
      super();

      this.state = {
        dropdownOpen: false
      };
    }

    toggleDropdown = () => {
      this.setState(prevstate => ({
        dropdownOpen: !prevstate.dropdownOpen
      }));
    };

    handleLogOut = () => {
      CallApi.delete("/authentication/session", {
        body: {
          session_id: this.props.session_id
        }
      }).then(() => {
        this.props.onLogOut();
      });
    };
    render() {
      const { dropdownOpen } = this.state;
      return (
        <Component
          {...this.props}
          dropdownOpen={dropdownOpen}
          toggleDropdown={this.toggleDropdown}
          handleLogOut={this.handleLogOut}
        />
      );
    }
  };
