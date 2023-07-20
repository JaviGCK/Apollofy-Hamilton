import './groupButton.css'
import { BiPlus } from 'react-icons/bi'

export const GroupButton = ({ ...props }) => {

    return (
        <div className="group-button">
            {props.buttonType === "Artist" ? <span className='rounded-span'><BiPlus className='group-button-icon' /></span> : <span className='square-span'><BiPlus className='group-button-icon' /></span>}
            <h3 className='group-button-text'>{`Add ${props.buttonType}`}</h3>
        </div>
    )
}
