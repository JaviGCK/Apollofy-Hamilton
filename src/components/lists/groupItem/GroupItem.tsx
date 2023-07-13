import { PossibleItems } from "../../../types/dataTypes/enums"




export const GroupItem = ({ ...props }, list: PossibleItems) => {
    return (
        <div>
            <img src={list.imageUrl} alt={`Image or Cover of ${list.name}`} />
            <h3>{list.name}</h3>
            <p>{list.type}</p>
            <span>Solucionar error tipado</span>
        </div>
    )
}
