import React, { Component } from 'react';
import './App.css';
import _ from 'lodash';
import SearchList from './components/SearchList';
const axios = require('axios');

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      searchString: null,
      posts: []
    }
  }

  // Use axios to fetch data from reddit based on subreddit search string.
  // Lodash is then used to sort post title alphabetically.
  getSearchResults() {
      axios.get(`https://www.reddit.com/r/${this.state.searchString}.json`)
        .then(
          (res) => {
            const posts = res.data.data.children.map(obj => obj.data);
	    const sortedPosts = _.sortBy(posts, 'title');
            this.setState({
              posts: sortedPosts
            });
         });
  }

  componentDidUpdate() {
    this.getSearchResults();
  }

  handleChange = event => {
    this.setState({searchString: event.target.value}); 
  };

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
	   <nav>
             <h2 className="App-title"><b>search</b><i>app</i></h2>
	   </nav>
           <form id="search-field">
             <input type="text" 
              name="searchString" 
	      placeholder="Search" 
	      onChange={this.handleChange} 
	      onKeyPress={this.handleKeyPress}/>
	      <span class="fa fa-search"></span>
           </form>
	</header>
	<div className="column-left">
	    <section className="selling-points">
	      <h1 className="hero-title">Reddit Search Tool</h1>
	      <h2 className="point-title"> filter. sort. view.</h2>
	      <p className="point-description">Get started</p>
	    </section>
	</div>
	<SearchList posts={this.state.posts}/>
      </div>
    );
  }
}

export default App;
