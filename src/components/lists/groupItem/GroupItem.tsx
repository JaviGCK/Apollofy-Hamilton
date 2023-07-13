import './groupItem.css'
import { PossibleItems } from "../../../types/dataTypes/enums"




export const GroupItem = ({ ...props }, list: PossibleItems) => {
    return (
        <div className="group-item-list">
            <img className='img-list' src={list.imageUrl} alt={`Image or Cover of ${list.name}`} />
            <div className='item-list-info'>
                <h3>{list.name}</h3>
                <p>{list.type}<span>| Solucionar error tipado</span></p>
            </div>
        </div>
    )
}
