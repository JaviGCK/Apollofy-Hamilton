import './genreButton.css';
import { GenreType } from '../../../types/dataTypes/genre';

export const GenreButton = (props: GenreType) => {

    const { name, imageUrl, id, btnColor } = props
    return (

        <button key={id} className='genre-button' style={{ background: btnColor }} >
            <div className='genre-button-container'>
                <p className='genre-tittle'> {name} </p>
                <img className='genre-img' src={imageUrl} alt={`Cover de ${name}`} />
            </div>
        </button>

    )
}
