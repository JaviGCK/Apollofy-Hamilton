import './listDetailPage.css'
import { useEffect, useState } from "react";
import { FaAngleLeft, FaRandom } from "react-icons/fa";
import { BiSolidHeart, BiPlay, BiStop } from "react-icons/bi";
import { TrackList } from "../../components/lists/trackList/TrackList";
import { useListDetailContext } from '../../utils/hooks/useListDetailContext';
import { addFavourites } from '../../api/fetchApi';
import { useNavigate } from 'react-router-dom';
import { getUniqueId } from '../../utils/functions/randomId';
import { useTrackListContext } from '../../utils/hooks/useTrackListContext';
import { useUserContext } from '../../utils/hooks/useUserContext';
import toast, { Toaster } from 'react-hot-toast';
import { useAuth0 } from '@auth0/auth0-react';

export const ListDetailPage = () => {

    const { listDetail } = useListDetailContext();

    const { currentUser } = useUserContext();

    const { getAccessTokenSilently } = useAuth0();


    const { setNewTrackList } = useTrackListContext();

    const navigate = useNavigate();

    const handleBackIconClicked = () => {
        navigate(-1);
    }

    const [isShuffleActive, setIsShuffleActive] = useState(false);

    const playBtnClicked = () => {
        if (listDetail && listDetail.tracks) setNewTrackList(listDetail?.tracks);

        if (listDetail === null) return;
    }


    const heartIconClicked = async () => {
        const libraryListUser = currentUser?.favourites;
        const itemSearched = libraryListUser?.find((item) => {
            if (item.id === listDetail?.id) return true;
        })
        if (itemSearched === undefined && currentUser && currentUser?.favourites && listDetail) {
            if (listDetail.listType) {
                const favouritesResult = await addFavourites(getAccessTokenSilently, currentUser.id, listDetail.listType, listDetail.id)
                if (favouritesResult.status === 201) {
                    toast.success('Successfully added!')
                }
            }

        } else {
            toast.success('Already exists!')
        }
    }

    useEffect(() => {
        if (listDetail === null) navigate("/home")
    }, [])



    const toggleShuffle = () => {
        setIsShuffleActive(!isShuffleActive);
    };

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
                        <BiSolidHeart className="list-detail-heart-btn" onClick={heartIconClicked} />
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
