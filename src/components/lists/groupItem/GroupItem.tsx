import './groupItem.css'
import { BsFillPlayCircleFill, BsStopCircleFill } from 'react-icons/bs';
import { useTrackListContext } from '../../../utils/hooks/useTrackListContext';
import { useListDetailContext } from '../../../utils/hooks/useListDetailContext';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useIsPlayingContext } from '../../../utils/hooks/useIsPlayingContext';
import { updateUserStats } from '../../../api/statsFetchApi';

export const GroupItem = ({ ...props }) => {
    const { track, onItemClicked } = props
    const { trackList, setNewTrackList, audioElement } = useTrackListContext();
    const { changeIsPlayingList } = useIsPlayingContext();
    const { setNewListDetail } = useListDetailContext();
    const [trackIsPlaying, setTrackIsPlaying] = useState<boolean>(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const navigate = useNavigate();
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
        <>
            <div className="group-item-list" onClick={itemClicked}>
                <img className={`img-list ${track.type === 'artist' ? 'artist-image' : ''}`} src={track.imageUrl} alt={`Image or Cover of ${track.name}`} />
                <div className='item-list-info'>
                    <h3 className={trackIsPlaying ? "active-track" : ""}>{track.name.length > 17 ? `${track.name.slice(0, 17)}...` : track.name}</h3>
                    {(track.hasOwnProperty('artists') && track.artists.length > 0) ? <p>{track.artists[0].name}</p> : <></>}
                    <p>{track.type === "artist" && t('artistType')}</p>
                    <p>{track.type === "album" && t('albumType')}</p>
                    <p>{track.type === "playlist" && t('playlistType')}</p>
                    <p>{track.type === "track" && t('trackType')}</p>
                </div>
                {track.hasOwnProperty('liked') ?
                    <button className="gi-playBtn"
                        onClick={() => { onItemClicked(); setNewTrackList([track]); }}>
                        {isPlaying ? <BsStopCircleFill className="gi-playBtn-ico" onClick={() => { setIsPlaying(false); audioElement.current.currentTime = 0 }} /> : <BsFillPlayCircleFill
                            onClick={() => { setIsPlaying(true); }}
                            className="gi-playBtn-ico"
                        />}
                    </button> : <></>}
            </div>
        </>
    )
}
