import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
  		searchResults: [
  			{name: '1namesearchResults',
  			artist: '1artistsearchResults',
  			album: '1albumsearchResults'
  			},
  			{name: '2namesearchResults',
  			artist: '2artistsearchResults',
  			album: '2albumsearchResults'
  			},
  			{name: '3namesearchResults',
  			artist: '3artistsearchResults',
  			album: '3albumsearchResults'
  			}
  			]
  		}
      };

  render() {
    return (
        <div>
          <h1> Ja<span className="highlight">mmm</span>ing </h1>
          <div className="App">
              <SearchBar />
            <div className="App-playlist">
              <SearchResults searchResults={this.props.searchResults} />
              <Playlist />
            </div>
          </div>
        </div>
    );
  }
}

export default App;
