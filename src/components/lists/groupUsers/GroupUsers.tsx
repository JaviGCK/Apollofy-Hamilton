import './groupUsers.css'


import { useNavigate } from 'react-router-dom';
// import { useAuth0 } from '@auth0/auth0-react';
import { UserType } from '../../profileChart/ProfileChart';
import { FC } from 'react';


type GroupUsersType = {
    user: UserType
}

export const GroupUsers: FC<GroupUsersType> = ({ user }) => {

    // const { getAccessTokenSilently } = useAuth0();
    const navigate = useNavigate();

    const itemClicked = () => {
        if (user) {
            (async function showItemClicked() {
                // const userFetched = await fetchData(getAccessTokenSilently, `users/${user.id}`) as UserType;
                navigate(`/search-user/${user.id}`, { state: { user } });
            }());
        }

    }
    return (
        <>
            <div className="group-item-list" onClick={itemClicked}>
                <img className={`img-list`} src={user.imageUrl} style={{ borderRadius: '50%' }} alt={`Image or Cover of ${user.userName}`} />
                <div className='item-list-info'>

                    <h3>{(user.userName && user.userName.length > 17) ? `${user.userName.slice(0, 17)}...` : user.userName}</h3>

                </div>
            </div>
        </>
    )
}
