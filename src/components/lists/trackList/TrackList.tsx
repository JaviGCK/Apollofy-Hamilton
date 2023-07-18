import './trackList.css'
import { FC, useEffect, useState } from "react";
import { TrackType } from "../../../types/dataTypes/track";
import { TrackListProps } from "../../../types/propTypes/trackListProps";

export const TrackList: FC<TrackListProps> = ({...props}) => {

    const [track, setTrack] = useState<TrackType | null>(null);
  
    useEffect(() => {
        const api = async () => {
          const data = await fetch(`http://localhost:3001/tracks?id=${props.trackId}`);
          const trackFetched = await data.json();
          setTrack(trackFetched[0]);
        };
        api();
      }, []);

  
  return (
    <div>
      
        <div key={track?.id} className="list-detail-track">
          <img
            className="list-detail-track-img"
            src={track?.imageUrl}
            alt={`Image or Cover of ${track?.name}`}
          />
          <div className="list-detail-track-info">
            <h3>{track?.name}</h3>
            {track?.artists.map((artist)=> (
                <p>{artist.name}</p>
            ))}
          </div>
        </div>
      
    </div>
  );
};
