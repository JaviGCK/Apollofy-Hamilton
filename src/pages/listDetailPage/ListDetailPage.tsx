import './listDetailPage.css'
import { FC, useEffect, useState } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { BiSolidHeart, BiPlay } from "react-icons/bi";
import { TrackList } from "../../components/lists/trackList/TrackList";
import { AlbumType } from "../../types/dataTypes/album";
import { ListDetailProps } from '../../types/propTypes/listDetailProps';

export const ListDetailPage: FC<ListDetailProps> = ({ ...props }) => {

    const [album, setAlbum] = useState<AlbumType | null>(null);
    /**${props.albumId} */
    useEffect(() => {
        const api = async () => {
            const data = await fetch(`http://localhost:3001/albums?id=4yP0hdKOZPNshxUOjY0cZj`);
            const albumFetched = await data.json();
            setAlbum(albumFetched[0]);
        };
        api();
    }, []);

    return (
        <div>
            {album && <div className="list-detail-page-container">
                <div className="list-detail-heading">
                    <FaAngleLeft className="list-detail-angle-btn" />

                    <img
                        className="list-detail-img"
                        src={album?.imageUrl}
                        alt={`Image or Cover of ${album?.name}`}
                    />

                    <div className="list-detail-dashboard">
                        <AiOutlinePlusCircle className="list-detail-add-btn" />
                        <BiSolidHeart className="list-detail-heart-btn" />
                        <span className="list-detail-container-play-btn">
                            <BiPlay className="list-detail-play-btn" />
                        </span>
                    </div>

                </div>
                <div className="list-detail-container-items">
                    {album.tracks?.map((track) => (
                        <TrackList key={track.id} trackId={track.id} />
                    ))}

                </div>
            </div>}
        </div>
    );
};
