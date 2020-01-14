import React from "react";
import { CallApi } from "../../api/api";
import AppContextHOC from "../HOC/AppContextHOC";

class User extends React.Component {
  handleLogOut = () => {
    CallApi.delete("/authentication/session", {
      body: {
        session_id: this.props.session_id
      }
    })
      // fetchApi(`${API_URL}/authentication/session?api_key=${API_KEY_3}`, {
      //   method: "DELETE",
      //   mode: "cors",
      //   headers: {
      //     "Content-type": "application/json"
      //   },
      //   body: JSON.stringify({
      //     session_id: this.props.session_id
      //   })
      // })
      .then(() => {
        this.props.onLogOut();
      });
  };

  render() {
    const { user } = this.props;
    return (
      <div className="user-wrapper">
        <button
          className="btn btn-secondary mr-2"
          type="button"
          onClick={this.handleLogOut}
        >
          Log out
        </button>
        <img
          src={`https://secure.gravatar.com/avatar/${user.avatar.gravatar.hash}.jpg?s=64"`}
          alt=""
        />
      </div>
    );
  }
}

export default AppContextHOC(User);
