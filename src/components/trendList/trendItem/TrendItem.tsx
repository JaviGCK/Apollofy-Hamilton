
import { FaMusic } from "react-icons/fa";
import { BiPlay } from "react-icons/bi";
import "./trendItem.css"


export const TrendItem = ({ ...props }) => {
    const item = props.item;
    console.log(item)
    return (
        <div className="trend-item-container">
            <div className="trend-item-card">
                <img className="trend-item-card-img" src={item.imageUrl} alt={`Cover Image of ${item.name}`} />

                <div className="trend-item-dashboard">
                    <p className="dashboard-track-title">
                        {item.tracks[0].trackName}
                    </p>

                    <p className="dashboard-track-info">
                        <FaMusic className="dashboard-music-icon" /> <span>{item.tracks[0].artistName}</span> - <span>{item.tracks[0].albumName}</span>
                    </p>

                    <span className="play-btn-container">
                        <BiPlay className="dashboard-play-icon" />
                    </span>
                </div>
            </div>
            <span className="trend-title">
                TITULO DEL CONJUNTO
            </span>
        </div>
    )
}
