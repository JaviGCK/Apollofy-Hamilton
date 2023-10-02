import './trackList.css'
import { FC, useEffect, useState } from "react";
import { TrackType } from '../../../types/track';
import { getUniqueId } from '../../../utils/functions/randomId';
import { MdAddCircleOutline } from 'react-icons/md';
import { FavouriteType } from '../../../pages/libraryPage/LibraryPage';
import { useUserContext } from '../../../utils/hooks/useUserContext';
import { addFavourites, deleteFavourites } from '../../../api/fetchApi';
import { useAuth0 } from '@auth0/auth0-react';
import { UserType } from '../../profileChart/ProfileChart';
import toast from 'react-hot-toast';
import { AiFillCheckCircle } from 'react-icons/ai';
import { useTrackListContext } from '../../../utils/hooks/useTrackListContext';
import { useIsPlayingContext } from '../../../utils/hooks/useIsPlayingContext';
import { updateUserStats } from '../../../api/statsFetchApi';
interface TrackListProps {
  track: TrackType,
}

export const TrackList: FC<TrackListProps> = ({ track }) => {
  const { currentUser, setCurrentLoggedUser } = useUserContext();
  const [liked, setLiked] = useState<boolean>(false)
  const { getAccessTokenSilently } = useAuth0();
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const { trackList, setNewTrackList, audioElement } = useTrackListContext();
  const { currentTrack, changeIsPlayingList } = useIsPlayingContext();
  const [trackIsPlaying, setTrackIsPlaying] = useState<boolean>(false);

  const handleLikeTrackClicked = async (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    if (!track.verified) {
      if (track.userId) updateUserStats(track.userId, "views")
    }
    if (!isFetching) {
      const itemSearched = checkFavouriteAlreadyExist();
      setIsFetching(true)
      if (!itemSearched && !liked) {
        if (currentUser) {
          const newUser = await addFavourites(getAccessTokenSilently, currentUser.id, "track", track.id)
          setLiked(true);
          setCurrentLoggedUser(newUser)
          toast.success('Successfully added!')
        }
      } else {
        if (itemSearched && currentUser) {
          const newUser: UserType = await deleteFavourites(getAccessTokenSilently, itemSearched?.id, currentUser.id)
          setLiked(false);
          setCurrentLoggedUser(newUser)
          toast.success('Successfully removed!')
        }
      }
      setIsFetching(false)
    }
  }



  const trackListDetailClicked = () => {
    setTrackIsPlaying(true)
    if (trackList && trackList.length === 1 && trackList[0].id === track.id) {
      changeIsPlayingList(true);
    } else {
      const newTracklist = [track];
      setNewTrackList(newTracklist);
      audioElement.current.currentTime = 0;
      changeIsPlayingList(true);
    }
  }


  const checkFavouriteAlreadyExist = () => {
    let itemSearched: FavouriteType | undefined;
    if (currentUser?.favourites) {
      const libraryListUser = currentUser?.favourites;
      itemSearched = libraryListUser?.find((item) => {
        if (item.track) {
          if (item.track.id === track.id) return true;
        }
      })
    }
    return itemSearched;
  }

  useEffect(() => {
    if (currentTrack?.id === track.id) setTrackIsPlaying(true)
    else setTrackIsPlaying(false)
    // console.log("currentTrack dentro");
  }, [currentTrack])

  useEffect(() => {
    // console.log("entro vacio ");
    const itemSearched = checkFavouriteAlreadyExist();
    if (itemSearched) setLiked(true)
    if (trackList && trackList.length === 1 && trackList[0].id === track.id) {
      setTrackIsPlaying(true)
    }
  }, [])

  return (
    <div>
      {track && <div className="list-detail-track" onClick={trackListDetailClicked}>
        <img
          className="list-detail-track-img"
          src={track.imageUrl}
          alt={`Image or Cover of ${track.name}`}
        />
        <div className="list-detail-track-info">
          <div className='track-info-left'>
            <h3 className={trackIsPlaying ? "active-track" : ""}>{track.name}</h3>
            {track.artists && track.artists.map((artist) => (
              <p key={getUniqueId()} className={trackIsPlaying ? "active-track" : ""}>{artist.name} </p>
            ))}
          </div>
          <div className='track-add-right'>
            {!liked ? <MdAddCircleOutline className="icon-add-track-right" onClick={handleLikeTrackClicked} />
              :
              <AiFillCheckCircle className="icon-add-track-right icon-add-track-right-liked" onClick={handleLikeTrackClicked} />}
          </div>
        </div>
      </div>}
    </div>
  );
};
