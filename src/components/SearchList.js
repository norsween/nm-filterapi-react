import React, { Component } from 'react';
import '.././styles/SearchList.css';

class SearchList extends Component {

  render() {
    return (
        <form id="search-list">
          <ul>
            {this.props.posts.map(post => (
              <li key={post.id}>
                {post.title}
              </li>
            ))}
          </ul>          
        </form>
    );
  }
}

export default SearchList;
