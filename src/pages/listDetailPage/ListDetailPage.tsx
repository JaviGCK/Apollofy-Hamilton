import './listDetailPage.css';
import { useEffect, useState } from 'react';
import { FaAngleLeft, FaRandom } from 'react-icons/fa';
import { BiSolidHeart, BiPlay } from 'react-icons/bi';
import { TrackList } from '../../components/lists/trackList/TrackList';
import { useListDetailContext } from '../../utils/hooks/useListDetailContext';
import { useTrackListContext } from '../../utils/hooks/useTrackListContext';
import { useUserContext } from '../../utils/hooks/useUserContext';
import { ListType } from '../../types/dataTypes/enums.d';
import { PlaylistType } from '../../types/dataTypes/playlist';
import { AlbumType } from '../../types/dataTypes/album';
import { ArtistType } from '../../types/dataTypes/artist';
import { TrackType } from '../../types/dataTypes/track';
import { GenreType } from '../../types/dataTypes/genre';
import { fetchData, getFullTrack, updateUserLList } from '../../api/fetchApi';
import { getUniqueId, shuffleArray } from '../../utils/functions/randomId';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const ListDetailPage = () => {
    const { listDetail } = useListDetailContext();
    const { currentUser } = useUserContext();
    const { setNewTrackList } = useTrackListContext();
    const navigate = useNavigate();

    const [trackIds, setTrackIds] = useState<string[] | null>(null);
    const [isShuffleActive, setIsShuffleActive] = useState(false);


    const handleBackIconClicked = () => {
        navigate(-1);
    };

    useEffect(() => {
        if (listDetail !== null) {
            if (listDetail.type !== ListType.ARTIST && listDetail.type !== ListType.GENRE) {
                let newTracksIds: string[] = [];
                const playlistOrAlbum = listDetail as PlaylistType | AlbumType;

                if (playlistOrAlbum.tracks) {
                    playlistOrAlbum.tracks.forEach((track) => {
                        newTracksIds.push(track.id);
                    });
                }
                setTrackIds(newTracksIds);
            } else if (listDetail.type === ListType.ARTIST) {
                const artistObtained = listDetail as ArtistType;
                (async function getTracksIds() {
                    let newTracksIds: string[] = [];
                    if (artistObtained.albums) {
                        for (const album of artistObtained.albums) {
                            const albumsFetched = (await fetchData(`albums?id=${album.id}`)) as AlbumType[];
                            const albumFetched = albumsFetched[0];

                            albumFetched.tracks?.forEach((track) => {
                                newTracksIds.push(track.id);
                            });
                        }

                        setTrackIds(newTracksIds);
                    }
                })();
            } else {
                const genreObtained = listDetail as GenreType;
                (async function getTracksOfGenre() {
                    const tracks: TrackType[] = (await fetchData('tracks')) as TrackType[];
                    const tracksWanted = tracks.filter((track) => {
                        let found = false;
                        track.genre?.forEach((genre) => {
                            if (genre.toLowerCase() === genreObtained.name.toLowerCase()) found = true;
                        });
                        return found;
                    });

                    const tracksId = tracksWanted.map((track) => track.id);
                    setTrackIds(tracksId);
                })();
            }
        }
    }, [listDetail]);

    useEffect(() => {
        if (listDetail === null) {
            navigate('/home');
        }
    }, []);

    useEffect(() => {
        playBtnClicked();
    }, [isShuffleActive]);

    const playBtnClicked = () => {
        if (trackIds === null) return;

        let tracksToPlay = [...trackIds];

        if (isShuffleActive) {
            tracksToPlay = shuffleArray(tracksToPlay);
        }

        (async function getTracksById() {
            setNewTrackList(await getFullTrack(tracksToPlay));
        })();
    };

    const heartIconClicked = () => {
        const libraryListUser = currentUser?.libraryList;
        const itemSearched = libraryListUser?.find((item) => item.id === listDetail?.id);

        if (!itemSearched && currentUser && currentUser.libraryList && listDetail) {
            updateUserLList(currentUser, currentUser.libraryList, listDetail);
            toast.success('Successfully added!');
        } else {
            toast.success('Already exists!');
        }
    };

    const toggleShuffle = () => {
        setIsShuffleActive(!isShuffleActive);
    };

    return (
        <>
            {listDetail && (
                <div className="list-detail-page-container">
                    <Toaster position="top-center" reverseOrder={false} />
                    <div className="list-detail-heading">
                        <FaAngleLeft
                            className="list-detail-angle-btn"
                            onClick={handleBackIconClicked}
                        />
                        <img
                            className={`list-detail-img ${listDetail.type === 'artist' ? 'artist-img' : ''}`}
                            src={listDetail.imageUrl}
                            alt={`Image or Cover of ${listDetail.name}`}
                        />
                        <div className="list-detail-dashboard">
                            <BiSolidHeart className="list-detail-heart-btn" onClick={heartIconClicked} />
                            <span className="list-detail-container-play-btn" onClick={playBtnClicked}>
                                <BiPlay className="list-detail-play-btn" />
                            </span>
                            <FaRandom
                                className={`list-detail-shuffle-btn ${isShuffleActive ? 'active' : ''}`}
                                onClick={toggleShuffle}
                            />
                        </div>
                    </div>
                    <div className="list-detail-container-items">
                        <div className="list-detail-wrapper">
                            {trackIds &&
                                trackIds.map((track) => (
                                    <TrackList key={getUniqueId()} trackId={track} />
                                ))}
                            <div className="white-space"></div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
