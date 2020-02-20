import React from "react";

import { Field } from "../../Field/Field";
import { AppContextHOC } from "../../HOC/AppContextHOC";
import { LoginFormHOC } from "../../HOC/LoginFormHOC";

const LoginForm = ({
  username,
  password,
  repeatPassword,
  errors,
  submitting,
  handleBlur,
  onLogin,
  onChange
}) => (
  <div className="form-login-container">
    <form className="form-login">
      <h1 className="h3 mb-3 font-weight-normal text-center">Авторизация</h1>
      <Field
        id="username"
        labelText="Пользователь"
        type="text"
        name="username"
        placeholder="Логин"
        value={username}
        onChange={onChange}
        onBlur={handleBlur}
        error={errors.username}
      />
      <Field
        id="password"
        labelText="Пароль"
        type="password"
        name="password"
        placeholder="Пароль"
        value={password}
        onChange={onChange}
        onBlur={handleBlur}
        error={errors.password}
      />
      <Field
        id="repeat-password"
        labelText="Повторите пароль"
        type="password"
        name="repeatPassword"
        placeholder="Повторите пароль"
        value={repeatPassword}
        onChange={onChange}
        onBlur={handleBlur}
        error={errors.repeatPassword}
      />
      <button
        type="button"
        className="btn btn-lg btn-primary btn-block"
        onClick={onLogin}
        onEnt
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

export default AppContextHOC(LoginFormHOC(LoginForm));
