
import "./trendItem.css"


export const TrendItem = ({ ...props }) => {
    const item = props.item;
    console.log(item)
    return (
        <div>
            <img src={item.imageUrl} alt={`Cover Image of ${item.name}`} />
            <div>
                <p>
                    PRIMERA CANCION DE ESTA LISTA : {item.tracks[0].trackName}
                </p>

                <p>
                    ICONO MUSIC<span>ARTISTA: {item.tracks[0].artistName}</span><span>ALBUM: {item.tracks[0].albumName}</span>
                </p>

                <span>
                    ICONO PLAY
                </span>
            </div>
        </div>
    )
}
