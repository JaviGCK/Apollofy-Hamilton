import './genreButton.css';
import { GenreType } from '../../../types/dataTypes/genre';

export const GenreButton = (props: GenreType) => {

    const {name, imageUrl, id, btnColor, setSearchInput, setCustomFilter, setFocus} = props
    return(

        <button key={id} className='genre-button' style={{background:btnColor}} onClick={() => { setSearchInput(`${name}`); setCustomFilter(true); setFocus(true)}}>
            <div className='genre-button-container'>
                <p className='genre-tittle'> {name} </p>
                <img className='genre-img' src={imageUrl} alt={`Cover de ${name}`} />
            </div>
        </button>

    )
}
