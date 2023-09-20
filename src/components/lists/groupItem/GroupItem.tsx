import './groupItem.css'
import { BsFillPlayCircleFill, BsStopCircleFill } from 'react-icons/bs';
import { useTrackListContext } from '../../../utils/hooks/useTrackListContext';
import { useListDetailContext } from '../../../utils/hooks/useListDetailContext';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export const GroupItem = ({ ...props }) => {
    const { track, onItemClicked } = props
    const { setNewTrackList, audioElement } = useTrackListContext();
    const { setNewListDetail } = useListDetailContext();
    const [isPlaying, setIsPlaying] = useState(false);
    const navigate = useNavigate();
    const { t } = useTranslation();


    const itemClicked = () => {
        if (track.listType) {
            (async function showItemClicked() {
                setNewListDetail(track);
                navigate("/detail-page");
            }());
        }
    }
    return (
        <>
            <div className="group-item-list" onClick={itemClicked}>
                <img className={`img-list ${track.type === 'artist' ? 'artist-image' : ''}`} src={track.imageUrl} alt={`Image or Cover of ${track.name}`} />
                <div className='item-list-info'>
                    <h3>{track.name.length > 17 ? `${track.name.slice(0, 17)}...` : track.name}</h3>
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
