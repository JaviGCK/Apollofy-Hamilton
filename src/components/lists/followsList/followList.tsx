import './followsList.css'
import { FC, useEffect, useState } from "react";

import { UserType } from '../../../types/dataTypes/user';
import { FollowsPropTypes } from "../../../types/propTypes/followsPropTypes";
import { fetchData } from '../../../api/fetchApi';

//import { getUniqueId } from '../../../utils/functions/randomId';

export const FollowsList: FC<FollowsPropTypes> = ({ userId, userFollowers, userFollowing }) => {

    const [user, setUser] = useState<UserType | null>(null);

    useEffect(() => {
        (async function getTrack() {
            const userFetched = await fetchData(`users?id=${userId}`) as UserType[]; // habria que poner el end point de los seguidores del usuario 
            const user = userFetched[0];
            setUser(user);
        }());
    }, [])


    return (
        <>

            {user && <div className="list-follows-detail">
                <img
                    className="list-follows-detail-img"
                    src={userFollowers.followedBy.profilePicture}
                    alt={`Image of ${userFollowers.followedBy.name}`}
                />
                <div className="list-follows-detail-info">
                    <h3>{userFollowers.followedBy.name}</h3>

                </div>
            </div>}

        </>
    );
};
