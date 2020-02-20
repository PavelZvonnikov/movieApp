import React from "react";

import { CallApi } from "../../api/api.js";

export const LoginFormHOC = Component =>
  class HOC extends React.Component {
    constructor() {
      super();
      this.state = {
        username: "",
        password: "",
        repeatPassword: "",
        errors: {},
        submitting: false
      };
    }

    onChange = e => {
      const name = e.target.name;
      const value = e.target.value;
      this.setState(prevState => ({
        [name]: value,
        errors: {
          ...prevState.errors,
          [name]: null,
          base: null
        }
      }));
    };

    handleBlur = () => {
      const errors = this.validateFields();
      if (Object.keys(errors).length > 0) {
        this.setState(prevState => ({
          errors: {
            ...prevState.errors,
            ...errors
          }
        }));
      }
    };

    validateFields = () => {
      const errors = {};
      const { username, password, repeatPassword } = this.state;

      if (username === "") {
        errors.username = "Not empty";
      }

      if (!password) {
        errors.password = "Required";
      }

      if (password !== repeatPassword) {
        errors.repeatPassword = "Must be equal password";
      }

      return errors;
    };

    onLogin = () => {
      const errors = this.validateFields();
      if (Object.keys(errors).length > 0) {
        this.setState(prevState => ({
          errors: {
            ...prevState.errors,
            ...errors
          }
        }));
      } else {
        this.onSubmit();
      }
    };

    onSubmit = () => {
      this.setState({
        submitting: true
      });
      CallApi.get("/authentication/token/new")
        .then(data => {
          return CallApi.post("/authentication/token/validate_with_login", {
            body: {
              username: this.state.username,
              password: this.state.password,
              request_token: data.request_token
            }
          });
        })
        .then(data => {
          return CallApi.post("/authentication/session/new", {
            body: {
              request_token: data.request_token
            }
          });
        })
        .then(data => {
          this.props.updateSessionID(data.session_id);
          return CallApi.get("/account", {
            params: {
              session_id: data.session_id
            }
          });
        })
        .then(user => {
          console.log(user);
          this.setState(
            {
              submitting: false
            },
            () => {
              this.props.updateUser(user);
            }
          );
        })
        .catch(error => {
          console.log("error", error);
          this.setState({
            submitting: false,
            errors: {
              base: error.status_message
            }
          });
        });
    };

    render() {
      return (
        <Component
          {...this.props}
          {...this.state}
          onChange={this.onChange}
          handleBlur={this.handleBlur}
          onLogin={this.onLogin}
        />
      );
    }
  };
