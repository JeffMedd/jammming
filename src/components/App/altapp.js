import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

class App extends React.Component {
  constructor (props){
    super(props);
    this.state = {
        tracks:["track", "track", "track"],
        track:["track", "track", "track"],
        searchResults:[{
          id: "101",
          name : "Look What You Made Me Do",
          artist :"Taylor Swift",
          album : "Reputation",
        },{
          id:"102",
          name : "Sweet Dreams my LA EX",
          artist :"Rachel Stevens",
          album : "Funky Dory",
        },{
          id: "103",
          name : "Torn",
          artist :"Natalie Imbruglia",
          album : "Left of the Middle",
        }]}
      };
  render() {
    return (
        <div>
          <h1> Ja<span className="highlight">mmm</span>ing </h1>
          <div className="App">
              <SearchBar />
            <div className="App-playlist">
              <SearchResults searchResults={this.state.searchResults} />
              <Playlist />
            </div>
          </div>
        </div>
    );
  }
}

export default App;
