import React from "react";

import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { UserMenuHOC } from "../HOC/UserMenuHOC";
import { AppContextHOC } from "../HOC/AppContextHOC";

const UserMenu = ({ user, dropdownOpen, toggleDropdown, handleLogOut }) => (
  <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
    <DropdownToggle
      tag="div"
      onClick={toggleDropdown}
      data-toggle="dropdown"
      aria-expanded={dropdownOpen}
    >
      <img
        width="40"
        className="rounded-circle"
        src={`https://secure.gravatar.com/avatar/${user.avatar.gravatar.hash}.jpg?s=64"`}
        alt=""
        onClick={toggleDropdown}
      />
    </DropdownToggle>
    <DropdownMenu right>
      <DropdownItem onClick={handleLogOut}>Log out</DropdownItem>
    </DropdownMenu>
  </Dropdown>
);

export default AppContextHOC(UserMenuHOC(UserMenu));
