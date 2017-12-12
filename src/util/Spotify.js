
const clientId='f961bfa1dea9452d8dcfc8f7b119a713';
const redirectUri = 'http://jeffjammming.surge.sh';
let accessToken='';


const Spotify = {

getAccessToken(){
  if (accessToken) {
    return accessToken;
}
const tokenMatch = window.location.href.match(/access_token=([^&]*)/);
const expireMatch = window.location.href.match(/expires_in=([^&]*)/);
  if (tokenMatch && expireMatch) {
      accessToken = tokenMatch[1];
  const expiresIn = Number(expireMatch[1]);
  window.setTimeout(() => accessToken = '', expiresIn * 1000);
  window.history.pushState('Access Token', null, '/');
  return accessToken;

} else {
  const urlToRequestAuth =`https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=playlist-modify-public&response_type=token`;

  console.log('Error Authenticating with Spotify');
  window.location = urlToRequestAuth;
}

},

savePlaylist(playlistName,trackURIs){
if(!playlistName || !trackURIs.length){
  return;
} else {
  console.log('playlist name in spotifyjs' + playlistName);
  const accessToken = Spotify.getAccessToken();
  const headers= {Authorization:`Bearer ${accessToken}`} ;
  let userId ='';
  return fetch('https://api.spotify.com/v1/me',
      {headers:headers})
      .then(response => {
     if(response.ok) {
       return response.json();
     }
     throw new Error('User ID request failed!');
   })
   .then(jsonResponse => {
     return userId = jsonResponse.id;
   })
   .then(() =>{
     return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`,{
            method:'POST',
            headers:{
                'Authorization':`Bearer ${accessToken}`,
                'Content-Type' : 'application/json'} ,
            body:JSON.stringify({name:playlistName})
        }).then(response =>{
          if(response.ok){
            console.log(response);
            return response.json();
          }
          throw new Error('Request to add playlist failed');
        }, networkError => console.log(networkError.message))
        .then( jsonResponse => {
          let playlistID = jsonResponse.id;
          return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistID}/tracks`, {
              method:'POST',
              headers:{
                  'Authorization':`Bearer ${accessToken}`,
                  'Content-Type' : 'application/json'} ,
              body:JSON.stringify({uris:trackURIs})
          });
        });
      });

      }

},

search(term) {
  const accessToken = Spotify.getAccessToken();
  console.log("search term in spotifyjs search method" + term);
  return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,
    { headers: {Authorization: `Bearer ${accessToken}` }})
    .then(response => {
      if(response.ok) {
        console.log(response);
        return response.json();
      }
      throw new Error('Request failed!');
    }, networkError => console.log(networkError.message))
    .then(jsonResponse => {
      if(!jsonResponse.tracks.items) {
        return [];
      } else {
          return jsonResponse.tracks.items.map(track => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri
        }));
      }
    })
  },





}





export default Spotify;
