import React from "react";
import "./Header.css";
import { useState, useEffect } from "react";
import { useDataLayerValue } from "./DataLayer";
import SpotifyWebApi from "spotify-web-api-node";
import TrackSearch from "./TrackSearch";
import { clientId } from "./spotify";
import PlayingTrack from "./PlayingTrack";

const spotifyApi = new SpotifyWebApi({
    clientId: {clientId},
})

function Header() {
    const [{ user, token }, dispatch] = useDataLayerValue();
    const accessToken = token;
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [playingTrack, setPlayingTrack] = useState();

    useEffect(() => {
        if (!accessToken) return;
        spotifyApi.setAccessToken(accessToken);
    }, [accessToken])

    useEffect(() => {
        if (!search) return setSearchResults([]);
        if (!accessToken) return;

        let cancel = false;
        spotifyApi.searchTracks(search).then(res => {
            if (cancel) return;
            setSearchResults(
                res.body.tracks.items.map(track => {
                    const smallestAlbumImage = track.album.images.reduce(
                        (smallest, image) => {
                            if (image.height < smallest.height) return image;
                            return smallest;
                        },
                        track.album.images[0]
                    )

                    return {
                        artist: track.artists[0].name,
                        title: track.name,
                        uri: track.uri,
                        albumUrl: smallestAlbumImage.url,
                    }
                })
            )
        })
        return () => (cancel = true);
    }, [search, accessToken])

    // function chooseTrack(track) {
    //     setPlayingTrack(track)
    //     setSearch("")
    // }

    return (
        <div className="header">
            <div className="SearchLog">
                <div className="form-outline">
                    <input type="search" id="form1" className="form-control searchBar" value={search} placeholder="Search Songs/Artists"
                        aria-label="Search" onChange={e => setSearch(e.target.value)} />
                </div>
                <div className="Container" style={{ overflowY: "scroll" }}>
                    {searchResults.map(track => (
                        <TrackSearch
                            track={track}
                            key={track.uri}
                            //chooseTrack={chooseTrack}
                        />
                    ))}
                </div>
                {/* <div>
                    <PlayingTrack trackUri={playingTrack?.uri} />
                </div> */}
            </div>
        </div>
    )
}



export default Header
