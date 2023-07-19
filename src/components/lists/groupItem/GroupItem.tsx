import './groupItem.css'
import { PossibleItems } from "../../../types/dataTypes/enums"




export const GroupItem = ({ ...props }, list: PossibleItems) => {
    return (
        <div className="group-item-list">
            <img className={`img-list ${props.type === 'Artist' ? 'artist-image' : ''}`} src={props.imageUrl} alt={`Image or Cover of ${props.name}`} />
            <div className='item-list-info'>
                <h3>{props.name}</h3>
                <p>{props.artist}</p>
                <p>{props.type}</p>
            </div>
        </div>
    )
}
