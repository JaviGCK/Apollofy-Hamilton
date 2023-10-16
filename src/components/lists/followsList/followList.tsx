import './followsList.css'
import { FC } from "react";
import { UserType } from '../../profileChart/ProfileChart';
import { AiOutlineCloseCircle } from 'react-icons/ai';

export interface FollowsPropTypes {

    list: UserType[],
    handleClose: any
}

export const FollowsList: FC<FollowsPropTypes> = ({ list, handleClose }) => {


    return (
        <div className="list-follows-detail">

            <AiOutlineCloseCircle className="back-icon-follow" onClick={() => handleClose(null)} />

            {list.map((user) => (
                <div className="list-follow-user" key={user.id}>
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
