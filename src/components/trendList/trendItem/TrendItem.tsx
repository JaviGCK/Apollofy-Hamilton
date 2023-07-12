
import { PossibleItems } from "../../../types/dataTypes/enums"
import "./trendItem.css"


export const TrendItem = ({ ...props }) => {
    return (
        <div>
            <img src={props.item.imageUrl} alt={`Cover Image of ${props.item.name}`} />
            <div>
                <p>
                    PRIMERA CANCION DE ESTA LISTA
                </p>

                <p>
                    ICONO MUSIC<span>ARTISTA</span><span>ALBUM</span>
                </p>

                <span>
                    ICONO PLAY
                </span>
            </div>
        </div>
    )
}
