import React from "react";

export default class Posts extends React.Component {
  render() {
    return (
      <div>
        {this.props.posts.map(post => {
          return <p key={post.created_at}>{post.created_at}</p>;
        })}
      </div>
    );
  }
}