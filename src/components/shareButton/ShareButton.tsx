import './shareButton.css'
import { BsFillShareFill } from "react-icons/bs"
const ShareButton = () => {
    return (
        <div className='share-button-container'>
            <button><BsFillShareFill className='share-icon'/></button>
        </div>
    )
}
export default ShareButton
