
import React, { Component } from 'react';
import './App.css';
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import Spotify from "../../util/Spotify"

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      searchResults: [],
      playlistName: "New Playlist",
      playlistTracks: [],
    };

    this.search = this.search.bind(this);
    this.addTrack =this.addTrack.bind(this);
    this.removeTrack =this.removeTrack.bind(this);
    this.updatePlaylistName =this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
  }

  search(term) {
    Spotify.search(term).then(searchResults=> {
      this.setState({searchResults:searchResults});
    })}

    addTrack(track) {
     if (this.state.playlistTracks.filter(playlistTrack => track.id !== playlistTrack.id)) {
     let tracks = this.state.playlistTracks;
     tracks.push(track)
     this.setState({playlistTracks: tracks})
    }
   }

   removeTrack(track){
    let tracks =this.state.playlistTracks;
    const removeTrack  = tracks.filter(playlistTrack => track.id !== playlistTrack.id );
     this.setState({playlistTracks:removeTrack});
   }

   updatePlaylistName(name){
     this.setState({playlistName:name});
   }

   savePlaylist(){
   const trackURIs = this.state.playlistTracks.map(track =>track.uri);
   Spotify.savePlaylist(this.state.playlistName,trackURIs).then(() => {
     this.setState({playlistName:'New Playlist', playlistTracks:[]});
   });
   }
  render() {
   return (
     <div>
       <h1>Ja<span className="highlight">mmm</span>ing</h1>
       <div className="App">
         <SearchBar onSearch={this.search} />
         <div className="App-playlist">
           <SearchResults onAdd={this.addTrack}
                           searchResults={this.state.searchResults}
             />
           <Playlist
            playlistTracks={this.state.playlistTracks}
            name={this.state.playlistName}
           onRemove={this.removeTrack}
            onNameChange={this.updatePlaylistName}
            onSave={this.savePlaylist}
             />
         </div>
       </div>
     </div>
   );
 }
}

export default App;