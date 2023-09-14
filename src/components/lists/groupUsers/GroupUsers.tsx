import './groupUsers.css'

import { fetchData } from '../../../api/fetchApi';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { UserType } from '../../../types/dataTypes/user';

export const GroupUsers = ({ ...props }) => {
    const { user } = props;
    console.log(user)
    const navigate = useNavigate();
    const { t } = useTranslation();
    const itemClicked = () => {
        if (user) {
            (async function showItemClicked() {
                const itemFetched = await fetchData(`users?id=${user.id}`) as (UserType[]);
                const item = itemFetched[0];
                navigate(`/search-user/${user.id}`, { state: { item } });
            }());
        }

    }
    return (
        <>
            <div className="group-item-list" onClick={itemClicked}>
                <img className={`img-list`} src={user.profilePicture} style={{ borderRadius: '50%' }} alt={`Image or Cover of ${user.name}`} />
                <div className='item-list-info'>
                    <h3>{user.name.length > 17 ? `${user.name.slice(0, 17)}...` : user.name}</h3>

                </div>
            </div>
        </>
    )
}
