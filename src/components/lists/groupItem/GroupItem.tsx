import './groupItem.css'
import { BsFillPlayCircleFill, BsStopCircleFill } from 'react-icons/bs';
import { useTrackListContext } from '../../../utils/hooks/useTrackListContext';
import { fetchData } from '../../../api/fetchApi';
import { ArtistType } from '../../../types/dataTypes/artist';
import { useListDetailContext } from '../../../utils/hooks/useListDetailContext';
import { PlaylistType } from '../../../types/dataTypes/playlist';
import { AlbumType } from '../../../types/dataTypes/album';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const GroupItem = ({ ...props }) => {
    const { track, onItemClicked } = props
    const { setNewTrackList, audioElement } = useTrackListContext();
    const { setNewListDetail } = useListDetailContext();
    const [isPlaying, setIsPlaying] = useState(false);
    const navigate = useNavigate();
    const itemClicked = () => {
        if (track.type) {
            (async function showItemClicked() {
                const itemFetched = await fetchData(`${track.type}s?id=${track.id}`) as (ArtistType[] | PlaylistType[] | AlbumType[]);
                const item = itemFetched[0];
                setNewListDetail(item);
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
                    {(track.hasOwnProperty('artists')) ? <p>{track.artists[0].name}</p> : <></>}
                    <p>{track.type}</p>
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
