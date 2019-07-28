import React from "react";

class LoginComponent extends React.Component {
  render() {
    return (
      <div className="nav">
        {this.props.logged_in ? (
          <div>
            <p> {`you're logged in as ${this.props.username}`}</p>
            <button onClick={this.props.getPosts}>get my posts</button>
            <button onClick={this.props.handleLogOut}>Log out</button>
          </div>
        ) : (
          <form>
            <label htmlFor="username">Username:</label>
            <input
              onChange={this.props.handleChange}
              id="username"
              type="text"
              name="username"
              value={this.props.username}
            />
            <label htmlFor="password">Password:</label>
            <input
              onChange={this.props.handleChange}
              id="password"
              type="password"
              name="password"
              value={this.props.password}
            />
            <button onClick={this.props.onLoginClicked}>Log in</button>
          </form>
        )}
      </div>
    );
  }
}

export default LoginComponent;