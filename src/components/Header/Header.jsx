import React from "react";
import { Link } from "react-router-dom";

import { Login } from "./Login/Login";
import UserMenu from "./UserMenu";

export const Header = ({ user, session_id }) => {
  return (
    <nav className="navbar navbar-dark bg-primary">
      <div className="container">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <Link className="nav-link" to={"/"}>
              Home
            </Link>
          </li>
        </ul>
        {user ? <UserMenu /> : <Login session_id={session_id} />}
      </div>
    </nav>
  );
};
