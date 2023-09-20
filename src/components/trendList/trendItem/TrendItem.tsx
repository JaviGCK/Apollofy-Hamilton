
import { FaMusic } from "react-icons/fa";
import { BiPlay, BiStop } from "react-icons/bi";
import "./trendItem.css"
import { FC, useState } from "react";
import { AlbumType } from "../../../types/album";
import { PlaylistType } from "../../../types/playlist";
import { ArtistType } from "../../../types/artist";
import { useNavigate } from "react-router-dom";
import { useListDetailContext } from "../../../utils/hooks/useListDetailContext";
import { useTrackListContext } from "../../../utils/hooks/useTrackListContext";
import { useIsPlayingContext } from "../../../utils/hooks/useIsPlayingContext";

interface TrendItemProps {
    item: ArtistType | PlaylistType | AlbumType
}


export const TrendItem: FC<TrendItemProps> = ({ ...props }) => {

    const { item } = props;
    const navigate = useNavigate();
    const { setNewListDetail } = useListDetailContext();
    const { setNewTrackList, audioElement } = useTrackListContext();
    const { changeCurrentTrack, changeIsPlayingList } = useIsPlayingContext();
    const [btnActive, setBtnActive] = useState(false)

    const handleListDetailClicked = () => {
        setNewListDetail(item);
        navigate("/detail-page");
    }

    const homePagePlayClicked = (e: any) => {
        e.stopPropagation();
        setBtnActive(!btnActive);
        if (item.tracks) {
            setNewTrackList(item?.tracks);
            changeCurrentTrack(item.tracks[0])
            audioElement.current.currentTime = 0;
            changeIsPlayingList(true)
        }
    }


    return (
        <div className="trend-item-container" onClick={handleListDetailClicked}>
            {item && item.tracks && item.tracks[0].artists && <>
                <div className="trend-item-card">
                    <img className="trend-item-card-img" src={item.imageUrl} alt={`Cover Image of ${item.name}`} />

                    <div className="trend-item-dashboard">
                        <p className="dashboard-track-title">{item.tracks[0].name}</p>

                        <p className="dashboard-track-info">
                            <FaMusic className="dashboard-music-icon" /> <span>{item.tracks[0].artists[0].name}</span> - <span>{item.tracks[0].album?.name}</span>
                        </p>

                        <span className="play-btn-container" onClick={homePagePlayClicked}>
                            {btnActive ?
                                <BiStop className="dashboard-play-icon" />
                                :
                                <BiPlay className="dashboard-play-icon" />}
                        </span>
                    </div>
                </div>
                <span className="trend-title">{item.name}</span>
            </>}
        </div>
    )
}
