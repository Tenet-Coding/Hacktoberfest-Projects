import React from "react";
import "./Header.css";
import "./TrackSearch.css";

function TrackSearch({ track, chooseTrack }) {

    // function handlePlay() {
    //     chooseTrack(track)
    // }

  return (
    <div
      className="flex-item"
      style={{ cursor: "pointer" }}
      //onClick={handlePlay}
    >
      <img src={track.albumUrl} style={{ height: "50px", width: "50px" }} />
      <div className="flex-item2">
        <h6>{track.title}</h6>
        <p>{track.artist}</p>
      </div>
    </div>
  )
}

export default TrackSearch;
