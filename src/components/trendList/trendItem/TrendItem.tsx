
import { FaMusic } from "react-icons/fa";
import { BiPlay } from "react-icons/bi";
import "./trendItem.css"
import { TrendItemProps } from "../../../types/propTypes/trendItemProps";
import { FC, useEffect, useState } from "react";
import { fetchData } from "../../../api/fetchApi";
import { AlbumType } from "../../../types/dataTypes/album";
import { PlaylistType } from "../../../types/dataTypes/playlist";
import { ArtistType } from "../../../types/dataTypes/artist";
import { TrackType } from "../../../types/dataTypes/track";


export const TrendItem: FC<TrendItemProps> = ({ ...props }) => {
    interface itemType {
        itemTitle: string,
        imageUrl: string,
        trackTitle: string,
        trackUrl: string,
        albumName: string,
        artistsName: string[]
    }
    const [item, setItem] = useState<itemType | null>(null);

    useEffect(() => {
        (async function fetchItemData() {
            const data = await fetchData(`${props.type}s?id=${props.id}`) as (AlbumType[] | PlaylistType[] | ArtistType[]);
            const itemFetched = data[0];

            const newItem: itemType = {
                itemTitle: "",
                imageUrl: "",
                trackTitle: "",
                trackUrl: "",
                albumName: "",
                artistsName: []
            }
            let trackId = "";

            if (itemFetched.imageUrl !== undefined) newItem.imageUrl = itemFetched.imageUrl;
            if (itemFetched.name !== undefined) newItem.itemTitle = itemFetched.name;

            if (props.type !== "artist") {
                const albumPlaylistItem = itemFetched as PlaylistType | AlbumType;
                if (albumPlaylistItem.tracks !== undefined) {
                    trackId = albumPlaylistItem.tracks[0].id;
                    console.log(albumPlaylistItem.tracks[0]);
                }
            } else {
                const artistItem = itemFetched as ArtistType;
                if (artistItem.albums !== undefined) {
                    const artistAlbumFetched = await fetchData(`albums?id=${artistItem.albums[0].id}`) as AlbumType[];
                    const artistAlbum = artistAlbumFetched[0];
                    if (artistAlbum.tracks !== undefined) trackId = artistAlbum.tracks[0].id;
                }
            }

            const trackFetched = await fetchData(`tracks?id=${trackId}`) as TrackType[];
            const track = trackFetched[0];
            if (track.name !== undefined) newItem.trackTitle = track.name;
            if (track.url !== undefined) newItem.trackUrl = track.url;
            if (track.album?.name !== undefined) newItem.albumName = track.album.name;
            if (track.artists !== undefined) {
                track.artists.forEach((artist) => {
                    if (artist.name !== undefined) newItem.artistsName.push(artist.name);
                })
            }

            setItem(newItem);

        }());
    }, [])

    return (
        <div className="trend-item-container">
            {item && <>
                <div className="trend-item-card">
                    <img className="trend-item-card-img" src={item.imageUrl} alt={`Cover Image of ${item.itemTitle}`} />

                    <div className="trend-item-dashboard">
                        <p className="dashboard-track-title">{item.trackTitle}</p>

                        <p className="dashboard-track-info">
                            <FaMusic className="dashboard-music-icon" /> <span>{item.artistsName[0]}</span> - <span>{item.albumName}</span>
                        </p>

                        <span className="play-btn-container">
                            <BiPlay className="dashboard-play-icon" />
                        </span>
                    </div>
                </div>
                <span className="trend-title">{item.itemTitle}</span>
            </>}
        </div>
    )
}
