import { useEffect } from "react";
import Login from "./Login";
import Player from "./Player"
import { getTokenFromUrl } from "./spotify";
import SpotifyWebApi from "spotify-web-api-js";
import { useDataLayerValue } from "./DataLayer";

const spotify = new SpotifyWebApi();

function App() {
  const [{user, token },dispatch]=useDataLayerValue();  
  useEffect(() => {
    const hash = getTokenFromUrl();       
    window.location.hash = "";               
    const tempToken = hash.access_token;      
    if (tempToken) {
      dispatch({
        type:"SET_TOKEN",
        token: tempToken,
      })
      spotify.setAccessToken(tempToken);      
      spotify.getMe().then(user => {
        console.log('person ',user);
        dispatch({
          type:"SET_USER",
          user: user,
        });
      });

      spotify.getUserPlaylists().then(playlists => {
        dispatch({
          type:"SET_PLAYLISTS",
          playlists: playlists,
        })
      });

    }
  }, [])
  return (
    <div className="app">
      {
        token ? <Player /> : <Login />
      }
    </div>
  );
}

export default App;
