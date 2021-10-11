import { useState, useEffect } from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import {useDataLayerValue} from "./DataLayer";

function PlayingTrack({ trackUri }) {
  const [ token ,dispatch]=useDataLayerValue(); 
  const [play, setPlay] = useState(false);

  useEffect(() => setPlay(true), [trackUri])

  if (!token) return null
  return (
    <SpotifyPlayer
      token={token}
      callback={state => {
        if (!state.isPlaying) setPlay(false)
      }}
      play={play}
      uris={trackUri ? [trackUri] : []}
    />
    
  )
}

export default PlayingTrack