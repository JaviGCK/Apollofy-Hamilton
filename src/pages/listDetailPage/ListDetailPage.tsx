import './listDetailPage.css'
import { useEffect, useState } from "react";
import { FaAngleLeft, FaRandom } from "react-icons/fa";
import { BiSolidHeart, BiPlay, BiStop } from "react-icons/bi";
import { TrackList } from "../../components/lists/trackList/TrackList";
import { useListDetailContext } from '../../utils/hooks/useListDetailContext';
import { addFavourites, deleteFavourites } from '../../api/fetchApi';
import { useNavigate } from 'react-router-dom';
import { getUniqueId } from '../../utils/functions/randomId';
import { useTrackListContext } from '../../utils/hooks/useTrackListContext';
import { useUserContext } from '../../utils/hooks/useUserContext';
import toast, { Toaster } from 'react-hot-toast';
import { useAuth0 } from '@auth0/auth0-react';
import { UserType } from '../../components/profileChart/ProfileChart';
import { FavouriteType } from '../libraryPage/LibraryPage';

export const ListDetailPage = () => {

    const [isFetching, setIsFetching] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [isShuffleActive, setIsShuffleActive] = useState(false);
    const { currentUser, setCurrentLoggedUser } = useUserContext();
    const { listDetail } = useListDetailContext();
    const { setNewTrackList } = useTrackListContext();
    const { getAccessTokenSilently } = useAuth0();
    const navigate = useNavigate();

    const toggleShuffle = () => {
        setIsShuffleActive(!isShuffleActive);
    };

    const handleBackIconClicked = () => {
        navigate(-1);
    }


    const playBtnClicked = () => {
        if (listDetail && listDetail.tracks) setNewTrackList(listDetail?.tracks);

        if (listDetail === null) return;
    }


    const heartIconClicked = async () => {
        if (isFetching) return;

        const itemSearched = checkFavouriteAlreadyExist()
        setIsFetching(true);
        if (!itemSearched && currentUser && currentUser?.favourites && listDetail) {
            if (listDetail.listType) {

                const newUser = await addFavourites(getAccessTokenSilently, currentUser.id, listDetail.listType, listDetail.id)
                if (newUser) {
                    setIsLiked(true);
                    setCurrentLoggedUser(newUser)
                    toast.success('Successfully added!')
                }
            }

        } else {
            if (itemSearched && currentUser) {
                const newUser: UserType = await deleteFavourites(getAccessTokenSilently, itemSearched?.id, currentUser.id)
                setIsLiked(false);
                setCurrentLoggedUser(newUser)
                toast.success('Successfully removed!')
            }

        }
        setIsFetching(false);
    }

    const checkFavouriteAlreadyExist = () => {
        let itemSearched: FavouriteType | undefined;
        if (currentUser?.favourites) {

            const libraryListUser = currentUser?.favourites;
            itemSearched = libraryListUser?.find((item) => {
                if (item.playlist?.id === listDetail?.id) return true;
                if (item.album?.id === listDetail?.id) return true;
                if (item.artist?.id === listDetail?.id) return true;
                if (item.track?.id === listDetail?.id) return true;
            })
        }
        return itemSearched;
    }

    useEffect(() => {
        if (listDetail === null) navigate("/home")
        const itemSearched = checkFavouriteAlreadyExist();
        if (itemSearched) setIsLiked(true);
    }, [])


    return (
        <>
            {listDetail && <div className="list-detail-page-container">
                <Toaster
                    position="top-center"
                    reverseOrder={false}
                />
                <div className="list-detail-heading">
                    <FaAngleLeft className="list-detail-angle-btn" onClick={handleBackIconClicked} />

                    <img
                        className={`list-detail-img ${listDetail.listType === "artist" ? "artist-img" : ""}`}
                        src={listDetail?.imageUrl}
                        alt={`Image or Cover of ${listDetail?.name}`}
                    />

                    <div className="list-detail-dashboard">
                        {listDetail.listType !== "genre" && <BiSolidHeart className={isLiked ? "list-detail-heart-btn heart-button-isliked" : "list-detail-heart-btn"} onClick={heartIconClicked} />}
                        <span className="list-detail-container-play-btn" onClick={playBtnClicked} >
                            {false ? <BiStop className="list-detail-play-btn" /> : <BiPlay className="list-detail-play-btn" />}
                        </span>
                        <FaRandom
                            className={`list-detail-shuffle-btn ${isShuffleActive ? 'active' : ''}`}
                            onClick={toggleShuffle}
                        />

                    </div>

                </div>
                <div className="list-detail-container-items">
                    <div className='list-detail-wrapper'>
                        {listDetail && listDetail.tracks && listDetail.tracks.map((track) => (
                            <TrackList
                                key={getUniqueId()}
                                track={track}
                            />
                        ))}
                        <div className='white-space'></div>
                    </div>

                </div>
            </div>}
        </>
    );
};
