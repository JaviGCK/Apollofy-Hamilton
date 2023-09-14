import './listDetailPage.css'
import { useEffect, useState } from "react";
import { FaAngleLeft, FaRandom } from "react-icons/fa";
import { BiSolidHeart, BiPlay, BiStop } from "react-icons/bi";
import { TrackList } from "../../components/lists/trackList/TrackList";
import { useListDetailContext } from '../../utils/hooks/useListDetailContext';
import { ListType } from '../../types/dataTypes/enums.d';
import { PlaylistType } from '../../types/dataTypes/playlist';
import { AlbumType } from '../../types/dataTypes/album';
import { ArtistType } from '../../types/dataTypes/artist';
import { fetchData, getFullTrack, updateUserLList } from '../../api/fetchApi';
import { useNavigate } from 'react-router-dom';
import { getUniqueId } from '../../utils/functions/randomId';
import { TrackType } from '../../types/dataTypes/track';
import { GenreType } from '../../types/dataTypes/genre';
import { useTrackListContext } from '../../utils/hooks/useTrackListContext';
import { useUserContext } from '../../utils/hooks/useUserContext';
import toast, { Toaster } from 'react-hot-toast';
import { useIsPlayingContext } from '../../utils/hooks/useIsPlayingContext';
import { useTrackIdsContext } from '../../utils/hooks/useTrackIdsContext';

export const ListDetailPage = () => {

    const { listDetail } = useListDetailContext();

    const { currentUser } = useUserContext();

    const { trackIds, changeTrackIds } = useTrackIdsContext();

    const { isListBtnActive, changeIsBtnActive, changeIsPlayingList, changeListId } = useIsPlayingContext();


    const { trackList, setNewTrackList, audioElement } = useTrackListContext();

    const navigate = useNavigate();

    const handleBackIconClicked = () => {
        navigate(-1);
    }

    const [isShuffleActive, setIsShuffleActive] = useState(false);

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
                changeTrackIds(newTracksIds)

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
                                    changeTrackIds(newTracksIds);

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
                    changeTrackIds(tracksId);

                }());
            }

        }

    }, [listDetail])


    useEffect(() => {
        (async function checkTrackList() {
            if (trackList === null) return
            let coincides = true
            let soundPlayerIds = trackList.map((track) => track.id)
            if (soundPlayerIds.length === trackIds.length) {
                for (let i = 0; i < trackIds.length; i++) {
                    if (!soundPlayerIds.includes(trackIds[i])) {
                        coincides = false
                    }
                }
            } else { coincides = false }

            //Estudiar que no siempre debe de estar parado, ya que si yo lo he parado tiene
            //que estar bien!
            //Esto debería de estar en concordancia con 
            //las otras variables que hacen referencia al soundbar!!!!!!
            coincides ? changeIsBtnActive(true) : changeIsBtnActive(false)
        }())
    }, [trackIds])

    const getTrackListById = async (trackById: string[]) => {
        return await getFullTrack(trackById)
    }

    const playBtnClicked = () => {
        if (trackIds === null) return;
        (async function getTracksById() {
            setNewTrackList(await getTrackListById(trackIds));
        }());
        changeIsPlayingList(!isListBtnActive);
        changeIsBtnActive(!isListBtnActive);
        audioElement.current.currentTime = 0;

        if (listDetail === null) return;
        changeListId(listDetail.id)
    }


    const heartIconClicked = () => {
        const libraryListUser = currentUser?.libraryList;
        const itemSearched = libraryListUser?.find((item) => {
            if (item.id === listDetail?.id) return true;
        })
        if (itemSearched === undefined && currentUser && currentUser?.libraryList && listDetail) {
            updateUserLList(currentUser, currentUser.libraryList, listDetail);
            toast.success('Successfully added!')
        } else {
            toast.success('Already exists!')
        }
    }

    useEffect(() => {
        if (listDetail === null) navigate("/home")
    }, [])



    const toggleShuffle = () => {

        setIsShuffleActive(!isShuffleActive);
        if (isShuffleActive) {

        }
    };

    return (
        <>
            {listDetail && <div className="list-detail-page-container">
                <Toaster
                    position="top-center"
                    reverseOrder={false}
                />
                <div className="list-detail-heading">
                    <FaAngleLeft className="list-detail-angle-btn" onClick={handleBackIconClicked} />

                    <img
                        className={`list-detail-img ${listDetail.type === "artist" ? "artist-img" : ""}`}
                        src={listDetail?.imageUrl}
                        alt={`Image or Cover of ${listDetail?.name}`}
                    />

                    <div className="list-detail-dashboard">
                        {/* <AiOutlinePlusCircle className="list-detail-add-btn" /> */}
                        <BiSolidHeart className="list-detail-heart-btn" onClick={heartIconClicked} />
                        <span className="list-detail-container-play-btn" onClick={playBtnClicked} >
                            {isListBtnActive ? <BiStop className="list-detail-play-btn" /> : <BiPlay className="list-detail-play-btn" />}
                        </span>
                        <FaRandom
                            className={`list-detail-shuffle-btn ${isShuffleActive ? 'active' : ''}`}
                            onClick={toggleShuffle}
                        />

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
