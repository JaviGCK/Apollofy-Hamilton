import './listDetailPage.css'
import { useEffect, useState } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { BiSolidHeart, BiPlay, BiStop } from "react-icons/bi";
import { TrackList } from "../../components/lists/trackList/TrackList";
import { useListDetailContext } from '../../utils/hooks/useListDetailContext';
import { addFavourites, deleteFavourites } from '../../api/fetchApi';
import { useNavigate } from 'react-router-dom';
import { getUniqueId } from '../../utils/functions/randomId';
import { useTrackListContext } from '../../utils/hooks/useTrackListContext';
import { useUserContext } from '../../utils/hooks/useUserContext';
import toast, { Toaster } from 'react-hot-toast';
import { useAuth0 } from '@auth0/auth0-react';
import { UserType } from '../../components/profileChart/ProfileChart';
import { FavouriteType } from '../libraryPage/LibraryPage';
import { updateUserStats } from '../../api/statsFetchApi';
import { AlbumType } from '../../types/album';
import { PlaylistType } from '../../types/playlist';
import { useIsPlayingContext } from '../../utils/hooks/useIsPlayingContext';

export const ListDetailPage = () => {

    const [isFetching, setIsFetching] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const { currentUser, setCurrentLoggedUser } = useUserContext();
    const { listDetail } = useListDetailContext();
    const { trackList, setNewTrackList, audioElement } = useTrackListContext();
    const { isPlayingList, changeIsPlayingList, changeIsBtnActive, isListBtnActive, changeLastBtnActiveId, lastBtnActiveId, changeCurrentTrack } = useIsPlayingContext();
    const { getAccessTokenSilently } = useAuth0();
    const navigate = useNavigate();

    const handleBackIconClicked = () => {
        navigate(-1);
    }

    const checkCoincides = (): boolean => {
        let coincides: boolean = true;
        if (trackList && listDetail?.tracks) {
            const listDetailTrackIds = listDetail?.tracks.map((track) => track.id)
            trackList.forEach((track) => {
                if (!listDetailTrackIds.includes(track.id)) {
                    coincides = false;
                    return;
                }
            })
        }
        return coincides
    }


    const playBtnClicked = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        if (trackList && listDetail?.tracks) {
            const coincides = checkCoincides();
            if (!coincides) {
                if (listDetail && listDetail.tracks) setNewTrackList(listDetail?.tracks);
                changeCurrentTrack(listDetail.tracks[0])
                changeIsPlayingList(true);
                changeIsBtnActive(true)
                changeLastBtnActiveId(listDetail.id)
                audioElement.current.currentTime = 0;
            } else if (coincides && isPlayingList && isListBtnActive && lastBtnActiveId === listDetail.id) {
                changeIsPlayingList(false);
                changeIsBtnActive(false);
                setNewTrackList(listDetail.tracks)
                changeCurrentTrack(listDetail.tracks[0])
                audioElement.current.currentTime = 0;
            } else if (coincides && !isPlayingList && !isListBtnActive && lastBtnActiveId === listDetail.id) {
                changeIsBtnActive(true)
                changeIsPlayingList(true);
                changeLastBtnActiveId(listDetail.id)
                setNewTrackList(listDetail.tracks)
                changeCurrentTrack(listDetail.tracks[0])
                audioElement.current.currentTime = 0;
            } else if (coincides && !isPlayingList && isListBtnActive && lastBtnActiveId !== listDetail.id) {
                setNewTrackList(listDetail.tracks)
                changeCurrentTrack(listDetail.tracks[0])
                audioElement.current.currentTime = 0;
                changeIsBtnActive(false)
                changeIsPlayingList(false);
                changeLastBtnActiveId(listDetail.id)
            } else if (coincides && !isPlayingList && isListBtnActive && lastBtnActiveId === listDetail.id) {
                setNewTrackList(listDetail.tracks)
                changeCurrentTrack(listDetail.tracks[0])
                audioElement.current.currentTime = 0;
                changeIsBtnActive(false)
                changeIsPlayingList(false);
                changeLastBtnActiveId(listDetail.id)
            }
        }
    }

    useEffect(() => {
        const coincides = checkCoincides();
        if (isPlayingList && coincides && !isListBtnActive) {
            changeIsBtnActive(true)
        }
    }, [isPlayingList])

    const heartIconClicked = async () => {
        if (isFetching) return;

        const itemSearched = checkFavouriteAlreadyExist()
        setIsFetching(true);
        if (!itemSearched && currentUser && currentUser?.favourites && listDetail) {
            if (listDetail.listType) {

                const newUser = await addFavourites(getAccessTokenSilently, currentUser.id, listDetail.listType, listDetail.id)
                if (newUser) {
                    setIsLiked(true);
                    setCurrentLoggedUser(newUser)
                    toast.success('Successfully added!')
                    if (listDetail.listType !== "artist") {
                        let checkedList = listDetail as AlbumType | PlaylistType
                        if (checkedList.usersId) updateUserStats(checkedList.usersId, "likes", "increment")
                    }
                }
            }

        } else {
            if (itemSearched && currentUser) {
                const newUser: UserType = await deleteFavourites(getAccessTokenSilently, itemSearched?.id, currentUser.id)
                setIsLiked(false);
                setCurrentLoggedUser(newUser)
                toast.success('Successfully removed!')
                if (listDetail?.listType !== "artist") {
                    let checkedList = listDetail as AlbumType | PlaylistType
                    if (checkedList.usersId) updateUserStats(checkedList.usersId, "likes", "decrement")
                }
            }

        }
        setIsFetching(false);
    }

    const checkFavouriteAlreadyExist = () => {
        let itemSearched: FavouriteType | undefined;
        if (currentUser?.favourites) {

            const libraryListUser = currentUser?.favourites;
            itemSearched = libraryListUser?.find((item) => {
                if (item.playlist?.id === listDetail?.id) return true;
                if (item.album?.id === listDetail?.id) return true;
                if (item.artist?.id === listDetail?.id) return true;
                if (item.track?.id === listDetail?.id) return true;
            })
        }
        return itemSearched;
    }

    useEffect(() => {
        if (listDetail === null) navigate("/home")
        const itemSearched = checkFavouriteAlreadyExist();
        if (itemSearched) setIsLiked(true);
        const coincides = checkCoincides();
        if (coincides && isPlayingList) {
            changeIsBtnActive(true)
            if (listDetail) changeLastBtnActiveId(listDetail.id)
        } else if (!coincides && isPlayingList && lastBtnActiveId !== listDetail?.id && isListBtnActive) {
            changeIsBtnActive(false);
        } else if (!coincides && isPlayingList) {
            changeIsBtnActive(false);
        } else if (coincides && !isPlayingList && lastBtnActiveId === listDetail?.id && !isListBtnActive) {
            changeIsBtnActive(true);
        } else if (!coincides && !isPlayingList) {
            changeIsBtnActive(false);
        } else if (!coincides && isListBtnActive && lastBtnActiveId !== listDetail?.id && isListBtnActive) {
            changeIsBtnActive(false);
        }
    }, [])

    useEffect(() => {
        console.log("hoooola");
    }, [listDetail])
    return (
        <div>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            {listDetail &&

                <div className="list-detail-page-container">
                    <div className="list-detail-heading">
                        <FaAngleLeft className="list-detail-angle-btn" onClick={handleBackIconClicked} />

                        <img
                            className={`list-detail-img ${listDetail.listType === "artist" ? "artist-img" : ""}`}
                            src={listDetail?.imageUrl}
                            alt={`Image or Cover of ${listDetail?.name}`}
                        />

                        <div className="list-detail-dashboard">
                            {listDetail.listType !== "genre" && <BiSolidHeart className={isLiked ? "list-detail-heart-btn heart-button-isliked" : "list-detail-heart-btn"} onClick={heartIconClicked} />}
                            <span className="list-detail-container-play-btn" onClick={playBtnClicked} >
                                {isListBtnActive ? <BiStop className="list-detail-play-btn" /> : <BiPlay className="list-detail-play-btn" />}
                            </span>

                        </div>

                    </div>
                    <div className="list-detail-container-items">
                        <div className='list-detail-wrapper'>
                            {listDetail && listDetail.tracks && listDetail.tracks.map((track) => {
                                console.log("track" + track);
                                return (
                                    <TrackList
                                        key={getUniqueId()}
                                        track={track}
                                    />
                                )
                            })}
                            <div className='white-space'></div>
                        </div>

                    </div>

                </div>
            }
        </div>
    );
};
