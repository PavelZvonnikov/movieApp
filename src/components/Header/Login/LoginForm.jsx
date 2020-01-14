import React from "react";

import { CallApi } from "../../../api/api";
import { Field } from "../../Field/Field";
import AppContextHOC from "../../HOC/AppContextHOC";

class LoginForm extends React.Component {
  state = {
    username: "",
    password: "",
    repeatPassword: "",
    errors: {},
    submitting: false
  };

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
        // return fetchApi(
        //   `${API_URL}/authentication/token/validate_with_login?api_key=${API_KEY_3}`,
        //   {
        //     method: "POST",
        //     mode: "cors",
        //     headers: {
        //       "Content-type": "application/json"
        //     },
        //     body: JSON.stringify({
        //       username: this.state.username,
        //       password: this.state.password,
        //       request_token: data.request_token
        //     })
        //   }
        // );
      })
      .then(data => {
        return CallApi.post("/authentication/session/new", {
          body: {
            request_token: data.request_token
          }
        });
        // return fetchApi(
        //   `${API_URL}/authentication/session/new?api_key=${API_KEY_3}`,
        //   {
        //     method: "POST",
        //     mode: "cors",
        //     headers: {
        //       "Content-type": "application/json"
        //     },
        //     body: JSON.stringify({
        //       request_token: data.request_token
        //     })
        //   }
        // );
      })
      .then(data => {
        this.props.updateSessionID(data.session_id);
        return CallApi.get("/account", {
          params: {
            session_id: data.session_id
          }
        });
        // return fetchApi(
        //   `${API_URL}/account?api_key=${API_KEY_3}&session_id=${data.session_id}`
        // );
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
    const {
      username,
      password,
      repeatPassword,
      errors,
      submitting
    } = this.state;
    return (
      <div className="form-login-container">
        <form className="form-login">
          <h1 className="h3 mb-3 font-weight-normal text-center">
            Авторизация
          </h1>
          <Field
            id="username"
            labelText="Пользователь"
            type="text"
            name="username"
            placeholder="Логин"
            value={username}
            onChange={this.onChange}
            onBlur={this.handleBlur}
            error={errors.username}
          />
          <Field
            id="password"
            labelText="Пароль"
            type="password"
            name="password"
            placeholder="Пароль"
            value={password}
            onChange={this.onChange}
            onBlur={this.handleBlur}
            error={errors.password}
          />
          <Field
            id="repeat-password"
            labelText="Повторите пароль"
            type="password"
            name="repeatPassword"
            placeholder="Повторите пароль"
            value={repeatPassword}
            onChange={this.onChange}
            onBlur={this.handleBlur}
            error={errors.repeatPassword}
          />
          <button
            type="button"
            className="btn btn-lg btn-primary btn-block"
            onClick={this.onLogin}
            disabled={submitting}
          >
            Вход
          </button>
          {errors.base && (
            <div className="invalid-feedback text-center">{errors.base}</div>
          )}
        </form>
      </div>
    );
  }
}

export default AppContextHOC(LoginForm);
