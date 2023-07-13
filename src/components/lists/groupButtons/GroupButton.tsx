import './groupButton.css'
import { BiPlus } from 'react-icons/bi'

export const GroupButton = ({...props}) => {

    return (
        <div className="group-button">
            {props.buttonType === "Artist" ? <span className='rounded-span'><BiPlus className='group-button-icon' /></span> : <span className='square'><BiPlus className='group-button-icon' /></span>}
            <h3>{`Add ${props.buttonType}`}</h3>
        </div>
    )
}
