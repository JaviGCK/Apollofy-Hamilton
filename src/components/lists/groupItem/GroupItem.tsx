import './groupItem.css'
import { MdOutlineDeleteForever } from "react-icons/md";
import { useTrackListContext } from '../../../utils/hooks/useTrackListContext';
import { useListDetailContext } from '../../../utils/hooks/useListDetailContext';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { useIsPlayingContext } from '../../../utils/hooks/useIsPlayingContext';
import { updateUserStats } from '../../../api/statsFetchApi';
import { deleteAlbum, deleteTrack, fetchData } from '../../../api/fetchApi';
import { useAuth0 } from '@auth0/auth0-react';
import { useUserContext } from '../../../utils/hooks/useUserContext';
import { UserType } from '../../profileChart/ProfileChart';
import toast from 'react-hot-toast';

export const GroupItem = ({ ...props }) => {
    const { track } = props;
    const { trackList, setNewTrackList, audioElement } = useTrackListContext();
    const { changeIsPlayingList } = useIsPlayingContext();
    const { setNewListDetail } = useListDetailContext();
    const { currentUser, setCurrentLoggedUser, setChangedUserData } = useUserContext();
    const [trackIsPlaying, setTrackIsPlaying] = useState<boolean>(false);
    const { getAccessTokenSilently } = useAuth0();
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useTranslation();


    const itemClicked = () => {
        if (track.listType) {
            if (track.listType !== "track") {
                (async function showItemClicked() {
                    setNewListDetail(track);
                    navigate("/detail-page");
                }());
            } else {
                if (!track.verified) {
                    if (track.userId) updateUserStats(track.userId, "views")
                }
                setTrackIsPlaying(true)
                if (trackList && trackList.length === 1 && trackList[0].id === track.id) {
                    changeIsPlayingList(true);
                } else {
                    const newTracklist = [track];
                    setNewTrackList(newTracklist);
                    audioElement.current.currentTime = 0;
                    changeIsPlayingList(true);
                }
            }
        }
    }

    const handleDeleteItem = async () => {
        const loadingToast = toast.loading("Deleting...")
        await new Promise((resolve) => setTimeout(resolve, 1000));

        if (track.listType === "track") {

            const deletedTrack = await deleteTrack(getAccessTokenSilently, track.id);

            if (deletedTrack.ok) {
                const updatedUser = await fetchData(getAccessTokenSilently, `users/${currentUser?.id}`) as UserType;
                setCurrentLoggedUser(updatedUser);
                setChangedUserData(true)
                toast.success("Successfully deleted!", { id: loadingToast })
            } else toast.error("Error deleting.", { id: loadingToast })

        } else if (track.listType === "album") {
            const deletedAlbum = await deleteAlbum(getAccessTokenSilently, track.id)

            if (deletedAlbum.ok) {
                const updatedUser = await fetchData(getAccessTokenSilently, `users/${currentUser?.id}`) as UserType;
                setCurrentLoggedUser(updatedUser);
                setChangedUserData(true)
                toast.success("Successfully deleted!", { id: loadingToast })
            } else toast.error("Error deleting.", { id: loadingToast })
        }

    }

    useEffect(() => {
        if (track.listType) {
            if (trackList && trackList.length === 1 && trackList[0].id === track.id) {
                setTrackIsPlaying(true)
            } else {
                setTrackIsPlaying(false)
            }
        }
    }, [trackList])

    return (

        <div className="group-item-list">

            <div className='img-list-container' onClick={itemClicked}>
                <img className={`img-list ${track.listType === 'artist' ? 'artist-image' : ''}`} src={track.imageUrl} alt={`Image or Cover of ${track.name}`} />
            </div>
            <div className='item-list-info' onClick={itemClicked}>
                <h3 className={`group-item-track-title ${trackIsPlaying ? "active-track" : ""}`}>{track.name.length > 17 ? `${track.name.slice(0, 17)}...` : track.name}</h3>
                {(track.hasOwnProperty('artists') && track.artists.length > 0) ? <p>{track.artists[0].name}</p> : <></>}
                <p>{track.listType === "artist" && t('artistType')}</p>
                <p>{track.listType === "album" && t('albumType')}</p>
                <p>{track.listType === "playlist" && t('playlistType')}</p>
                <p>{track.listType === "track" && t('trackType')}</p>

            </div>
            <div className='group-item-buttons-container'>
                {location.pathname === "/user" ? <MdOutlineDeleteForever className="group-item-delete-icon" onClick={handleDeleteItem} /> : <></>}
            </div>
        </div>

    )
}
