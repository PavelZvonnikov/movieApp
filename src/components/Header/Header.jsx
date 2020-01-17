import React from "react";

import { Login } from "./Login/Login";
// import User from "./User";
import UserMenu from "./UserMenu";

export const Header = ({ user }) => {
  return (
    <nav className="navbar navbar-dark bg-primary">
      <div className="container">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <a href="#" className="nav-link">
              Home
            </a>
          </li>
        </ul>
        {user ? <UserMenu /> : <Login />}
      </div>
    </nav>
  );
};
