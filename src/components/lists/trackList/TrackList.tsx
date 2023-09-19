import './trackList.css'
import { FC } from "react";
import { TrackType } from '../../../types/track';
import { getUniqueId } from '../../../utils/functions/randomId';
interface TrackListProps {
  track: TrackType,
}

export const TrackList: FC<TrackListProps> = ({ track }) => {

  return (
    <>
      {track && <div className="list-detail-track">
        <img
          className="list-detail-track-img"
          src={track.imageUrl}
          alt={`Image or Cover of ${track.name}`}
        />
        <div className="list-detail-track-info">
          <h3>{track.name}</h3>
          {track.artists && track.artists.map((artist) => (
            <p key={getUniqueId()}>{artist.name}</p>
          ))}
        </div>
      </div>}
    </>
  );
};
