import React from "react";
import "./Player.css";
import Header from "./Header.js";

function Player() {
    return (
        <div className="player">
            <div className="player_body">
            <a href="https://www.spotify.com/us/"><img
                className="spLogo"
                src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
                alt="spotifylogo"
            /></a>
            <Header />
            </div>
        </div>
    )
}

export default Player
