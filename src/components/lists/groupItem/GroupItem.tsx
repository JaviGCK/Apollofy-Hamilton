import './groupItem.css'
import { BsFillPlayCircleFill } from 'react-icons/bs';
import { useTrackListContext } from '../../../hooks/useTrackListContext';

export const GroupItem = ({ ...props }) => {
    const {track, isActive, onItemClicked} = props
    const {setNewTrackList} = useTrackListContext();
    return (
        <>

            <div className="group-item-list">
                <img className={`img-list ${track.type === 'artist' ? 'artist-image' : ''}`} src={track.imageUrl} alt={`Image or Cover of ${track.name}`} />
                <div className='item-list-info'>
                    <h3>{track.name.length > 17 ? `${track.name.slice(0, 17)}...` : track.name}</h3>
                    {(track.hasOwnProperty('artists')) ? <p>{track.artists[0].name}</p>: <></>}
                    <p>{track.type}</p>
                </div>
                {track.hasOwnProperty('liked') ?
                <button className="gi-playBtn"
                onClick={() => {onItemClicked(); setNewTrackList([track]);}}>
                    <BsFillPlayCircleFill
                    className="gi-playBtn-ico"
                    style={{ color: isActive ? '#00F79F' : '#f1f1f1' }}/>
                </button> : <></>}
            </div>




            {/**<div className="group-item-list">
            <img className='img-list' src={props.imageUrl} alt={`Image or Cover of ${props.name}`} />
            <div className='item-list-info'>
                <h3>{props.name}</h3>
                <p>{props.artist}</p>
                <p>{props.type}</p>
            </div>
        </div> */}
        </>
    )
}
