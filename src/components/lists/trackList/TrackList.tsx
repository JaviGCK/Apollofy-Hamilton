import './trackList.css'
import { FC } from "react";
// import { fetchData } from '../../../api/fetchApi';
import { TrackType } from '../../../types/track';
import { getUniqueId } from '../../../utils/functions/randomId';
// import { useAuth0 } from '@auth0/auth0-react';
interface TrackListProps {
  track: TrackType,
}

export const TrackList: FC<TrackListProps> = ({ track }) => {

  // const [track, setTrack] = useState<TrackType | null>(null);
  // const { getAccessTokenSilently } = useAuth0();

  // useEffect(() => {
  //   (async function getTrack() {
  //     const trackFetched = await fetchData(getAccessTokenSilently, `tracks/${trackId}`) as TrackType;
  //     const track = trackFetched;
  //     setTrack(track);
  //   }());
  // }, [])

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
