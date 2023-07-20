import './trackList.css'
import { FC, useEffect, useState } from "react";

import { TrackListProps } from "../../../types/propTypes/trackListProps";
import { fetchData } from '../../../api/fetchApi';
import { TrackType } from '../../../types/dataTypes/track';
import { getUniqueId } from '../../../utils/functions/randomId';

export const TrackList: FC<TrackListProps> = ({ trackId }) => {

  const [track, setTrack] = useState<TrackType | null>(null);

  useEffect(() => {
    (async function getTrack() {
      const trackFetched = await fetchData(`tracks?id=${trackId}`) as TrackType[];
      const track = trackFetched[0];
      setTrack(track);
    }());
  }, [])

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
