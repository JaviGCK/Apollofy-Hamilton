import './followsList.css'
import { FC } from "react";
import { UserType } from '../../profileChart/ProfileChart';


export interface FollowsPropTypes {

    list: UserType[],
}

export const FollowsList: FC<FollowsPropTypes> = ({ list }) => {

    return (
        <div className="list-follows-detail">
            {list.map((user) => (
                <div key={user.id}>
                    <img
                        className="list-follows-detail-img"
                        src={user.imageUrl}
                        alt={`Image of ${user.userName}`}
                    />
                    <div className="list-follows-detail-info">
                        <h3>{user.userName}</h3>

                    </div>
                </div>
            ))}
        </div>
    );
};
