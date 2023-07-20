import './listDetailPage.css'
import { useEffect, useState } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { BiSolidHeart, BiPlay } from "react-icons/bi";
import { TrackList } from "../../components/lists/trackList/TrackList";
import { useListDetailContext } from '../../hooks/useListDetailContext';
import { ListType } from '../../types/dataTypes/enums.d';
import { PlaylistType } from '../../types/dataTypes/playlist';
import { AlbumType } from '../../types/dataTypes/album';
import { ArtistType } from '../../types/dataTypes/artist';
import { fetchData } from '../../api/fetchApi';
import { useNavigate } from 'react-router-dom';
import { getUniqueId } from '../../utils/functions/randomId';
import { TrackType } from '../../types/dataTypes/track';
import { GenreType } from '../../types/dataTypes/genre';

export const ListDetailPage = () => {

    const { listDetail } = useListDetailContext();

    const [trackIds, setTrackIds] = useState<string[] | null>(null);

    const navigate = useNavigate();

    const handleBackIconClicked = () => {
        navigate(-1);
    }


    useEffect(() => {
        if (listDetail !== null) {

            if (listDetail?.type !== ListType.ARTIST && listDetail?.type !== ListType.GENRE) {
                let newTracksIds: string[] = [];
                const playlistOrAlbum = listDetail as PlaylistType | AlbumType;

                if (playlistOrAlbum.tracks) {
                    playlistOrAlbum.tracks.forEach((track) => {
                        newTracksIds.push(track.id);
                    })

                }
                setTrackIds(newTracksIds)
            } else if (listDetail?.type === ListType.ARTIST) {
                const artistObtained = listDetail as ArtistType;
                (async function getTracksIds() {
                    let newTracksIds: string[] = [];
                    if (artistObtained.albums) {

                        artistObtained.albums.forEach(async (album, index) => {
                            const albumsFetched = await fetchData(`albums?id=${album.id}`) as AlbumType[];
                            const albumFetched = albumsFetched[0];

                            albumFetched.tracks?.forEach((track) => {
                                newTracksIds.push(track.id)
                            })

                            if (artistObtained.albums) {
                                if (index === artistObtained.albums.length - 1) {
                                    setTrackIds(newTracksIds);
                                }
                            }

                        })
                    }
                }());
            } else {
                const genreObtained = listDetail as GenreType;
                (async function getTracksOfGenre() {
                    const tracks: TrackType[] = await fetchData("tracks") as TrackType[];
                    const tracksWanted = tracks.filter((track) => {
                        let found = false;
                        track.genre?.forEach((genre) => {
                            if (genre.toLowerCase() === genreObtained.name.toLowerCase()) found = true;
                        })
                        return found;
                    })
                    let tracksId: string[] = []
                    tracksWanted.forEach((track) => { tracksId.push(track.id); })
                    setTrackIds(tracksId);

                }());
            }
        }

    }, [listDetail])

    useEffect(() => {
        if (listDetail === null) navigate("/home")
    }, [])

    return (
        <>
            {listDetail && <div className="list-detail-page-container">
                <div className="list-detail-heading">
                    <FaAngleLeft className="list-detail-angle-btn" onClick={handleBackIconClicked} />

                    <img
                        className={`list-detail-img ${listDetail.type === "artist" ? "artist-img" : ""}`}
                        src={listDetail?.imageUrl}
                        alt={`Image or Cover of ${listDetail?.name}`}
                    />

                    <div className="list-detail-dashboard">
                        {/* <AiOutlinePlusCircle className="list-detail-add-btn" /> */}
                        <BiSolidHeart className="list-detail-heart-btn" />
                        <span className="list-detail-container-play-btn">
                            <BiPlay className="list-detail-play-btn" />
                        </span>
                    </div>

                </div>
                <div className="list-detail-container-items">
                    <div className='list-detail-wrapper'>
                        {trackIds && trackIds.map((track) => (
                            <TrackList
                                key={getUniqueId()}
                                trackId={track}
                            />
                        ))}
                        <div className='white-space'></div>
                    </div>

                </div>
            </div>}
        </>
    );
};
